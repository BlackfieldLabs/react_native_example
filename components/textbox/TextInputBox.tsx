import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, TextInputProps } from 'react-native';
import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';

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
        globalStyles.textInputBoxContainer,
        { borderColor: isFocused ? borderColor : COLORS.border },
      ]}
    >
      {/* Floating label that animates above the input field */}
      <Animated.Text style={[globalStyles.textInputBoxLabel, labelStyle]}>
        {placeholder}
      </Animated.Text>
      {/* Input field */}
      <TextInput
        style={[globalStyles.textInputBoxInput]}
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

export default TextInputBox;
