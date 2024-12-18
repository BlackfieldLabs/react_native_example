import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { initWhisper } from 'whisper.rn'

const App = () => {
    console.log("Tamara: App start.");
    console.log("Tamara: Lalalalala.");
    const [transcription, setTranscription] = useState<string>(''); // Holds the transcribed text
    const [isListening, setIsListening] = useState<boolean>(false); // Tracks whether Whisper is listening
    const [whisperContext, setWhisperContext] = useState<any>(null);
  const [recognizedText, setRecognizedText] = useState<string>(''); // State to hold recognized text
    let result;
  const startListening = async () => {
      console.log("Tamara: start listening!");
      try{
          console.log("Tamara: try block!");
          // Initialize Whisper with the model file
                      const whisperContext = await initWhisper({
                        filePath: 'file://.../ggml-tiny.en.bin',
                      })
      }
      catch(e:Exception) {
          // Displays error thrown by the try block
          result = e.Message;
          console.log("Tamara: catch block!", e.Message);
      }
      finally {
          // Runs irrespective of try and catch blocks
          console.log("Tamara: finally block!");
      }
  }

  const handleButtonPress = () => {
    // For now, simulate setting the recognized text
    setRecognizedText('Voice recognition result will appear here...');
  };

  return (
    <View style={styles.container}>
      {/* Title Text */}
      <Text style={styles.title}>Start Voice Recognition</Text>

      {/* Button */}
      <Button title="Start" onPress={startListening} />

      {/* TextView to display recognized text */}
      <Text style={styles.result}>{recognizedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
