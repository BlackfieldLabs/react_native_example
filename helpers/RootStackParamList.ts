import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Device } from '../helpers/Device';
import { CameraMode } from '../screens/CameraComponent';

// Define your ParamList
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;//{ token: string }; // `Main` expects a `token` parameter
  SelectRole: undefined;
  Installation: undefined;
  Beneficiary: { devices: Device[]};
  Camera: {
    mode: CameraMode;
    onPhotoTaken?: (uri: string) => void;
  };
};

// Type for `useNavigation`
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Type for `route`
export type RoutePropType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
