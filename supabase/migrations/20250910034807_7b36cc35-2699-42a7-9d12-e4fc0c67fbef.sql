-- Update sync function to also update existing profiles and grant execute to anon/authenticated
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_profiles()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_user RECORD;
  inserted_count INTEGER := 0;
  updated_count INTEGER := 0;
  v_full_name text;
  v_institution text;
  v_phone text;
  v_first_name text;
  v_researcher_route text;
BEGIN
  FOR auth_user IN 
    SELECT au.id, au.email, au.raw_user_meta_data
    FROM auth.users au
  LOOP
    v_full_name := NULLIF(auth_user.raw_user_meta_data ->> 'full_name', '');
    v_institution := NULLIF(auth_user.raw_user_meta_data ->> 'institution', '');
    v_phone := NULLIF(auth_user.raw_user_meta_data ->> 'phone', '');
    v_first_name := NULLIF(trim(split_part(COALESCE(v_full_name, ''), ' ', 1)), '');
    v_researcher_route := NULLIF(auth_user.raw_user_meta_data ->> 'researcher_route', '');

    IF EXISTS (SELECT 1 FROM public.user_profiles up WHERE up.user_id = auth_user.id) THEN
      -- Update existing profile with values from auth metadata when available
      UPDATE public.user_profiles up SET
        full_name = COALESCE(v_full_name, up.full_name),
        email = COALESCE(auth_user.email, up.email),
        institution = COALESCE(v_institution, up.institution),
        phone = COALESCE(v_phone, up.phone),
        first_name = COALESCE(v_first_name, up.first_name),
        researcher_route = COALESCE(v_researcher_route, up.researcher_route),
        updated_at = now()
      WHERE up.user_id = auth_user.id;

      updated_count := updated_count + 1;
    ELSE
      -- Insert missing profile
      INSERT INTO public.user_profiles (
        user_id,
        full_name,
        email,
        institution,
        phone,
        first_name,
        researcher_route
      ) VALUES (
        auth_user.id,
        COALESCE(v_full_name, 'Nome não informado'),
        auth_user.email,
        COALESCE(v_institution, 'Instituição não informada'),
        COALESCE(v_phone, 'Telefone não informado'),
        COALESCE(v_first_name, 'Nome'),
        v_researcher_route
      );

      inserted_count := inserted_count + 1;
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'success', true,
    'inserted', inserted_count,
    'updated', updated_count,
    'message', 'Users synchronized successfully'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_auth_users_to_profiles() TO anon, authenticated;