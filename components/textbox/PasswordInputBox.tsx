import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { COLORS, FONT_SIZES, HEIGHT, FONTS } from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../styles/globalStyles';

/**
 * A reusable password input component with floating label behavior and a toggle for showing/hiding the password.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The placeholder text displayed in the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {(text: string) => void} props.onChangeText - Callback function triggered when the input text changes.
 * @param {string} [props.borderColor] - The color of the input field border when focused.
 * @param {string} [props.placeholderColor] - The color of the placeholder text.
 * @returns {JSX.Element} A styled password input component with floating label behavior.
 *
 * @example
 * <PasswordInputBox
 *   placeholder="Enter your password"
 *   value={password}
 *   onChangeText={(text) => setPassword(text)}
 *   borderColor={COLORS.accent}
 *   placeholderColor={COLORS.textSecondary}
 * />
 */
const PasswordInputBox = ({
  placeholder,
  value,
  onChangeText,
  borderColor = COLORS.accent,
  placeholderColor = COLORS.textSecondary,
  ...rest
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  borderColor?: string;
  placeholderColor?: string;
} & TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      <View style={globalStyles.passwordInputBoxInputWrapper}>
        <TextInput
          style={[globalStyles.passwordInputBoxInput]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <TouchableOpacity
        style={globalStyles.passwordInputBoxToggleButton}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Icon
          name={isPasswordVisible ? 'visibility' : 'visibility-off'}
          size={HEIGHT.smallImage}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInputBox;
