// app/trial/a-varisai.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const MODULES_BG = require('../../assets/images/modules_bg.png');

type AWord = {
    key: string;
    ta: string;
    audio: any;
    image: any;
};

const A_VARISAI: AWord[] = [
    {
        key: 'amma',
        ta: 'அம்மா',
        audio: require('../../assets/audio/a-varisai/amma.mp3'),
        image: require('../../assets/images/a-varisai/amma.png'),
    },
    {
        key: 'arai',
        ta: 'அறை',
        audio: require('../../assets/audio/a-varisai/arai.mp3'),
        image: require('../../assets/images/a-varisai/arai.png'),
    },
    {
        key: 'arasan',
        ta: 'அரசன்',
        audio: require('../../assets/audio/a-varisai/arasan.mp3'),
        image: require('../../assets/images/a-varisai/arasan.png'),
    },
    {
        key: 'aruvi',
        ta: 'அருவி',
        audio: require('../../assets/audio/a-varisai/aruvi.mp3'),
        image: require('../../assets/images/a-varisai/aruvi.png'),
    },
];

export default function TrialAVarisaiScreen() {
    const [index, setIndex] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const current = A_VARISAI[index];

    // Play audio whenever current word changes
    useEffect(() => {
        let sound: Audio.Sound | null = null;

        async function loadAndPlay() {
            if (!current) return;
            try {
                const { sound: s } = await Audio.Sound.createAsync(current.audio);
                sound = s;
                await sound.replayAsync();
            } catch (e) {
                console.warn('Failed to play audio', e);
            }
        }

        loadAndPlay();

        return () => {
            if (sound) sound.unloadAsync();
        };
    }, [current]);

    if (!current) {
        return (
            <View style={[styles.bg, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 16, color: '#111827' }}>
                    தரவுகள் இல்லை.
                </Text>
            </View>
        );
    }

    const handleNext = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev + 1) % A_VARISAI.length);
    };

    const handlePrev = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev - 1 + A_VARISAI.length) % A_VARISAI.length);
    };

    const showPrev = hasMoved && A_VARISAI.length > 1;

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />
            <View style={styles.container}>
                {/* Card with அ bubble and image */}
                <View style={styles.card}>
                    <View style={styles.letterBubble}>
                        <Text style={styles.letterBubbleText}>அ</Text>
                    </View>

                    <View style={styles.illustrationWrapper}>
                        <Image
                            source={current.image}
                            style={styles.illustrationImage}
                        />
                    </View>
                </View>

                {/* Word pill */}
                <View style={styles.wordPill}>
                    <Text style={styles.wordPillText}>{current.ta}</Text>
                </View>

                {/* Prev / Next */}
                <View style={styles.bottomRow}>
                    {showPrev ? (
                        <TouchableOpacity
                            onPress={handlePrev}
                            activeOpacity={0.8}
                            style={styles.navButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 48 }} />
                    )}

                    <TouchableOpacity
                        onPress={handleNext}
                        activeOpacity={0.8}
                        style={styles.navButton}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginTop: 12,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    letterBubble: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#22c1dc',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    letterBubbleText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#ffd966',
    },
    illustrationWrapper: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#b3e5fc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustrationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    wordPill: {
        marginTop: 16,
        borderRadius: 999,
        backgroundColor: '#22c55e',
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignSelf: 'center',
        elevation: 4,
    },
    wordPillText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    navButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f59e0b',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});
