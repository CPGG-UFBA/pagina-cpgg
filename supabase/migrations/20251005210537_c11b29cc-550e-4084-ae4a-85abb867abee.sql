-- Função para deletar user_profile com verificação de permissão
CREATE OR REPLACE FUNCTION delete_user_profile(_profile_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _admin_role text;
BEGIN
  -- Verificar se o usuário é admin
  SELECT role INTO _admin_role
  FROM admin_users
  WHERE user_id = auth.uid();
  
  IF _admin_role IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Usuário não é administrador');
  END IF;
  
  -- Deletar o perfil
  DELETE FROM user_profiles WHERE id = _profile_id;
  
  RETURN jsonb_build_object('success', true, 'message', 'Perfil deletado com sucesso');
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;