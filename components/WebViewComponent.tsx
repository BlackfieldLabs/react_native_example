import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../styles/theme';

/**
 * A reusable component that renders a WebView inside a container.
 *
 * This component loads an external URL inside a WebView, providing a way to display web content
 * within the React Native application.
 *
 * @component
 * @param {string} url - The URL to be loaded in the WebView.
 * @returns {JSX.Element} A WebView wrapped in a styled container.
 *
 * @example
 * <WebViewComponent url="https://example.com" />
 */
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

const styles = StyleSheet.create ({
  webViewContainer: {
    flex: 5,
    backgroundColor: COLORS.background,
},
});

export default WebViewComponent;
