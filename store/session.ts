// store/session.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { UserProfile } from '../types';

interface SessionState {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    signOutLocal: () => void;
}

const secureStorage = {
    getItem: async (name: string) => {
        return await SecureStore.getItemAsync(name);
    },
    setItem: async (name: string, value: string) => {
        await SecureStore.setItemAsync(name, value);
    },
    removeItem: async (name: string) => {
        await SecureStore.deleteItemAsync(name);
    },
};

// We name the storage key "session-store"
export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            signOutLocal: () => set({ user: null }),
        }),
        {
            name: 'session-store',
            storage: createJSONStorage(() => secureStorage),
        }
    )
);
