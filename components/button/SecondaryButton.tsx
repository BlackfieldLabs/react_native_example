import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import sharedStyles from '../../styles/sharedStyles';

/**
 * A reusable button component with secondary styling.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} props.onSecondaryButtonPress - Callback function to execute when the button is pressed.
 * @returns {JSX.Element} The styled secondary button.
 *
 * @example
 * <SecondaryButton
 *   title="Cancel"
 *   onSecondaryButtonPress={() => console.log('Button Pressed')}
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
