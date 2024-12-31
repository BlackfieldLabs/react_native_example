import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigation = useNavigation(); // Get navigation object

  const handleLogin = async () => {
    try {
      // Mock API call
      const response = await new Promise<{ token: string }>((resolve) =>
        setTimeout(() => resolve({ token: 'mock-jwt-token' }), 1000)
      );

      Alert.alert(`Login Successful`, `Welcome, ${email}\nToken: ${response.token}`);

      // Redirect to MainLayout
      navigation.navigate('MainLayout');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./img/blackfield.png')} // Replace with your logo's path
          style={styles.logo}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} // Bind state to input
        onChangeText={setEmail} // Update state on change
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password} // Bind state to input
        onChangeText={setPassword} // Update state on change
      />
      <Button
        title="Login"
        onPress={handleLogin} // Call handleLogin with state values
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: 'contain',
  },
});

export default LoginPage;
