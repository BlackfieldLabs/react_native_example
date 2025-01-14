import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS } from '../../styles/theme';

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
 *   onAccentButtonPress={() => console.log('Button Pressed')}
 * />
 */
const AccentButton = ({ title, onAccentButtonPress }: { title: string; onAccentButtonPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onAccentButtonPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

/**
 * Styles for the AccentButton component.
 *
 * @type {object}
 * @property {object} button - The style for the button container.
 * @property {object} buttonText - The style for the button text.
 */
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: HEIGHT.button,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERS.radiusExtraLarge,
    marginBottom: SPACING.small,
  },
  buttonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.background,
    fontWeight: 'bold',
  },
});

export default AccentButton;
