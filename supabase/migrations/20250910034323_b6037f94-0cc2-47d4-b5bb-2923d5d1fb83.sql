-- Function to list all user profiles ignoring RLS
CREATE OR REPLACE FUNCTION public.list_all_user_profiles()
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  institution text,
  phone text,
  user_id uuid,
  researcher_route text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT up.id, up.full_name, up.email, up.institution, up.phone, up.user_id, up.researcher_route
  FROM public.user_profiles up
  ORDER BY lower(up.full_name) ASC;
$$;

GRANT EXECUTE ON FUNCTION public.list_all_user_profiles() TO anon, authenticated;

-- Allow anon to execute delete function used by admin UI
GRANT EXECUTE ON FUNCTION public.delete_user_complete(uuid) TO anon;

-- Function to restore a user profile (ignoring RLS)
CREATE OR REPLACE FUNCTION public.restore_user_profile(
  _id uuid,
  _user_id uuid,
  _full_name text,
  _email text,
  _institution text,
  _phone text,
  _first_name text,
  _researcher_route text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, user_id, full_name, email, institution, phone, first_name, researcher_route
  ) VALUES (
    _id, _user_id, _full_name, _email, _institution, _phone, _first_name, _researcher_route
  )
  ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    institution = EXCLUDED.institution,
    phone = EXCLUDED.phone,
    first_name = EXCLUDED.first_name,
    researcher_route = EXCLUDED.researcher_route,
    updated_at = now();

  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

GRANT EXECUTE ON FUNCTION public.restore_user_profile(uuid, uuid, text, text, text, text, text, text) TO anon, authenticated;