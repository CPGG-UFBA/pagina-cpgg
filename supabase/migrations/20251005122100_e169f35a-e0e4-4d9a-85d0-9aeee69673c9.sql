-- Remove "(Chefe)" from researcher names in the database
UPDATE researchers
SET name = TRIM(REGEXP_REPLACE(name, '\s*\(Chefe\).*', '', 'i'))
WHERE name ~* '\(Chefe\)';