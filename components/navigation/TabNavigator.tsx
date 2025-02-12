import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Theme
import { COLORS, HEIGHT } from "../../styles/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
//Screens
import SignUpScreen from "../../screens/SignUpScreen";
import LoginScreen from "../../screens/LoginScreen";
import ChartsScreen from "../../screens/ChartsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";

          if (route.name === "SignUp") iconName = "login";
          else if (route.name === "Login") iconName = "person-add";
          else if (route.name === "Graphs") iconName = "show-chart";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.navigation, height: HEIGHT.button },
      })}
    >
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Graphs" component={ChartsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
