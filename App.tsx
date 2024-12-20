import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Dimensions } from 'react-native';
import { initWhisper, WhisperContext } from 'whisper.rn';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const App = () => {
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
      console.log('Tamara: Permission granted!');
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  //----------------------------------------------------

  // File path to the model in Android assets
  const filePath = 'models/ggml-tiny.en.bin';
  console.log('Tamara: Filepath:', filePath);

  const whisper = useRef<WhisperContext>();
  // Initialize Whisper context
  useEffect(() => {
    const initializeWhisper = async () => {
      const hasPermission = await requestMicrophonePermission();
      if (hasPermission) {
        try {
          const exists = await RNFS.existsAssets(filePath); // Check if the file exists in assets
          console.log('Tamara: File exists:', exists);
          if (exists) {
            console.warn('Tamara: File found in assets:', filePath);


            // Copy the file to a writable location (e.g., Document Directory)
            const destinationPath = `${RNFS.DocumentDirectoryPath}/ggml-tiny.en.bin`;
            console.log('Tamara: File copied to:', destinationPath);
            await RNFS.copyFileAssets('models/ggml-tiny.en.bin', destinationPath);
            console.log('Tamara: File copied to:', destinationPath);

            // Initialize Whisper with the new path
            /*const whisperContext = await initWhisper({ 
              filePath: filePath,
             });*/



            //const whisperContext = await initWhisper({ filePath: filePath });
            //console.log('Tamara: Context initialized successfully:', whisperContext);
            //whisper.current = whisperContext;
          } else {
            console.log('Tamara: File is not there!');
          }
        } catch (error) {
          console.error('Tamara: Error initializing Whisper:');
          console.error('Error object:', error);
          //console.error('Error object:', JSON.stringify(error, null, 2));
      }
      } else {
        console.warn('Tamara: Microphone permission denied.');
      }
    };
    initializeWhisper();
  }, []); // Empty dependency array runs this effect only once
  //----------------------------------------------------

  const handleButtonPress = () => {
    console.log('Updated Text in Browser Area'); // Update the text dynamically
  };

  return (
    <View style={styles.container}>
      {/* Top View (Blue, 4/5 of the screen) */}
      <View style={styles.topContainer}>
      <WebView
        source={{ uri: 'https://dev.kresoja.net/dashboard/1' }}
        style={styles.webView}
      />
      </View>
      {/* Bottom View (Red, 1/5 of the screen) */}
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
            onPress={() => console.log('Button Pressed')}
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
  topContainer: {
    flex: 5, // 4/5 of the screen
    backgroundColor: 'transparent',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  bottomContainer: {
    flex: 1, // 1/5 of the screen
    backgroundColor: '#d7e3f5',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  webView: {
    flex: 1, // Ensures the WebView takes full space of the top container
  },
  text: {
    color: 'black',
    fontSize: 24,
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
    height: '75%', // 80% of the container's height
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