-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Set up storage policies for product images
create policy "Public product images read" on storage.objects
for select using (bucket_id = 'product-images');

create policy "Admins can upload product images" on storage.objects
for insert 
to authenticated
with check (bucket_id = 'product-images' and (storage.foldername(name))[1] = 'products');

create policy "Admins can update product images" on storage.objects
for update
to authenticated
using (bucket_id = 'product-images');

create policy "Admins can delete product images" on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images');