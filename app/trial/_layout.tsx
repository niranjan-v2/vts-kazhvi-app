// app/trial/_layout.tsx
import { Stack } from 'expo-router';

export default function TrialLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: 'உயிர் எழுத்துகள்',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#15803d' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
                headerShadowVisible: false,
            }}
        />
    );
}
