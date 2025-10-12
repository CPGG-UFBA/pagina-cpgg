-- Corrigir avisos de search_path nas funções de segurança

DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.get_admin_role();

-- Recriar funções com search_path definido corretamente
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.admin_users
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Verifica se o usuário atual é um administrador';
COMMENT ON FUNCTION public.get_admin_role() IS 'Retorna o cargo do administrador atual';