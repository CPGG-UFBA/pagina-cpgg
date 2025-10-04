-- Limpar todos os dados de visitantes
TRUNCATE TABLE visitor_locations;

-- Adicionar coluna para armazenar hashes de IPs únicos
ALTER TABLE visitor_locations 
ADD COLUMN IF NOT EXISTS unique_ip_hashes text[] DEFAULT ARRAY[]::text[];