-- Remover a constraint CASCADE que está deletando os perfis
ALTER TABLE public.user_profiles 
DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;

-- Não recriar a constraint - user_id será apenas uma referência sem constraint
-- Isso permite que o perfil continue existindo mesmo quando o auth.users é deletado

-- Atualizar a função para setar user_id como NULL ANTES de deletar do auth.users
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
  
  -- CRÍTICO: Limpar user_id PRIMEIRO, antes de deletar de auth.users
  -- Isso previne que o CASCADE delete o perfil
  UPDATE public.user_profiles 
  SET user_id = NULL,
      email = 'email.provisorio@aguardando.cadastro',
      phone = '(00) 00000-0000',
      updated_at = now()
  WHERE id = _user_profile_id;
  
  -- DEPOIS deletar de auth.users (agora não há mais foreign key para CASCADE)
  DELETE FROM auth.users WHERE id = _user_id;
  
  RETURN jsonb_build_object(
    'success', true, 
    'message', 'User auth deleted, profile data preserved',
    'user_name', _full_name,
    'description_preserved', _description IS NOT NULL,
    'photo_preserved', _photo_url IS NOT NULL
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', SQLERRM
    );
END;
$$;