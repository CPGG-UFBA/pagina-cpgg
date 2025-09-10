-- Check storage policies for news-photos bucket
SELECT 
    p.name as policy_name,
    p.command_name,
    p.permissive,
    p.roles,
    p.cmd,
    p.qual,
    p.with_check
FROM pg_policy p
JOIN pg_class c ON c.oid = p.polrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'storage' 
    AND c.relname = 'objects'
    AND p.polname LIKE '%news-photos%';