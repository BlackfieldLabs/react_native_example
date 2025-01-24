import React, { createContext, useState, useContext, ReactNode } from 'react';
import CustomAlert from './CustomAlert';
import { AlertType } from './AlertTypes';

export type AlertOptions = {
  onConfirm?: () => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
};

type AlertContextType = {
  showAlert: (type: AlertType, message: string, options?: AlertOptions) => void;
  hideAlert: () => void;
  createSingleButtonAlert: (
    type: AlertType, 
    message: string, 
    onConfirm: () => void) 
    => void;
  createTwoButtonAlert: (
    type: AlertType,
    message: string,
    onCancel: () => void,
    onConfirm: () => void
  ) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>(AlertType.Warning);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOptions, setAlertOptions] = useState<AlertOptions | undefined>();

  const showAlert = (type: AlertType, message: string, options?: AlertOptions) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOptions(options);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    console.log(`[${new Date().toLocaleString()}] CustomAlertManager - Hiding alert`);
    setAlertVisible(false);
    console.log(`[${new Date().toLocaleString()}] Current alertVisible: ${alertVisible}`);
    setAlertType(AlertType.Warning);
    setAlertMessage('');
    setAlertOptions(undefined);
    console.log(`[${new Date().toLocaleString()}] CustomAlertManager - hideAlert`);
  };

  const createSingleButtonAlert = (type: AlertType, message: string, onConfirm: () => void) => {
    showAlert(type, message, {
      onConfirm: () => {
        onConfirm();
        hideAlert();
      },
      hideCancelButton: true,
    });
  };

  const createTwoButtonAlert = (
    type: AlertType,
    message: string,
    onCancel: () => void,
    onConfirm: () => void
  ) => {
    showAlert(type, message, {
      onCancel: () => {
        onCancel();
        hideAlert();
      },
      onConfirm: () => {
        onConfirm();
        hideAlert();
      },
    });
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
        createSingleButtonAlert,
        createTwoButtonAlert,
      }}
    >
      {children}
      <CustomAlert
        type={alertType}
        message={alertMessage}
        visible={alertVisible}
        onClose={alertOptions?.onCancel}
        onConfirm={alertOptions?.onConfirm}
        hideCancelButton={alertOptions?.hideCancelButton} // Pass the hideCancelButton prop
      />
    </AlertContext.Provider>
  );
};
