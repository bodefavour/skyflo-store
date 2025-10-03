-- Expand orders table with shipping, payment, and localization metadata
alter table public.orders
  add column if not exists shipping_address jsonb,
  add column if not exists payment jsonb,
  add column if not exists subtotal numeric(10,2),
  add column if not exists shipping_fee numeric(10,2),
  add column if not exists tax numeric(10,2),
  add column if not exists notes text,
  add column if not exists currency_code text default 'USD',
  add column if not exists currency_rate numeric(18,6) default 1,
  add column if not exists base_currency text default 'USD',
  add column if not exists locale text;

create index if not exists orders_currency_code_idx on public.orders(currency_code);
create index if not exists orders_locale_idx on public.orders(locale);

update public.orders
set
  subtotal = coalesce(subtotal, total),
  shipping_fee = coalesce(shipping_fee, 0),
  tax = coalesce(tax, 0),
  currency_code = coalesce(currency_code, 'USD'),
  currency_rate = coalesce(currency_rate, 1),
  base_currency = coalesce(base_currency, 'USD')
where true;
