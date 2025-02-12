import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
//Localization
import { useTranslation } from "react-i18next";
//Styles
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
//Components
import PasswordInputBox from '../components/textbox/PasswordInputBox';
import TextInputBox from '../components/textbox/TextInputBox';
import AccentButton from '../components/button/AccentButton';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
import { CameraMode } from '../components/CameraComponent';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  // State variables for all inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [city, setCity] = useState('');
  const [streetAndNumber, setStreetAndNumber] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleCreateUser = () => {
    console.log(`[${new Date().toLocaleString()}] Create User button pressed`);
    console.log({
      username,
      password,
      repeatPassword,
      name,
      familyName,
      email,
      telephone,
      city,
      streetNumber: streetAndNumber,
      state,
      zipCode,
    });
  };

  const handleCameraButton = () => {
    console.log(`[${new Date().toLocaleString()}] Camera button pressed`);
    navigation.navigate('Camera', { mode: CameraMode.PHOTO });
  };

  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Account Information Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('SignUpPage.accountInfoTitle')}</Text>
          <TextInputBox
            placeholder={t('LoginPage.usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
          />
          <PasswordInputBox
            placeholder={t('LoginPage.passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInputBox
            placeholder={t('SignUpPage.repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>

        {/* Personal Details Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('SignUpPage.personalDetailsTitle')}</Text>
          <TextInputBox
            placeholder={t('SignUpPage.namePlaceholder')}
            value={name}
            onChangeText={setName}
          />
          <TextInputBox
            placeholder={t('SignUpPage.familyNamePlaceholder')}
            value={familyName}
            onChangeText={setFamilyName}
          />
          <TextInputBox
            placeholder={t('SignUpPage.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInputBox
            placeholder={t('SignUpPage.telephonePlaceholder')}
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="numeric"
          />
        </View>

        {/* Address Information Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('SignUpPage.addressInfoTitle')}</Text>
          <TextInputBox
            placeholder={t('SignUpPage.cityPlaceholder')}
            value={city}
            onChangeText={setCity}
          />
          <TextInputBox
            placeholder={t('SignUpPage.streetAndNumberPlaceholder')}
            value={streetAndNumber}
            onChangeText={setStreetAndNumber}
          />
          <TextInputBox
            placeholder={t('SignUpPage.statePlaceholder')}
            value={state}
            onChangeText={setState}
          />
          <TextInputBox
            placeholder={t('SignUpPage.zipCodePlaceholder')}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        {/* Create User Button */}
        <AccentButton title={t('SignUpPage.createUserButton')} onAccentButtonPress={handleCreateUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signUpSection: {
    marginBottom: 24,
    width: '100%',
  },
  signUpSectionTitle: {
    fontSize: FONT_SIZES.large,
    fontFamily: FONTS.regular,
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  scrollContainer: {
    padding: 16,
  },
});

export default SignUpScreen;
