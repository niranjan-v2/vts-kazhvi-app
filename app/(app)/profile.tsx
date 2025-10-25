// app/(app)/profile.tsx
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useSessionStore } from '../../store/session';
import { Redirect, useRouter } from 'expo-router';
import Button from '../../components/ui/Button';
import { signOutRemote } from '../../lib/auth';

export default function ProfileScreen() {
    const router = useRouter();

    const user = useSessionStore((s) => s.user);
    const signOutLocal = useSessionStore((s) => s.signOutLocal);

    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    async function handleSignOut() {
        await signOutRemote();
        signOutLocal();
        Alert.alert('Signed out', 'You have been signed out.');
        router.replace('/(auth)/login');
    }

    return (
        <View className="flex-1 bg-white p-4">
            <View className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-4">
                <Text className="text-gray-500 text-xs mb-1">பெயர்</Text>
                <Text className="text-lg font-semibold text-gray-900">
                    {user.fullName ?? '—'}
                </Text>
            </View>

            <View className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-4">
                <Text className="text-gray-500 text-xs mb-1">நிலை</Text>
                <Text className="text-lg font-semibold text-gray-900">
                    {user.level ?? '—'}
                </Text>
            </View>

            <View className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-4">
                <Text className="text-gray-500 text-xs mb-1">⭐ நட்சத்திரங்கள்</Text>
                <Text className="text-lg font-semibold text-gray-900">
                    {user.stars} ⭐
                </Text>
            </View>

            <Button
                label="வெளியேறு"
                onPress={handleSignOut}
                className="mt-8 bg-red-600"
            />

            <Text className="text-xs text-gray-400 mt-8">
                ஆசிரியருக்கான அறிக்கை (reporting) வரும் கட்டங்களில் சேர்க்கப்படும்.
            </Text>
        </View>
    );
}
