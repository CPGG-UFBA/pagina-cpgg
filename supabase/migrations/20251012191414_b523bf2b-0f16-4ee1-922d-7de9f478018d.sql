-- Reabilitar RLS na tabela reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Garantir que a política de INSERT existe e está correta
-- Esta política permite que qualquer pessoa (incluindo não autenticados) insira reservas
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.reservations;
CREATE POLICY "Enable insert access for all users"
ON public.reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);