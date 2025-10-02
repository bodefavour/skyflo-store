import { supabase } from '../Supabase/supabaseClient';
import { Category } from '../types/types';

const TABLE_NAME = 'categories';

type RawCategory = Record<string, any>;

const mapCategory = (item: RawCategory): Category => ({
    id: item.id,
    name: item.name,
    slug: item.slug ?? undefined,
    created_at: item.created_at ?? undefined,
    updated_at: item.updated_at ?? undefined,
});

const toSlug = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

export async function fetchCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map(mapCategory);
}

export async function createCategory(name: string): Promise<Category> {
    const payload = {
        name,
        slug: toSlug(name),
    };

    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(payload)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapCategory(data);
}

export async function deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateCategory(id: string, name: string): Promise<Category> {
    const payload = {
        name,
        slug: toSlug(name),
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapCategory(data);
}
