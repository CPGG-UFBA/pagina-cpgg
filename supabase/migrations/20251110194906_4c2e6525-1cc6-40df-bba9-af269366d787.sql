-- Criar tabela para solicitações de reparo/serviços técnicos
CREATE TABLE public.repair_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  email TEXT NOT NULL,
  problem_type TEXT NOT NULL, -- 'infraestrutura' ou 'ti'
  problem_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'em_andamento', 'resolvido', 'rejeitado'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT -- Notas do admin sobre o atendimento
);

-- Habilitar RLS
ALTER TABLE public.repair_requests ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Anyone can insert repair requests"
ON public.repair_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Only coordenacao and ti can view repair requests"
ON public.repair_requests
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
    AND admin_users.role IN ('coordenacao', 'ti', 'secretaria')
  )
);

CREATE POLICY "Only coordenacao and ti can update repair requests"
ON public.repair_requests
FOR UPDATE
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
    AND admin_users.role IN ('coordenacao', 'ti', 'secretaria')
  )
);

CREATE POLICY "Only coordenacao can delete repair requests"
ON public.repair_requests
FOR DELETE
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
    AND admin_users.role = 'coordenacao'
  )
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_repair_requests_updated_at
BEFORE UPDATE ON public.repair_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX idx_repair_requests_problem_type ON public.repair_requests(problem_type);
CREATE INDEX idx_repair_requests_status ON public.repair_requests(status);
CREATE INDEX idx_repair_requests_created_at ON public.repair_requests(created_at DESC);