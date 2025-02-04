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
import { getText } from '../../localization/localization';
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
              <Text style={sharedStyles.buttonText}>{getText('okButtonTitle')}</Text>
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
              <Text style={sharedStyles.buttonText}>{getText('cancelButtonTitle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[sharedStyles.button, sharedStyles.primaryButton]}
                    onPress={() => {
                        console.log(`[${new Date().toLocaleString()}] CustomAlert - OK button clicked`);
                        onConfirm?.();
                    }}
                >
                    <Text style={sharedStyles.buttonText}>{getText('okButtonTitle')}</Text>
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
                ? getText('errorTitle')
                : type === AlertType.Warning
                ? getText('warningTitle')
                : getText('pleaseWaitTitle')}
            </Text>
            <Text style={sharedStyles.message}>{message}</Text>
            {renderButtons()}
          </View>
        </View>
      </Modal>
    );
  };

export default CustomAlert;