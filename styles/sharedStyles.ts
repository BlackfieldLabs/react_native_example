import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../styles/theme';

const sharedStyles = StyleSheet.create({
    safeLayoutContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    containerStyle: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    scrollContainer: {
        padding: SPACING.medium,
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
        color: COLORS.textAlternative,
    },
    alternativeTextColorStyle: {
        color: COLORS.textAlternative,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomBorder: {
        borderBottomColor: COLORS.textAlternative,
        borderBottomWidth: HEIGHT.border,
    },
});

export default sharedStyles;
