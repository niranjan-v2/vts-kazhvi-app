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
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#15803d' }, // green header
                headerTintColor: '#fff',
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
        >
            {/* Main letters landing page (4 big tiles) */}
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'தமிழ் எழுத்துக்கள்',
                }}
            />

            {/* Uyir / Mei / Uyirmei / Ayudha pages */}
            <Stack.Screen
                name="[type]"
                options={({ route }) => {
                    const type = (route.params as any)?.type;
                    let title = 'தமிழ் எழுத்துக்கள்';

                    if (type === 'uyir') {
                        title = 'உயிர் எழுத்துகள்';
                    } else if (type === 'mei') {
                        title = 'மெய் எழுத்துகள்';
                    } else if (type === 'uyirmei') {
                        title = 'உயிர்மெய் எழுத்துகள்';
                    } else if (type === 'ayudha') {
                        title = 'ஆயுத எழுத்து';
                    }

                    return { headerTitle: title };
                }}
            />
        </Stack>
    );
}
