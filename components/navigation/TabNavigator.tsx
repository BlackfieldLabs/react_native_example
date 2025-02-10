import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

// Import your existing screens
import LoginScreen from "../../screens/LoginScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import MainLayout from "../../screens/MainLayout";
import BeneficiaryScreen from "../../screens/BeneficiaryScreen";
import ChartsScreen from "../../screens/ChartsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home"; // Default icon

          if (route.name === "Login") iconName = "login";
          else if (route.name === "SignUp") iconName = "person-add";
          else if (route.name === "Main") iconName = "dashboard";
          else if (route.name === "Beneficiary") iconName = "group";
          else if (route.name === "Charts") iconName = "bar-chart";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white", height: 60 },
      })}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="Main" component={MainLayout} />
      <Tab.Screen name="Beneficiary" component={BeneficiaryScreen} />
      <Tab.Screen name="Charts" component={ChartsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
