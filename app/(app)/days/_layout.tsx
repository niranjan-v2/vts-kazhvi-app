// app/(app)/writing/_layout.tsx
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Pressable, StyleSheet} from "react-native";
import React from "react";

export default function WritingLayout() {

    const router  = useRouter();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: 'கிழமைகள்',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#15803d' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
                headerShadowVisible: false,
                headerLeft: () => (
                    <Pressable
                        onPress={() => router.back()}
                        style={{ paddingHorizontal: 12, paddingVertical: 4 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </Pressable>
                ),
                headerRight: () => (
                    <Pressable
                        onPress={() => {}}
                        style={styles.headerIconButton}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="information-circle-outline" size={22} color="#ffffff" />
                    </Pressable>
                ),
            }}
        />
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.08)',
    },
    headerIconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
