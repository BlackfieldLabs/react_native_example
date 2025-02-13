import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Theme
import { COLORS, HEIGHT } from "../../styles/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
//Screens
import SignUpScreen from "../../screens/SignUpScreen";
import LoginScreen from "../../screens/LoginScreen";
import SettingsScreen from "../../screens/SettingsScreen";
//Localization
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { t } = useTranslation();
    const settingsTitle = t('settingsTitle');
    const signUpTitle = t('signUpButton');
    const loginTitle = t('loginButton');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";

          if (route.name === "SignUp") iconName = "login";
          else if (route.name === "Login") iconName = "person-add";
          else if (route.name === settingsTitle) iconName = "settings";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.navigation, height: HEIGHT.button },
      })}
    >
      <Tab.Screen name={signUpTitle} component={SignUpScreen} />
      <Tab.Screen name={loginTitle} component={LoginScreen} />
      <Tab.Screen name={settingsTitle} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
