// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router'; // ⬅️ use global router instead of useRouter
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import { useSessionStore } from '../../store/session';

export default function LoginScreen() {
    const setUser = useSessionStore((s) => s.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn() {
        // mock login
        setUser({
            id: 'mock-user-id',
            email,
            fullName: 'Arun',
            role: 'student',
            level: 'Level-1',
            stars: 3,
        });

        // after login, jump into the "real app"
        router.replace('/modules');
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white px-6 justify-center"
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <View className="w-full max-w-md self-center">
                <Text className="text-3xl font-bold text-gray-900 mb-2">
                    Valluvan Tamil School
                </Text>
                <Text className="text-base text-gray-600 mb-8">
                    Sign in with the email and password given by your teacher.
                </Text>

                <View className="space-y-4">
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
                    label="Sign In"
                    onPress={handleSignIn}
                    className="mt-8"
                />

                <Text className="text-xs text-gray-400 mt-6 text-center">
                    By signing in you agree to school policies.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
