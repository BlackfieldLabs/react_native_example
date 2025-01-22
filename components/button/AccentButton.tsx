import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import sharedStyles from '../../styles/sharedStyles';

/**
 * A reusable button component with accent styling.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} props.onAccentButtonPress - Callback function to execute when the button is pressed.
 * @returns {JSX.Element} The styled accent button.
 *
 * @example
 * <AccentButton
 *   title="Submit"
 *   onAccentButtonPress={() => console.log(`[${new Date().toLocaleString()}] Button Pressed')}
 * />
 */
const AccentButton = ({ title, onAccentButtonPress }: { title: string; onAccentButtonPress: () => void }) => {
  return (
    <TouchableOpacity style={sharedStyles.accentButton} onPress={onAccentButtonPress}>
      <Text style={sharedStyles.accentButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AccentButton;
