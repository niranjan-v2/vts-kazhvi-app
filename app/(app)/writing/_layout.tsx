// app/(app)/writing/_layout.tsx
import { Stack } from 'expo-router';

export default function WritingLayout() {
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
            }}
        />
    );
}
