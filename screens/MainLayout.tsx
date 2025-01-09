import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';
//Components
import WebViewComponent from '../components/WebViewComponent';
import SpeechRecognitionComponent from '../components/SpeechRecognitionComponent';
//Styles
import sharedStyles from '../styles/sharedStyles';
//API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

let globalToken: string | null = null;

const MainLayout = ({ route }: { route: any }) => {
    const [speechResults, setSpeechResults] = useState<string[]>([]);
    const [isListening, setIsListening] = useState<boolean>(false);
    globalToken = route.params?.token;
    console.log('global token', globalToken);
    // Add ref to store speech recognition methods
    const speechRecognitionRef = useRef<any>(null);

    // Handle results from SpeechRecognitionComponent
    const handleSpeechResults = (results: string[]) => {
        console.log('MainLayout - Speech Results:', results, ', token:', globalToken);
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
        } catch (error) {
            console.error('MainLayout - API Call Error:', error);
        }
    };

    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <View style={sharedStyles.containerStyle}>
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

export default MainLayout;
