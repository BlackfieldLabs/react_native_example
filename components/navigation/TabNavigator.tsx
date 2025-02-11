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

          if (route.name === "List") iconName = "list";
          else if (route.name === "Add Manually") iconName = "edit";
          else if (route.name === "Scan") iconName = "qr-code-scanner";
          else if (route.name === "Settings") iconName = "settings";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.border,
        tabBarInactiveTintColor: COLORS.accent,
        tabBarStyle: { backgroundColor: COLORS.secondary, height: HEIGHT.button },
      })}
    >
      <Tab.Screen name="List" component={SignUpScreen} />
      <Tab.Screen name="Add Manually" component={LoginScreen} />
      <Tab.Screen name="Scan" component={ChartsScreen} />
      <Tab.Screen name="Settings" component={ChartsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
