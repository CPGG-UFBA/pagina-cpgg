-- Atualizar trigger para preservar description e photo_url em caso de UPDATE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
  
  -- Se já existe um perfil pré-cadastrado, apenas atualize-o SEM tocar em description e photo_url
  IF profile_id_value IS NOT NULL THEN
    UPDATE public.user_profiles
    SET 
      user_id = NEW.id,
      email = NEW.email,
      phone = COALESCE(NULLIF(trim(NEW.raw_user_meta_data ->> 'phone'), ''), phone),
      updated_at = now()
    WHERE id = profile_id_value;
    
    IF NOT FOUND THEN
      RAISE NOTICE 'Perfil pré-cadastrado não encontrado';
    END IF;
  ELSE
    -- Inserir ou atualizar perfil usando UPSERT, preservando description e photo_url no UPDATE
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
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      full_name = EXCLUDED.full_name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      first_name = EXCLUDED.first_name,
      researcher_route = EXCLUDED.researcher_route,
      updated_at = now()
      -- Nota: description e photo_url NÃO são atualizados aqui, preservando valores existentes
    ;
  END IF;
  
  RETURN NEW;
END;
$$;