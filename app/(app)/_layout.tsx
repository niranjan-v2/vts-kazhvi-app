// app/(app)/_layout.tsx
import { Tabs, Redirect } from 'expo-router';
import { Text } from 'react-native';
import { useSessionStore } from '../../store/session';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function ProtectedTabs({ children }: { children: React.ReactNode }) {
    const user = useSessionStore((s) => s.user);

    if (!user) {
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
                    tabBarIconStyle: { marginBottom: -4,},
                }}
            >
                <Tabs.Screen
                    name="modules"
                    options={{
                        title: 'மொடியூல்கள்',
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12, textAlign: 'center' }}>
                                மொடியூல்கள்{'\n'}
                                <Text style={{ fontSize: 10 }}>(Modules)</Text>
                            </Text>
                        ),
                        headerTitle: 'மொடியூல்கள்',
                        tabBarIcon: ({ color, focused }) => (
                            <Entypo
                                name="book"
                                size={22}
                                color={focused ? '#000000' : '#9ca3af'} // active/inactive colors
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="letters"
                    options={{
                        href: null,            // hide from tab bar
                        headerShown: false,    // hide Tabs header for this route
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'சுயவிவரம்',
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12, textAlign: 'center' }}>
                                சுயவிவரம்{'\n'}
                                <Text style={{ fontSize: 10 }}>(Profile)</Text>
                            </Text>
                        ),
                        headerTitle: 'சுயவிவரம்',
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome
                                name="user"
                                size={22}
                                color={focused ? '#000000' : '#9ca3af'} />
                        ),
                    }}
                />
                {/* Hidden route: writing practice */}
                <Tabs.Screen
                    name="writing"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </ProtectedTabs>
    );
}
