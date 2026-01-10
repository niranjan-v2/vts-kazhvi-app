// app/(app)/letters/uyirmei/index.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    Pressable,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

const MODULES_BG = require('../../../../assets/images/modules_bg.png');

type BaseLetter = {
    key: string;
    glyph: string;
};

type DisplayItem = {
    key: string;
    glyph?: string;
    isSpacer?: boolean;
};

type UyirmeiEntry = {
    glyph: string;
    wordTa?: string;
    image?: any;
};

// --- BASE DATA ---

const MEI_LETTERS: BaseLetter[] = [
    { key: 'k', glyph: 'க்' },
    { key: 'ng', glyph: 'ங்' },
    { key: 'c', glyph: 'ச்' },
    { key: 'nj', glyph: 'ஞ்' },
    { key: 'tt', glyph: 'ட்' },
    { key: 'nn1', glyph: 'ண்' },
    { key: 't', glyph: 'த்' },
    { key: 'n', glyph: 'ந்' },
    { key: 'p', glyph: 'ப்' },
    { key: 'm', glyph: 'ம்' },
    { key: 'y', glyph: 'ய்' },
    { key: 'r', glyph: 'ர்' },
    { key: 'l', glyph: 'ல்' },
    { key: 'v', glyph: 'வ்' },
    { key: 'zh', glyph: 'ழ்' },
    { key: 'L', glyph: 'ள்' },
    { key: 'R', glyph: 'ற்' },
    { key: 'nn2', glyph: 'ன்' },
];

