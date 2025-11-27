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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDE_PADDING = 16;
const GUTTER = 12;
const COLS = 3;
const ITEM_WIDTH =
    (SCREEN_WIDTH - SIDE_PADDING * 2 - GUTTER * (COLS - 1)) / COLS;

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

const MEI_ITEMS = [
    { key: 'k',   glyph: 'க' },
    { key: 'ng',  glyph: 'ங' },
    { key: 'c',   glyph: 'ச்' },
    { key: 'ny',  glyph: 'ஞ' },
    { key: 't_d', glyph: 'ட' },
    { key: 'n_d', glyph: 'ண' },
    { key: 't',   glyph: 'த' },
    { key: 'n',   glyph: 'ந' },
    { key: 'p',   glyph: 'ப' },
    { key: 'm',   glyph: 'ம' },
    { key: 'y',   glyph: 'ய' },
    { key: 'r',   glyph: 'ர' },
    { key: 'l',   glyph: 'ல' },
    { key: 'v',   glyph: 'வ' },
    { key: 'zh',  glyph: 'ழ' },
    { key: 'l_d', glyph: 'ள' },
    { key: 'tr',  glyph: 'ற' },
    { key: 'n_s', glyph: 'ன' },
];

// Uyir letter icons
const UYIR_IMAGES: Record<string, any> = {
    a: require('../../../assets/images/uyir-eluthukal/a.png'),
    aa: require('../../../assets/images/uyir-eluthukal/aa.png'),
    i: require('../../../assets/images/uyir-eluthukal/i.png'),
    ii: require('../../../assets/images/uyir-eluthukal/ii.png'),
    u: require('../../../assets/images/uyir-eluthukal/u.png'),
    uu: require('../../../assets/images/uyir-eluthukal/uu.png'),
    e: require('../../../assets/images/uyir-eluthukal/e.png'),
    ee: require('../../../assets/images/uyir-eluthukal/ee.png'),
    ai: require('../../../assets/images/uyir-eluthukal/ai.png'),
    o: require('../../../assets/images/uyir-eluthukal/o.png'),
    oo: require('../../../assets/images/uyir-eluthukal/oo.png'),
    au: require('../../../assets/images/uyir-eluthukal/au.png'),
};

const MEI_IMAGES: Record<string, any> = {
    k:   require('../../../assets/images/mei-eluthukal/k.png'),
    ng:  require('../../../assets/images/mei-eluthukal/ng.png'),
    c:   require('../../../assets/images/mei-eluthukal/c.png'),
    ny:  require('../../../assets/images/mei-eluthukal/ny.png'),
    t_d: require('../../../assets/images/mei-eluthukal/t_d.png'),
    n_d: require('../../../assets/images/mei-eluthukal/n_d.png'),
    t:   require('../../../assets/images/mei-eluthukal/t.png'),
    n:   require('../../../assets/images/mei-eluthukal/n.png'),
    p:   require('../../../assets/images/mei-eluthukal/p.png'),
    m:   require('../../../assets/images/mei-eluthukal/m.png'),
    y:   require('../../../assets/images/mei-eluthukal/y.png'),
    r:   require('../../../assets/images/mei-eluthukal/r.png'),
    l:   require('../../../assets/images/mei-eluthukal/l.png'),
    v:   require('../../../assets/images/mei-eluthukal/v.png'),
    zh:  require('../../../assets/images/mei-eluthukal/zh.png'),
    l_d: require('../../../assets/images/mei-eluthukal/l_d.png'),
    tr:  require('../../../assets/images/mei-eluthukal/tr.png'),
    n_s: require('../../../assets/images/mei-eluthukal/n_s.png'),
};

function getItemsForType(type: string) {
    if (type === 'uyir') return UYIR_ITEMS;
    if (type === 'mei') return MEI_ITEMS;
    // TODO: later handle uyirmei/ayudha
    return [];
}

export default function LetterTypeScreen() {
    const { type } = useLocalSearchParams<{ type?: string }>();
    const router = useRouter();
    const safeType = (type ?? '').toString();

    const items = useMemo(() => getItemsForType(safeType), [safeType]);

    if (items.length === 0) {
        return (
            <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
                <View style={styles.overlay} pointerEvents="none" />
                <View style={styles.container}>
                    <Text style={styles.placeholder}>
                        இந்த பிரிவு தற்போது தயாராகவில்லை.
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />

            <View style={styles.container}>
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
                    renderItem={({ item }) => {
                        const imgSource =
                            safeType === 'uyir'
                                ? UYIR_IMAGES[item.key]
                                : safeType === 'mei'
                                    ? MEI_IMAGES[item.key]
                                    : undefined;

                        if (!imgSource) return null;

                        return (
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={{ width: ITEM_WIDTH }}
                                onPress={() => {
                                    if (safeType === 'uyir') {
                                        router.push({
                                            pathname: '/(app)/letters/uyir/[glyph]',
                                            params: { glyph: item.key },
                                        });
                                    } else if (safeType === 'mei') {
                                        router.push({
                                            pathname: '/(app)/letters/mei/[glyph]',
                                            params: { glyph: item.key },
                                        });
                                    }
                                }}
                            >
                                <Image
                                    source={imgSource}
                                    style={{
                                        width: ITEM_WIDTH,
                                        height: ITEM_WIDTH,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    }}
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
    placeholder: {
        marginTop: 32,
        fontSize: 14,
        color: '#9ca3af',
        paddingHorizontal: 16,
    },
});
