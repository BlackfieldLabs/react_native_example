import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//Styles
import globalStyles from '../../styles/globalStyles';
//Localization
import { useTranslation } from 'react-i18next';
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
    console.log(`[${new Date().toLocaleString()}] CustomAlert - visible prop:`, visible);
    const { t } = useTranslation();
    const renderButtons = () => {
      if (type === AlertType.Progress) {
        return null;
      }
  
      if (hideCancelButton && onConfirm) {
        return (
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={[globalStyles.buttonStyle, globalStyles.primaryButtonStyle]}
              onPress={() => {
                console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                onConfirm?.();
            }}
            >
              <Text style={globalStyles.buttonTextStyle}>{t('Alert.okButtonTitle')}</Text>
            </TouchableOpacity>
          </View>
        );
      }
  
      if (onClose && onConfirm) {
        // Two buttons (Cancel and OK)
        return (
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={[globalStyles.buttonStyle, globalStyles.destructiveButton]}
              onPress={onClose}
            >
              <Text style={globalStyles.buttonTextStyle}>{t('Alert.cancelButtonTitle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[globalStyles.buttonStyle, globalStyles.primaryButtonStyle]}
                    onPress={() => {
                        console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                        onConfirm?.();
                    }}
                >
                    <Text style={globalStyles.buttonTextStyle}>{t('Alert.okButtonTitle')}</Text>
                </TouchableOpacity>
            </View>
        );
      }
      //No buttons if neither `onClose` nor `onConfirm` is defined
      return null; 
    };
  
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={globalStyles.overlay}>
          <View style={globalStyles.alertContainer}>
            <Text style={globalStyles.titleStyle}>
              {type === AlertType.Error
                ? t('Alert.errorTitle')
                : type === AlertType.Warning
                ? t('Alert.warningTitle')
                : t('Alert.pleaseWaitTitle')}
            </Text>
            <Text style={globalStyles.message}>{message}</Text>
            {renderButtons()}
          </View>
        </View>
      </Modal>
    );
  };

export default CustomAlert;