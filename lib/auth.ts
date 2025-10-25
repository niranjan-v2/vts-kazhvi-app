// lib/auth.ts
import { supabase } from './supabase';
import { UserProfile } from '../types';

/**
 * Sign in with email & password using Supabase Auth,
 * then fetch that user's profile row from `profiles`.
 */
export async function signInWithEmailPassword(
    email: string,
    password: string
): Promise<{ user: UserProfile } | { error: string }> {
    // 1. Auth with Supabase
    const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (signInError || !authData.session || !authData.user) {
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

    // 3. Normalize to our app's UserProfile shape
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
 * Sign out from Supabase (server side) and clear local session later.
 */
export async function signOutRemote(): Promise<void> {
    await supabase.auth.signOut();
}
