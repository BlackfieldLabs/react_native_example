import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, TextInputProps } from 'react-native';
import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme';
import sharedStyles from '../../styles/sharedStyles';

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
        sharedStyles.textInputBoxContainer,
        { borderColor: isFocused ? borderColor : COLORS.border },
      ]}
    >
      {/* Floating label that animates above the input field */}
      <Animated.Text style={[sharedStyles.textInputBoxLabel, labelStyle]}>
        {placeholder}
      </Animated.Text>
      {/* Input field */}
      <TextInput
        style={[sharedStyles.textInputBoxInput]}
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

export default TextInputBox;
