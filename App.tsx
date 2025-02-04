import React from 'react';
import LoginPage from './screens/LoginPage';
import MainLayout from './screens/MainLayout';
//Localization
import { getText } from './localization/localization';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
//Theme
import { COLORS, FONT_SIZES, FONTS, HEIGHT } from './styles/theme';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './helpers/RootStackParamList';
import SignUpPage from './screens/SignUpPage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginPage"
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
            name="LoginPage"
            component={LoginPage}
            options={
              { title: getText('loginButton'), headerShown: false }
            }
          />
          <Stack.Screen
            name="MainLayout"
            component={MainLayout}
            options={{
              title: getText('mainLayoutTitle'),
            }}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{ title: getText('signUpScreenTitle') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
