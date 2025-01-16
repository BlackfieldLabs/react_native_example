import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Voice, {
    SpeechResultsEvent,
    SpeechStartEvent,
    SpeechErrorEvent,
    SpeechVolumeChangeEvent,
    SpeechRecognizedEvent,
    SpeechEndEvent,
} from '@react-native-voice/voice';
//Styles
import sharedStyles from '../styles/sharedStyles';
//Localization
import { getText } from '../localization/localization';

//TODO: Refactor this class
interface Props {
    onResults: (results: string[]) => void;
    isListening: boolean;
    setIsListening: (isListening: boolean) => void;
}

const SpeechRecognitionComponent = forwardRef<any, Props>((props, ref) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    console.log('SpeechRecognitionComponent - Is listening: ', isListening);
    const [results, setResults] = useState<string[]>([]);

    useImperativeHandle(ref, () => ({
        stopListening: async () => {
            try {
                await Voice.stop();
                props.setIsListening(false);
            } catch (e) {
                console.error('Error stopping listening:', e);
            }
        },
        stopRecognizing: async () => {
            try {
                await Voice.destroy();
                props.setIsListening(false);
            } catch (e) {
                console.error('Error stopping recognition:', e);
            }
        },
        toggleListening: async () => {
            await toggleListening();
        },
    }));

    // Handle actions on button click
    const toggleListening = async () => {
        console.log('SpeechRecognitionComponent -  toggleListening');
        if (isListening) {
            // Stop listening
            try {
                await stopRecognizing();
                setIsListening(false);
                console.log('SpeechRecognitionComponent -  stopRecognizing');
            } catch (error) {
                console.error('SpeechRecognitionComponent - Error: stopping recognition:', error);
            }
        } else {
            // Start listening
            try {
                await startRecognizing();
                setIsListening(true);
            } catch (error) {
                console.error('SpeechRecognitionComponent - Error: starting recognition:', error);
            }
        }
    };

    // Request microphone permission (Android only)
    const requestMicrophonePermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            console.log('SpeechRecognitionComponent - Mic permission - Android!');
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: getText('microphonePermissionTitle'),
                    message: getText('microphonePermissionMessage'),
                    buttonPositive: getText('microphonePermissionButton'),
                }
            );
            console.log('SpeechRecognitionComponent - Permission granted - Android!');
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    // Start listening
    const startRecognizing = async () => {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            console.log('SpeechRecognitionComponent - startRecognizing!');
            return;
        }
        try {
            await Voice.start('en-US');
            setIsListening(true);
        } catch (error) {
            console.error('SpeechRecognitionComponent - Voice.start error:', error);
        }
    };

    // Stop listening
    const stopRecognizing = async () => {
        try {
            console.log('SpeechRecognitionComponent - stopRecognizing!');
            await Voice.stop();
            setIsListening(false);
        } catch (error) {
            console.error('SpeechRecognitionComponent - Voice.stop error:', error);
        }
    };

    const cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (error) {
            console.error('SpeechRecognitionComponent - ',error);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (error) {
            console.error('SpeechRecognitionComponent - ', error);
        }
    };

    // Initialize voice listeners
    useEffect(() => {
        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
            const speechResults = e.value || [];
            setResults(speechResults);
            props.onResults(speechResults); // Pass results back to MainLayout
        };

        Voice.onSpeechStart = (e: SpeechStartEvent) => {
            console.log('SpeechRecognitionComponent - onSpeechStart: ', e);
        };

        Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
            console.log('SpeechRecognitionComponent - onSpeechRecognized: ', e);
        };

        Voice.onSpeechEnd = (e: SpeechEndEvent) => {
            console.log('SpeechRecognitionComponent - onSpeechEnd: ', e);
        };

        Voice.onSpeechError = (e: SpeechErrorEvent) => {
            console.log('SpeechRecognitionComponent - onSpeechError: ', e);
        };

        Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
            const speechResults = e.value || [];
            setResults(speechResults);
            console.log('SpeechRecognitionComponent - onSpeechPartialResults: ', e);
        };

        Voice.onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
            //console.log("SpeechRecognitionComponent - onSpeechVolumeChanged: ", e);
        };

        return () => {
            Voice.removeAllListeners();
        };
    }, []);

    return (
        <View style={sharedStyles.speechComponentBottomContainer}>
            <View style={sharedStyles.speechComponentWhiteView}>
                <ImageBackground
                    source={require('../assets/squiggly_line.png')} // Path to your image
                    style={StyleSheet.absoluteFillObject} // Covers the entire whiteView
                    imageStyle={{ borderRadius: 30 }} // Matches the whiteView's rounded corners
                />
                <Text style={sharedStyles.speechComponentWhiteViewTitleText}>Julia</Text>
                <Text style={sharedStyles.speechComponentWhiteViewSubtitleText}>
                    {results.length > 0 ? results[0] : getText('toggleSpeechRecognition')}
                </Text>
                <TouchableOpacity
                    style={sharedStyles.speechComponentRoundButton}
                    onPress={toggleListening}
                    accessibilityLabel="Toggle Speech Recognition">
                    <Image
                        source={isListening
                            ? require('../assets/stop_siri_image.png') // Replace with a "Stop" image
                            : require('../assets/start_siri_image.png')} // Replace with a "Start" image
                        style={sharedStyles.speechComponentRoundButtonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default SpeechRecognitionComponent;
