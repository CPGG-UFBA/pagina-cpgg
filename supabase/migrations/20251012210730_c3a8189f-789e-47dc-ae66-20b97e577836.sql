-- Corrigir nome do equipamento: Simsógrafo para Sismógrafo
UPDATE laiga_equipment 
SET name = 'Sismógrafo Geode48', updated_at = now()
WHERE name = 'Simsógrafo Geode48';