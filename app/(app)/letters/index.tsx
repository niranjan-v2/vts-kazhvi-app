// app/(app)/letters/index.tsx
import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {Link} from 'expo-router';

const CARD_UYIR = require('../../../assets/images/eluthukkal-banner-1.png');
const CARD_MEI = require('../../../assets/images/eluthukkal-banner-2.png');
const CARD_UYIRMEI = require('../../../assets/images/eluthukkal-banner-3.png');
const CARD_AYUTH = require('../../../assets/images/eluthukkal-banner-4.png');

const MODULES_BG = require('../../../assets/images/modules_bg.png');

const ITEMS = [
    {key: 'uyir', label: 'உயிர் எழுத்துகள்', banner: CARD_UYIR},
    {key: 'mei', label: 'மெய் எழுத்துகள்', banner: CARD_MEI},
    {key: 'uyirmei', label: 'உயிர்மெய் எழுத்துகள்', banner: CARD_UYIRMEI},
    {key: 'ayudha', label: 'ஆய்த எழுத்து', banner: CARD_AYUTH},
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDE_PADDING = 16;   // matches your screen padding
const GUTTER = 12;         // space between the two items
const ITEM_WIDTH = (SCREEN_WIDTH - SIDE_PADDING * 2 - GUTTER) / 2; // 👈 exact half width


export default function LettersLanding() {
    return (
        <ImageBackground source={MODULES_BG} style={{ flex: 1 }} resizeMode="cover">
            <View style={styles.overlay} pointerEvents="none" />
            <View className="flex-1 p-4">
                <FlatList
                    data={ITEMS}
                    numColumns={2}
                    keyExtractor={(it) => it.key}
                    contentContainerStyle={{ paddingHorizontal: SIDE_PADDING, paddingTop: 8, paddingBottom: 16 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}   // two columns with a fixed gap
                    renderItem={({ item }) => (
                        <View style={{ width: ITEM_WIDTH, marginBottom: 16 }}>
                            {/* Image (clickable) */}
                            <Link
                                href={{ pathname: '/(app)/letters/[type]', params: { type: item.key } }}
                                asChild
                            >
                                <TouchableOpacity activeOpacity={0.85}>
                                    <Image
                                        source={item.banner}
                                        style={{
                                            width: ITEM_WIDTH,
                                            height: ITEM_WIDTH,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>
                            </Link>

                            {/* Label (also clickable) */}
                            <Link
                                href={{ pathname: '/(app)/letters/[type]', params: { type: item.key } }}
                                asChild
                            >
                                <TouchableOpacity activeOpacity={0.8}>
                                    <View className="bg-[#3F51B5] rounded-md px-2 py-3 self-center">
                                        <Text className="text-[#FFFFFF] text-[12.2px] font-bold text-center">
                                            {item.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    )}
                />



            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bg: {flex: 1},
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
});