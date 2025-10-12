
-- Update existing admin user to use correct user_id from user_profiles
UPDATE public.admin_users 
SET user_id = '3085027e-12ea-4ce3-b74d-a60a6758cf42',
    updated_at = now()
WHERE email = 'marcos.vasconcelos@ufba.br';
