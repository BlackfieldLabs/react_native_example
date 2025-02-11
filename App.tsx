import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Theme
import { COLORS, FONT_SIZES, FONTS, HEIGHT } from './styles/theme';
import sharedStyles from './styles/sharedStyles';
//Localization
import { getText } from './localization/localization';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
//Alert
import { AlertProvider } from './components/alert/CustomAlertManager';
//Screens
import LoginScreen from './screens/LoginScreen';
import MainLayout from './screens/MainLayout';
import SignUpScreen from './screens/SignUpScreen';
import CameraComponent from './components/CameraComponent';
import ChartsScreen from './screens/ChartsScreen';
//Helpers
import { RootStackParamList } from './helpers/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={style.settingsIconButton}
      onPress={() => console.log(`[${new Date().toLocaleString()}] Settings item pressed`)}
    >
      <Icon name="settings" size={HEIGHT.smallImage} color={COLORS.accent} />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <AlertProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: 'slide_from_right',
            gestureEnabled: true,
            headerStyle: {
              backgroundColor: COLORS.secondary,
            },
            headerTitleStyle: {
              fontFamily: FONTS.regular,
              fontSize: FONT_SIZES.medium,
              color: COLORS.textPrimary,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={
              { title: getText('loginButton'), headerShown: false }
            }
          />
          <Stack.Screen
            name="Main"
            component={MainLayout}
            options={{
              title: getText('mainLayoutTitle'),
              headerRight: () => <SettingsIcon />,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: getText('signUpScreenTitle') }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraComponent}
            options={{ title: getText('mobileCameraViewTitle') }}
          />
          <Stack.Screen
            name="Charts"
            component={ChartsScreen}
            options={{ title: getText('chartsTitle') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertProvider >
  );
};

const SettingsScreen = () => {
  // Placeholder for the settings screen
  return null;
};

const style = StyleSheet.create({
    settingsIconButton: {
        marginRight: 10,
    },
});

export default App;
