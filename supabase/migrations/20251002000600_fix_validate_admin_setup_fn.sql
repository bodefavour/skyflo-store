create or replace function public.validate_admin_setup_key(provided_key text)
returns table(configured boolean, valid boolean)
language sql
security definer
set search_path = public, extensions
as $$
  with settings as (
    select setup_key
    from public.admin_settings
    where id = 'setup'
    limit 1
  )
  select
    exists(select 1 from settings) as configured,
    case
      when provided_key is null then false
      when exists(select 1 from settings) then (select setup_key from settings) = provided_key
      else false
    end as valid;
$$;

alter function public.validate_admin_setup_key(text) owner to postgres;