const UYIR_LETTERS: BaseLetter[] = [
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

// key: `${meiKey}_${uyirKey}`
const UYIRMEI_MAP: Record<string, UyirmeiEntry> = {
    'k_a': { glyph: 'க', wordTa: 'கல்' },
    'k_aa': { glyph: 'கா', wordTa: 'கால்' },
    'k_i': { glyph: 'கி', wordTa: 'கிளி' },
    'k_ii': { glyph: 'கீ', wordTa: 'கீரை' },
    'k_u': { glyph: 'கு', wordTa: 'குடம்' },
    'k_uu': { glyph: 'கூ', wordTa: 'கூடு' },
    'k_e': { glyph: 'கெ', wordTa: 'கெல்' },
    'k_ee': { glyph: 'கே', wordTa: 'கேள்' },
    'k_ai': { glyph: 'கை', wordTa: 'கை' },
    'k_o': { glyph: 'கொ', wordTa: 'கொல்' },
    'k_oo': { glyph: 'கோ', wordTa: 'கோல்' },
    'k_au': { glyph: 'கௌ', wordTa: 'கௌல்' },

    'ng_a':  { glyph: 'ங',  wordTa: 'ங' },
    'ng_aa': { glyph: 'ஙா', wordTa: 'ஙா' },
    'ng_i':  { glyph: 'ஙி', wordTa: 'ஙி' },
    'ng_ii': { glyph: 'ஙீ', wordTa: 'ஙீ' },
    'ng_u':  { glyph: 'ஙு', wordTa: 'ஙு' },
    'ng_uu': { glyph: 'ஙூ', wordTa: 'ஙூ' },
    'ng_e':  { glyph: 'ஙெ', wordTa: 'ஙெ' },
    'ng_ee': { glyph: 'ஙே', wordTa: 'ஙே' },
    'ng_ai': { glyph: 'ஙை', wordTa: 'ஙை' },
    'ng_o':  { glyph: 'ஙொ', wordTa: 'ஙொ' },
    'ng_oo': { glyph: 'ஙோ', wordTa: 'ஙோ' },
    'ng_au': { glyph: 'ஙௌ', wordTa: 'ஙௌ' },

    'c_a':  { glyph: 'ச',  wordTa: 'சரம்' },
    'c_aa': { glyph: 'சா', wordTa: 'சாலை' },
    'c_i':  { glyph: 'சி', wordTa: 'சிங்கம்' },
    'c_ii': { glyph: 'சீ', wordTa: 'சீடை' },
    'c_u':  { glyph: 'சு', wordTa: 'சுடு' },
    'c_uu': { glyph: 'சூ', wordTa: 'சூரியன்' },
    'c_e':  { glyph: 'செ', wordTa: 'செல்' },
    'c_ee': { glyph: 'சே', wordTa: 'சேர்' },
    'c_ai': { glyph: 'சை', wordTa: 'சைரம்' },
    'c_o':  { glyph: 'சொ', wordTa: 'சொல்' },
    'c_oo': { glyph: 'சோ', wordTa: 'சோறு' },
    'c_au': { glyph: 'சௌ', wordTa: 'சௌகரியம்' },

    'nj_a':  { glyph: 'ஞ',  wordTa: 'ஞ' },
    'nj_aa': { glyph: 'ஞா', wordTa: 'ஞா' },
    'nj_i':  { glyph: 'ஞி', wordTa: 'ஞி' },
    'nj_ii': { glyph: 'ஞீ', wordTa: 'ஞீ' },
    'nj_u':  { glyph: 'ஞு', wordTa: 'ஞு' },
    'nj_uu': { glyph: 'ஞூ', wordTa: 'ஞூ' },
    'nj_e':  { glyph: 'ஞெ', wordTa: 'ஞெ' },
    'nj_ee': { glyph: 'ஞே', wordTa: 'ஞே' },
    'nj_ai': { glyph: 'ஞை', wordTa: 'ஞை' },
    'nj_o':  { glyph: 'ஞொ', wordTa: 'ஞொ' },
    'nj_oo': { glyph: 'ஞோ', wordTa: 'ஞோ' },
    'nj_au': { glyph: 'ஞௌ', wordTa: 'ஞௌ' },

    'tt_a':  { glyph: 'ட',  wordTa: 'டமாரம்' },
    'tt_aa': { glyph: 'டா', wordTa: 'டாக்டர்' },
    'tt_i':  { glyph: 'டி', wordTa: 'டிக்கெட்' },
    'tt_ii': { glyph: 'டீ', wordTa: 'டீ' },
    'tt_u':  { glyph: 'டு', wordTa: 'டுடு' },
    'tt_uu': { glyph: 'டூ', wordTa: 'டூட்டி' },
    'tt_e':  { glyph: 'டெ', wordTa: 'டெஸ்ட்' },
    'tt_ee': { glyph: 'டே', wordTa: 'டேபிள்' },
    'tt_ai': { glyph: 'டை', wordTa: 'டைரி' },
    'tt_o':  { glyph: 'டொ', wordTa: 'டொலர்' },
    'tt_oo': { glyph: 'டோ', wordTa: 'டோசா' },
    'tt_au': { glyph: 'டௌ', wordTa: 'டௌலிங்' },

    'nn1_a':  { glyph: 'ண',  wordTa: 'ண' },
    'nn1_aa': { glyph: 'ணா', wordTa: 'ணா' },
    'nn1_i':  { glyph: 'ணி', wordTa: 'மணி' },
    'nn1_ii': { glyph: 'ணீ', wordTa: 'பாணீ' },
    'nn1_u':  { glyph: 'ணு', wordTa: 'அணு' },
    'nn1_uu': { glyph: 'ணூ', wordTa: 'கணூ' },
    'nn1_e':  { glyph: 'ணெ', wordTa: 'கணெ' },
    'nn1_ee': { glyph: 'ணே', wordTa: 'கணே' },
    'nn1_ai': { glyph: 'ணை', wordTa: 'அணை' },
    'nn1_o':  { glyph: 'ணொ', wordTa: 'கணொ' },
    'nn1_oo': { glyph: 'ணோ', wordTa: 'கணோ' },
    'nn1_au': { glyph: 'ணௌ', wordTa: 'கணௌ' },

    't_a':  { glyph: 'த',  wordTa: 'த' },
    't_aa': { glyph: 'தா', wordTa: 'தாய்' },
    't_i':  { glyph: 'தி', wordTa: 'திைவு' },
    't_ii': { glyph: 'தீ', wordTa: 'தீபம்' },
    't_u':  { glyph: 'து', wordTa: 'துணை' },
    't_uu': { glyph: 'தூ', wordTa: 'தூண்' },
    't_e':  { glyph: 'தெ', wordTa: 'தெரு' },
    't_ee': { glyph: 'தே', wordTa: 'தேவன்' },
    't_ai': { glyph: 'தை', wordTa: 'தைலம்' },
    't_o':  { glyph: 'தொ', wordTa: 'தொடை' },
    't_oo': { glyph: 'தோ', wordTa: 'தோணி' },
    't_au': { glyph: 'தௌ', wordTa: 'தௌரியம்' },

    'n_a':  { glyph: 'ந',  wordTa: 'ந' },
    'n_aa': { glyph: 'நா', wordTa: 'நாய்' },
    'n_i':  { glyph: 'நி', wordTa: 'நிலை' },
    'n_ii': { glyph: 'நீ', wordTa: 'நீர்' },
    'n_u':  { glyph: 'நு', wordTa: 'நுரை' },
    'n_uu': { glyph: 'நூ', wordTa: 'நூல்' },
    'n_e':  { glyph: 'நெ', wordTa: 'நெல்' },
    'n_ee': { glyph: 'நே', wordTa: 'நேரம்' },
    'n_ai': { glyph: 'நை', wordTa: 'நைவேத்யம்' },
    'n_o':  { glyph: 'நொ', wordTa: 'நொடி' },
    'n_oo': { glyph: 'நோ', wordTa: 'நோய்' },
    'n_au': { glyph: 'நௌ', wordTa: 'நௌகா' },

    'p_a':  { glyph: 'ப',  wordTa: 'பல்' },
    'p_aa': { glyph: 'பா', wordTa: 'பால்' },
    'p_i':  { glyph: 'பி', wordTa: 'பிள்ளை' },
    'p_ii': { glyph: 'பீ', wordTa: 'பீலி' },
    'p_u':  { glyph: 'பு', wordTa: 'புத்தகம்' },
    'p_uu': { glyph: 'பூ', wordTa: 'பூ' },
    'p_e':  { glyph: 'பெ', wordTa: 'பென்' },
    'p_ee': { glyph: 'பே', wordTa: 'பேனா' },
    'p_ai': { glyph: 'பை', wordTa: 'பை' },
    'p_o':  { glyph: 'பொ', wordTa: 'பொன்' },
    'p_oo': { glyph: 'போ', wordTa: 'போர்' },
    'p_au': { glyph: 'பௌ', wordTa: 'பௌர்ணமி' },

    'm_a':  { glyph: 'ம',  wordTa: 'மரம்' },
    'm_aa': { glyph: 'மா', wordTa: 'மாடு' },
    'm_i':  { glyph: 'மி', wordTa: 'மிளகு' },
    'm_ii': { glyph: 'மீ', wordTa: 'மீன்' },
    'm_u':  { glyph: 'மு', wordTa: 'முகம்' },
    'm_uu': { glyph: 'மூ', wordTa: 'மூடு' },
    'm_e':  { glyph: 'மெ', wordTa: 'மெழுகு' },
    'm_ee': { glyph: 'மே', wordTa: 'மேசை' },
    'm_ai': { glyph: 'மை', wordTa: 'மை' },
    'm_o':  { glyph: 'மொ', wordTa: 'மொழி' },
    'm_oo': { glyph: 'மோ', wordTa: 'மோர்' },
    'm_au': { glyph: 'மௌ', wordTa: 'மௌனம்' },

    'y_a':  { glyph: 'ய',  wordTa: 'யானை' },
    'y_aa': { glyph: 'யா', wordTa: 'யாறு' },
    'y_i':  { glyph: 'யி', wordTa: 'இயில்' },
    'y_ii': { glyph: 'யீ', wordTa: 'யீ' },
    'y_u':  { glyph: 'யு', wordTa: 'யுகம்' },
    'y_uu': { glyph: 'யூ', wordTa: 'யூகம்' },
    'y_e':  { glyph: 'யெ', wordTa: 'எயில்' },
    'y_ee': { glyph: 'யே', wordTa: 'யேனை' },
    'y_ai': { glyph: 'யை', wordTa: 'யை' },
    'y_o':  { glyph: 'யொ', wordTa: 'யோகா' },
    'y_oo': { glyph: 'யோ', wordTa: 'யோகம்' },
    'y_au': { glyph: 'யௌ', wordTa: 'யௌவனம்' },

    'r_a':  { glyph: 'ர',  wordTa: 'ரம்' },
    'r_aa': { glyph: 'ரா', wordTa: 'ராமன்' },
    'r_i':  { glyph: 'ரி', wordTa: 'ரிசி' },
    'r_ii': { glyph: 'ரீ', wordTa: 'ரீதி' },
    'r_u':  { glyph: 'ரு', wordTa: 'ருசி' },
    'r_uu': { glyph: 'ரூ', wordTa: 'ரூபாய்' },
    'r_e':  { glyph: 'ரெ', wordTa: 'ரெண்டு' },
    'r_ee': { glyph: 'ரே', wordTa: 'ரேகை' },
    'r_ai': { glyph: 'ரை', wordTa: 'ரை' },
    'r_o':  { glyph: 'ரொ', wordTa: 'ரோஜா' },
    'r_oo': { glyph: 'ரோ', wordTa: 'ரோடு' },
    'r_au': { glyph: 'ரௌ', wordTa: 'ரௌத்திரம்' },

    'l_a':  { glyph: 'ல',  wordTa: 'லட்டு' },
    'l_aa': { glyph: 'லா', wordTa: 'லாபம்' },
    'l_i':  { glyph: 'லி', wordTa: 'லிங்கம்' },
    'l_ii': { glyph: 'லீ', wordTa: 'லீலை' },
    'l_u':  { glyph: 'லு', wordTa: 'லுட்டு' },
    'l_uu': { glyph: 'லூ', wordTa: 'லூட்டி' },
    'l_e':  { glyph: 'லெ', wordTa: 'லெட்டர்' },
    'l_ee': { glyph: 'லே', wordTa: 'லேசு' },
    'l_ai': { glyph: 'லை', wordTa: 'லைன்' },
    'l_o':  { glyph: 'லொ', wordTa: 'லோகா' },
    'l_oo': { glyph: 'லோ', wordTa: 'லோகம்' },
    'l_au': { glyph: 'லௌ', wordTa: 'லௌகம்' },

    'v_a':  { glyph: 'வ',  wordTa: 'வனம்' },
    'v_aa': { glyph: 'வா', wordTa: 'வாழை' },
    'v_i':  { glyph: 'வி', wordTa: 'விளக்கு' },
    'v_ii': { glyph: 'வீ', wordTa: 'வீடு' },
    'v_u':  { glyph: 'வு', wordTa: 'வுடு' },
    'v_uu': { glyph: 'வூ', wordTa: 'வூன்' },
    'v_e':  { glyph: 'வெ', wordTa: 'வெள்ளை' },
    'v_ee': { glyph: 'வே', wordTa: 'வேல்' },
    'v_ai': { glyph: 'வை', wordTa: 'வைரம்' },
    'v_o':  { glyph: 'வொ', wordTa: 'வொலி' },
    'v_oo': { glyph: 'வோ', wordTa: 'வோடு' },
    'v_au': { glyph: 'வௌ', wordTa: 'வௌவால்' },

    'zh_a':  { glyph: 'ழ',  wordTa: 'ழகம்' },
    'zh_aa': { glyph: 'ழா', wordTa: 'ழாடு' },
    'zh_i':  { glyph: 'ழி', wordTa: 'அழிவு' },
    'zh_ii': { glyph: 'ழீ', wordTa: 'ழீ' },
    'zh_u':  { glyph: 'ழு', wordTa: 'அழுகு' },
    'zh_uu': { glyph: 'ழூ', wordTa: 'ழூ' },
    'zh_e':  { glyph: 'ழெ', wordTa: 'ழெ' },
    'zh_ee': { glyph: 'ழே', wordTa: 'ழே' },
    'zh_ai': { glyph: 'ழை', wordTa: 'அழை' },
    'zh_o':  { glyph: 'ழொ', wordTa: 'ழொ' },
    'zh_oo': { glyph: 'ழோ', wordTa: 'ழோர்' },
    'zh_au': { glyph: 'ழௌ', wordTa: 'ழௌ' },

    'L_a':  { glyph: 'ள',  wordTa: 'ளம்' },
    'L_aa': { glyph: 'ளா', wordTa: 'ளாவு' },
    'L_i':  { glyph: 'ளி', wordTa: 'ஒளி' },
    'L_ii': { glyph: 'ளீ', wordTa: 'ளீ' },
    'L_u':  { glyph: 'ளு', wordTa: 'களு' },
    'L_uu': { glyph: 'ளூ', wordTa: 'ளூ' },
    'L_e':  { glyph: 'ளெ', wordTa: 'ளெ' },
    'L_ee': { glyph: 'ளே', wordTa: 'களே' },
    'L_ai': { glyph: 'ளை', wordTa: 'களை' },
    'L_o':  { glyph: 'ளொ', wordTa: 'ளொ' },
    'L_oo': { glyph: 'ளோ', wordTa: 'ளோ' },
    'L_au': { glyph: 'ளௌ', wordTa: 'ளௌ' },

    'R_a':  { glyph: 'ற',  wordTa: 'றம்' },
    'R_aa': { glyph: 'றா', wordTa: 'றாசு' },
    'R_i':  { glyph: 'றி', wordTa: 'அறிவு' },
    'R_ii': { glyph: 'றீ', wordTa: 'றீ' },
    'R_u':  { glyph: 'று', wordTa: 'விறு' },
    'R_uu': { glyph: 'றூ', wordTa: 'றூ' },
    'R_e':  { glyph: 'றெ', wordTa: 'றெ' },
    'R_ee': { glyph: 'றே', wordTa: 'றே' },
    'R_ai': { glyph: 'றை', wordTa: 'அறை' },
    'R_o':  { glyph: 'றொ', wordTa: 'றொ' },
    'R_oo': { glyph: 'றோ', wordTa: 'றோ' },
    'R_au': { glyph: 'றௌ', wordTa: 'றௌ' },

    'nn2_a':  { glyph: 'ன',  wordTa: 'நனம்' },
    'nn2_aa': { glyph: 'னா', wordTa: 'நாடு' },
    'nn2_i':  { glyph: 'னி', wordTa: 'நிலை' },
    'nn2_ii': { glyph: 'னீ', wordTa: 'னீ' },
    'nn2_u':  { glyph: 'னு', wordTa: 'நுண்' },
    'nn2_uu': { glyph: 'னூ', wordTa: 'னூல்' },
    'nn2_e':  { glyph: 'னெ', wordTa: 'நெல்' },
    'nn2_ee': { glyph: 'னே', wordTa: 'நேர்' },
    'nn2_ai': { glyph: 'னை', wordTa: 'நனை' },
    'nn2_o':  { glyph: 'னொ', wordTa: 'னொ' },
    'nn2_oo': { glyph: 'னோ', wordTa: 'னோக்கு' },
    'nn2_au': { glyph: 'னௌ', wordTa: 'னௌ' },
};


const ROW_HEIGHT = 52; // one list row

// build display arrays with top/bottom spacers
const MEI_ITEMS: DisplayItem[] = [
    { key: 'mei_top', isSpacer: true },
    ...MEI_LETTERS.map((m) => ({ key: m.key, glyph: m.glyph })),
    { key: 'mei_bottom', isSpacer: true },
];

const UYIR_ITEMS: DisplayItem[] = [
    { key: 'uyir_top', isSpacer: true },
    ...UYIR_LETTERS.map((u) => ({ key: u.key, glyph: u.glyph })),
    { key: 'uyir_bottom', isSpacer: true },
];

export default function UyirmeiLettersScreen() {
    // index into *base* arrays (not including spacers)
    const [meiIndex, setMeiIndex] = useState(0); // first mei
    const [uyirIndex, setUyirIndex] = useState(0); // first uyir

    const meiRef = useRef<FlatList<DisplayItem>>(null);
    const uyirRef = useRef<FlatList<DisplayItem>>(null);

    const selectedMei = useMemo(() => MEI_LETTERS[meiIndex], [meiIndex]);
    const selectedUyir = useMemo(() => UYIR_LETTERS[uyirIndex], [uyirIndex]);

    const compoundKey = `${selectedMei.key}_${selectedUyir.key}`;
    const compound = UYIRMEI_MAP[compoundKey];

    const combinedGlyph =
        compound?.glyph ?? `${selectedMei.glyph}${selectedUyir.glyph}`;
    const wordTa = compound?.wordTa ?? '';

    // Helpers: map between base index and display index (display = base + 1)
    const baseToDisplay = (baseIndex: number) => baseIndex + 1;
    const displayToBase = (displayIndex: number) => displayIndex - 1;

    const scrollToDisplayIndex = (
        ref: React.RefObject<FlatList<DisplayItem>>,
        displayIndex: number,
    ) => {
        const offset = (displayIndex - 1) * ROW_HEIGHT;
        ref.current?.scrollToOffset({ offset, animated: true });
    };

    const handleScrollEnd = (
        e: NativeSyntheticEvent<NativeScrollEvent>,
        itemsLength: number,
        setBaseIndex: (idx: number) => void,
        listRef: React.RefObject<FlatList<DisplayItem>>,
    ) => {
        const offsetY = e.nativeEvent.contentOffset.y;

        // which display row is in the middle?
        let centerDisplayIndex = Math.round(offsetY / ROW_HEIGHT) + 1;

        // valid real rows are between 1 and itemsLength-2
        const min = 1;
        const max = itemsLength - 2;
        centerDisplayIndex = Math.max(min, Math.min(centerDisplayIndex, max));

        const baseIndex = displayToBase(centerDisplayIndex);
        setBaseIndex(baseIndex);
        scrollToDisplayIndex(listRef, centerDisplayIndex); // snap cleanly
    };

    const onPressRow = (
        item: DisplayItem,
        displayIndex: number,
        setBaseIndex: (idx: number) => void,
        listRef: React.RefObject<FlatList<DisplayItem>>,
    ) => {
        if (item.isSpacer) return;
        const baseIndex = displayToBase(displayIndex);
        setBaseIndex(baseIndex);
        scrollToDisplayIndex(listRef, displayIndex);
    };

    return (
        <ImageBackground source={MODULES_BG} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* TOP: composition row with 3-row wheels */}
                <View style={styles.composeRow}>
                    {/* MEI wheel */}
                    <FlatList
                        ref={meiRef}
                        data={MEI_ITEMS}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        style={styles.selectorList}
                        snapToInterval={ROW_HEIGHT}
                        decelerationRate="fast"
                        onMomentumScrollEnd={(e) =>
                            handleScrollEnd(e, MEI_ITEMS.length, setMeiIndex, meiRef)
                        }
                        getItemLayout={(_, index) => ({
                            length: ROW_HEIGHT,
                            offset: ROW_HEIGHT * index,
                            index,
                        })}
                        contentContainerStyle={styles.selectorContent}
                        initialScrollIndex={baseToDisplay(meiIndex)} // centre first real letter
                        renderItem={({ item, index }) => {
                            const isSpacer = item.isSpacer;
                            const isActive =
                                !isSpacer && meiIndex === displayToBase(index);

                            return (
                                <Pressable
                                    style={styles.rowContainer}
                                    onPress={() =>
                                        onPressRow(item, index, setMeiIndex, meiRef)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.smallTile,
                                            isActive && styles.smallTileActive,
                                            isSpacer && styles.smallTileSpacer,
                                        ]}
                                    >
                                        {!isSpacer && (
                                            <Text
                                                style={[
                                                    styles.tileText,
                                                    isActive && styles.tileTextActive,
                                                ]}
                                            >
                                                {item.glyph}
                                            </Text>
                                        )}
                                    </View>
                                </Pressable>
                            );
                        }}
                    />

                    {/* "+" */}
                    <View style={styles.operatorWrapper}>
                        <Text style={styles.operatorText}>+</Text>
                    </View>

                    {/* UYIR wheel */}
                    <FlatList
                        ref={uyirRef}
                        data={UYIR_ITEMS}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        style={styles.selectorList}
                        snapToInterval={ROW_HEIGHT}
                        decelerationRate="fast"
                        onMomentumScrollEnd={(e) =>
                            handleScrollEnd(e, UYIR_ITEMS.length, setUyirIndex, uyirRef)
                        }
                        getItemLayout={(_, index) => ({
                            length: ROW_HEIGHT,
                            offset: ROW_HEIGHT * index,
                            index,
                        })}
                        contentContainerStyle={styles.selectorContent}
                        initialScrollIndex={baseToDisplay(uyirIndex)}
                        renderItem={({ item, index }) => {
                            const isSpacer = item.isSpacer;
                            const isActive =
                                !isSpacer && uyirIndex === displayToBase(index);

                            return (
                                <Pressable
                                    style={styles.rowContainer}
                                    onPress={() =>
                                        onPressRow(item, index, setUyirIndex, uyirRef)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.smallTile,
                                            isActive && styles.smallTileActive,
                                            isSpacer && styles.smallTileSpacer,
                                        ]}
                                    >
                                        {!isSpacer && (
                                            <Text
                                                style={[
                                                    styles.tileText,
                                                    isActive && styles.tileTextActive,
                                                ]}
                                            >
                                                {item.glyph}
                                            </Text>
                                        )}
                                    </View>
                                </Pressable>
                            );
                        }}
                    />

                    {/* "=" */}
                    <View style={styles.operatorWrapper}>
                        <Text style={styles.operatorText}>=</Text>
                    </View>

                    {/* RESULT CARD */}
                    <View style={styles.resultCard}>
                        <Text style={styles.resultText}>{combinedGlyph}</Text>
                    </View>
                </View>

                {/* MIDDLE: picture card */}
                <View style={styles.imageCard}>
                    {compound?.image ? (
                        <Image
                            source={compound.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderIcon}>🖼️</Text>
                            <Text style={styles.imagePlaceholderText}>IMAGE HERE</Text>
                        </View>
                    )}
                </View>

                {/* BOTTOM: word pill */}
                <View style={styles.wordPill}>
                    <Text style={styles.wordPillText}>{wordTa || combinedGlyph}</Text>
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

    /* TOP WHEELS + RESULT */
    composeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        height: ROW_HEIGHT * 3, // exactly 3 visible rows
        width: '100%',
    },
    selectorList: {
        width: 48,
        height: ROW_HEIGHT * 3,
    },
    selectorContent: {
        paddingVertical: 0,
    },
    rowContainer: {
        height: ROW_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallTile: {
        width: '60%',
        height: 42,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    smallTileSpacer: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    smallTileActive: {
        backgroundColor: '#38bdf8',
    },
    tileText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
    },
    tileTextActive: {
        color: '#fef9c3',
    },
    operatorWrapper: {
        width: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operatorText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#ffffff',
    },
    resultCard: {
        flex: 1,
        minWidth: 150,
        height: ROW_HEIGHT * 3,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.96)',
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        paddingHorizontal: 10,  // extra breathing room
    },

    resultText: {
        fontSize: 44,
        fontWeight: '800',
        color: '#1d4ed8',
        includeFontPadding: false,
        textAlign: 'center',
    },

    /* IMAGE CARD */
    imageCard: {
        flex: 1,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.95)',
        marginTop: 12,
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    imagePlaceholder: {
        width: '75%',
        aspectRatio: 4 / 3,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderIcon: {
        fontSize: 26,
        marginBottom: 4,
    },
    imagePlaceholderText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '600',
    },

    /* WORD PILL */
    wordPill: {
        alignSelf: 'center',
        borderRadius: 999,
        backgroundColor: '#46a626',
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 4,
    },
    wordPillText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
});