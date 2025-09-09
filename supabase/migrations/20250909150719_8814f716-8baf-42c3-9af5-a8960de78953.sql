-- Criar tabela para pesquisadores
CREATE TABLE public.researchers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  program TEXT NOT NULL CHECK (program IN ('oil', 'environment', 'mineral', 'oceanography', 'coast')),
  email TEXT NOT NULL,
  description TEXT,
  lattes_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, program)
);

-- Habilitar RLS
ALTER TABLE public.researchers ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública (para exibir na página)
CREATE POLICY "Allow public read access to researchers" 
ON public.researchers 
FOR SELECT 
USING (true);

-- Política para permitir inserção apenas para coordenacao
CREATE POLICY "Only coordenacao can insert researchers" 
ON public.researchers 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir atualização apenas para coordenacao
CREATE POLICY "Only coordenacao can update researchers" 
ON public.researchers 
FOR UPDATE 
USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_researchers_updated_at
  BEFORE UPDATE ON public.researchers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();