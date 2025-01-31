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
import { COLORS, FONT_SIZES, SPACING, BORDERS, FONTS } from '../styles/theme';
//Localization
import { getText } from '../localization/localization';
//Alert
import { useAlert } from '../components/alert/CustomAlertManager';
import { AlertType } from '../components/alert/AlertTypes'

interface Props {
    onResults: (results: string[]) => void;
    isListening: boolean;
    setIsListening: (isListening: boolean) => void;
}

const SpeechRecognitionComponent = forwardRef<any, Props>((props, ref) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Is listening: `, isListening);
    const [results, setResults] = useState<string[]>([]);
      const { createSingleButtonAlert } = useAlert();

    useImperativeHandle(ref, () => ({
        stopListening: async () => {
            try {
                await Voice.stop();
                props.setIsListening(false);
            } catch (e) {
                const message = getText('messageErrorStoppingListenning') + e;
                createSingleButtonAlert(AlertType.Error, message, () => {
                    console.log(`[${new Date().toLocaleString()}] Error stopping listening: `, e);
                });
            }
        },
        stopRecognizing: async () => {
            try {
                await Voice.destroy();
                props.setIsListening(false);
            } catch (e) {
                const message = getText('messageErrorStoppingRecognition') + e;
                createSingleButtonAlert(AlertType.Error, message, () => {
                    console.log(`[${new Date().toLocaleString()}] Error stopping recognition: `, e);
                });
            }
        },
        toggleListening: async () => {
            await toggleListening();
        },
    }));

    const toggleListening = async () => {
        console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - toggleListening`);
        if (isListening) {
            // Stop listening
            try {
                await stopRecognizing();
                setIsListening(false);
                console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent -  stopRecognizing`);
            } catch (error) {
                console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Error: stopping recognition: `, error);
            }
        } else {
            // Start listening
            try {
                await startRecognizing();
                setIsListening(true);
            } catch (error) {
                console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Error: starting recognition: `, error);
            }
        }
    };

    const requestMicrophonePermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Mic permission - Android!`);
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: getText('microphonePermissionTitle'),
                    message: getText('microphonePermissionMessage'),
                    buttonPositive: getText('okButtonTitle'),
                }
            );
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Permission granted - Android!`);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const startRecognizing = async () => {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - startRecognizing!`);
            return;
        }
        try {
            await Voice.start('en-US');
            setIsListening(true);
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Voice.start error:`, error);
        }
    };

    const stopRecognizing = async () => {
        try {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - stopRecognizing!`);
            await Voice.stop();
            setIsListening(false);
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - Voice.stop error: `, error);
        }
    };

    const cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - `,error);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - `, error);
        }
    };

    useEffect(() => {
        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
            const speechResults = e.value || [];
            setResults(speechResults);
            props.onResults(speechResults); // Pass results back to MainLayout
        };

        Voice.onSpeechStart = (e: SpeechStartEvent) => {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - onSpeechStart: `, e);
        };

        Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - onSpeechRecognized: `, e);
        };

        Voice.onSpeechEnd = (e: SpeechEndEvent) => {
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - onSpeechEnd: `, e);
        };

        Voice.onSpeechError = (e: SpeechErrorEvent) => {
            console.error(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - onSpeechError: `, e);
        };

        Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
            const speechResults = e.value || [];
            setResults(speechResults);
            console.log(`[${new Date().toLocaleString()}] SpeechRecognitionComponent - onSpeechPartialResults: `, e);
        };

        Voice.onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
            console.log("SpeechRecognitionComponent - onSpeechVolumeChanged: ", e);
        };

        return () => {
            Voice.removeAllListeners();
        };
    }, []);

    return (
        <View style={styles.speechComponentBottomContainer}>
            <View style={styles.speechComponentWhiteView}>
                <ImageBackground
                    source={require('../assets/squiggly_line.png')}
                    style={StyleSheet.absoluteFillObject}
                    imageStyle={{ borderRadius: BORDERS.radiusExtraLarge }}
                />
                <Text style={styles.speechComponentWhiteViewTitleText}>Julia</Text>
                <Text style={styles.speechComponentWhiteViewSubtitleText}>
                    {results.length > 0 ? results[0] : getText('toggleSpeechRecognition')}
                </Text>
                <TouchableOpacity
                    style={styles.speechComponentRoundButton}
                    onPress={toggleListening}
                    accessibilityLabel="Toggle Speech Recognition">
                    <Image
                        source={isListening
                            ? require('../assets/stop_siri_image.png')
                            : require('../assets/start_siri_image.png')}
                        style={styles.speechComponentRoundButtonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    speechComponentBottomContainer: {
        flex: 1, // 1/5 of the screen
        backgroundColor: COLORS.navigation,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    speechComponentWhiteView: {
        backgroundColor: COLORS.background,
        width: '95%', // 95% of the container's width
        height: '80%', // 80% of the container's height
        borderRadius: 30,
        justifyContent: 'center', // Center content vertically
        alignItems: 'flex-start', // Center content horizontally
        paddingLeft: 20, // Adds padding from the left edge
        overflow: 'hidden',
    },
    speechComponentWhiteViewTitleText: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.textPrimary,
        textAlign: 'left',
        backgroundColor: COLORS.background,
    },
    speechComponentWhiteViewSubtitleText: {
        fontSize: 18,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'left',
        backgroundColor: COLORS.background,
        maxWidth: '60%', // Ensure text stays within white view
        flexWrap: 'wrap', // Allow text to wrap if it's too long
    },
    speechComponentRoundButton: {
        height: '75%', // 75% of the container's height
        aspectRatio: 1, // Ensures width equals height
        position: 'absolute',
        right: SPACING.extraLarge, // Distance from the right edge
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    speechComponentRoundButtonImage: {
        height: '100%', // Relative to parent height
        aspectRatio: 1, // Ensures width equals height
        borderRadius: BORDERS.radiusExtraLarge, // Makes it circular
    },
});

export default SpeechRecognitionComponent;
