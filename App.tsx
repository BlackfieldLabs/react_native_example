import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, TouchableHighlight } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const App = () => {
  console.log('Tamara: App start!');

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
      console.log("onSpeechRecognized: ", e);
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
      console.log("onSpeechResults: ", e);
      setResults(e.value || []); // Fallback to an empty array if `e.value` is undefined
    };
  
    Voice.onSpeechPartialResults = (e) => {
      console.log("onSpeechPartialResults: ", e);
      setPartialResults(e.value);
    };
  
    Voice.onSpeechVolumeChanged = (e) => {
      console.log("onSpeechVolumeChanged: ", e);
      setPitch(e.value);
    };
  
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    console.log('Tamara: mic permission!');
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.log('Permission denied!');
      return;
    }
  
    try {
      await Voice.start("en-US");
      console.log('Voice module:', Voice);
    } catch (e) {
      console.error('Tamara: Voice.start error:', e);
    }
  };
  
  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  
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
          <Text style={styles.whiteViewSubtitleText}>Click to Speak</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={startRecognizing}
            accessibilityLabel="Round button">
            <Image
              source={require('./assets/siri_image.png')}
              style={styles.roundButtonImage}
            />
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});

export default App;