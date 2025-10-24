// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// We'll populate these in Week 2.
// Expo picks up env vars that start with EXPO_PUBLIC_ at runtime.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

// NOTE: If these are empty, calling supabase.* will throw,
// but merely importing this file is fine. We'll wire real values next.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        // We'll likely want to persist session per device with SecureStore,
        // which we'll wire up in Week 2.
        persistSession: true,
        autoRefreshToken: true,
    },
});
