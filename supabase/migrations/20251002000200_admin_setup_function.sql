-- Function to validate admin setup key without exposing it to clients
create or replace function public.validate_admin_setup_key(provided_key text)
returns table(configured boolean, valid boolean)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_key text;
begin
  select setup_key
    into stored_key
  from public.admin_settings
  where id = 'setup'
  limit 1;

  configured := stored_key is not null;
  valid := configured and stored_key = provided_key;
  return;
end;
$$;

-- Ensure clients can execute the function during onboarding
grant execute on function public.validate_admin_setup_key(text) to anon;
grant execute on function public.validate_admin_setup_key(text) to authenticated;
