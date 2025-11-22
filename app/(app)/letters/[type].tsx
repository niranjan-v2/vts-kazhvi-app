// app/(app)/letters/[type].tsx
import React, { useMemo } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MODULES_BG = require('../../../assets/images/modules_bg.png');
// For now, reuse the same banner image for each Uyir tile
const CARD_UYIR = require('../../../assets/images/eluthukkal-banner-1.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDE_PADDING = 16;
const GUTTER = 12;
const COLS = 3;
const ITEM_WIDTH =
    (SCREEN_WIDTH - SIDE_PADDING * 2 - GUTTER * (COLS - 1)) / COLS;
const router = useRouter();

// 12 Uyir letters
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

function getItemsForType(type: string) {
    if (type === 'uyir') return UYIR_ITEMS;
    // TODO: later handle mei/uyirmei/ayudha
    return [];
}

export default function LetterTypeScreen() {
    const { type } = useLocalSearchParams<{ type?: string }>();
    const safeType = (type ?? '').toString();

    const items = useMemo(() => getItemsForType(safeType), [safeType]);

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />

            <View style={styles.container}>
                {safeType === 'uyir' ? (
                    <FlatList
                        data={items}
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
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={{ width: ITEM_WIDTH }}
                                onPress={() => {
                                    if (safeType === 'uyir') {
                                        router.push({
                                            pathname: '/(app)/letters/uyir/[glyph]',
                                            params: { glyph: item.key },
                                        });
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
                ) : (
                    <Text style={styles.placeholder}>
                        இந்த பிரிவு தற்போது தயாராகவில்லை.
                    </Text>
                )}
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
    placeholder: {
        marginTop: 32,
        fontSize: 14,
        color: '#9ca3af',
        paddingHorizontal: 16,
    },
});
