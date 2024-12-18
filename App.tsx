import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [recognizedText, setRecognizedText] = useState<string>(''); // State to hold recognized text

  const handleButtonPress = () => {
    // For now, simulate setting the recognized text
    setRecognizedText('Voice recognition result will appear here...');
  };

  return (
    <View style={styles.container}>
      {/* Title Text */}
      <Text style={styles.title}>Start Voice Recognition</Text>

      {/* Button */}
      <Button title="Start" onPress={handleButtonPress} />

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
