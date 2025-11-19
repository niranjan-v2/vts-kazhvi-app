// lib/auth.ts
import { supabase } from './supabase';
import { UserProfile } from '../types';

/**
 * Sign in with USERNAME + password.
 * We resolve username -> email via a secure RPC, then sign in with Supabase Auth.
 * Requires SQL:
 *   create or replace function public.resolve_username_email(p_username text)
 *   returns text language sql security definer set search_path=public as $$
 *     select email from public.profiles where username = p_username limit 1;
 *   $$;
 *   grant execute on function public.resolve_username_email(text) to anon, authenticated;
 */
export async function signInWithUsernamePassword(
    username: string,
    password: string
): Promise<{ user: UserProfile } | { error: string }> {
    // 0) Basic guard
    const uname = username?.trim().toLowerCase();
    if (!uname || !password) return { error: 'Missing username or password' };

    // 1) Resolve username -> email
    const { data: resolvedEmail, error: resolveErr } = await supabase.rpc(
        'resolve_username_email',
        { p_username: uname }
    );

    if (resolveErr || !resolvedEmail) {
        return { error: 'Invalid username or account not found' };
    }

    // 2) Auth with Supabase using email
    const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
            email: resolvedEmail,
            password,
        });

    if (signInError || !authData?.session || !authData?.user) {
        return { error: signInError?.message ?? 'Invalid login' };
    }

    const userId = authData.user.id;

    // 3) Fetch profile row for this user
    const { data: profileRows, error: profileError } = await supabase
        .from('profiles')
        .select('id,email,full_name,role,level,stars') // keep in sync with your schema
        .eq('id', userId)
        .limit(1);

    if (profileError || !profileRows || profileRows.length === 0) {
        return { error: 'Profile not found for this user' };
    }

    const row = profileRows[0];

    // 4) Normalize to our app's UserProfile shape
    const userProfile: UserProfile = {
        id: row.id,
        email: row.email,
        fullName: row.full_name ?? null,
        role: row.role,
        level: row.level ?? null,
        stars: row.stars ?? 0,
    };

    return { user: userProfile };
}

/**
 * (kept) Sign in with EMAIL + password using Supabase Auth,
 * then fetch that user's profile row from `profiles`.
 */
export async function signInWithEmailPassword(
    email: string,
    password: string
): Promise<{ user: UserProfile } | { error: string }> {
    // 1. Auth with Supabase
    const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !authData?.session || !authData?.user) {
        return { error: signInError?.message ?? 'Invalid login' };
    }

    const userId = authData.user.id;

    // 2. Fetch profile row for this user
    const { data: profileRows, error: profileError } = await supabase
        .from('profiles')
        .select('id,email,full_name,role,level,stars')
        .eq('id', userId)
        .limit(1);

    if (profileError || !profileRows || profileRows.length === 0) {
        return { error: 'Profile not found for this user' };
    }

    const row = profileRows[0];

    // 3. Normalize
    const userProfile: UserProfile = {
        id: row.id,
        email: row.email,
        fullName: row.full_name ?? null,
        role: row.role,
        level: row.level ?? null,
        stars: row.stars ?? 0,
    };

    return { user: userProfile };
}

/**
 * Sign out from Supabase.
 */
export async function signOutRemote(): Promise<void> {
    await supabase.auth.signOut();
}
