// store/session.ts
import { create } from 'zustand';
import { UserProfile } from '../types';

interface SessionState {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    signOut: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    signOut: () => set({ user: null }),
}));
