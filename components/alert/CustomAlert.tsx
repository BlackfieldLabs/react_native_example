import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//Styles
import sharedStyles from '../../styles/sharedStyles';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../localization/i18n";
//Helpers
import { AlertType } from './AlertTypes';

const { t } = useTranslation();

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
    const renderButtons = () => {
      if (type === AlertType.Progress) {
        return null;
      }
  
      if (hideCancelButton && onConfirm) {
        return (
          <View style={sharedStyles.buttonContainer}>
            <TouchableOpacity
              style={[sharedStyles.button, sharedStyles.primaryButton]}
              onPress={() => {
                console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                onConfirm?.();
            }}
            >
              <Text style={sharedStyles.buttonText}>{t('okButtonTitle')}</Text>
            </TouchableOpacity>
          </View>
        );
      }
  
      if (onClose && onConfirm) {
        // Two buttons (Cancel and OK)
        return (
          <View style={sharedStyles.buttonContainer}>
            <TouchableOpacity
              style={[sharedStyles.button, sharedStyles.destructiveButton]}
              onPress={onClose}
            >
              <Text style={sharedStyles.buttonText}>{t('cancelButtonTitle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[sharedStyles.button, sharedStyles.primaryButton]}
                    onPress={() => {
                        console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                        onConfirm?.();
                    }}
                >
                    <Text style={sharedStyles.buttonText}>{t('okButtonTitle')}</Text>
                </TouchableOpacity>
            </View>
        );
      }
      //No buttons if neither `onClose` nor `onConfirm` is defined
      return null; 
    };
  
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={sharedStyles.overlay}>
          <View style={sharedStyles.alertContainer}>
            <Text style={sharedStyles.title}>
              {type === AlertType.Error
                ? t('errorTitle')
                : type === AlertType.Warning
                ? t('warningTitle')
                : t('pleaseWaitTitle')}
            </Text>
            <Text style={sharedStyles.message}>{message}</Text>
            {renderButtons()}
          </View>
        </View>
      </Modal>
    );
  };

export default CustomAlert;