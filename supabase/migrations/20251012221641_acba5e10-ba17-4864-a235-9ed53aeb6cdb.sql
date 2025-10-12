-- Função para resetar senha mantendo descrição e foto do perfil
CREATE OR REPLACE FUNCTION public.reset_user_keep_profile_data(_user_profile_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _user_id uuid;
  _full_name text;
  _description text;
  _photo_url text;
BEGIN
  -- Buscar user_id, descrição e foto do perfil
  SELECT user_id, full_name, description, photo_url 
  INTO _user_id, _full_name, _description, _photo_url
  FROM public.user_profiles 
  WHERE id = _user_profile_id;
  
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object('success', true, 'message', 'Profile has no user_id');
  END IF;
  
  -- Deletar apenas do auth.users
  DELETE FROM auth.users WHERE id = _user_id;
  
  -- Limpar apenas o user_id do perfil, mantendo description e photo_url
  UPDATE public.user_profiles 
  SET user_id = NULL,
      updated_at = now()
  WHERE id = _user_profile_id;
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'User auth deleted, profile data preserved',
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