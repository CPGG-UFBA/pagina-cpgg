-- Remover constraint antiga que está causando erro
ALTER TABLE public.admin_users 
DROP CONSTRAINT IF EXISTS admin_users_role_check;

-- Adicionar constraint correta com os valores permitidos
ALTER TABLE public.admin_users 
ADD CONSTRAINT admin_users_role_check 
CHECK (role IN ('coordenacao', 'secretaria', 'ti'));