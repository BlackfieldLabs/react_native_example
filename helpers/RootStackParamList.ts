import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Device as BleDevice } from 'react-native-ble-plx';
import { CameraMode } from '../screens/CameraComponent';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  SelectRole: undefined;
  Installation: undefined;
  Beneficiary: { 
    scannedDevices: BleDevice[]
  };
  Camera: {
    mode: CameraMode;
    onPhotoTaken?: (uri: string) => void;
  };
  Charts: undefined;
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RoutePropType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
