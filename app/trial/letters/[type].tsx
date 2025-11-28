// app/(app)/letters/[type].tsx
import React, { useMemo, useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MODULES_BG = require('../../../assets/images/modules_bg.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDE_PADDING = 16;
const GUTTER = 12;
const COLS = 3;
const ITEM_WIDTH =
    (SCREEN_WIDTH - SIDE_PADDING * 2 - GUTTER * (COLS - 1)) / COLS;

// Letters that already have a proper varisai screen implemented in TRIAL
const TRIAL_FINISHED_UYIR: string[] = ['a', 'aa', 'i', 'ii'];
const TRIAL_FINISHED_MEI: string[] = ['k', 'ng', 'c', 'ny', 't_d'];

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

    // 'empty' = no items for type; 'locked' = unfinished varisai
    const [loginModalMode, setLoginModalMode] = useState<'empty' | 'locked' | null>(null);

    // If there are no items (unknown type), show login modal instead of empty message
    useEffect(() => {
        if (items.length === 0) {
            setLoginModalMode('empty');
        }
    }, [items.length]);

    const showLoginModal = loginModalMode !== null;

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
                                        const hasVarisai = TRIAL_FINISHED_UYIR.includes(item.key);

                                        if (!hasVarisai) {
                                            setLoginModalMode('locked');
                                            return;
                                        }

                                        router.push({
                                            pathname: '/trial/letters/uyir/[glyph]',
                                            params: { glyph: item.key },
                                        });
                                    } else if (safeType === 'mei') {
                                        const hasVarisai = TRIAL_FINISHED_MEI.includes(item.key);

                                        if (!hasVarisai) {
                                            setLoginModalMode('locked');
                                            return;
                                        }

                                        router.push({
                                            pathname: '/trial/letters/mei/[glyph]',
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

            {/* Login-required modal (replaces Alert) */}
            {showLoginModal && (
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Login required</Text>
                        <Text style={styles.modalMessage}>
                            Access is limited in the trial version. Log in to get full access.
                        </Text>

                        <View style={styles.modalButtonsRow}>
                            <Pressable
                                style={[styles.modalButton, styles.modalCancelButton]}
                                onPress={() => {
                                    if (loginModalMode === 'empty') {
                                        // if there are no items for this type, leave the screen
                                        setLoginModalMode(null);
                                        router.back();
                                    } else {
                                        // locked letter: just close
                                        setLoginModalMode(null);
                                    }
                                }}
                            >
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.modalButton, styles.modalLoginButton]}
                                onPress={() => {
                                    setLoginModalMode(null);
                                    router.push('/(auth)/login');
                                }}
                            >
                                <Text style={styles.modalLoginText}>Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
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

    // modal styles
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    modalCard: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 18,
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: '#ffffff',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 16,
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    modalButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
    },
    modalCancelButton: {
        borderColor: '#d1d5db',
        backgroundColor: '#ffffff',
    },
    modalLoginButton: {
        borderColor: '#16a34a',
        backgroundColor: '#16a34a',
    },
    modalCancelText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    modalLoginText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
    },
});
