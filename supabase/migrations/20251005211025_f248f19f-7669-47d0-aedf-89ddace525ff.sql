-- Adicionar coluna public_id na tabela user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS public_id TEXT;

-- Criar função para gerar ID público único (6 caracteres alfanuméricos)
CREATE OR REPLACE FUNCTION generate_public_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Gerar IDs para usuários existentes que não têm
UPDATE public.user_profiles
SET public_id = generate_public_id()
WHERE public_id IS NULL;

-- Adicionar constraint de unicidade
ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_public_id_unique UNIQUE (public_id);

-- Criar trigger para gerar ID automaticamente em novos registros
CREATE OR REPLACE FUNCTION auto_generate_public_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.public_id IS NULL THEN
    NEW.public_id := generate_public_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_insert_user_profiles_public_id
BEFORE INSERT ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION auto_generate_public_id();