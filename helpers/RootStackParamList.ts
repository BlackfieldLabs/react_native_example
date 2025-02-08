import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraMode } from '../components/CameraComponent';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  Camera: {
    mode: CameraMode;
    onPhotoTaken?: (uri: string) => void;
  };
  Charts: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RoutePropType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
