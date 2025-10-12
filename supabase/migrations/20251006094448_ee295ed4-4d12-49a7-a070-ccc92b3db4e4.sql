-- Remover o índice único que está causando o problema
DROP INDEX IF EXISTS public.user_profiles_full_name_unique_ci;