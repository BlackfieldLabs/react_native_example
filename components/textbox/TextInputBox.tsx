import React from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../styles/theme';
import sharedStyles from '../../styles/sharedStyles';

/**
 * A reusable text input component for forms and user input.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The placeholder text displayed in the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {(text: string) => void} props.onChangeText - Callback function triggered when the input text changes.
 * @param {boolean} [props.secureTextEntry=false] - Whether the input field should hide the text for password entry.
 * @returns {JSX.Element} The styled text input component.
 *
 * @example
 * <TextInputBox
 *   placeholder="Enter your username"
 *   value={username}
 *   onChangeText={(text) => setUsername(text)}
 * />
 */
const TextInputBox = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextInput
      style={sharedStyles.textInputBoxStyle}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textSecondary}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default TextInputBox;
