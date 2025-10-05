-- Atualizar o registro existente com o user_id correto
DO $$
DECLARE
  _user_id uuid;
BEGIN
  -- Buscar o user_id do auth.users
  SELECT id INTO _user_id 
  FROM auth.users 
  WHERE email = 'marcos.vasconcelos@ufba.br';
  
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não encontrado em auth.users';
  END IF;
  
  -- Atualizar ou inserir o registro em admin_users
  DELETE FROM public.admin_users WHERE email = 'marcos.vasconcelos@ufba.br';
  
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (_user_id, 'marcos.vasconcelos@ufba.br', 'coordenacao');
  
  RAISE NOTICE 'Admin atualizado: user_id = %, email = marcos.vasconcelos@ufba.br, role = coordenacao', _user_id;
END $$;