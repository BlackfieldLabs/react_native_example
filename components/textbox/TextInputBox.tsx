import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, TextInputProps, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../../styles/theme';

/**
 * A reusable text input component with floating label animation.
 * The label moves above the input field when it gains focus or contains text.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The text displayed inside the input field before user input.
 * @param {string} props.value - The controlled value of the text input.
 * @param {(text: string) => void} props.onChangeText - Callback triggered when the input value changes.
 * @param {boolean} [props.secureTextEntry=false] - If true, hides input text (useful for passwords).
 * @param {string} [props.borderColor=COLORS.accent] - The border color when the input is focused.
 * @param {string} [props.placeholderColor=COLORS.textSecondary] - The color of the floating label.
 * @param {TextInputProps} [props.rest] - Additional props passed to the TextInput component.
 * @returns {JSX.Element} A text input field with floating label animation.
 *
 * @example
 * <TextInputBox
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={(text) => setEmail(text)}
 *   secureTextEntry={false}
 *   borderColor={COLORS.primary}
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
  const [isFocused, setIsFocused] = useState(false)
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

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
        style.textInputBoxContainer,
        { borderColor: isFocused ? borderColor : COLORS.border },
      ]}
    >
      {/* Floating label that animates above the input field */}
      <Animated.Text style={[style.textInputBoxLabel, labelStyle]}>
        {placeholder}
      </Animated.Text>
      {/* Input field */}
      <TextInput
        style={[style.textInputBoxInput]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={''}
        {...rest} // Pass additional props
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const style = StyleSheet.create({
        /**
       * Container style for the text input box, including padding, border, and margins.
       */
        textInputBoxContainer: {
            width: '100%', // Full width of the parent container
            borderWidth: HEIGHT.border, // Dynamic border width
            borderRadius: BORDERS.radiusLarge, // Rounded corners
            paddingHorizontal: SPACING.medium, // Horizontal padding
            paddingTop: SPACING.medium, // Padding at the top for label space
            marginBottom: SPACING.medium, // Space between input boxes
            backgroundColor: COLORS.primary,
        },
        /**
         * Style for the floating label positioned above the text input box.
         */
        textInputBoxLabel: {
            position: 'absolute', // Positioned relative to the container
            left: SPACING.medium, // Space from the left edge
            backgroundColor: 'transparent', // Background for label (to avoid overlapping with input)
            fontFamily: FONTS.regular, // Small padding for better visibility
        },
        /**
         * Style for the text input field, including font size, height, and padding.
         */
        textInputBoxInput: {
            fontSize: FONT_SIZES.medium, // Font size for input text
            fontFamily: FONTS.regular, // Custom font for input text
            height: HEIGHT.textBox, // Dynamic height of the input box
            paddingVertical: SPACING.small, // Vertical padding inside the input
            color: COLORS.textPrimary, // Text color for input
        },
});

export default TextInputBox;
