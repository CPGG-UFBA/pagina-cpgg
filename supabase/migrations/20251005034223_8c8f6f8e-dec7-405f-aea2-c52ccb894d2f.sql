-- Adicionar colunas de legendas para as fotos dos laboratórios
ALTER TABLE laboratories 
ADD COLUMN photo1_legend text,
ADD COLUMN photo2_legend text,
ADD COLUMN photo3_legend text;