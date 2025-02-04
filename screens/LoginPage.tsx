// LoginPage.js
import React, { useState } from 'react';
import { View, TextInput, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import globalStyles from './styles/globalStyles';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      // Mock API call
      navigation.navigate('MainLayout');
    } catch (error) {
      Alert.alert(t('LoginPage.LoginFailed'), t('LoginPage.InvalidCredentials'));
    }
  };

  const handleSignup = () => {
    console.log(`[${new Date().toLocaleString()}] signUpPressed`);
    navigation.navigate('SignUpPage');
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.logoContainer}>
        <Image source={require('../assets/blackfield.png')} style={globalStyles.logo} />
      </View>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder={t('LoginPage.Email')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder={t('LoginPage.Password')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={globalStyles.primaryButton} onPress={handleLogin}>
        <Text style={globalStyles.primaryButtonText}>{t('LoginPage.Login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.secondaryButton} onPress={handleSignup}>
        <Text style={globalStyles.secondaryButtonText}>{t('LoginPage.Signup')}</Text>
      </TouchableOpacity>
      <Text style={globalStyles.divider}>{t('LoginPage.Or')}</Text>
      <TouchableOpacity style={globalStyles.secondaryButton}>
        <Text style={globalStyles.secondaryButtonText}>📞 {t('LoginPage.ContinueWithPhoneNumber')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
