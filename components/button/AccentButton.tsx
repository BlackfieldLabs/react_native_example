import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles';

/**
 * A reusable accent button component with predefined styling.
 * Typically used for primary actions that require emphasis.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} props.onAccentButtonPress - Callback function executed when the button is pressed.
 * @returns {JSX.Element} A touchable accent button with a label.
 *
 * @example
 * <AccentButton
 *   title="Submit"
 *   onAccentButtonPress={() => console.log(`[${new Date().toLocaleString()}] Accent button pressed`)}
 * />
 */
const AccentButton = ({ title, onAccentButtonPress }: { title: string; onAccentButtonPress: () => void }) => {
  return (
    <TouchableOpacity style={globalStyles.accentButton} onPress={onAccentButtonPress}>
      <Text style={globalStyles.accentButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AccentButton;
