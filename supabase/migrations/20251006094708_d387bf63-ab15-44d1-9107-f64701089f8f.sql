-- Adicionar constraint única no user_id se não existir
ALTER TABLE public.user_profiles 
ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);