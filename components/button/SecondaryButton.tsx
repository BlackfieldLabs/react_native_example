import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, HEIGHT, SPACING, BORDERS } from '../../styles/theme';

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
    <TouchableOpacity style={styles.buttonSecondary} onPress={onSecondaryButtonPress}>
      <Text style={styles.buttonSecondaryText}>{title}</Text>
    </TouchableOpacity>
  );
};

/**
 * Styles for the SecondaryButton component.
 *
 * @type {object}
 * @property {object} buttonSecondary - The style for the button container.
 * @property {object} buttonSecondaryText - The style for the button text.
 */
const styles = StyleSheet.create({
  buttonSecondary: {
    width: '100%',
    height: HEIGHT.button,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERS.radiusExtraLarge,
    marginBottom: SPACING.small,
    borderWidth: HEIGHT.border,
    borderColor: COLORS.accent,
  },
  buttonSecondaryText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
});

export default SecondaryButton;
