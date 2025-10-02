## Skyflo Store – Supabase Migration Guide

This project was previously backed by Firebase (Firestore/Auth/Storage). We are now migrating read/write operations for catalog and admin data to Supabase while keeping Firebase Storage temporarily for product images.

### 1. Prerequisites

- Node.js 18+
- npm 9+
- Firebase CLI (`npm install -g firebase-tools`) for the legacy export
- Supabase CLI (`npm install -g supabase`) and an active Supabase project

### 2. Environment variables

Create/update `.env` in the project root:

```
REACT_APP_SUPABASE_URL=<your-supabase-project-url>
REACT_APP_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Temporary – still required while Firebase Auth/Storage are in use
REACT_APP_FIREBASE_API_KEY=<existing value>
REACT_APP_FIREBASE_AUTH_DOMAIN=<existing value>
REACT_APP_FIREBASE_PROJECT_ID=<existing value>
REACT_APP_FIREBASE_STORAGE_BUCKET=<existing value>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<existing value>
REACT_APP_FIREBASE_APP_ID=<existing value>
REACT_APP_FIREBASE_MEASUREMENT_ID=<existing value>
```

Restart the dev server after editing the file.

### 3. Export Firestore data

#### Option A – Cloud export (requires billing)

```bash
# From Cloud Shell or any machine with gcloud installed
gcloud auth login
gcloud config set project skyflo-store
gcloud firestore export gs://skyflo-store.firebasestorage.app/firestore-backup \
  --collection-ids=products,categories,orders,users,adminConfig
```

Download the resulting files from Cloud Storage (`firestore-backup` folder) before moving on.

#### Option B – Local script (no billing required)

1. In Firebase console go to **Project Settings → Service Accounts** and generate a JSON key. Save it as `serviceAccountKey.json` in the project root (or elsewhere and point to it via `GOOGLE_APPLICATION_CREDENTIALS`).
2. Run the export script:

```bash
# Install deps first if you haven't
npm install

# Export selected collections to ./firestore-export/*.json
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json \
COLLECTIONS=products,categories,orders,users,adminConfig \
node scripts/exportFirestore.js
```

This writes one JSON file per collection under `firestore-export/`.

### 4. Prepare Supabase schema

Run the following SQL in the Supabase dashboard (or `supabase db remote commit`):

```sql
create table if not exists products (
	id text primary key,
	name text not null,
	price numeric not null,
	image text,
	description text,
	category text,
	collection_slug text,
	featured boolean default false,
	created_at timestamp with time zone default now()
);

create table if not exists categories (
	id uuid primary key default gen_random_uuid(),
	name text unique not null,
	created_at timestamp with time zone default now()
);

create table if not exists orders (
	id text primary key,
	customer_name text,
	email text,
	total numeric,
	status text,
	placed_at timestamp with time zone,
	items jsonb
);

create table if not exists users (
	id text primary key,
	email text unique,
	display_name text,
	role text default 'user',
	last_login timestamp with time zone
);

create table if not exists admin_config (
	id text primary key default 'setup',
	setup_key text,
	admin_emails text[] default array[]::text[]
);
```

### 5. Transform and import data

Use the Supabase CLI to load each JSON file:

```bash
supabase db push

supabase db csv import products firestore-export/products/all_namespaces/all_documents.json --table products --json
supabase db csv import categories firestore-export/categories/all_namespaces/all_documents.json --table categories --json
supabase db csv import orders firestore-export/orders/all_namespaces/all_documents.json --table orders --json
supabase db csv import users firestore-export/users/all_namespaces/all_documents.json --table users --json
supabase db csv import adminConfig firestore-export/adminConfig/all_namespaces/all_documents.json --table admin_config --json
```

If your export structure differs, adjust the file paths or run a quick transformation script before importing.

### 6. Update local development

Install dependencies and start the app:

```bash
npm install
npm start
```

### 7. Testing

```bash
npm test -- --watchAll=false
```

> Note: Jest currently fails because `react-router-dom@7` ships as ESM. Configure `jest.config.cjs` with `transformIgnorePatterns` or pin React Router to a Jest-compatible version if you need CI coverage.

### 8. Next steps

- Replace remaining Firestore usages (admin screens, analytics) with Supabase queries.
- Decide whether to migrate authentication to Supabase Auth or keep Firebase Auth with custom claims.
- Gradually move product image uploads from Firebase Storage to Supabase Storage if desired.
- Remove Firebase dependencies once the migration is complete.
