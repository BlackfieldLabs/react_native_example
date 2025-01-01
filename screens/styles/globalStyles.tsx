import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textPrimary: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.iconTint,
  },
});

export default globalStyles;
