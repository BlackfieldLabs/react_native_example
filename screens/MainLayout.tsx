import React, {
    useState,
    useEffect,
    useRef,
} from 'react';
import {
    View,
    SafeAreaView,
    Alert,
} from 'react-native';
// Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
//Components
import WebViewComponent from '../components/WebViewComponent';
import SpeechRecognitionComponent from '../components/SpeechRecognitionComponent';
//Styles
import sharedStyles from '../styles/sharedStyles';
//API Call
import APIService from '../services/APIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
//Storage
import SecureStorage from '../helpers/SecureStorage';

const MainLayout = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProp>();
    const speechRecognitionRef = useRef<any>(null);

    const handleSpeechResultsAndCallAI = (results: string[]) => {
        console.log(`[${new Date().toLocaleString()}] MainLayout - Speech Results: `, results);
        if (results.length > 0) {
            const uuidString: string = uuidv4();
            askWellNuoAIQuestion('001', 'anandk', results[0], uuidString);
        } else {
            console.warn(`[${new Date().toLocaleString()}] MainLayout - No results.`);
        }
    };

    // Call the API using APIService
    const askWellNuoAIQuestion = async (
        clientId: string,
        userName: string,
        question: string,
        nonce: string
    ) => {
        try {
            console.log(`[${new Date().toLocaleString()}] MainLayout - Calling askWellNuoAIQuestion...`);
            const response = await APIService.askWellNuoAIQuestion(clientId, userName, question, nonce, () => {
                console.warn(`[${new Date().toLocaleString()}] MainLayout - Token expired. Redirecting to login.`);
                navigation.navigate('Login');
            });

            if (response) {
                console.log(`[${new Date().toLocaleString()}] MainLayout - API Call Response:`, response);
                speechRecognitionRef.current?.toggleListening();
            } else {
                console.warn(`[${new Date().toLocaleString()}] MainLayout - No response received from API.`);
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] MainLayout - API Call Error:`, error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Warning',
                'Are you sure you want to Log-Out?',
                [
                    { text: 'Cancel', style: 'cancel', onPress: () => { } },
                    {
                        text: 'Log-Out',
                        style: 'destructive',
                        onPress: async () => {
                            SecureStorage.deleteToken();
                            SecureStorage.deleteData(SecureStorage.Keys.TokenTimestamp);
                            console.log(`[${new Date().toLocaleString()}] Log-Out`);
                            navigation.dispatch(e.data.action);
                        },
                    },
                ]
            );
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
            <View style={sharedStyles.containerStyle}>
                <WebViewComponent />
                <SpeechRecognitionComponent
                    onResults={handleSpeechResultsAndCallAI}
                    ref={speechRecognitionRef}
                    isListening={isListening}
                    setIsListening={setIsListening}
                />
            </View>
        </SafeAreaView>
    );
};

export default MainLayout;
