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
    settingsIconButton: {
        marginRight: 10,
    },
    buttonTextPrimary: {
        color: COLORS.textPrimary,
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        marginLeft: SPACING.small,
    },
    subtitleStyle: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },
    titleStyle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.textPrimary,
        marginBottom: 5,
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
    sectionMiddle: {
        padding: SPACING.medium,
        borderWidth: HEIGHT.border,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.regular,
        marginBottom: SPACING.average,
        color: COLORS.textPrimary,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT.button,
        color: COLORS.border,
    },
    alternativeTextColorStyle: {
        color: COLORS.textSecondary,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomBorder: {
        borderBottomColor: COLORS.border,
        borderBottomWidth: HEIGHT.border,
    },
});

export default sharedStyles;
