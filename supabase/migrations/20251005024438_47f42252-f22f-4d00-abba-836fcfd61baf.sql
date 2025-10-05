-- CORREÇÃO DE SEGURANÇA CRÍTICA: Proteger emails de administradores

-- 1. Remover política vulnerável que permite qualquer usuário autenticado ver seu próprio registro
DROP POLICY IF EXISTS "Users can view their own admin profile" ON public.admin_users;

-- 2. Criar política segura: apenas administradores podem visualizar a tabela admin_users
-- Usa a função is_admin() que é SECURITY DEFINER e evita recursão
CREATE POLICY "Only admins can view admin_users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.is_admin());

-- NOTA: Agora apenas usuários que já são administradores (verificados através da função
-- is_admin()) podem visualizar a tabela admin_users, protegendo os emails de phishing.