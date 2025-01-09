import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDERS, HEIGHT } from '../../styles/theme';

const PasswordInputBox = ({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {secureTextEntry ? 'Show' : 'Hide'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: HEIGHT.border,
    borderColor: COLORS.accent,
    borderRadius: BORDERS.radiusLarge,
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  textInput: {
    flex: 1,
    height: HEIGHT.button,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
  toggleButton: {
    marginLeft: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.small,
  },
  toggleButtonText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
});

export default PasswordInputBox;
