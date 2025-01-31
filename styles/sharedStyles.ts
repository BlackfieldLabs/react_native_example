import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../styles/theme';

const sharedStyles = StyleSheet.create({
    safeLayoutContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    containerStyle: {
        flex: 1,
        backgroundColor: COLORS.navigation,
    },
    scrollContainer: {
        padding: 16,
    },
    backgroundImageContainerStyle: {
        flex: 1,
        resizeMode: 'cover',
    },
    roundBottomContainerViewStyle: {
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radiusExtraLarge,
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginTop: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    titleStyle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.textPrimary,
        marginBottom: 5,
    },
    subtitleStyle: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },
    buttonTextPrimary: {
        color: COLORS.textPrimary,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        marginLeft: SPACING.small,
    },
    settingsIconButton: {
        marginRight: 10,
    },
    sectionTop: {
        padding: SPACING.medium,
        borderWidth: HEIGHT.border,
        borderColor: COLORS.border,
        borderTopLeftRadius: BORDERS.radiusMedium,
        borderTopRightRadius: BORDERS.radiusMedium,
        backgroundColor: COLORS.background,
    },
    sectionMiddle: {
        padding: SPACING.medium,
        borderWidth: HEIGHT.border,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    sectionBottom: {
        padding: SPACING.medium,
        borderWidth: HEIGHT.border,
        borderColor: COLORS.border,
        borderBottomLeftRadius: BORDERS.radiusMedium,
        borderBottomRightRadius: BORDERS.radiusMedium,
        backgroundColor: COLORS.background,
    },
    /**
     * Wrapper for the input field and toggle button.
     */
    PasswordInputBoxInputWrapper: {
        flexDirection: 'row', // Align input and button horizontally
        alignItems: 'center', // Vertically center elements
    },
    /**
     * Style for the text input field, including font size, height, and padding.
     */
    PasswordInputBoxInput: {
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
    PasswordInputBoxToggleButton: {
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
    //Role selection
    roleSelectionSafeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    roleSelectionContainer: {
        flex: 1,
        padding: SPACING.large,
    },
    roleSelectionScrollContainer: {
        paddingBottom: SPACING.large,
    },
    roleSelectionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radiusLarge,
        borderWidth: HEIGHT.border,
        borderColor: COLORS.border,
        padding: SPACING.medium,
        marginBottom: SPACING.medium,
    },
    roleSelectionCardSelected: {
        borderColor: COLORS.accent,
        borderWidth: 1,
    },
    roleSelectionCardIconBackground: {
        width: HEIGHT.button,
        height: HEIGHT.button,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.border,
        borderRadius: BORDERS.radiusMedium,
        marginRight: SPACING.small,
    },
    roleSelectionCardContent: {
        flex: 3,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        paddingLeft: SPACING.small,
    },
    roleSelectionCardSubtitle: {
        width: '100%',
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        paddingLeft: SPACING.small,
    },
    //Web view
    webViewContainer: {
        flex: 5,
        backgroundColor: COLORS.background,
    },
    center: {
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
    title: {
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
    button: {
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.large,
        borderRadius: BORDERS.radiusLarge,
        borderWidth: HEIGHT.border,
        marginHorizontal: SPACING.small,
    },
    destructiveButton: {
        borderColor: COLORS.error,
    },
    primaryButton: {
        borderColor: COLORS.accent,
    },
    buttonText: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.bold,
        color: COLORS.textPrimary,
    },
    //CameraView
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingLeft: SPACING.medium,
        height: HEIGHT.button,
    },
});

export default sharedStyles;
