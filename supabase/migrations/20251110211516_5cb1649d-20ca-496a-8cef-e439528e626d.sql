-- Adicionar policy para permitir visualização pública de reservas
-- Necessário para permitir que os usuários vejam o comprovante após fazer a solicitação

CREATE POLICY "Allow public read access to reservations"
ON public.reservations
FOR SELECT
TO anon, authenticated
USING (true);