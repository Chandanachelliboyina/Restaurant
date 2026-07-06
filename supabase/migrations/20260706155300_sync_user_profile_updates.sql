CREATE OR REPLACE FUNCTION public.handle_update_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET first_name = NEW.raw_user_meta_data ->> 'first_name',
      last_name = NEW.raw_user_meta_data ->> 'last_name',
      phone = NEW.raw_user_meta_data ->> 'phone',
      updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists (for safe re-runs)
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data IS DISTINCT FROM NEW.raw_user_meta_data)
  EXECUTE FUNCTION public.handle_update_user();

REVOKE EXECUTE ON FUNCTION public.handle_update_user() FROM PUBLIC, anon, authenticated;
