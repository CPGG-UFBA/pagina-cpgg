-- SECURITY FIX: Remover senhas em texto plano e implementar autenticação adequada

-- 1. Remover a política de leitura pública (CRÍTICO)
DROP POLICY IF EXISTS "Allow read access for login" ON public.admin_users;

-- 2. Remover a coluna de senha (não é mais necessária com Supabase Auth)
ALTER TABLE public.admin_users DROP COLUMN IF EXISTS password;

-- 3. Adicionar coluna user_id para vincular ao Supabase Auth
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);

-- 5. Criar políticas RLS seguras - somente usuários autenticados podem ver seus próprios dados
CREATE POLICY "Users can view their own admin profile"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 6. Criar política para inserção (coordenação pode criar novos admins)
CREATE POLICY "Coordenacao can insert admin users"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'coordenacao'
  )
);

-- 7. Criar política para atualização
CREATE POLICY "Users can update their own profile"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 8. Criar política para deleção (apenas coordenação)
CREATE POLICY "Coordenacao can delete admin users"
ON public.admin_users
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'coordenacao'
  )
);

-- 9. Criar função helper para verificar se usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

-- 10. Criar função helper para obter role do admin
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.admin_users
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Verifica se o usuário atual é um administrador';
COMMENT ON FUNCTION public.get_admin_role() IS 'Retorna o cargo do administrador atual';