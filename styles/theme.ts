export const COLORS = {
    primary: 'rgba(255, 255, 255, 1)',//'#fff'
    secondary: 'rgba(225, 252, 244, 1)',//'#e1fcf4'
    accent: 'rgba(74, 93, 130, 1)',//'#4A5D82'
    border: 'rgba(110, 194, 167, 1)',//'#6EC2A7'
    textPrimary: 'rgba(74, 93, 130, 1)',//'#4A5D82'
    textSecondary: 'rgba(255, 255, 255, 1)',//'#fff'
    error: 'rgba(255, 77, 79, 1)',//'#ff4d4f'
    overlay: 'rgba(74, 93, 130, 0.5)',
    graphOrange: 'rgba(254, 156, 67, 1)',
    graphGreen: 'rgba(63, 223, 112, 1)',
  };

  export const FONT_SIZES = {
    small: 12,
    medium: 16,
    average: 20,
    large: 24,
    title: 32,
  };

  export const SPACING = {
    extraSmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  };

  export const HEIGHT = {
    border: 1,
    button: 60,
    textBox: 40,
    image: 50,
    smallImage: 25,
    roundImage: 100,
    graph: 500,
  };

  export const FONTS = {
    regular: 'Helvetica-Regular',
    bold: 'Helvetica-Bold',
    test: 'Comic Sans MS',
  };  

  export const BORDERS = {
    radiusExtraSmall: 4,
    radiusSmall: 8,
    radiusMedium: 16,
    radiusLarge: 24,
    radiusExtraLarge: 32,
  };

  export const SHADOWS = {
    light: {
      shadowColor: COLORS.textPrimary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: COLORS.textPrimary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
  };
