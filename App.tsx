import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { initWhisper } from 'whisper.rn'; // Import whisper.rn

const App = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [whisperContext, setWhisperContext] = useState<any>(null);

  console.log('Tamara: App start!');
  // Request microphone permission (Android only)
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app requires access to your microphone for speech recognition.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Initialize Whisper context
  const initializeWhisper = async () => {
    try {
      const context = await initWhisper({
        filePath: require('./assets/models/ggml-tiny.en.bin'), // Ensure this file is accessible  
      });
      setWhisperContext(context);
    } catch (error) {
      console.error('Error initializing Whisper:', error);
    }
  };

  useEffect(() => {
    initializeWhisper();
  }, []);

  const startTranscription = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.error('Microphone permission not granted.');
      return;
    }

    setIsTranscribing(true);
    try {
      const options = { language: 'en' }; // Set language options
      const { stop, subscribe } = await whisperContext.transcribeRealtime(options);

      // Listen for transcription updates
      subscribe((event: any) => {
        const { isCapturing, data, processTime, recordingTime } = event;
        console.log(
          `Realtime transcribing: ${isCapturing ? 'ON' : 'OFF'}\n` +
            `Result: ${data.result}\n` +
            `Process time: ${processTime}ms\n` +
            `Recording time: ${recordingTime}ms`
        );

        if (!isCapturing) {
          console.log('Finished real-time transcribing.');
          setIsTranscribing(false);
          stop();
        }

        setRecognizedText(data.result);
      });
    } catch (error) {
      console.error('Error during real-time transcription:', error);
      setIsTranscribing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Transcription</Text>
      <Button
        title={isTranscribing ? 'Listening...' : 'Start Transcription'}
        onPress={startTranscription}
        disabled={isTranscribing}
      />
      <Text style={styles.result}>{recognizedText || 'Speech will appear here...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default App;
