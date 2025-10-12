-- Remover a constraint de unicidade no full_name que está bloqueando
ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_full_name_unique_ci;

-- Verificar se há outras constraints problemáticas
DO $$ 
BEGIN
  -- Remover outras possíveis constraints de unicidade no full_name
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname LIKE '%full_name%' 
    AND conrelid = 'public.user_profiles'::regclass
  ) THEN
    EXECUTE 'ALTER TABLE public.user_profiles DROP CONSTRAINT ' || 
      (SELECT conname FROM pg_constraint 
       WHERE conname LIKE '%full_name%' 
       AND conrelid = 'public.user_profiles'::regclass 
       LIMIT 1);
  END IF;
END $$;