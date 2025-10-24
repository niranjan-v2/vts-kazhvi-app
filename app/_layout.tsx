// app/_layout.tsx
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import './globals.css';

export default function RootLayout() {
    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Slot />
        </View>
    );
}
