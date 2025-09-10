-- Function to delete user from both user_profiles and auth.users
CREATE OR REPLACE FUNCTION public.delete_user_complete(
  _user_profile_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _full_name text;
BEGIN
  -- Get user_id and full_name from user_profiles
  SELECT user_id, full_name INTO _user_id, _full_name
  FROM public.user_profiles 
  WHERE id = _user_profile_id;
  
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User profile not found');
  END IF;
  
  -- Delete from user_profiles first
  DELETE FROM public.user_profiles WHERE id = _user_profile_id;
  
  -- Delete from auth.users
  DELETE FROM auth.users WHERE id = _user_id;
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'User deleted successfully',
    'user_name', _full_name
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', SQLERRM
    );
END;
$$;

-- Grant execute to authenticated users (admin only)
GRANT EXECUTE ON FUNCTION public.delete_user_complete(uuid) TO authenticated;