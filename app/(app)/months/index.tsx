// app/(app)/months/index.tsx
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

const AUD_SITHIRAI = require('../../../assets/audio/mathangal/sithirai.mp3');
const AUD_VAIKASI = require('../../../assets/audio/mathangal/vaigasi.mp3');
const AUD_AANI = require('../../../assets/audio/mathangal/aani.mp3');
const AUD_AADI = require('../../../assets/audio/mathangal/aadi.mp3');
const AUD_AAVANI = require('../../../assets/audio/mathangal/aavani.mp3');
const AUD_PURATTASI = require('../../../assets/audio/mathangal/purattasi.mp3');
const AUD_AIPPASI = require('../../../assets/audio/mathangal/aippasi.mp3');
const AUD_KAARTHIGAI = require('../../../assets/audio/mathangal/kaarthigai.mp3');
const AUD_MAARGAZHI = require('../../../assets/audio/mathangal/maargazhi.mp3');
const AUD_THAI = require('../../../assets/audio/mathangal/thai.mp3');
const AUD_MAASI = require('../../../assets/audio/mathangal/maasi.mp3');
const AUD_PANGUNI = require('../../../assets/audio/mathangal/panguni.mp3');

type MonthInfo = {
    key: string;
    labelTa: string;
    image?: any; // you can add later
    audio: any;
};

const MONTHS: MonthInfo[] = [
    { key: 'sithirai', labelTa: 'சித்திரை', audio: AUD_SITHIRAI },
    { key: 'vaigasi', labelTa: 'வைகாசி', audio: AUD_VAIKASI },
    { key: 'aani', labelTa: 'ஆனி', audio: AUD_AANI },
    { key: 'aadi', labelTa: 'ஆடி', audio: AUD_AADI },
    { key: 'aavani', labelTa: 'ஆவணி', audio: AUD_AAVANI },
    { key: 'purattasi', labelTa: 'புரட்டாசி', audio: AUD_PURATTASI },
    { key: 'aippasi', labelTa: 'ஐப்பசி', audio: AUD_AIPPASI },
    { key: 'kaarthigai', labelTa: 'கார்த்திகை', audio: AUD_KAARTHIGAI },
    { key: 'maargazhi', labelTa: 'மார்கழி', audio: AUD_MAARGAZHI },
    { key: 'thai', labelTa: 'தை', audio: AUD_THAI },
    { key: 'maasi', labelTa: 'மாசி', audio: AUD_MAASI },
    { key: 'panguni', labelTa: 'பங்குனி', audio: AUD_PANGUNI },
];

export default function MonthsScreen() {
    const [index, setIndex] = useState(0);
    const current = useMemo(() => MONTHS[index], [index]);

    // audio: play once per page/month
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

                // create + play
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
                // ignore audio errors
            }
        };

        playOnce();

        return () => {
            cancelled = true;
        };
    }, [current.key]);

    useEffect(() => {
        return () => {
            (async () => {
                if (soundRef.current) {
                    await soundRef.current.stopAsync().catch(() => {});
                    await soundRef.current.unloadAsync().catch(() => {});
                    soundRef.current = null;
                }
            })();
        };
    }, []);

    const handleNext = () => setIndex((p) => (p + 1) % MONTHS.length);
    const handlePrev = () => setIndex((p) => (p - 1 + MONTHS.length) % MONTHS.length);

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.container}>
                <View style={styles.card}>
                    {current.image ? (
                        <Image source={current.image} style={styles.monthImage} resizeMode="contain" />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>IMAGE</Text>
                        </View>
                    )}

                    <View style={styles.numberBubble}>
                        <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                </View>

                <View style={styles.pill}>
                    <Text style={styles.pillText}>{current.labelTa}</Text>
                </View>

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
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.08)' },
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },

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
    monthImage: { width: '92%', height: '92%' },

    imagePlaceholder: {
        width: '70%',
        aspectRatio: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.06)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: { fontSize: 14, fontWeight: '700', color: '#6b7280' },

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
    numberText: { fontSize: 18, fontWeight: '800', color: '#0ea5e9' },

    pill: {
        alignSelf: 'center',
        borderRadius: 999,
        backgroundColor: '#4867B9FF',
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 4,
        marginBottom: 24,
    },
    pillText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },

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
