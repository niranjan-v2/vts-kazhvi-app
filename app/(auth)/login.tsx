// app/(auth)/login.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
} from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import { useSessionStore } from '../../store/session';
import { signInWithUsernamePassword } from '../../lib/auth';
import Feather from '@expo/vector-icons/Feather';

export default function LoginScreen() {
    const router = useRouter();

    const user = useSessionStore((s) => s.user);
    const setUser = useSessionStore((s) => s.setUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (user) {
        return <Redirect href="/(app)/modules" />;
    }

    async function handleSignIn() {
        if (!username || !password) {
            Alert.alert('Missing info', 'Please enter username and password.');
            return;
        }

        setIsLoading(true);

        const result = await signInWithUsernamePassword(username.trim(), password);

        if ('error' in result) {
            setIsLoading(false);
            Alert.alert('Login failed', result.error);
            return;
        }

        setUser(result.user);
        setIsLoading(false);
        router.replace('/(app)/modules');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Info icon – top right */}
            <View
                style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 60 : 30,
                    left: 24,
                    zIndex: 20,
                }}
            >
                <Pressable
                    hitSlop={10}
                    onPress={() => router.push('/info')}
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: '#e5e7eb', // gray-200
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Feather name="arrow-left" size={18} color="#111827" />
                </Pressable>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 24,
                        paddingVertical: 40,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-full max-w-md self-center items-center">
                        <Image
                            source={require('../../assets/images/valluvan-logo-banner.png')}
                            style={{
                                width: 500,
                                height: 200,
                                resizeMode: 'contain',
                                marginBottom: 16,
                            }}
                        />

                        <Text className="text-xl font-bold text-green-900 mb-4">
                            வள்ளுவன் தமிழ்ப்பள்ளி
                        </Text>
                        <Text className="text-2xl font-bold text-green-900">
                            Valluvan Tamil School
                        </Text>
                        <Text className="text-xl font-bold text-green-900 mb-2">
                            Western Australia
                        </Text>
                        <Text className="text-base text-gray-600 mb-8 text-center">
                            Sign in with your username and password given by school faculty.
                        </Text>

                        <View className="w-full space-y-4">
                            <TextField
                                label="Username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="firstname.lastname"
                            />

                            <TextField
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                secureTextEntry
                                className="mt-4"
                            />
                        </View>

                        <Button
                            label={isLoading ? 'Signing in...' : 'Sign In'}
                            onPress={handleSignIn}
                            disabled={isLoading}
                            className="mt-8"
                            scheme="dark"
                            rounded={false}
                        />

                        {isLoading ? (
                            <View className="mt-4 items-center">
                                <ActivityIndicator />
                            </View>
                        ) : null}

                        <Text className="text-xs text-gray-400 mt-6 text-center">
                            By signing in you agree to Valluvan Tamil School current policies.
                        </Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
