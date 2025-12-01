// app/(app)/writing/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    PanResponder,
    Pressable,
} from 'react-native';
import { Svg, Polyline } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const MODULES_BG = require('../../../assets/images/modules_bg.png');

// 🔤 All traceable images (filenames you mentioned)
const TRACE_A = require('../../../assets/images/traceable/a.png');
const TRACE_AA = require('../../../assets/images/traceable/aa.png');
const TRACE_I = require('../../../assets/images/traceable/i.png');
const TRACE_II = require('../../../assets/images/traceable/ii.png');
const TRACE_U = require('../../../assets/images/traceable/u.png');
const TRACE_UU = require('../../../assets/images/traceable/uu.png');
const TRACE_E = require('../../../assets/images/traceable/e.png');
const TRACE_EE = require('../../../assets/images/traceable/ee.png');
const TRACE_O = require('../../../assets/images/traceable/o.png');
const TRACE_OO = require('../../../assets/images/traceable/oo.png');
const TRACE_AI = require('../../../assets/images/traceable/ai.png');
const TRACE_OU = require('../../../assets/images/traceable/ou.png');
const TRACE_AK = require('../../../assets/images/traceable/ak.png');

type Point = { x: number; y: number };
type DrawPath = { color: string; width: number; points: Point[] };

type LetterTrace = {
    key: string;
    glyph: string;
    traceImage: any;
};

// ✅ Now supports all uyir + āytam
const LETTERS: LetterTrace[] = [
    { key: 'a', glyph: 'அ', traceImage: TRACE_A },
    { key: 'aa', glyph: 'ஆ', traceImage: TRACE_AA },
    { key: 'i', glyph: 'இ', traceImage: TRACE_I },
    { key: 'ii', glyph: 'ஈ', traceImage: TRACE_II },
    { key: 'u', glyph: 'உ', traceImage: TRACE_U },
    { key: 'uu', glyph: 'ஊ', traceImage: TRACE_UU },
    { key: 'e', glyph: 'எ', traceImage: TRACE_E },
    { key: 'ee', glyph: 'ஏ', traceImage: TRACE_EE },
    { key: 'ai', glyph: 'ஐ', traceImage: TRACE_AI },
    { key: 'o', glyph: 'ஒ', traceImage: TRACE_O },
    { key: 'oo', glyph: 'ஓ', traceImage: TRACE_OO },
    { key: 'ou', glyph: 'ஔ', traceImage: TRACE_OU },
    { key: 'ak', glyph: 'ஃ', traceImage: TRACE_AK }, // āytam
];

export default function WritingPracticeScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paths, setPaths] = useState<DrawPath[]>([]);
    const [strokeColor, setStrokeColor] = useState<string>('#ef4444'); // red
    const [strokeWidth, setStrokeWidth] = useState<number>(6); // medium

    const currentLetter = LETTERS[currentIndex];

    // Clear drawing when switching letters
    useEffect(() => {
        setPaths([]);
    }, [currentIndex]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (evt) => {
                    const { locationX, locationY } = evt.nativeEvent;
                    const newPath: DrawPath = {
                        color: strokeColor,
                        width: strokeWidth,
                        points: [{ x: locationX, y: locationY }],
                    };
                    setPaths((prev) => [...prev, newPath]);
                },
                onPanResponderMove: (evt) => {
                    const { locationX, locationY } = evt.nativeEvent;
                    setPaths((prev) => {
                        if (!prev.length) return prev;
                        const updated = [...prev];
                        const last = updated[updated.length - 1];
                        updated[updated.length - 1] = {
                            ...last,
                            points: [...last.points, { x: locationX, y: locationY }],
                        };
                        return updated;
                    });
                },
                onPanResponderRelease: () => {},
                onPanResponderTerminate: () => {},
            }),
        [strokeColor, strokeWidth]
    );

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % LETTERS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + LETTERS.length) % LETTERS.length);
    };

    const handleClear = () => {
        setPaths([]);
    };

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />

            <View style={styles.container}>
                {/* Top thickness controls (3 levels) */}
                <View style={styles.thicknessBar}>
                    {[3, 6, 10].map((w) => (
                        <Pressable
                            key={w}
                            onPress={() => setStrokeWidth(w)}
                            style={[
                                styles.thicknessSegment,
                                w === strokeWidth && styles.thicknessActive,
                            ]}
                        >
                            <View
                                style={{
                                    height: w,
                                    borderRadius: 999,
                                    backgroundColor: '#16a34a',
                                    width: '65%',
                                }}
                            />
                        </Pressable>
                    ))}
                </View>

                {/* Color chips */}
                <View style={styles.colorRow}>
                    {['#ef4444', '#6366f1', '#22c55e'].map((c) => (
                        <Pressable
                            key={c}
                            onPress={() => setStrokeColor(c)}
                            style={[
                                styles.colorDot,
                                { backgroundColor: c },
                                strokeColor === c && styles.colorDotActive,
                            ]}
                        />
                    ))}
                </View>

                {/* Trace card */}
                <View style={styles.card}>
                    {/* Bubble with glyph */}
                    <View style={styles.letterBubble}>
                        <Text style={styles.letterBubbleText}>{currentLetter.glyph}</Text>
                    </View>

                    {/* Image + drawing overlay */}
                    <View style={styles.traceArea}>
                        <Image
                            source={currentLetter.traceImage}
                            style={styles.traceImage}
                        />

                        <View style={styles.drawingOverlay} {...panResponder.panHandlers}>
                            <Svg style={{ flex: 1 }}>
                                {paths.map((path, idx) =>
                                    path.points.length > 1 ? (
                                        <Polyline
                                            key={idx}
                                            points={path.points
                                                .map((p) => `${p.x},${p.y}`)
                                                .join(' ')}
                                            stroke={path.color}
                                            strokeWidth={path.width}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    ) : null
                                )}
                            </Svg>
                        </View>
                    </View>
                </View>

                {/* Letter label (bottom green pill) */}
                <View style={styles.wordPill}>
                    <Text style={styles.wordPillText}>{currentLetter.glyph}</Text>
                </View>

                {/* Bottom buttons: prev, clear, next */}
                <View style={styles.bottomRow}>
                    <Pressable
                        onPress={handlePrev}
                        style={styles.navButton}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </Pressable>

                    <Pressable
                        onPress={handleClear}
                        style={[styles.navButton, styles.clearButton]}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="trash" size={24} color="#ffffff" />
                    </Pressable>

                    <Pressable
                        onPress={handleNext}
                        style={styles.navButton}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#ffffff" />
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
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    thicknessBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 12,
    },
    thicknessSegment: {
        flex: 1,
        marginHorizontal: 4,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(248,250,252,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thicknessActive: {
        backgroundColor: 'rgba(34,197,94,0.25)',
    },
    colorRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 12,
    },
    colorDot: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'white',
        elevation: 2,
    },
    colorDotActive: {
        borderColor: '#f97316',
        borderWidth: 3,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.9)',
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
    traceArea: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#eff0f3',
    },
    traceImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    drawingOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    wordPill: {
        marginTop: 16,
        borderRadius: 999,
        backgroundColor: 'rgb(72,103,185)',
        paddingVertical: 10,
        paddingHorizontal: 32,
        alignSelf: 'center',
        elevation: 4,
    },
    wordPillText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    navButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#f59e0b',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    clearButton: {
        backgroundColor: '#c44040',
    },
});
