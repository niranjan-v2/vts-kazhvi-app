// app/(app)/modules.tsx
import React from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import { useSessionStore } from '../../store/session';
import { Redirect, Link } from 'expo-router';                 // ⬅️ add Link
import Button from '../../components/ui/Button';               // ⬅️ use your existing Button

const MODULES_BG = require('../../assets/images/modules_bg.png');

// Placeholder module data…
const SAMPLE_MODULES: Record<string, Array<{ id: string; titleTa: string }>> = {
    'Level-1': [
        { id: 'l1-m1', titleTa: 'உயிரெழுத்து வினா' },
        { id: 'l1-m2', titleTa: 'மெய்யெழுத்து வினா' },
    ],
    'Level-2': [{ id: 'l2-m1', titleTa: 'இடைநிலை சொற்கள்' }],
    'Level-3': [{ id: 'l3-m1', titleTa: 'கடின சொற்கள்' }],
};

function isLevelOneOrAbove(level?: string | null) {
    if (!level) return false;
    // Treat any "Level-X" where X >= 1 as eligible
    const m = /Level-(\d+)/i.exec(level);
    return !!m && Number(m[1]) >= 1;
}

export default function ModulesScreen() {
    const user = useSessionStore((s) => s.user);

    if (!user) return <Redirect href="/(auth)/login" />;

    const listForLevel = (user.level && SAMPLE_MODULES[user.level]) || [];

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View className="flex-1 p-4">
                <Text className="text-lg font-semibold mb-3 text-gray-900">
                    {user.level ?? ''} - மொடியூல்கள்
                </Text>

                {isLevelOneOrAbove(user.level) ? (
                    <Link href="/(app)/letters" asChild>
                        <Button
                            label="தமிழ் எழுத்துக்கள்"
                            scheme="green"
                            className="mb-4"
                        />
                    </Link>
                ) : null}

                <FlatList
                    data={listForLevel}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="p-4 mb-3 rounded-2xl border border-gray-200 bg-gray-50/90">
                            <Text className="text-base font-medium text-gray-900">
                                {item.titleTa}
                            </Text>
                            <Text className="text-xs text-gray-500 mt-1">1 ⭐ கிடைக்கும்</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text className="text-sm text-gray-400 mt-8">
                            இந்த நிலைக்கு மொடியூல்கள் இன்னும் இல்லை.
                        </Text>
                    }
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
});
