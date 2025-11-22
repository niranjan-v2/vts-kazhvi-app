// app/(app)/writing/_layout.tsx
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Pressable} from "react-native";

export default function WritingLayout() {

    const router  = useRouter();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: 'எழுதி பழகு',
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
            }}
        />
    );
}
