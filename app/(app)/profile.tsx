// app/(app)/profile.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useSessionStore } from '../../store/session';
import { Redirect } from 'expo-router';

export default function ProfileScreen() {
    const user = useSessionStore((s) => s.user);

    if (!user) {
        return <Redirect href="/(auth)/login" />;
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

            <Text className="text-xs text-gray-400 mt-8">
                ஆசிரியருக்கான அறிக்கை (reporting) வரும் கட்டங்களில் சேர்க்கப்படும்.
            </Text>
        </View>
    );
}
