import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import { COLORS } from '../styles/theme'; // Adjust the import path based on your project structure

interface CustomTextProps extends TextProps {
  fontSize?: number; // Optional font size
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'; // Optional font weight
  color?: string; // Optional text color
  style?: TextStyle; // Optional additional styles
  children: React.ReactNode; // Text content
}

const CustomText: React.FC<CustomTextProps> = ({
  fontSize = 16, // Default font size
  fontWeight = 'normal', // Default font weight
  color = COLORS.textPrimary, // Default color
  style,
  children,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        { fontSize, fontWeight, color }, // Apply dynamic styles
        style, // Allow additional styles to be passed
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Comic Sans MS', // Ensure the font is set up correctly in your project
  },
});

export default CustomText;
