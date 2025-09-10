-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_value text;
  researcher_route_value text;
BEGIN
  -- Extract first name from full_name metadata
  first_name_value := trim(split_part(NEW.raw_user_meta_data ->> 'full_name', ' ', 1));
  
  -- Find researcher route based on first name
  -- This will be set via the application logic
  researcher_route_value := NEW.raw_user_meta_data ->> 'researcher_route';
  
  -- Insert into user_profiles
  INSERT INTO public.user_profiles (
    user_id,
    full_name,
    email,
    institution,
    phone,
    first_name,
    researcher_route
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    NEW.raw_user_meta_data ->> 'institution',
    NEW.raw_user_meta_data ->> 'phone',
    first_name_value,
    researcher_route_value
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();