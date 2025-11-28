// app/trial/_layout.tsx
import { Stack } from 'expo-router';

export default function TrialLayout() {
    return (
        <Stack>
            {/* Root /trial → we usually redirect to /trial/modules, so no header needed */}
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />

            {/* Trial modules: this one SHOULD show a header */}
            <Stack.Screen
                name="modules"
                options={{
                    title: 'மொடியூல்கள் (Trial)',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTitleStyle: { fontWeight: '600' },
                }}
            />

            {/* Letters subtree has its OWN stack & header → hide outer header */}
            <Stack.Screen
                name="letters"
                options={{ headerShown: false }}
            />

            {/* Writing subtree also has its OWN stack & header → hide outer header */}
            <Stack.Screen
                name="writing"
                options={{ headerShown: false }}
            />

            {/* If you still use /trial/a-varisai directly */}
            <Stack.Screen
                name="a-varisai"
                options={{
                    title: 'அ வரிசை (Trial)',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}
