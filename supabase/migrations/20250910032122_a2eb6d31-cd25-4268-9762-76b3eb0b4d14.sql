-- Function to safely check duplicates bypassing RLS (returns JSON)
CREATE OR REPLACE FUNCTION public.check_user_profile_duplicates(
  _email text,
  _full_name text
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'email_exists', EXISTS (
      SELECT 1 FROM public.user_profiles WHERE lower(email) = lower(_email)
    ),
    'name_exists', EXISTS (
      SELECT 1 FROM public.user_profiles WHERE lower(full_name) = lower(_full_name)
    )
  );
$$;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.check_user_profile_duplicates(text, text) TO anon, authenticated;