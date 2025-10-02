import { createClient } from '@supabase/supabase-js';

type RuntimeEnv = {
    REACT_APP_SUPABASE_URL?: string;
    REACT_APP_SUPABASE_ANON_KEY?: string;
};

const getRuntimeEnv = (): RuntimeEnv => {
    if (typeof window === 'undefined') {
        return {};
    }

    const fallbackSources: Array<RuntimeEnv | undefined> = [
        (window as any).__RUNTIME_CONFIG__,
        (window as any)._env_,
        (window as any).__ENV,
    ];

    return fallbackSources.reduce<RuntimeEnv>((acc, source) => {
        if (!source) {
            return acc;
        }
        return {
            REACT_APP_SUPABASE_URL: acc.REACT_APP_SUPABASE_URL ?? source.REACT_APP_SUPABASE_URL,
            REACT_APP_SUPABASE_ANON_KEY: acc.REACT_APP_SUPABASE_ANON_KEY ?? source.REACT_APP_SUPABASE_ANON_KEY,
        };
    }, {});
};

const runtimeEnv = getRuntimeEnv();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? runtimeEnv.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? runtimeEnv.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    const missingVars: string[] = [];
    if (!supabaseUrl) missingVars.push('REACT_APP_SUPABASE_URL');
    if (!supabaseAnonKey) missingVars.push('REACT_APP_SUPABASE_ANON_KEY');

    const message = `Missing Supabase environment variables: ${missingVars.join(', ')}. Add them to a .env file or your runtime config.`;

    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(message);
    }

    throw new Error(message);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

export type SupabaseClientType = typeof supabase;
