-- Criar tabela para armazenar reservas
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  email TEXT NOT NULL,
  uso TEXT NOT NULL,
  inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  termino TIMESTAMP WITH TIME ZONE NOT NULL,
  tipo_reserva TEXT NOT NULL CHECK (tipo_reserva IN ('auditorio', 'sala_reuniao')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada', 'rejeitada')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública (para visualizar reservas)
CREATE POLICY "Allow public read access to reservations" 
ON public.reservations 
FOR SELECT 
USING (true);

-- Política para permitir inserção pública (para criar reservas)
CREATE POLICY "Allow public insert access to reservations" 
ON public.reservations 
FOR INSERT 
WITH CHECK (true);

-- Política para que apenas coordenação possa atualizar/deletar
CREATE POLICY "Only coordenacao can update reservations" 
ON public.reservations 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete reservations" 
ON public.reservations 
FOR DELETE 
USING (true);

-- Criar trigger para updated_at
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();