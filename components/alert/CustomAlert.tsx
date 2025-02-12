import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING, HEIGHT, BORDERS, FONTS } from '../../styles/theme';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";
//Helpers
import { AlertType } from './AlertTypes';

type CustomAlertProps = {
    type: AlertType;
    message: string;
    visible: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    hideCancelButton?: boolean;
  };
  
  const CustomAlert: React.FC<CustomAlertProps> = ({
    type,
    message,
    visible,
    onClose,
    onConfirm,
    hideCancelButton = false,
  }) => {
    const { t } = useTranslation();
    console.log(`[${new Date().toLocaleString()}] CustomAlert - visible prop:`, visible);
    const renderButtons = () => {
      if (type === AlertType.Progress) {
        return null;
      }
  
      if (hideCancelButton && onConfirm) {
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                onConfirm?.();
            }}
            >
              <Text style={styles.buttonText}>{t('okButtonTitle')}</Text>
            </TouchableOpacity>
          </View>
        );
      }
  
      if (onClose && onConfirm) {
        // Two buttons (Cancel and OK)
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.destructiveButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{t('cancelButtonTitle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={() => {
                        console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                        onConfirm?.();
                    }}
                >
                    <Text style={styles.buttonText}>{t('okButtonTitle')}</Text>
                </TouchableOpacity>
            </View>
        );
      }
      //No buttons if neither `onClose` nor `onConfirm` is defined
      return null; 
    };
  
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.title}>
              {type === AlertType.Error
                ? t('errorTitle')
                : type === AlertType.Warning
                ? t('warningTitle')
                : t('pleaseWaitTitle')}
            </Text>
            <Text style={styles.message}>{message}</Text>
            {renderButtons()}
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
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
});

export default CustomAlert;