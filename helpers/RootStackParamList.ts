import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginPage: undefined;
  SignUpPage: undefined;
  MainLayout: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RoutePropType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
