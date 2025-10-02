import { supabase } from '../../config/supabase';
import { UserProfile, UserRole } from '../../types/types';

const TABLE_NAME = 'profiles';

type RawProfile = Record<string, any>;

const mapProfile = (profile: RawProfile): UserProfile => ({
    id: profile.id,
    email: profile.email,
    display_name: profile.display_name ?? undefined,
    role: (profile.role ?? 'user') as UserRole,
    last_login: profile.last_login ?? undefined,
    created_at: profile.created_at ?? undefined,
    updated_at: profile.updated_at ?? undefined,
});

export async function fetchUserProfiles(): Promise<UserProfile[]> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('role', { ascending: true })
        .order('email', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map(mapProfile);
}

export async function updateUserRole(userId: string, role: UserRole): Promise<void> {
    const { error } = await supabase
        .from(TABLE_NAME)
        .update({
            role,
            updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function upsertProfile(profile: Partial<UserProfile> & { id: string; email: string }): Promise<UserProfile> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .upsert(profile)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapProfile(data);
}

export async function recordLastLogin(userId: string): Promise<void> {
    const { error } = await supabase
        .from(TABLE_NAME)
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);

    if (error) {
        throw new Error(error.message);
    }
}
