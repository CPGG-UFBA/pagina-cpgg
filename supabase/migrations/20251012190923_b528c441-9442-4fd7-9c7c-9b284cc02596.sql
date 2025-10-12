-- Remove a política de INSERT existente que está causando problema
DROP POLICY IF EXISTS "Allow public insert access to reservations" ON public.reservations;

-- Cria uma nova política de INSERT que permite inserções públicas sem restrições
CREATE POLICY "Enable insert access for all users"
ON public.reservations
FOR INSERT
TO public
WITH CHECK (true);

-- Também vamos garantir que a política de SELECT permita acesso público para verificar as reservas
DROP POLICY IF EXISTS "Only coordenacao can view reservations" ON public.reservations;

CREATE POLICY "Enable read access for authenticated users"
ON public.reservations
FOR SELECT
TO authenticated
USING (true);

-- Mantém as políticas de UPDATE e DELETE apenas para coordenação
-- (elas já estão configuradas corretamente)