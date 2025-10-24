// app/(app)/modules.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSessionStore } from '../../store/session';
import { Redirect } from 'expo-router';

// Placeholder module data by level.
// In Week 4–6 this will come from quiz JSON per level (data/quizzes/level1.json etc.)
const SAMPLE_MODULES: Record<string, Array<{ id: string; titleTa: string }>> = {
    'Level-1': [
        { id: 'l1-m1', titleTa: 'உயிரெழுத்து வினா' },
        { id: 'l1-m2', titleTa: 'மெய்யெழுத்து வினா' },
    ],
    'Level-2': [
        { id: 'l2-m1', titleTa: 'இடைநிலை சொற்கள்' },
    ],
    'Level-3': [
        { id: 'l3-m1', titleTa: 'கடின சொற்கள்' },
    ],
};

export default function ModulesScreen() {
    const user = useSessionStore((s) => s.user);

    // Safety: shouldn't happen because of ProtectedTabs,
    // but we'll double check.
    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    const listForLevel =
        (user.level && SAMPLE_MODULES[user.level]) || [];

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-lg font-semibold mb-2 text-gray-900">
                {user.level ?? ''} - மொடியூல்கள்
            </Text>

            <FlatList
                data={listForLevel}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="p-4 mb-3 rounded-2xl border border-gray-200 bg-gray-50">
                        <Text className="text-base font-medium text-gray-900">
                            {item.titleTa}
                        </Text>
                        <Text className="text-xs text-gray-500 mt-1">
                            1 ⭐ கிடைக்கும்
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="text-sm text-gray-400 mt-8">
                        இந்த நிலைக்கு மொடியூல்கள் இன்னும் இல்லை.
                    </Text>
                }
            />
        </View>
    );
}
