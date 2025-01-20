import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
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
//Screens
import LoginScreen from './screens/LoginScreen';
import MainLayout from './screens/MainLayout';
import SignUpScreen from './screens/SignUpScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import InstallationScreen from './screens/InstallationScreen';
import BeneficiaryScreen from './screens/BeneficiaryScreen';

const Stack = createNativeStackNavigator();

const SettingsIcon = () => {
  const navigation = useNavigation(); // Access navigation using the hook

  return (
    <TouchableOpacity
      style={sharedStyles.settingsIconButton}
      onPress={() => console.log('Settings item pressed')}
    >
      <Icon name="settings" size={HEIGHT.smallImage} color={COLORS.accent} />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animation: 'slide_from_right',
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: COLORS.navigation, // Background color for the navigation bar
          },
          headerTitleStyle: {
            fontFamily: FONTS.regular, // Custom font for the navigation bar title
            fontSize: FONT_SIZES.medium, // Font size
            color: COLORS.textPrimary, // Font color
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={
            { title: getText('loginButton'),  headerShown: false}
          }
        />
        <Stack.Screen
          name="Main"
          component={MainLayout}
          options={{ title: getText('mainLayoutTitle'),
            headerRight: () => <SettingsIcon />, 
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: getText('signUpScreenTitle') }}
        />
        <Stack.Screen
          name="SelectRole"
          component={RoleSelectionScreen}
          options={{ title: getText('roleSelectionTitle') }}
        />
        <Stack.Screen
          name="Installation"
          component={InstallationScreen}
          options={{ title: getText('installationTitle') }}
        />
        <Stack.Screen
          name="Beneficiary"
          component={BeneficiaryScreen}
          options={{ title: getText('beneficiaryTitle') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SettingsScreen = () => {
  // Placeholder for the settings screen
  return null;
};

export default App;
