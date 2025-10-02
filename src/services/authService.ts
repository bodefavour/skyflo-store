import { supabase } from '../Supabase/supabaseClient';
import { UserProfile, UserRole } from '../types/types';
import { recordLastLogin, upsertProfile } from './usersService';

interface AdminSettings {
    setup_key: string;
}

const ADMIN_SETTINGS_TABLE = 'admin_settings';
const PROFILES_TABLE = 'profiles';

const mapProfile = (row: any): UserProfile => ({
    id: row.id,
    email: row.email,
    display_name: row.display_name ?? undefined,
    role: row.role ?? 'user',
    last_login: row.last_login ?? undefined,
    created_at: row.created_at ?? undefined,
    updated_at: row.updated_at ?? undefined,
});

export async function fetchAdminSettings(): Promise<AdminSettings | null> {
    const { data, error } = await supabase
        .from(ADMIN_SETTINGS_TABLE)
        .select('setup_key')
        .eq('id', 'setup')
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ?? null;
}

export async function hasAdminAccount(): Promise<boolean> {
    const { count, error } = await supabase
        .from(PROFILES_TABLE)
        .select('id', { count: 'exact', head: true })
        .eq('role', 'admin');

    if (error) {
        throw new Error(error.message);
    }

    return (count ?? 0) > 0;
}

async function ensureProfile(userId: string, email: string, fallbackRole: UserRole): Promise<UserProfile> {
    const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (data) {
        return mapProfile(data);
    }

    const displayName = email.split('@')[0];
    return upsertProfile({
        id: userId,
        email,
        display_name: displayName,
        role: fallbackRole,
    });
}

export async function signInAdmin(email: string, password: string): Promise<UserProfile> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;
    if (!user) {
        throw new Error('Unable to retrieve user after sign-in.');
    }

    const profile = await ensureProfile(user.id, email, 'admin');

    if (profile.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('This account does not have admin access.');
    }

    await recordLastLogin(user.id);
    return profile;
}

export interface SignUpAdminResult {
    profile?: UserProfile;
    needsVerification?: boolean;
}

export async function signUpAdmin(email: string, password: string, setupKey: string): Promise<SignUpAdminResult> {
    const settings = await fetchAdminSettings();

    if (!settings) {
        throw new Error('Admin setup is not configured yet.');
    }

    if (settings.setup_key !== setupKey) {
        throw new Error('Invalid setup key');
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { role: 'admin' },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;
    if (!user) {
        return { needsVerification: true };
    }

    const profile = await upsertProfile({
        id: user.id,
        email,
        display_name: email.split('@')[0],
        role: 'admin',
        last_login: new Date().toISOString(),
    });

    return { profile };
}

export async function signOutAdmin(): Promise<void> {
    await signOut();
}

export function onAuthStateChange(handler: (event: string) => void) {
    return supabase.auth.onAuthStateChange((event) => {
        handler(event);
    });
}

export async function getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw new Error(error.message);
    }
    return data.session;
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
        throw new Error(userError.message);
    }

    const user = userData.user;
    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapProfile(data) : null;
}

export interface SignUpUserParams {
    email: string;
    password: string;
    displayName: string;
}

export interface SignUpUserResult {
    profile?: UserProfile;
    needsVerification?: boolean;
}

export async function signUpUser(params: SignUpUserParams): Promise<SignUpUserResult> {
    const { email, password, displayName } = params;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'user',
                display_name: displayName,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;
    if (!user) {
        return { needsVerification: true };
    }

    const profile = await upsertProfile({
        id: user.id,
        email,
        display_name: displayName,
        role: 'user',
        last_login: new Date().toISOString(),
    });

    return { profile };
}

export async function signInUser(email: string, password: string): Promise<UserProfile> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;
    if (!user) {
        throw new Error('Unable to retrieve user after sign-in.');
    }

    const profile = await ensureProfile(user.id, email, 'user');
    await recordLastLogin(user.id);

    return profile;
}

export async function signOutUser(): Promise<void> {
    await signOut();
}

export async function requestPasswordReset(email: string): Promise<void> {
    const redirectTo = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/update-password`
        : undefined;

    const options = redirectTo ? { redirectTo } : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, options);

    if (error) {
        throw new Error(error.message);
    }
}

async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}
