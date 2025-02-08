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
});

export default sharedStyles;
