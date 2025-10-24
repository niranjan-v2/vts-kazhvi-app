// types/index.ts

// The profile row we expect from Supabase.
export interface UserProfile {
    id: string;
    email: string;
    fullName: string | null;
    role: 'student' | 'teacher' | 'admin';
    level: 'Level-1' | 'Level-2' | 'Level-3' | null;
    stars: number;
}

// Each quiz "module" belongs to a Level.
export interface ModuleInfo {
    id: string;
    level: 'Level-1' | 'Level-2' | 'Level-3';
    titleTa: string; // Tamil display title
    starReward: number; // always 1 for now
}

// Base shape for quiz questions (we'll extend Week 4+)
export interface BaseQuestion {
    id: string;
    promptTa: string;
    type: 'mcq' | 'match' | 'fill';
}
