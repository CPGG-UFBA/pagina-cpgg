-- Remover política existente que não está funcionando
DROP POLICY IF EXISTS "Coordenacao can delete user profiles" ON public.user_profiles;

-- Criar nova política mais simples usando a função is_admin existente
CREATE POLICY "Admins can delete user profiles"
ON public.user_profiles
FOR DELETE
USING (is_admin());