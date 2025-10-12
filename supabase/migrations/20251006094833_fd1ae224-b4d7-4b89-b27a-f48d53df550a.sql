-- Adicionar constraint única no user_id da tabela admin_users
ALTER TABLE public.admin_users 
ADD CONSTRAINT admin_users_user_id_unique UNIQUE (user_id);