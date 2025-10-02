import { supabase } from '../../config/supabase';
import { Category } from '../../types/types';

const TABLE_NAME = 'categories';

type RawCategory = Record<string, any>;

const mapCategory = (item: RawCategory): Category => ({
    id: item.id,
    name: item.name,
    slug: item.slug ?? undefined,
    created_at: item.created_at ?? undefined,
    updated_at: item.updated_at ?? undefined,
});

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
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({ name })
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
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ name })
        .eq('id', id)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapCategory(data);
}
