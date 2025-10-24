// app/(app)/_layout.tsx
import { Tabs } from 'expo-router';
import { useSessionStore } from '../../store/session';
import { Redirect } from 'expo-router';
import { Text } from 'react-native';

// Simple wrapper to block access if not logged in
function ProtectedTabs({ children }: { children: React.ReactNode }) {
    const user = useSessionStore((s) => s.user);

    if (!user) {
        // Not logged in? Go to login.
        return <Redirect href="/(auth)/login" />;
    }

    return <>{children}</>;
}

export default function AppTabsLayout() {
    return (
        <ProtectedTabs>
            <Tabs
                screenOptions={{
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTitleStyle: { fontWeight: '600' },
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#9ca3af',
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderTopColor: '#e5e7eb',
                    },
                }}
            >
                <Tabs.Screen
                    name="modules"
                    options={{
                        title: 'மொடியூல்கள்',
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12 }}>மொடியூல்கள்</Text>
                        ),
                        headerTitle: 'மொடியூல்கள்',
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'சுயவிவரம்',
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12 }}>சுயவிவரம்</Text>
                        ),
                        headerTitle: 'சுயவிவரம்',
                    }}
                />
            </Tabs>
        </ProtectedTabs>
    );
}
