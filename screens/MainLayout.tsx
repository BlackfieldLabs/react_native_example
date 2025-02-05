import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text, Image, ImageSourcePropType} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';

// UUID
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import NotificationsPage from './NotificationsPage';
import { COLORS } from '../styles/theme';

// Placeholder components for other tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{title}</Text>
  </View>
);


const Tab = createBottomTabNavigator();

const MainLayout = () => {
  const [speechResults, setSpeechResults] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const initializeToken = async () => {
    try {
      const uuidString = uuidv4();
      const response = await VoiceAskAPIService.checkCredentials(
        'anandk',
        'anandk_',
        '001',
        uuidString,
      );
      if (response?.token) {
        setToken(response.token);
      }
    } catch (error) {
      console.error('Error during token initialization:', error);
    }
  };

  const handleSpeechResults = (results: string[]) => {
    setSpeechResults(results);
    if (results.length > 0 && token) {
      const uuidString: string = uuidv4();
      askWellNuoAIQuestion('001', token, 'anandk', results[0], uuidString);
    }
  };

  const askWellNuoAIQuestion = async (
    clientId: string,
    token: string,
    userName: string,
    question: string,
    nonce: string,
  ) => {
    try {
      const response = await VoiceAskAPIService.askWellNuoAIQuestion(
        clientId,
        token,
        userName,
        question,
        nonce,
      );
      console.log('API Response:', response);
    } catch (error) {
      console.error('API Call Error:', error);
    }
  };

  useEffect(() => {
    // initializeToken();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconSource: ImageSourcePropType | null = null;

          // Assign PNG file paths based on the route name
          if (route.name === 'Home') {
            iconSource = require('../assets/icons/home-outline.png');
          } else if (route.name === 'Notifications') {
            iconSource = require('../assets/icons/notifications.png');
          } else if (route.name === 'Voice') {
            iconSource = require('../assets/icons/mic-outline.png');
          } else if (route.name === 'Workflow') {
            iconSource = require('../assets/icons/network.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/person-outline.png');
          }

          // Return an Image component for the icon
          return iconSource ? (
            <Image
              source={iconSource}
              style={{
                width: size || 24,
                height: size || 24,
                tintColor: color, // Apply color tint for active/inactive states
              }}
            />
          ) : null;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 50,
          paddingBottom: 0,
        },
      })}>
      <Tab.Screen name="Home">
        {() => <HomePage/>}
      </Tab.Screen>
      <Tab.Screen name="Notifications">
        {() => <NotificationsPage />}
      </Tab.Screen>
      <Tab.Screen name="Workflow">
        {() => <PlaceholderScreen title="Workflow" />}
      </Tab.Screen>
      <Tab.Screen name="Voice" options={{}}>
        {() => (
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
            </View>
          </SafeAreaView>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile" >
        {() => <ProfilePage />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainLayout;
