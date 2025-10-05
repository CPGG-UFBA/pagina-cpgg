-- Allow coordenacao to insert user profiles
CREATE POLICY "Coordenacao can insert user profiles"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'coordenacao'
  )
);