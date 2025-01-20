import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Device } from '../helpers/Device';

// Define your ParamList
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: { token: string }; // `Main` expects a `token` parameter
  SelectRole: undefined;
  Installation: undefined;
  Beneficiary: { devices: Device[]};
};

// Type for `useNavigation`
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Type for `route`
export type RoutePropType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
