import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../styles/theme';

const sharedStyles = StyleSheet.create({
    safeLayoutContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    containerStyle: {
        flex: 1,
        backgroundColor: COLORS.primary,
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
    imageStyle: {
        width: HEIGHT.image,
        height: HEIGHT.image,
        marginBottom: 20,
    },
    titleStyle: {
        fontSize: FONT_SIZES.large,
        fontFamily:FONTS.regular,
        color: COLORS.textPrimary,
        marginBottom: 5,
    },
    subtitleStyle: {
        fontSize: FONT_SIZES.medium,
        fontFamily:FONTS.regular,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },
});

export default sharedStyles;
