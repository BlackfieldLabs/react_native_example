import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../../styles/theme';

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
    <TouchableOpacity style={styles.accentButton} onPress={onAccentButtonPress}>
      <Text style={styles.accentButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
      accentButton: {
          width: '100%',
          height: HEIGHT.button,
          backgroundColor: COLORS.accent,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: BORDERS.radiusLarge,
          marginBottom: SPACING.small,
      },
      accentButtonText: {
          fontSize: FONT_SIZES.medium,
          fontFamily: FONTS.regular,
          color: COLORS.textSecondary,
      },
});

export default AccentButton;
