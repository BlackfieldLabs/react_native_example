import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = () => {
  return (
    <View style={styles.webViewContainer}>
      <WebView
        style={StyleSheet.absoluteFillObject}
        source={{ uri: 'https://dev.kresoja.net/dashboard/1' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 5, // Occupies 5/6 of the screen
    backgroundColor: 'white',
  },
});

export default WebViewComponent;
