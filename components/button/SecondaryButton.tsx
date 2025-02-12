import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../../styles/theme';

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
    <TouchableOpacity style={styles.secondaryButtonSecondary} onPress={onSecondaryButtonPress}>
      <Text style={styles.secondaryButtonSecondaryText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButtonSecondary: {
    width: '100%',
    height: HEIGHT.button,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERS.radiusLarge,
    marginBottom: SPACING.small,
    borderWidth: HEIGHT.border,
    borderColor: COLORS.accent,
},
secondaryButtonSecondaryText: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.accent,
},
});

export default SecondaryButton;
