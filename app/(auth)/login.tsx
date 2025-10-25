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
} from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import { useSessionStore } from '../../store/session';
import { signInWithEmailPassword } from '../../lib/auth';

export default function LoginScreen() {
    const router = useRouter();

    const user = useSessionStore((s) => s.user);
    const setUser = useSessionStore((s) => s.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (user) {
        return <Redirect href="/(app)/modules" />;
    }

    async function handleSignIn() {
        if (!email || !password) {
            Alert.alert('Missing info', 'Please enter email and password.');
            return;
        }

        setIsLoading(true);

        const result = await signInWithEmailPassword(email.trim(), password);

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
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                                width: 200,
                                height: 80,
                                resizeMode: 'contain',
                                marginBottom: 16,
                            }}
                        />

                        <Text className="text-2xl font-bold text-green-900 mb-2">
                            வள்ளுவன் தமிழ் பள்ளி
                        </Text>
                        <Text className="text-base text-gray-600 mb-8 text-center">
                            Sign in with your registered email address and password given by school faculty.
                        </Text>

                        <View className="w-full space-y-4">
                            <TextField
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="student@example.com"
                            />

                            <TextField
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                secureTextEntry
                            />
                        </View>

                        <Button
                            label={isLoading ? 'Signing in...' : 'Sign In'}
                            onPress={handleSignIn}
                            disabled={isLoading}
                            className="mt-8"
                        />

                        {isLoading ? (
                            <View className="mt-4 items-center">
                                <ActivityIndicator />
                            </View>
                        ) : null}

                        <Text className="text-xs text-gray-400 mt-6 text-center">
                            By signing in you agree to school policies.
                        </Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
