// globalStyles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from './theme';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.accent,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  link: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    flex: 1,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
  }, safeLayoutContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 16,
  },
  /**
   * Wrapper for the input field and toggle button.
   */
  passwordInputBoxInputWrapper: {
    flexDirection: 'row', // Align input and button horizontally
    alignItems: 'center', // Vertically center elements
  },
  /**
   * Style for the text input field, including font size, height, and padding.
   */
  passwordInputBoxInput: {
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
  passwordInputBoxToggleButton: {
    height: '150%',
    aspectRatio: 1,
    position: 'absolute',
    right: SPACING.small,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    backgroundColor: COLORS.secondary,
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
  //Secondary button
  secondaryButtonSecondary: {
    width: '100%',
    height: HEIGHT.button,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERS.radiusLarge,
    marginBottom: SPACING.small,
    borderWidth: HEIGHT.border,
    borderColor: COLORS.accent,
  },
  secondaryButtonSecondaryText: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.accent,
  },
  //Accent button
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
    color: COLORS.background,
  },
  //Sign up
  signUpSection: {
    marginBottom: 24,
    width: '100%',
  },
  signUpSectionTitle: {
    fontSize: FONT_SIZES.large,
    fontFamily: FONTS.regular,
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  //Web view
  webViewContainer: {
    flex: 5,
    backgroundColor: COLORS.background,
  },
  centerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  //Alert
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    padding: SPACING.large,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDERS.radiusLarge,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: FONT_SIZES.large,
    fontFamily: FONTS.bold,
    marginBottom: SPACING.medium,
    color: COLORS.textPrimary,
  },
  message: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginBottom: SPACING.medium,
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  spinner: {
    marginTop: SPACING.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.medium,
  },
  buttonStyle: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.large,
    borderRadius: BORDERS.radiusLarge,
    borderWidth: HEIGHT.border,
    marginHorizontal: SPACING.small,
  },
  destructiveButton: {
    borderColor: COLORS.error,
  },
  primaryButtonStyle: {
    borderColor: COLORS.accent,
  },
  buttonTextStyle: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
});

export default globalStyles;
