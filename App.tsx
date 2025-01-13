import React from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './helpers/RootStackParamList';

// Screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainLayout from './screens/MainLayout';

// Localization
import { getText } from './localization/localization';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: getText('signUpScreenTitle') }}
        />
        <Stack.Screen
          name="Main"
          component={MainLayout}
          options={{ title: getText('mainLayoutTitle') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
