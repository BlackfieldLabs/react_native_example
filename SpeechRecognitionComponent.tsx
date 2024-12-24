import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import Voice from "@react-native-voice/voice";

interface SpeechRecognitionProps {
    onResults: (results: string[]) => void;
}

const SpeechRecognitionComponent: React.FC<SpeechRecognitionProps> = ({ onResults }) => {
    const [isListening, setIsListening] = useState(false);
    console.log('SpeechRecognitionComponent - Is listening: ', isListening);
    const [results, setResults] = useState<string[]>([]);

    // Handle actions on button click
    const toggleListening = async () => {
        console.log('SpeechRecognitionComponent -  toggleListening');
        if (isListening) {
            // Stop listening
            try {
                await stopRecognizing();
                setIsListening(false);
                console.log('SpeechRecognitionComponent -  stopRecognizing');
                //makeApiCall();
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
    const requestMicrophonePermission = async () => {
        if (Platform.OS === 'android') {
            console.log('SpeechRecognitionComponent - Mic permission - Android!');
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'This app requires access to your microphone for speech recognition.',
                    buttonPositive: 'OK',
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
        } catch (e) {
            console.error('SpeechRecognitionComponent - ',e);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error('SpeechRecognitionComponent - ', e);
        }
    };

    // Initialize voice listeners
    useEffect(() => {
        Voice.onSpeechResults = (e) => {
            const speechResults = e.value || [];
            setResults(speechResults);
            onResults(speechResults); // Pass results back to MainLayout
        };

        Voice.onSpeechStart = (e) => {
            console.log("SpeechRecognitionComponent - onSpeechStart: ", e);
        };

        Voice.onSpeechRecognized = (e) => {
            console.log("SpeechRecognitionComponent - onSpeechRecognized: ", e);
        };

        Voice.onSpeechEnd = (e) => {
            console.log("SpeechRecognitionComponent - onSpeechEnd: ", e);
        };

        Voice.onSpeechError = (e) => {
            console.log("SpeechRecognitionComponent - onSpeechError: ", e);
        };

        Voice.onSpeechPartialResults = (e) => {
            console.log("SpeechRecognitionComponent - onSpeechPartialResults: ", e);
        };

        Voice.onSpeechVolumeChanged = (e) => {
            //console.log("SpeechRecognitionComponent - onSpeechVolumeChanged: ", e);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    return (
        <View style={styles.bottomContainer}>
            <View style={styles.whiteView}>
                <ImageBackground
                    source={require('./assets/squiggly_line.png')} // Path to your image
                    style={StyleSheet.absoluteFillObject} // Covers the entire whiteView
                    imageStyle={{ borderRadius: 30 }} // Matches the whiteView's rounded corners
                />
                <Text style={styles.whiteViewTitleText}>Julia</Text>
                <Text style={styles.whiteViewSubtitleText}>
                    {results.length > 0 ? results[0] : "Click to Speak"}
                </Text>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={toggleListening}
                    accessibilityLabel="Toggle Speech Recognition">
                    <Image
                        source={isListening
                            ? require('./assets/stop_siri_image.png') // Replace with a "Stop" image
                            : require('./assets/start_siri_image.png')} // Replace with a "Start" image
                        style={styles.roundButtonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1, // 1/5 of the screen
        backgroundColor: '#d7e3f5',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    whiteView: {
        backgroundColor: 'white',
        width: '95%', // 95% of the container's width
        height: '80%', // 80% of the container's height
        borderRadius: 30,
        justifyContent: 'center', // Center content vertically
        alignItems: 'flex-start', // Center content horizontally
        paddingLeft: 20, // Adds padding from the left edge
        overflow: 'hidden',
    },
    whiteViewTitleText: {
        fontSize: 24,
        color: 'black',
        textAlign: 'left',
        backgroundColor: 'white',
    },
    whiteViewSubtitleText: {
        fontSize: 18,
        color: '#bcbec2',
        textAlign: 'left',
        backgroundColor: 'white',
        maxWidth: '60%', // Ensure text stays within white view
        flexWrap: 'wrap', // Allow text to wrap if it's too long
    },
    roundButton: {
        height: '75%', // 75% of the container's height
        aspectRatio: 1, // Ensures width equals height
        position: 'absolute',
        right: 30, // Distance from the right edge
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundButtonImage: {
        height: '100%', // Relative to parent height
        aspectRatio: 1, // Ensures width equals height
        borderRadius: 35, // Makes it circular
    },
});

export default SpeechRecognitionComponent;
