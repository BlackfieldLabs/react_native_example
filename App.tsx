import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainLayout from './screens/MainLayout';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log('App - App start!');
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Profile" component={MainLayout} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default App;
