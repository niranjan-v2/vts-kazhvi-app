// app/trial/index.tsx
import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRouter } from "expo-router";

const MODULES_BG = require('../../assets/images/modules_bg.png');
const CARD_UYIR = require('../../assets/images/eluthukkal-banner-1.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDE_PADDING = 16;
const GUTTER = 12;
const COLS = 3;
const ITEM_WIDTH =
    (SCREEN_WIDTH - SIDE_PADDING * 2 - GUTTER * (COLS - 1)) / COLS;

// 12 Uyir letters (same as in /(app)/letters/[type].tsx)
const UYIR_ITEMS = [
    { key: 'a', glyph: 'அ' },
    { key: 'aa', glyph: 'ஆ' },
    { key: 'i', glyph: 'இ' },
    { key: 'ii', glyph: 'ஈ' },
    { key: 'u', glyph: 'உ' },
    { key: 'uu', glyph: 'ஊ' },
    { key: 'e', glyph: 'எ' },
    { key: 'ee', glyph: 'ஏ' },
    { key: 'ai', glyph: 'ஐ' },
    { key: 'o', glyph: 'ஒ' },
    { key: 'oo', glyph: 'ஓ' },
    { key: 'au', glyph: 'ஔ' },
];

export default function TrialUyirScreen() {
    const router  = useRouter();

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />

            <View style={styles.container}>
                <Text style={styles.heading}>
                    உயிர் எழுத்துகள் (Free Trial)
                </Text>

                <FlatList
                    data={UYIR_ITEMS}
                    numColumns={COLS}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{
                        paddingHorizontal: SIDE_PADDING,
                        paddingTop: 8,
                        paddingBottom: 16,
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={{ width: ITEM_WIDTH }}
                            onPress={() => {
                                if (index === 0) {
                                    // First letter (அ) → trial அ வரிசை screen
                                    router.push('/trial/a-varisai');
                                } else if (index >= 4) {
                                    // From 5th letter onwards → show login alert
                                    Alert.alert(
                                        'Login required',
                                        'மீதமுள்ள எழுத்துகளை பார்க்க உள்நுழைக.',
                                        [
                                            { text: 'ரத்து செய்', style: 'cancel' },
                                            {
                                                text: 'Login',
                                                onPress: () => {
                                                    router.push('/(auth)/login');
                                                },
                                            },
                                        ]
                                    );
                                } else {
                                    // Letters 2–4 in trial: currently do nothing (you can add more trial behaviour later)
                                }
                            }}
                        >
                            <Image
                                source={CARD_UYIR}
                                style={{
                                    width: ITEM_WIDTH,
                                    height: ITEM_WIDTH,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                    )}

                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    container: {
        flex: 1,
        paddingTop: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        paddingHorizontal: 16,
    },
});
