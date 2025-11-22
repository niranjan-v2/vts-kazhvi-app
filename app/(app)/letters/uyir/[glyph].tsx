import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const MODULES_BG = require('../../../../assets/images/modules_bg.png');

// Data for அ வரிசை
type AWord = {
    key: string;
    ta: string; // Tamil word
    audio: any; // require(...) for mp3
};

const A_VARISAI: AWord[] = [
    {
        key: 'amma',
        ta: 'அம்மா',
        audio: require('../../../../assets/audio/a-varisai/amma.mp3'),
    },
    {
        key: 'arai',
        ta: 'அறை',
        audio: require('../../../../assets/audio/a-varisai/arai.mp3'),
    },
    {
        key: 'arasan',
        ta: 'அரசன்',
        audio: require('../../../../assets/audio/a-varisai/arasan.mp3'),
    },
    {
        key: 'aruvi',
        ta: 'அருவி',
        audio: require('../../../../assets/audio/a-varisai/aruvi.mp3'),
    },
];

// Later we can add other series, for now only அ வரிசை
function getWordSetForGlyph(glyphKey: string): AWord[] {
    if (glyphKey === 'a') return A_VARISAI;
    return [];
}

export default function UyirWordScreen() {
    const { glyph } = useLocalSearchParams<{ glyph?: string }>();
    const glyphKey = (glyph ?? '').toString();

    const words = useMemo(() => getWordSetForGlyph(glyphKey), [glyphKey]);
    const [index, setIndex] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const current = words[index];

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
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [current]);

    if (!current || words.length === 0) {
        return (
            <View style={[styles.bg, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 16, color: '#111827' }}>
                    இந்த எழுத்துக்கான தரவுகள் இன்னும் சேர்க்கப்படவில்லை.
                </Text>
            </View>
        );
    }

    const handleNext = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev + 1) % words.length); // loop back to first
    };

    const handlePrev = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev - 1 + words.length) % words.length); // loop backwards
    };

    const showPrev = hasMoved && words.length > 1;

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />
            <View style={styles.container}>
                {/* Big card area (placeholder for picture like "அம்மா") */}
                <View style={styles.card}>
                    {/* Bubble with அ in top-right corner */}
                    <View style={styles.letterBubble}>
                        <Text style={styles.letterBubbleText}>அ</Text>
                    </View>

                    {/* Placeholder illustration area – you can replace with an Image later */}
                    <View style={styles.illustration}>
                        <Text style={styles.illustrationText}>{current.ta}</Text>
                    </View>
                </View>

                {/* Big green word pill */}
                <View style={styles.wordPill}>
                    <Text style={styles.wordPillText}>{current.ta}</Text>
                </View>

                {/* Bottom navigation arrows */}
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
                        <View style={{ width: 48 }} /> // spacer so next button stays right-aligned
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
    illustration: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 24,
        backgroundColor: '#b3e5fc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustrationText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0b4f6c',
    },
    wordPill: {
        marginTop: 16,
        borderRadius: 999,
        backgroundColor: '#22c55e', // green
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
