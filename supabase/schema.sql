-- ─────────────────────────────────────────────────────────────
--  Carnelian Stores — Supabase Schema
-- ─────────────────────────────────────────────────────────────

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- ─── ENUMS ───────────────────────────────────────────────────

create type sub_brand as enum (
  'carnelian', 'nerds-assemble', 'clutch-nation', 'field-notes', 'the-vault'
);

create type order_status as enum (
  'pending', 'payment_received', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);

create type discount_type as enum ('percentage', 'fixed');

create type notification_type as enum (
  'order_update', 'price_drop', 'back_in_stock', 'promo', 'review_reply'
);

create type user_role as enum ('customer', 'admin', 'super_admin');

-- ─── USERS PROFILE ───────────────────────────────────────────

create table if not exists profiles (
  id          uuid primary key default uuid_generate_v4(),
  clerk_id    text unique not null,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  role        user_role not null default 'customer',
  phone       text,
  loyalty_points integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index profiles_clerk_id_idx on profiles(clerk_id);
create index profiles_email_idx on profiles(email);

-- ─── ADDRESSES ───────────────────────────────────────────────

create table if not exists addresses (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references profiles(id) on delete cascade,
  label        text default 'Home',
  full_name    text not null,
  line1        text not null,
  line2        text,
  city         text not null,
  state        text not null,
  country      text not null,
  postal_code  text not null,
  phone        text,
  is_default   boolean not null default false,
  created_at   timestamptz not null default now()
);

create index addresses_user_id_idx on addresses(user_id);

-- ─── PRODUCTS ────────────────────────────────────────────────

create table if not exists products (
  id                    uuid primary key default uuid_generate_v4(),
  name                  text not null,
  slug                  text unique not null,
  description           text not null,
  long_description      text,
  brand                 sub_brand not null,
  category              text not null,
  subcategory           text,
  tags                  text[] not null default '{}',
  images                text[] not null default '{}',
  thumbnail             text not null,
  base_price            integer not null, -- stored in cents
  compare_at_price      integer,
  is_featured           boolean not null default false,
  is_new                boolean not null default false,
  is_on_sale            boolean not null default false,
  is_active             boolean not null default true,
  rating                numeric(3,2) not null default 0,
  review_count          integer not null default 0,
  related_product_ids   uuid[] not null default '{}',
  upsell_product_ids    uuid[] not null default '{}',
  metadata              jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index products_brand_idx on products(brand);
create index products_category_idx on products(category);
create index products_slug_idx on products(slug);
create index products_is_featured_idx on products(is_featured);
create index products_rating_idx on products(rating desc);
create index products_name_search_idx on products using gin(to_tsvector('english', name || ' ' || description));

-- ─── PRODUCT VARIANTS ────────────────────────────────────────

create table if not exists product_variants (
  id                  uuid primary key default uuid_generate_v4(),
  product_id          uuid not null references products(id) on delete cascade,
  sku                 text unique not null,
  size                text,
  color               text,
  color_hex           text,
  style               text,
  price               integer not null, -- in cents
  compare_at_price    integer,
  inventory_quantity  integer not null default 0,
  image_url           text,
  created_at          timestamptz not null default now()
);

create index variants_product_id_idx on product_variants(product_id);
create index variants_sku_idx on product_variants(sku);

-- ─── DISCOUNT CODES ──────────────────────────────────────────

create table if not exists discount_codes (
  id               uuid primary key default uuid_generate_v4(),
  code             text unique not null,
  type             discount_type not null,
  value            integer not null, -- percentage (0-100) or cents
  min_order_value  integer,
  max_uses         integer,
  current_uses     integer not null default 0,
  expires_at       timestamptz,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

create index discount_codes_code_idx on discount_codes(code);

-- ─── CARTS ───────────────────────────────────────────────────

create table if not exists carts (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references profiles(id) on delete cascade,
  session_id      text,
  discount_code   text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint cart_owner check (user_id is not null or session_id is not null)
);

create table if not exists cart_items (
  id          uuid primary key default uuid_generate_v4(),
  cart_id     uuid not null references carts(id) on delete cascade,
  product_id  uuid not null references products(id),
  variant_id  uuid references product_variants(id),
  quantity    integer not null default 1 check (quantity > 0),
  added_at    timestamptz not null default now(),
  unique (cart_id, product_id, variant_id)
);

create index cart_items_cart_id_idx on cart_items(cart_id);

-- ─── ORDERS ──────────────────────────────────────────────────

create table if not exists orders (
  id                  uuid primary key default uuid_generate_v4(),
  order_number        text unique not null,
  user_id             uuid not null references profiles(id),
  status              order_status not null default 'pending',
  shipping_address    jsonb not null,
  billing_address     jsonb not null,
  subtotal            integer not null,
  discount            integer not null default 0,
  shipping_cost       integer not null default 0,
  tax                 integer not null default 0,
  total               integer not null,
  payment_intent_id   text,
  tracking_number     text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index orders_user_id_idx on orders(user_id);
create index orders_status_idx on orders(status);
create index orders_created_at_idx on orders(created_at desc);

create table if not exists order_items (
  id            uuid primary key default uuid_generate_v4(),
  order_id      uuid not null references orders(id) on delete cascade,
  product_id    uuid not null references products(id),
  variant_id    uuid references product_variants(id),
  product_name  text not null,
  variant_label text,
  image_url     text not null,
  quantity      integer not null,
  unit_price    integer not null,
  total_price   integer not null
);

create index order_items_order_id_idx on order_items(order_id);

-- ─── REVIEWS ─────────────────────────────────────────────────

create table if not exists reviews (
  id                uuid primary key default uuid_generate_v4(),
  product_id        uuid not null references products(id) on delete cascade,
  user_id           uuid not null references profiles(id) on delete cascade,
  order_id          uuid references orders(id),
  rating            integer not null check (rating between 1 and 5),
  title             text not null,
  body              text not null,
  verified_purchase boolean not null default false,
  helpful_count     integer not null default 0,
  is_approved       boolean not null default false,
  created_at        timestamptz not null default now(),
  unique (product_id, user_id)
);

create index reviews_product_id_idx on reviews(product_id);

-- ─── WISHLIST ─────────────────────────────────────────────────

create table if not exists wishlists (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  added_at    timestamptz not null default now(),
  unique (user_id, product_id)
);

create index wishlists_user_id_idx on wishlists(user_id);

-- ─── NOTIFICATIONS ────────────────────────────────────────────

create table if not exists notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  type        notification_type not null,
  title       text not null,
  body        text not null,
  read        boolean not null default false,
  link        text,
  created_at  timestamptz not null default now()
);

create index notifications_user_id_idx on notifications(user_id);
create index notifications_read_idx on notifications(user_id, read);

-- ─── BACK-IN-STOCK ALERTS ────────────────────────────────────

create table if not exists back_in_stock_alerts (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  variant_id  uuid references product_variants(id),
  email       text not null,
  notified    boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (user_id, product_id, variant_id)
);

-- ─── PRICE DROP ALERTS ───────────────────────────────────────

create table if not exists price_alerts (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  product_id      uuid not null references products(id) on delete cascade,
  target_price    integer not null,
  notified        boolean not null default false,
  created_at      timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────

alter table profiles enable row level security;
alter table addresses enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;
alter table wishlists enable row level security;
alter table notifications enable row level security;
alter table back_in_stock_alerts enable row level security;
alter table price_alerts enable row level security;

-- Profiles: users can only see and edit their own
create policy "Users can view own profile" on profiles for select using (auth.uid()::text = clerk_id);
create policy "Users can update own profile" on profiles for update using (auth.uid()::text = clerk_id);

-- Products: public read
alter table products enable row level security;
create policy "Products are publicly readable" on products for select using (is_active = true);

-- Variants: public read
alter table product_variants enable row level security;
create policy "Variants are publicly readable" on product_variants for select using (true);

-- Reviews: public approved reviews readable; users can insert their own
create policy "Approved reviews are public" on reviews for select using (is_approved = true);
create policy "Users can insert reviews" on reviews for insert with check (true);

-- Orders: users see their own
create policy "Users can view own orders" on orders for select using (
  user_id in (select id from profiles where clerk_id = auth.uid()::text)
);

-- Wishlists: users manage their own
create policy "Users manage own wishlist" on wishlists for all using (
  user_id in (select id from profiles where clerk_id = auth.uid()::text)
);

-- Notifications: users see their own
create policy "Users see own notifications" on notifications for select using (
  user_id in (select id from profiles where clerk_id = auth.uid()::text)
);
create policy "Users update own notifications" on notifications for update using (
  user_id in (select id from profiles where clerk_id = auth.uid()::text)
);

-- ─── FUNCTIONS ───────────────────────────────────────────────

-- Update product rating after review insert
create or replace function update_product_rating()
returns trigger as $$
begin
  update products
  set
    rating = (select avg(rating) from reviews where product_id = NEW.product_id and is_approved = true),
    review_count = (select count(*) from reviews where product_id = NEW.product_id and is_approved = true)
  where id = NEW.product_id;
  return NEW;
end;
$$ language plpgsql;

create trigger on_review_approved
  after insert or update on reviews
  for each row execute function update_product_rating();

-- Auto-set updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

create trigger products_updated_at before update on products for each row execute function set_updated_at();
create trigger orders_updated_at before update on orders for each row execute function set_updated_at();
create trigger carts_updated_at before update on carts for each row execute function set_updated_at();
create trigger profiles_updated_at before update on profiles for each row execute function set_updated_at();
