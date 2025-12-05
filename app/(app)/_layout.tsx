// app/(app)/_layout.tsx
import { Tabs, Redirect } from 'expo-router';
import { Text, View } from 'react-native';
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
                    headerStyle: {
                        backgroundColor: '#f9fafb', // subtle gray instead of pure white
                        borderBottomColor: '#e5e7eb',
                        borderBottomWidth: 3,
                        height: 70 ,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#111827',
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontWeight: '700',
                        fontSize: 18,
                        color: '#111827',
                    },
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#9ca3af',
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderTopColor: '#e5e7eb',
                    },
                    tabBarIconStyle: { marginBottom: -4 },
                }}
            >
                <Tabs.Screen
                    name="modules"
                    options={{
                        headerTitle: () => (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        color: '#111827',
                                        textAlign: 'center',
                                    }}
                                >
                                    நிலை
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 9.5,
                                        color: '#6b7280',
                                        textAlign: 'center',
                                        marginTop: 2,
                                        marginLeft: 3
                                    }}
                                >
                                    (Level)
                                </Text>
                            </View>
                        ),
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12, textAlign: 'center' }}>
                                நிலை{'\n'}
                                <Text style={{ fontSize: 10 }}>(Level)</Text>
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Entypo
                                name="book"
                                size={22}
                                color={focused ? '#000000' : '#9ca3af'}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="letters"
                    options={{
                        href: null,        // hide from tab bar
                        headerShown: false, // no Tabs header, use stack header inside letters
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        headerTitle: () => (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                justifyContent: 'center',
                            }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        color: '#111827',
                                        textAlign: 'center',
                                    }}
                                >
                                    சுயவிவரம்
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: '#6b7280',
                                        textAlign: 'center',
                                        marginTop: 2,
                                        marginLeft: 3,
                                    }}
                                >
                                    (Profile)
                                </Text>
                            </View>
                        ),
                        tabBarLabel: ({ color }) => (
                            <Text style={{ color, fontSize: 12, textAlign: 'center' }}>
                                சுயவிவரம்{'\n'}
                                <Text style={{ fontSize: 10 }}>(Profile)</Text>
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome
                                name="user"
                                size={22}
                                color={focused ? '#000000' : '#9ca3af'}
                            />
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
                <Tabs.Screen
                    name="days"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </ProtectedTabs>
    );
}
