import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import WebViewComponent from '../components/WebViewComponent';
import SpeechRecognitionComponent from '../components/SpeechRecognitionComponent';

// API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';

// UUID
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// Placeholder components for other tabs
const PlaceholderScreen = ({title}) => (
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
      //   screenOptions={({ route }) => ({
      //     tabBarIcon: ({ color, size }) => {
      //       let iconName = '';
      //       if (route.name === 'Home') {
      //         iconName = 'home-outline';
      //       } else if (route.name === 'Search') {
      //         iconName = 'search-outline';
      //       } else if (route.name === 'Voice') {
      //         iconName = 'mic-outline';
      //       } else if (route.name === 'QR') {
      //         iconName = 'qr-code-outline';
      //       } else if (route.name === 'Profile') {
      //         iconName = 'person-outline';
      //       }
      //       console.log(iconName);
      //       return <Icon name={iconName} size={size} color={color} />;
      //     },
      //     tabBarActiveTintColor: '#00BFA6',
      //     tabBarInactiveTintColor: 'gray',
      //     tabBarStyle: {
      //       height: 70,
      //       paddingBottom: 10,
      //     },
      //   })}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let icon = '';

          if (route.name === 'Home') {
            icon = '🏠';
          } else if (route.name === 'Search') {
            icon = '🔍';
          } else if (route.name === 'Voice') {
            icon = '🎤';
          } else if (route.name === 'QR') {
            icon = '📷';
          } else if (route.name === 'Profile') {
            icon = '👤';
          }

          return <Text style={{fontSize: size, color}}>{icon}</Text>;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={() => <PlaceholderScreen title="Home" />}
      />
      <Tab.Screen
        name="Search"
        component={() => <PlaceholderScreen title="Search" />}
      />
      <Tab.Screen
        name="Voice"
        options={{
          tabBarLabel: '',
          tabBarIconStyle: {
            backgroundColor: '#00BFA6',
            borderRadius: 50,
            padding: 10,
          },
        }}>
        {() => (
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
              <WebViewComponent />
              <SpeechRecognitionComponent onResults={handleSpeechResults} />
            </View>
          </SafeAreaView>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="QR"
        component={() => <PlaceholderScreen title="QR" />}
      />
      <Tab.Screen
        name="Profile"
        component={() => <PlaceholderScreen title="Profile" />}
      />
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
