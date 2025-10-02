-- Ensure admin settings row exists with a generated setup key
insert into public.admin_settings (id, setup_key)
values ('setup', encode(extensions.gen_random_bytes(16), 'hex'))
on conflict (id) do update
set setup_key = excluded.setup_key,
    updated_at = now();
