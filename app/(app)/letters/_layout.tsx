// app/(app)/letters/_layout.tsx
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LettersLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: 'தமிழ் எழுத்துக்கள்',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#15803d' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
                headerShadowVisible: false,
                headerLeft: () => (
                    <Pressable
                        onPress={() => router.back()}
                        style={{ marginLeft: 12, padding: 4 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </Pressable>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ href: '/letters' }} />
        </Stack>
    );
}
