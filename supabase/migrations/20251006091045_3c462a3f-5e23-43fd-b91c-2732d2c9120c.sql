-- Função para criar usuários admin sem passar pelo trigger problemático
CREATE OR REPLACE FUNCTION public.create_admin_from_panel(_email text, _role text DEFAULT 'coordenacao')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _full_name text;
BEGIN
  -- Validar role
  IF _role NOT IN ('coordenacao', 'secretaria', 'ti') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Role deve ser: coordenacao, secretaria ou ti');
  END IF;

  -- Buscar o usuário que foi criado pelo painel
  SELECT id, COALESCE(raw_user_meta_data->>'full_name', 'Admin User') 
  INTO _user_id, _full_name
  FROM auth.users 
  WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Usuário não encontrado no auth.users. Crie primeiro pelo painel do Supabase.');
  END IF;

  -- Inserir ou atualizar admin_users
  INSERT INTO public.admin_users (user_id, email, role, full_name)
  VALUES (_user_id, _email, _role, _full_name)
  ON CONFLICT (user_id) 
  DO UPDATE SET role = EXCLUDED.role, email = EXCLUDED.email, full_name = EXCLUDED.full_name, updated_at = now();

  -- Inserir ou atualizar user_profiles
  INSERT INTO public.user_profiles (
    user_id,
    full_name,
    email,
    institution,
    phone,
    first_name
  ) VALUES (
    _user_id,
    _full_name,
    _email,
    'UFBA',
    '(00) 00000-0000',
    split_part(_full_name, ' ', 1)
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = now();

  RETURN jsonb_build_object(
    'success', true, 
    'message', 'Admin criado com sucesso',
    'user_id', _user_id,
    'email', _email,
    'role', _role
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;