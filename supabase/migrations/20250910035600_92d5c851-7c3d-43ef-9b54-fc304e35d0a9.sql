-- Create function to find user profile by name
CREATE OR REPLACE FUNCTION public.find_user_profile_by_name(_search_name text)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  full_name text,
  email text,
  institution text,
  phone text,
  first_name text,
  researcher_route text,
  photo_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT up.id, up.user_id, up.full_name, up.email, up.institution, up.phone, up.first_name, up.researcher_route, up.photo_url
  FROM public.user_profiles up
  WHERE lower(up.full_name) = lower(_search_name)
  OR lower(up.full_name) LIKE lower('%' || _search_name || '%')
  ORDER BY 
    CASE WHEN lower(up.full_name) = lower(_search_name) THEN 1 ELSE 2 END,
    up.full_name
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.find_user_profile_by_name(text) TO anon, authenticated;