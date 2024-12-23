//React/React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, TouchableHighlight } from 'react-native';
//WebView
import { WebView } from 'react-native-webview';
//Voice 
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const App = () => {
  // Track listening state
  const [isListening, setIsListening] = useState(false);
  console.log('Tamara: App start! Is listening: ', isListening);

  // API Call on Component Mount
  const makeApiCall = async () => {
    try {
      console.log('Making API Call...');
      const response = await fetch(
        'http://eluxnetworks.net:8000/function/well-api/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode: 'cors',
          body: new URLSearchParams({
            function: 'voice_ask',
            clientId: '001',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYnN0ZXIiLCJleHAiOjE3MzI3NzMwNDR9.ai__sUTerJDp6-i9fDHUUubU3Mo_iUwE0gV3QBJWkR8',
            user_name: 'Julia',
            question: 'how is dad doing',
            nonce: ',3', // Generates a random unique string
          }).toString(),
        }
      );
      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);
    } catch (error) {
      console.error('API Call Error:', error);
    }
  };

  // Request microphone permission (Android only)
  const requestMicrophonePermission = async () => {
    console.log('Tamara: mic permission!');
    if (Platform.OS === 'android') {
      console.log('Tamara: mic android!');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app requires access to your microphone for speech recognition.',
          buttonPositive: 'OK',
        },
      );
      console.log('Tamara: Permission granted!');
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Handle actions on button click
  const toggleListening = async () => {
    console.log('Tamara: toggleListening');
    if (isListening) {
      // Stop listening
      try {
        await stopRecognizing();
        setIsListening(false);
        console.log('Tamara: stopRecognizing');
        makeApiCall();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    } else {
      // Start listening
      try {
        await startRecognizing();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  // Speak to text methods
  const startRecognizing = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.log('Permission denied!');
      return;
    }
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error('Voice.start error:', e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Voice.stop error:', e);
    }
  };

  const [recognized, setRecognized] = useState("");
  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
      console.log("onSpeechStart: ", e);
      setStarted("√");
    };

    Voice.onSpeechRecognized = (e) => {
      //console.log("onSpeechRecognized: ", e);
      setRecognized("√");
    };

    Voice.onSpeechEnd = (e) => {
      console.log("onSpeechEnd: ", e);
      setEnd("√");
    };

    Voice.onSpeechError = (e) => {
      console.log("onSpeechError: ", e);
      setError(JSON.stringify(e.error));
    };

    Voice.onSpeechResults = (e) => {
      //console.log("onSpeechResults: ", e);
      setResults(e.value || []); // Fallback to an empty array if `e.value` is undefined
    };

    Voice.onSpeechPartialResults = (e) => {
      //console.log("onSpeechPartialResults: ", e);
      setPartialResults(e.value);
    };

    Voice.onSpeechVolumeChanged = (e) => {
      //console.log("onSpeechVolumeChanged: ", e);
      setPitch(e.value);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetStates();
  };

  const resetStates = () => {
    setRecognized("");
    setPitch("");
    setError("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
    setEnd("");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Top View (Blue, 5/6 of the screen) */}
        <View style={styles.webViewContainer}>
          <WebView
            style={StyleSheet.absoluteFillObject}
            source={{ uri: 'https://dev.kresoja.net/dashboard/1' }}
          />
        </View>
        {/* Bottom View (Red, 1/6 of the screen) */}
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
  bottomContainer: {
    flex: 1, // 1/5 of the screen
    backgroundColor: '#d7e3f5',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  webViewContainer: {
    flex: 5, // 5/6 of the screen
    backgroundColor: 'white', // Optional background
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

export default App;
