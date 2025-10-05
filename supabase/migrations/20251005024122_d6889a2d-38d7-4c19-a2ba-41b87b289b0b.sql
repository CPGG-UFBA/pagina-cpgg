-- CORREÇÃO DE SEGURANÇA: Proteger dados pessoais na tabela reservations

-- 1. Remover política pública de leitura (vulnerabilidade crítica)
DROP POLICY IF EXISTS "Allow public read access to reservations" ON public.reservations;

-- 2. Criar política segura: apenas admin coordenacao pode visualizar reservas
CREATE POLICY "Only coordenacao can view reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
    AND role = 'coordenacao'
  )
);

-- 3. Garantir que INSERT público continua funcionando (para formulário de reserva)
-- (Política já existe, não precisa alterar)

-- NOTA: Agora apenas administradores autenticados com role 'coordenacao' 
-- podem visualizar as reservas e os dados pessoais dos clientes.