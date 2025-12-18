// app/(app)/days/index.tsx
import React, { useState, useEffect } from 'react';
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

type DayInfo = {
    key: string;
    labelTa: string;
    image: any;
    audio: any;
};

const DAYS: DayInfo[] = [
    {
        key: 'sun',
        labelTa: 'ஞாயிறு',
        image: require('../../../assets/images/kilamaigal/sunday.png'),
        audio: require('../../../assets/audio/kilamaigal/sunday.mp3'),
    },
    {
        key: 'mon',
        labelTa: 'திங்கள்',
        image: require('../../../assets/images/kilamaigal/monday.png'),
        audio: require('../../../assets/audio/kilamaigal/monday.mp3'),
    },
    {
        key: 'tue',
        labelTa: 'செவ்வாய்',
        image: require('../../../assets/images/kilamaigal/tuesday.png'),
        audio: require('../../../assets/audio/kilamaigal/tuesday.mp3'),
    },
    {
        key: 'wed',
        labelTa: 'புதன்',
        image: require('../../../assets/images/kilamaigal/wednesday.png'),
        audio: require('../../../assets/audio/kilamaigal/wednesday.mp3'),
    },
    {
        key: 'thu',
        labelTa: 'வியாழன்',
        image: require('../../../assets/images/kilamaigal/thursday.png'),
        audio: require('../../../assets/audio/kilamaigal/thursday.mp3'),
    },
    {
        key: 'fri',
        labelTa: 'வெள்ளி',
        image: require('../../../assets/images/kilamaigal/friday.png'),
        audio: require('../../../assets/audio/kilamaigal/friday.mp3'),
    },
    {
        key: 'sat',
        labelTa: 'சனி',
        image: require('../../../assets/images/kilamaigal/saturday.png'),
        audio: require('../../../assets/audio/kilamaigal/saturday.mp3'),
    },
];

export default function DaysScreen() {
    const [index, setIndex] = useState(0);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const currentDay = DAYS[index];

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % DAYS.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + DAYS.length) % DAYS.length);
    };

    // 🔊 Auto-play audio once whenever the page (day) changes
    useEffect(() => {
        let isCancelled = false;

        const loadAndPlay = async () => {
            try {
                if (sound) {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                }

                const { sound: newSound } = await Audio.Sound.createAsync(
                    currentDay.audio
                );

                if (isCancelled) {
                    await newSound.unloadAsync();
                    return;
                }

                setSound(newSound);
                await newSound.playAsync(); // plays once by default (no loop)
            } catch (e) {
                console.warn('Error playing audio', e);
            }
        };

        loadAndPlay();

        return () => {
            isCancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]); // depend only on index so each page plays once

    // Replay button / tap on card
    const replayAudio = async () => {
        try {
            if (!sound) return;
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            await sound.playAsync();
        } catch (e) {
            console.warn('Error replaying audio', e);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Big card – tap to replay audio */}
                <Pressable style={styles.card} onPress={replayAudio}>
                    <View style={styles.cardInner}>
                        {/* Square container so 1024x1024 images fit nicely */}
                        <View style={styles.imageWrapper}>
                            <Image
                                source={currentDay.image}
                                style={styles.dayImage}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Bubble with step/day number */}
                        <View style={styles.dayNumberBubble}>
                            <Text style={styles.dayNumberText}>{index + 1}</Text>
                        </View>
                    </View>
                </Pressable>

                {/* Green pill with day name */}
                <View style={styles.dayPill}>
                    <Text style={styles.dayPillText}>{currentDay.labelTa}</Text>
                </View>

                {/* Small speaker button */}
                <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <Pressable
                        onPress={replayAudio}
                        style={styles.audioButton}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="volume-high" size={24} color="#ffffff" />
                    </Pressable>
                </View>

                {/* Bottom arrows */}
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
        paddingBottom: 60,
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
        backgroundColor: 'rgba(250,172,4,0.8)',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    // NEW: square wrapper so 1024x1024 images don’t get zoomed awkwardly
    imageWrapper: {
        width: '70%',
        aspectRatio: 1, // square
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayImage: {
        width: '100%',
        height: '100%',
    },
    dayNumberBubble: {
        position: 'absolute',
        right: 9,
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
        marginBottom: 16,
    },
    dayPillText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    audioButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#169ea3',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
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
