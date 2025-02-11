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
});

export default sharedStyles;
