-- Modificar trigger para lidar com perfis pré-cadastrados
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  first_name_value text;
  researcher_route_value text;
  full_name_value text;
  profile_id_value uuid;
BEGIN
  -- Extract values from metadata
  full_name_value := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data ->> 'full_name'), ''),
    'Admin User'
  );
  
  first_name_value := trim(split_part(full_name_value, ' ', 1));
  researcher_route_value := NEW.raw_user_meta_data ->> 'researcher_route';
  profile_id_value := (NEW.raw_user_meta_data ->> 'profile_id')::uuid;
  
  -- Se já existe um perfil pré-cadastrado, apenas atualize-o
  IF profile_id_value IS NOT NULL THEN
    UPDATE public.user_profiles
    SET 
      user_id = NEW.id,
      email = NEW.email,
      phone = COALESCE(NULLIF(trim(NEW.raw_user_meta_data ->> 'phone'), ''), phone),
      updated_at = now()
    WHERE id = profile_id_value;
    
    -- Se a atualização não afetou nenhuma linha, o perfil não existe mais
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Perfil pré-cadastrado não encontrado';
    END IF;
  ELSE
    -- Caso contrário, crie um novo perfil (para admins e outros usuários)
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
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recriar trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();