-- Update all researcher emails to default placeholder
UPDATE researchers 
SET email = 'xxxxx@xxxx' 
WHERE email IS NOT NULL;

-- Set default value for email column in researchers table
ALTER TABLE researchers 
ALTER COLUMN email SET DEFAULT 'xxxxx@xxxx';