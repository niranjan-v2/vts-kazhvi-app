// app/trial/_layout.tsx
import { Stack } from 'expo-router';
import {Text, View} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

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
                    // Fancy header title: Tamil + small English
                    headerStyle: {
                        backgroundColor: '#e8e3e3', // subtle gray instead of pure white
                    },
                    headerTitleAlign: 'center',
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
