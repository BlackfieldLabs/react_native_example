import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import sharedStyles from '../styles/sharedStyles';

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
    <View style={sharedStyles.webViewContainer}>
      <WebView
        style={StyleSheet.absoluteFillObject}
        source={{ uri: 'https://dev.kresoja.net/dashboard/1' }}
      />
    </View>
  );
};

export default WebViewComponent;
