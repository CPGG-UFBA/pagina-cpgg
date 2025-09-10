-- Function to sync auth users to user_profiles
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_profiles()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_user RECORD;
  synced_count INTEGER := 0;
BEGIN
  -- Loop through auth.users that don't have profiles
  FOR auth_user IN 
    SELECT au.id, au.email, au.raw_user_meta_data
    FROM auth.users au
    LEFT JOIN public.user_profiles up ON au.id = up.user_id
    WHERE up.user_id IS NULL
  LOOP
    -- Insert into user_profiles with default values
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
      COALESCE(auth_user.raw_user_meta_data ->> 'full_name', 'Nome não informado'),
      auth_user.email,
      COALESCE(auth_user.raw_user_meta_data ->> 'institution', 'Instituição não informada'),
      COALESCE(auth_user.raw_user_meta_data ->> 'phone', 'Telefone não informado'),
      COALESCE(
        trim(split_part(auth_user.raw_user_meta_data ->> 'full_name', ' ', 1)), 
        'Nome'
      ),
      auth_user.raw_user_meta_data ->> 'researcher_route'
    );
    
    synced_count := synced_count + 1;
  END LOOP;
  
  RETURN jsonb_build_object(
    'success', true,
    'synced_users', synced_count,
    'message', 'Users synchronized successfully'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_auth_users_to_profiles() TO authenticated;