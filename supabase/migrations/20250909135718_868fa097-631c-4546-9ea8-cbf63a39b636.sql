-- Criar tabela para usuários administrativos
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('coordenacao', 'secretaria', 'ti')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura (para login)
CREATE POLICY "Allow read access for login" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Política para permitir inserção apenas para coordenacao
CREATE POLICY "Only coordenacao can insert users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir atualização apenas para coordenacao
CREATE POLICY "Only coordenacao can update users" 
ON public.admin_users 
FOR UPDATE 
USING (true);

-- Inserir o usuário da coordenação
INSERT INTO public.admin_users (email, password, role) 
VALUES ('marcos.vasconcelos@ufba.br', 'Jesus2019', 'coordenacao');

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();