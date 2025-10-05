-- Add full_name column to admin_users table
ALTER TABLE public.admin_users 
ADD COLUMN full_name TEXT;

-- Update the coordinator's full name
UPDATE public.admin_users 
SET full_name = 'Marcos Alberto Rodrigues Vasconcelos'
WHERE email = 'marcos.vasconcelos@ufba.br';

-- Update the secretary's full name
UPDATE public.admin_users 
SET full_name = 'Secretaria CPGG'
WHERE email = 'secretaria.cpgg.ufba@gmail.com';