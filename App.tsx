import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Theme
import { COLORS, FONT_SIZES, FONTS, HEIGHT } from './styles/theme';
import sharedStyles from './styles/sharedStyles';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./localization/i18n";
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
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import InstallationScreen from './screens/InstallationScreen';
import BeneficiaryScreen from './screens/BeneficiaryScreen';
import CameraComponent from './screens/CameraComponent';
import ChartsScreen from './screens/ChartsScreen';
import TabNavigator from './components/navigation/TabNavigator';
//Helpers
import { RootStackParamList } from './helpers/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={sharedStyles.settingsIconButton}
      onPress={() => navigation.navigate('Settings')}
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
                backgroundColor: COLORS.navigation,
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
                { title: t("loginButton"), headerShown: false }
              }
            />
            <Stack.Screen
              name="Main"
              component={MainLayout}
              options={{
                title: t("mainLayoutTitle"),
                headerRight: () => <SettingsIcon />,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: t("signUpScreenTitle") }}
            />
            <Stack.Screen
              name="SelectRole"
              component={RoleSelectionScreen}
              options={{ title: t("roleSelectionTitle") }}
            />
            <Stack.Screen
              name="Installation"
              component={InstallationScreen}
              options={{ title: t('installationTitle') }}
            />
            <Stack.Screen
              name="Beneficiary"
              component={BeneficiaryScreen}
              options={{ title: t("beneficiaryTitle") }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraComponent}
              options={{ title: t("mobileCameraViewTitle") }}
            />
            <Stack.Screen
              name="Charts"
              component={ChartsScreen}
              options={{ title: t("chartsTitle") }}
            />
            <Stack.Screen
              name="Settings"
              component={TabNavigator}
              options={{ title: t("settingsTitle") }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider >
    </I18nextProvider>
  );
};

export default App;
