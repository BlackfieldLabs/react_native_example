import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
//Top component
import WebViewComponent from './WebViewComponent';
//Bottom component
import SpeechRecognitionComponent from './SpeechRecognitionComponent';
//API Call
import VoiceAskAPIService from './VoiceAskAPIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const MainLayout = () => {
    const [speechResults, setSpeechResults] = useState<string[]>([]);

    // Handle results from SpeechRecognitionComponent
    const handleSpeechResults = (results: string[]) => {
        console.log('MainLayout - Speech Results:', results);
        setSpeechResults(results);

        // Trigger API call with the speech results
        if (results.length > 0) {
            makeApiCall('001', '<YOUR_TOKEN>', 'Julia', results[0], uuidv4());
        }
    };

    // Call the API using APIService
    const makeApiCall = async (
        clientId: string,
        token: string,
        userName: string,
        question: string,
        nonce: string
    ) => {
        try {
            const response = await VoiceAskAPIService.makeApiCall(clientId, token, userName, question, nonce);
            console.log('MainLayout - API Call Response:', response);

            // Handle the API response here if needed
        } catch (error) {
            console.error('MainLayout - API Call Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <WebViewComponent />
                <SpeechRecognitionComponent onResults={handleSpeechResults} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'white', // Match your app's background
    },
    container: {
        flex: 1, // Full screen
    },
});

export default MainLayout;
