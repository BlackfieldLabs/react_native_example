import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../styles/theme';

/**
 * A reusable component that renders a WebView inside a container.
 *
 * @component
 * @returns {JSX.Element} The WebViewComponent.
 * @example
 * <WebViewComponent />
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

/**
 * Styles for the WebViewComponent.
 *
 * @type {object}
 * @property {object} webViewContainer - The container style for the WebView, occupying 5/6 of the screen.
 */
const styles = StyleSheet.create({
  webViewContainer: {
    flex: 5,
    backgroundColor: COLORS.background,
  },
});

export default WebViewComponent;
