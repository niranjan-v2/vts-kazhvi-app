// app/(app)/letters/mei/[glyph].tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const MODULES_BG = require('../../../../assets/images/varisai_bg.png');

type MeiWord = {
    key: string;
    ta: string;
    audio: any;
    image: any;
};

// ---- k வரிசை (க்) ----
const K_VARISAI: MeiWord[] = [
    {
        key: 'makkal',
        ta: 'மக்கள்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/k-varisai/makkal.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/k-varisai/makkal.png'),
    },
    {
        key: 'padikkattu',
        ta: 'படிக்கட்டு',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/k-varisai/padikkattu.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/k-varisai/padikkattu.png'),
    },
    {
        key: 'pallikkoodam',
        ta: 'பள்ளிக்கூடம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/k-varisai/pallikkoodam.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/k-varisai/pallikkoodam.png'),
    },
    {
        key: 'verkkadalai',
        ta: 'வேர்க்கடலை',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/k-varisai/verkkadalai.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/k-varisai/verkkadalai.png'),
    },
];

// ---- c வரிசை (ச்) ----
const C_VARISAI: MeiWord[] = [
    {
        key: 'elumichai',
        ta: 'எலுமிச்சை',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/c-varisai/elumichai.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/c-varisai/elumichai.png'),
    },
    {
        key: 'macham',
        ta: 'மச்சம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/c-varisai/macham.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/c-varisai/macham.png'),
    },
    {
        key: 'neechal',
        ta: 'நீச்சல்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/c-varisai/neechal.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/c-varisai/neechal.png'),
    },
    {
        key: 'pachondhi',
        ta: 'பச்சோந்தி',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/c-varisai/pachondhi.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/c-varisai/pachondhi.png'),
    },
];

// ---- ng வரிசை (ங்) ----
const NG_VARISAI: MeiWord[] = [
    {
        key: 'sadhurangam',
        ta: 'சதுரங்கம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ng-varisai/sadhurangam.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ng-varisai/sadhurangam.png'),
    },
    {
        key: 'singam',
        ta: 'சிங்கம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ng-varisai/singam.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ng-varisai/singam.png'),
    },
    {
        key: 'thangam',
        ta: 'தங்கம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ng-varisai/thangam.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ng-varisai/thangam.png'),
    },
    {
        key: 'vengaayam',
        ta: 'வெங்காயம்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ng-varisai/vengaayam.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ng-varisai/vengaayam.png'),
    },
];

// ---- ny வரிசை (ஞ்) ----
const NY_VARISAI: MeiWord[] = [
    {
        key: 'anjalpetti',
        ta: 'அஞ்சல் பெட்டி',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ny-varisai/anjalpetti.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ny-varisai/anjalpetti.png'),
    },
    {
        key: 'inji',
        ta: 'இஞ்சி',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ny-varisai/inji.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ny-varisai/inji.png'),
    },
    {
        key: 'manjal',
        ta: 'மஞ்சள்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ny-varisai/manjal.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ny-varisai/manjal.png'),
    },
    {
        key: 'oonjal',
        ta: 'ஊஞ்சல்',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/ny-varisai/oonjal.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/ny-varisai/oonjal.png'),
    },
];

// ---- t_d வரிசை (ட்) ----
const TD_VARISAI: MeiWord[] = [
    {
        key: 'muttai',
        ta: 'முட்டை',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/t_d-varisai/muttai.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/t_d-varisai/muttai.png'),
    },
    {
        key: 'pattasu',
        ta: 'பட்டாசு',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/t_d-varisai/pattasu.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/t_d-varisai/pattasu.png'),
    },
    {
        key: 'poottu',
        ta: 'பூட்டு',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/t_d-varisai/poottu.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/t_d-varisai/poottu.png'),
    },
    {
        key: 'sattai',
        ta: 'சட்டை',
        audio: require('../../../../assets/audio/mei-eluthu-varisai/t_d-varisai/sattai.mp3'),
        image: require('../../../../assets/images/mei-eluthukal/varisai/t_d-varisai/sattai.png'),
    },
];

const MEI_SETS: Record<string, MeiWord[]> = {
    k: K_VARISAI,
    c: C_VARISAI,
    ng: NG_VARISAI,
    ny: NY_VARISAI,
    t_d: TD_VARISAI,
};

const MEI_GLYPHS: Record<string, string> = {
    k: 'க்',
    ng: 'ங்',
    c: 'ச்',
    ny: 'ஞ்',
    t_d: 'ட்',
};

function getMeiSet(glyphKey: string): MeiWord[] {
    return MEI_SETS[glyphKey] ?? [];
}

export default function MeiVarisaiScreen() {
    const { glyph } = useLocalSearchParams<{ glyph?: string }>();
    const glyphKey = (glyph ?? '').toString();

    const words = useMemo(() => getMeiSet(glyphKey), [glyphKey]);
    const [index, setIndex] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const current = words[index];

    // auto play audio on change
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

    if (!current || words.length === 0) {
        return (
            <View style={[styles.bg, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 16, color: '#111827' }}>
                    இந்த மெய் எழுத்துக்கான தரவுகள் இன்னும் சேர்க்கப்படவில்லை.
                </Text>
            </View>
        );
    }

    const handleNext = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev + 1) % words.length);
    };

    const handlePrev = () => {
        if (!hasMoved) setHasMoved(true);
        setIndex((prev) => (prev - 1 + words.length) % words.length);
    };

    const showPrev = hasMoved && words.length > 1;
    const bubbleGlyph = MEI_GLYPHS[glyphKey] ?? '';

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* Bubble with mei letter */}
                    <View style={styles.letterBubble}>
                        <Text style={styles.letterBubbleText}>{bubbleGlyph}</Text>
                    </View>

                    {/* Illustration */}
                    <View style={styles.illustrationWrapper}>
                        <Image source={current.image} style={styles.illustrationImage} />
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
        paddingBottom: 60,
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
        backgroundColor: '#4867B9FF',
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
