import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Theme
import { COLORS, FONT_SIZES, FONTS, HEIGHT, SPACING } from './styles/theme';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./localization/i18n";
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Alert
import { AlertProvider } from './components/alert/CustomAlertManager';
//Screens
import LoginScreen from './screens/LoginScreen';
import MainLayout from './screens/MainLayout';
import SignUpScreen from './screens/SignUpScreen';
import CameraComponent from './components/CameraComponent';
import ChartsScreen from './screens/ChartsScreen';
import TabNavigator from './components/navigation/TabNavigator';
//Helpers
import { RootStackParamList } from './helpers/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsIcon = () => {
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
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
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
                { title: t('LoginPage.loginButton'), headerShown: false }
              }
            />
            <Stack.Screen
              name="Main"
              component={MainLayout}
              options={{
                title: t('NavigationTitles.mainLayoutTitle'),
                headerRight: () => <SettingsIcon />,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: t('SignUpPage.signUpScreenTitle') }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraComponent}
              options={{ title: t('NavigationTitles.mobileCameraViewTitle') }}
            />
            <Stack.Screen
              name="Charts"
              component={ChartsScreen}
              options={{ title: t('NavigationTitles.chartsTitle') }}
            />
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ title: t('NavigationTitles.mainLayoutTitle') }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider >
    </I18nextProvider>
  );
};

const style = StyleSheet.create({
  settingsIconButton: {
    marginRight: SPACING.small,
  },
});

export default App;
