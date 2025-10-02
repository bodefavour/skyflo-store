do $$
begin
  raise notice 'admin_settings count: %', (select count(*) from public.admin_settings);
  raise notice 'admin_settings key length: %', (select length(setup_key) from public.admin_settings where id = 'setup');
end
$$;
