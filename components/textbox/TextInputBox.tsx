import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated, TextInputProps } from 'react-native';
import { BORDERS, COLORS, FONT_SIZES, HEIGHT, SPACING, FONTS } from '../../styles/theme';

/**
 * A reusable text input component with floating label behavior for forms and user input.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The placeholder text displayed in the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {(text: string) => void} props.onChangeText - Callback function triggered when the input text changes.
 * @param {boolean} [props.secureTextEntry=false] - Whether the input field should hide the text for password entry.
 * @param {string} [props.borderColor=COLORS.accent] - The color of the input field border when focused.
 * @param {string} [props.placeholderColor=COLORS.textSecondary] - The color of the placeholder text.
 * @param {TextInputProps} [props.rest] - Additional props for the TextInput component.
 * @returns {JSX.Element} A styled text input component with floating label behavior.
 *
 * @example
 * <TextInputBox
 *   placeholder="Enter your username"
 *   value={username}
 *   onChangeText={(text) => setUsername(text)}
 *   borderColor={COLORS.accent}
 *   placeholderColor={COLORS.textSecondary}
 * />
 */
const TextInputBox = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  borderColor = COLORS.accent,
  placeholderColor = COLORS.textSecondary,
  ...rest
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  borderColor?: string;
  placeholderColor?: string;
} & TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false); // Tracks if the input is focused
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current; // Controls label animation

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  /**
   * Dynamically styles the label based on focus and value.
   */
  const labelStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, FONT_SIZES.small],
      outputRange: [FONT_SIZES.medium, FONT_SIZES.small],
    }),
    color: placeholderColor,
    fontFamily: FONTS.regular,
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: isFocused ? borderColor : COLORS.textSecondary },
      ]}
    >
      {/* Floating label that animates above the input field */}
      <Animated.Text style={[styles.label, labelStyle]}>
        {placeholder}
      </Animated.Text>
      {/* Input field */}
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={''} // Empty placeholder to avoid duplication with the floating label
        {...rest} // Pass additional props
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

/**
 * Styles for the TextInputBox component.
 */
const styles = StyleSheet.create({
  /**
   * Container style for the text input box, including padding, border, and margins.
   */
  container: {
    width: '100%', // Full width of the parent container
    borderWidth: HEIGHT.border, // Dynamic border width
    borderRadius: BORDERS.radiusLarge, // Rounded corners
    paddingHorizontal: SPACING.medium, // Horizontal padding
    paddingTop: SPACING.medium, // Padding at the top for label space
    marginBottom: SPACING.medium, // Space between input boxes
    backgroundColor: COLORS.secondary,
  },
  /**
   * Style for the floating label positioned above the text input box.
   */
  label: {
    position: 'absolute', // Positioned relative to the container
    left: SPACING.medium, // Space from the left edge
    backgroundColor: 'transparent', // Background for label (to avoid overlapping with input)
    fontFamily: FONTS.regular, // Small padding for better visibility
  },
  /**
   * Style for the text input field, including font size, height, and padding.
   */
  input: {
    fontSize: FONT_SIZES.medium, // Font size for input text
    fontFamily: FONTS.regular, // Custom font for input text
    height: HEIGHT.textBox, // Dynamic height of the input box
    paddingVertical: SPACING.small, // Vertical padding inside the input
    color: COLORS.textPrimary, // Text color for input
  },
});

export default TextInputBox;
