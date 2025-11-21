// app/info.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/ui/Button';

export default function InfoScreen() {
    // Animation values
    const logoAnim = useRef(new Animated.Value(0)).current;
    const buttonsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate logo first
        Animated.timing(logoAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();

        // Animate buttons next
        Animated.timing(buttonsAnim, {
            toValue: 1,
            duration: 600,
            delay: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, []);

    const logoStyle = {
        opacity: logoAnim,
        transform: [
            {
                translateY: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0], // slide up
                }),
            },
            {
                scale: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1], // slight zoom
                }),
            },
        ],
    };

    const buttonsStyle = {
        opacity: buttonsAnim,
        transform: [
            {
                translateY: buttonsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0], // slide up
                }),
            },
        ],
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Animated Logo */}
            <Animated.View style={[logoStyle, { width: '100%', alignItems: 'center' }]}>
                <Image
                    source={require('../assets/images/valluvan-logo-banner.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>வள்ளுவன் தமிழ் பள்ளி</Text>
                <Text style={styles.subtitle}>
                    Valluvan Tamil School, Western Australia
                </Text>
            </Animated.View>


            {/* Information Text */}
            <Text style={styles.text}>
                Valluvan Tamil School (VTS) is a non-profit, non-religious independent
                organisation established in 2020 to promote Tamil language, literature,
                arts, and culture within Western Australia. It was started as an
                initiative to teach Tamil language to our younger generations from age
                four and above.
            </Text>

            <Text style={[styles.text, { marginTop: 12 }]}>
                A team of volunteers with varying operational and academic experiences
                run the school. The school adheres to the syllabus based on the
                curriculum developed by NSW Federation of Tamil School Inc and the
                teaching materials are prepared by VTS teachers.
            </Text>

            {/* Animated Buttons */}
            <Animated.View style={[buttonsStyle, { width: '100%', marginTop: 32, gap: 12 }]}>
                <Link href="/(auth)/login" asChild>
                    <Button label="Login" scheme="green" rounded />
                </Link>

                <Link href="/trial" asChild>
                    <Button label="Try Now" scheme="dark" rounded />
                </Link>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 60,
        alignItems: 'center',
    },
    logo: {
        width: 260,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0d4c2e',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#146a39',
        marginBottom: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
        textAlign: 'left',
    },
});
