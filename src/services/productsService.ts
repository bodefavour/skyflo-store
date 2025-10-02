import { supabase } from '../Supabase/supabaseClient';
import { Product } from '../types/types';

const TABLE_NAME = 'products';
const STORAGE_BUCKET = 'product-images';

type RawProduct = Record<string, any>;

const mapProduct = (item: RawProduct): Product => ({
  id: item.id,
  name: item.name,
  price: Number(item.price ?? 0),
  image: item.image ?? undefined,
  description: item.description ?? undefined,
  category: item.category_name ?? item.category ?? item.collection_slug ?? undefined,
  category_id: item.category_id ?? undefined,
  featured: item.featured ?? undefined,
  collection_slug: item.collection_slug ?? undefined,
  is_published: item.is_published ?? undefined,
  stock: item.stock ?? undefined,
  metadata: item.metadata ?? undefined,
  created_at: item.created_at ?? undefined,
  updated_at: item.updated_at ?? undefined,
});

export async function fetchProductsByCollection(collectionSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('collection_slug', collectionSlug)
    .eq('is_published', true)
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('is_published', true)
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function fetchAllProductsAdmin(): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProduct(data) : null;
}

export interface SaveProductPayload {
  name: string;
  price: number;
  image?: string;
  description?: string;
  category_id?: string;
  category_name?: string;
  collection_slug?: string;
  featured?: boolean;
  is_published?: boolean;
  stock?: number;
  metadata?: Record<string, unknown>;
}

export async function createProduct(payload: SaveProductPayload): Promise<Product> {
  const insertPayload = {
    ...payload,
    price: Number(payload.price ?? 0),
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(insertPayload)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProduct(data);
}

export async function updateProduct(id: string, payload: SaveProductPayload): Promise<Product> {
  const updatePayload = {
    ...payload,
    price: Number(payload.price ?? 0),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const uniqueId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  const filePath = `products/${uniqueId}.${fileExt ?? 'jpg'}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      upsert: true,
      cacheControl: '3600',
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return publicUrl;
}
