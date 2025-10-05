-- Adicionar política RLS para permitir que coordenacao delete pesquisadores
CREATE POLICY "Only coordenacao can delete researchers" 
ON public.researchers 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND role = 'coordenacao'
  )
);