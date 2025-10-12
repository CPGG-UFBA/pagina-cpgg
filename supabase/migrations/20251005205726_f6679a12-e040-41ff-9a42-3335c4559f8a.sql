-- Política para permitir coordenadores deletarem user_profiles
CREATE POLICY "Coordenacao can delete user profiles"
ON public.user_profiles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
    AND admin_users.role = 'coordenacao'
  )
);