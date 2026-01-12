import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Pressable,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const MODULES_BG = require('../../../assets/images/modules_bg.png');

// TODO: Replace the require(s) with your actual files when ready
// Example structure:
// assets/images/maathangal/chithirai.png
// assets/audio/maathangal/chithirai.mp3
type MonthInfo = {
    key: string;
    labelTa: string;
    image?: any;
    audio?: any;
};

const MONTHS: MonthInfo[] = [
    { key: 'chithirai', labelTa: 'சித்திரை' },
    { key: 'vaikasi', labelTa: 'வைகாசி' },
    { key: 'aani', labelTa: 'ஆனி' },
    { key: 'aadi', labelTa: 'ஆடி' },
    { key: 'aavani', labelTa: 'ஆவணி' },
    { key: 'purattasi', labelTa: 'புரட்டாசி' },
    { key: 'aippasi', labelTa: 'ஐப்பசி' },
    { key: 'karthigai', labelTa: 'கார்த்திகை' },
    { key: 'margazhi', labelTa: 'மார்கழி' },
    { key: 'thai', labelTa: 'தை' },
    { key: 'maasi', labelTa: 'மாசி' },
    { key: 'panguni', labelTa: 'பங்குனி' },
];

export default function MonthsScreen() {
    const [index, setIndex] = useState(0);
    const current = useMemo(() => MONTHS[index], [index]);

    // --- audio: play once per page
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        let cancelled = false;

        const playOnce = async () => {
            try {
                // stop/unload previous
                if (soundRef.current) {
                    await soundRef.current.stopAsync().catch(() => {});
                    await soundRef.current.unloadAsync().catch(() => {});
                    soundRef.current = null;
                }

                // if no audio wired yet, skip
                if (!current.audio) return;

                const { sound } = await Audio.Sound.createAsync(current.audio, {
                    shouldPlay: true,
                });

                if (cancelled) {
                    await sound.unloadAsync().catch(() => {});
                    return;
                }

                soundRef.current = sound;
                await sound.playAsync();
            } catch {
                // ignore audio errors for now
            }
        };

        playOnce();

        return () => {
            cancelled = true;
        };
    }, [current.key]); // play once when the month changes

    useEffect(() => {
        return () => {
            // cleanup on unmount
            (async () => {
                if (soundRef.current) {
                    await soundRef.current.stopAsync().catch(() => {});
                    await soundRef.current.unloadAsync().catch(() => {});
                    soundRef.current = null;
                }
            })();
        };
    }, []);

    const handleNext = () => setIndex((prev) => (prev + 1) % MONTHS.length);
    const handlePrev = () => setIndex((prev) => (prev - 1 + MONTHS.length) % MONTHS.length);

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Big card (image directly in this card — no inner card) */}
                <View style={styles.card}>
                    {current.image ? (
                        <Image source={current.image} style={styles.monthImage} resizeMode="contain" />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>IMAGE</Text>
                        </View>
                    )}

                    {/* bubble number */}
                    <View style={styles.numberBubble}>
                        <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                </View>

                {/* pill */}
                <View style={styles.pill}>
                    <Text style={styles.pillText}>{current.labelTa}</Text>
                </View>

                {/* prev/next buttons */}
                <View style={styles.bottomRow}>
                    <Pressable onPress={handlePrev} style={styles.navBtn}>
                        <Ionicons name="arrow-back" size={26} color="#fff" />
                    </Pressable>

                    <Pressable onPress={handleNext} style={styles.navBtn}>
                        <Ionicons name="arrow-forward" size={26} color="#fff" />
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

    card: {
        flex: 1,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },

    // ✅ 1024x1024 images won't zoom: contain + bounded size
    monthImage: {
        width: '92%',
        height: '92%',
    },

    imagePlaceholder: {
        width: '70%',
        aspectRatio: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.06)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6b7280',
    },

    numberBubble: {
        position: 'absolute',
        right: 14,
        top: 14,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    numberText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0ea5e9',
    },

    pill: {
        alignSelf: 'center',
        borderRadius: 999,
        backgroundColor: '#4867B9FF',
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 4,
        marginBottom: 24,
    },
    pillText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 26,
    },
    navBtn: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#f59e0b',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});
