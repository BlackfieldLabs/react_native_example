import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { BORDERS, COLORS, FONT_SIZES, HEIGHT, SPACING, FONTS } from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  borderColor?: string;
  placeholderColor?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false); // Tracks if the input is focused
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggles password visibility
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
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <TouchableOpacity
        style={styles.toggleButton}
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

/**
 * Styles for the PasswordInputBox component.
 */
const styles = StyleSheet.create({
  /**
   * Container style for the password input box, including padding, border, and margins.
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
   * Style for the floating label positioned above the password input box.
   */
  label: {
    position: 'absolute', // Positioned relative to the container
    left: SPACING.medium, // Space from the left edge
    backgroundColor: 'transparent',
    fontFamily: FONTS.regular,
  },
  /**
   * Wrapper for the input field and toggle button.
   */
  inputWrapper: {
    flexDirection: 'row', // Align input and button horizontally
    alignItems: 'center', // Vertically center elements
  },
  /**
   * Style for the text input field, including font size, height, and padding.
   */
  input: {
    flex: 1, // Take up available space
    fontSize: FONT_SIZES.medium, // Font size for input text
    fontFamily: FONTS.regular,
    height: HEIGHT.textBox, // Dynamic height of the input box
    paddingVertical: SPACING.small, // Vertical padding inside the input
    color: COLORS.textPrimary, // Text color for input
  },
  /**
   * Style for the toggle button used to show/hide the password.
   */
  toggleButton: {
    height: '150%',
    aspectRatio: 1,
    position: 'absolute',
    right: SPACING.small,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordInputBox;
