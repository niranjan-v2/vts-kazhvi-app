// lib/auth.ts
import { supabase } from './supabase';
import { UserProfile } from '../types';

// Week 2: we'll implement these with Supabase.
// Right now they're placeholders so imports won't break.

export async function signInWithEmailPassword(
    email: string,
    password: string
): Promise<{ user: UserProfile } | { error: string }> {
    // TODO Week 2:
    // 1. supabase.auth.signInWithPassword({ email, password })
    // 2. fetch the profile row (role, level, stars, etc.)
    // For now we just return an error to remind us to wire it.
    return { error: 'Not implemented yet' };
}

export async function signOutRemote(): Promise<void> {
    // TODO Week 2:
    // await supabase.auth.signOut();
}
