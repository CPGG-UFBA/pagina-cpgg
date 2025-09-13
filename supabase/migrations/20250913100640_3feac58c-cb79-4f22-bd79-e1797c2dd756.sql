-- Adicionar campos para chefe do laboratório na tabela laboratories
ALTER TABLE public.laboratories 
ADD COLUMN chief_user_id uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
ADD COLUMN chief_alternative_email text;

-- Comentários para documentação
COMMENT ON COLUMN public.laboratories.chief_user_id IS 'ID do usuário que é chefe deste laboratório';
COMMENT ON COLUMN public.laboratories.chief_alternative_email IS 'Email alternativo do chefe do laboratório (diferente do email UFBA)';

-- Índice para melhor performance nas consultas
CREATE INDEX idx_laboratories_chief_user_id ON public.laboratories(chief_user_id);