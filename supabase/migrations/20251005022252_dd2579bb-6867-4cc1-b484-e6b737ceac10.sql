-- Modificar trigger para tornar full_name opcional para admins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  first_name_value text;
  researcher_route_value text;
  full_name_value text;
BEGIN
  -- Extract values from metadata
  full_name_value := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data ->> 'full_name'), ''),
    'Admin User' -- Valor padrão para admins
  );
  
  first_name_value := trim(split_part(full_name_value, ' ', 1));
  researcher_route_value := NEW.raw_user_meta_data ->> 'researcher_route';
  
  -- Try to insert into user_profiles
  BEGIN
    INSERT INTO public.user_profiles (
      user_id,
      full_name,
      email,
      institution,
      phone,
      first_name,
      researcher_route
    ) VALUES (
      NEW.id,
      full_name_value,
      NEW.email,
      COALESCE(NULLIF(trim(NEW.raw_user_meta_data ->> 'institution'), ''), 'UFBA'),
      COALESCE(NULLIF(trim(NEW.raw_user_meta_data ->> 'phone'), ''), '(00) 00000-0000'),
      first_name_value,
      researcher_route_value
    );
  EXCEPTION
    WHEN unique_violation THEN
      RAISE EXCEPTION 'Usuário já cadastrado';
  END;
  
  RETURN NEW;
END;
$function$;

-- Função auxiliar para criar admin facilmente
CREATE OR REPLACE FUNCTION public.create_admin_user(
  _email text,
  _password text,
  _role text DEFAULT 'coordenacao'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  _user_id uuid;
BEGIN
  -- Validar role
  IF _role NOT IN ('coordenacao', 'secretaria', 'ti') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Role deve ser: coordenacao, secretaria ou ti');
  END IF;

  -- Verificar se já existe
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Use o painel do Supabase para criar o usuário primeiro');
  END IF;

  -- Inserir ou atualizar admin_users
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (_user_id, _email, _role)
  ON CONFLICT (user_id) 
  DO UPDATE SET role = EXCLUDED.role, email = EXCLUDED.email, updated_at = now();

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
$function$;