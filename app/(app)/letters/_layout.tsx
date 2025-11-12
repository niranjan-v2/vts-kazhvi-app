import { Stack } from 'expo-router';

export default function LettersLayout() {
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
            }}
        >
            <Stack.Screen name="index" options={{ href: '/letters' }} />
        </Stack>
    );
}
