import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
//Top component
import WebViewComponent from '../components/WebViewComponent';
//Bottom component
import SpeechRecognitionComponent from '../components/SpeechRecognitionComponent';
//API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

let globalToken: string | null = null;

const MainLayout = () => {
    const [speechResults, setSpeechResults] = useState<string[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [isListening, setIsListening] = useState<boolean>(false);
    // Add ref to store speech recognition methods
    const speechRecognitionRef = useRef<any>(null);

    // Call checkCredentials and save the token
    const initializeToken = async () => {//TODO: tamara - Delete the code for login from MainLayout
        try {
            console.log('MainLayout - Initializing token...');
            const uuidString = uuidv4();
            const response = await VoiceAskAPIService.checkCredentials('anandk', 'anandk_7', '001', uuidString);

            if (response?.access_token) {
                console.log('MainLayout - Token received:', response.access_token);
                setToken(response.access_token); // Save the token
                globalToken = response.access_token;
                console.log('MainLayout - Token is stored');
            } else {
                console.error('MainLayout - Token not found in the response:', response);
            }
        } catch (error) {
            console.error('MainLayout - Error during checkCredentials:', error);
        }
    };

    // Handle results from SpeechRecognitionComponent
    const handleSpeechResults = (results: string[]) => {
        console.log('MainLayout - Speech Results:', results);
        setSpeechResults(results);

        // Trigger API call with the speech results
        if (results.length > 0 && globalToken) {
            const uuidString: string = uuidv4()
            askWellNuoAIQuestion('001', globalToken, 'anandk', results[0], uuidString);
        } else if (!globalToken) {
            console.warn('MainLayout - Cannot call askWellNuoAIQuestion without a valid token.');
        }
    };

    // Call the API using APIService
    const askWellNuoAIQuestion = async (
        clientId: string,
        token: string,
        userName: string,
        question: string,
        nonce: string
    ) => {
        try {
            console.log('MainLayout - Calling askWellNuoAIQuestion...');
            const response = await VoiceAskAPIService.askWellNuoAIQuestion(clientId, token, userName, question, nonce);            
            console.log('MainLayout - API Call Response:', response);
            speechRecognitionRef.current?.toggleListening();
            
            // TODO: Handle the API response here
        } catch (error) {
            console.error('MainLayout - API Call Error:', error);
        }
    };

    // Initialize the token on component mount
    useEffect(() => {
        initializeToken();
    }, []);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <WebViewComponent />
                <SpeechRecognitionComponent 
                    onResults={handleSpeechResults}
                    ref={speechRecognitionRef}
                    isListening={isListening}
                    setIsListening={setIsListening}
                />
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
