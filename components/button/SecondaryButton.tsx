import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import sharedStyles from '../../styles/sharedStyles';

/**
 * A reusable secondary button component with predefined styling.
 * Typically used for less prominent actions such as cancellations.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} props.onSecondaryButtonPress - Callback function executed when the button is pressed.
 * @returns {JSX.Element} A touchable secondary button with a label.
 *
 * @example
 * <SecondaryButton
 *   title="Cancel"
 *   onSecondaryButtonPress={() => console.log(`[${new Date().toLocaleString()}] Secondary button pressed`)}
 * />
 */
const SecondaryButton = ({ title, onSecondaryButtonPress }: { title: string; onSecondaryButtonPress: () => void }) => {
  return (
    <TouchableOpacity style={sharedStyles.secondaryButtonSecondary} onPress={onSecondaryButtonPress}>
      <Text style={sharedStyles.secondaryButtonSecondaryText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
