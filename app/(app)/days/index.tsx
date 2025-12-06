// app/(app)/days/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MODULES_BG = require('../../../assets/images/modules_bg.png');

type DayInfo = {
    key: string;
    labelTa: string;
};

const DAYS: DayInfo[] = [
    { key: 'sun', labelTa: 'ஞாயிறு' },
    { key: 'mon', labelTa: 'திங்கள்' },
    { key: 'tue', labelTa: 'செவ்வாய்' },
    { key: 'wed', labelTa: 'புதன்' },
    { key: 'thu', labelTa: 'வியாழன்' },
    { key: 'fri', labelTa: 'வெள்ளி' },
    { key: 'sat', labelTa: 'சனி' },
];

export default function DaysScreen() {
    const router = useRouter();
    const [index, setIndex] = useState(0);

    const currentDay = DAYS[index];

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % DAYS.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + DAYS.length) % DAYS.length);
    };

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Big card like reference UI */}
                <View style={styles.card}>
                    <View style={styles.cardInner}>
                        {/* Placeholder for the day image */}
                        <View style={styles.imagePlaceholder}>
                            {/* TODO: Replace this placeholder with actual image */}
                            <Text style={styles.imagePlaceholderText}>IMAGE</Text>
                        </View>

                        {/* Bubble with step/day number */}
                        <View style={styles.dayNumberBubble}>
                            <Text style={styles.dayNumberText}>{index + 1}</Text>
                        </View>
                    </View>
                </View>

                {/* Green pill with day name */}
                <View style={styles.dayPill}>
                    <Text style={styles.dayPillText}>{currentDay.labelTa}</Text>
                </View>

                {/* Bottom-right arrows */}
                <View style={styles.bottomRow}>
                    <Pressable
                        onPress={handlePrev}
                        style={styles.nextButton}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="arrow-back" size={26} color="#ffffff" />
                    </Pressable>

                    <Pressable
                        onPress={handleNext}
                        style={[styles.nextButton, { marginLeft: 16 }]}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="arrow-forward" size={26} color="#ffffff" />
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.08)',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerIconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
    },
    card: {
        flex: 1,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardInner: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 26,
        backgroundColor: '#46c9ff',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imagePlaceholder: {
        width: '70%',
        aspectRatio: 3 / 4,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
    },
    dayNumberBubble: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    dayNumberText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0ea5e9',
    },
    dayPill: {
        alignSelf: 'center',
        borderRadius: 999,
        backgroundColor: '#4867B9FF',
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 4,
        marginBottom: 24,
    },
    dayPillText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nextButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#f59e0b',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});
