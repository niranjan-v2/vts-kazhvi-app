// app/info.tsx
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '../components/ui/Button';

export default function InfoScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/images/valluvan-logo-banner.png')}
                style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.title}>வள்ளுவன் தமிழ் பள்ளி</Text>
            <Text style={styles.subtitle}>Valluvan Tamil School, Western Australia</Text>

            {/* Dummy text */}
            <Text style={styles.text}>
                Valluvan Tamil School (VTS) is a non-profit, non-religious independent organization established in 2020 to promote Tamil language, literature, arts, and culture within Western Australia. It was started as an initiative to teach Tamil language to our younger generations from age four and above.
            </Text>

            <Text style={[styles.text, { marginTop: 12 }]}>
                A team of volunteers with varying operational and academic experiences run the school. The school adheres to the syllabus based on the curriculum developed by NSW Federation of Tamil School Inc and the teaching materials are prepared by VTS teachers.
            </Text>

            {/* Buttons */}
            <View style={{ width: '100%', marginTop: 32, gap: 12 }}>
                {/* Login */}
                <Link href="/(auth)/login" asChild>
                    <Button label="Login" scheme="green" rounded />
                </Link>

                {/* Try Now */}
                <Link href="/trial" asChild>
                    <Button label="Try Now" scheme="dark" rounded />
                </Link>
            </View>
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
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#146a39',
        marginBottom: 24,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
        textAlign: 'left',
    },
});
