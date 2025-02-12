import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../localization/i18n";
//Styles
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
//Components
import PasswordInputBox from '../components/textbox/PasswordInputBox';
import TextInputBox from '../components/textbox/TextInputBox';
import AccentButton from '../components/button/AccentButton';
import SecondaryButton from '../components/button/SecondaryButton';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
import { CameraMode } from './CameraComponent';

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
    navigation.navigate('SelectRole');
  };

  const handleCameraButton = () => {
    console.log(`[${new Date().toLocaleString()}] Camera button pressed`);
    navigation.navigate('Camera', {mode: CameraMode.PHOTO});
  };

  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
        {/* Account Information Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('accountInfoTitle')}</Text>
          <TextInputBox
            placeholder={t('usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
          />
          <PasswordInputBox
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInputBox
            placeholder={t('repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>

        {/* Personal Details Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('personalDetailsTitle')}</Text>
          <TextInputBox
            placeholder={t('namePlaceholder')}
            value={name}
            onChangeText={setName}
          />
          <TextInputBox
            placeholder={t('familyNamePlaceholder')}
            value={familyName}
            onChangeText={setFamilyName}
          />
          <TextInputBox
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInputBox
            placeholder={t('telephonePlaceholder')}
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="numeric"
          />
        </View>

        {/* Address Information Section */}
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionTitle}>{t('addressInfoTitle')}</Text>
          <TextInputBox
            placeholder={t('cityPlaceholder')}
            value={city}
            onChangeText={setCity}
          />
          <TextInputBox
            placeholder={t('streetAndNumberPlaceholder')}
            value={streetAndNumber}
            onChangeText={setStreetAndNumber}
          />
          <TextInputBox
            placeholder={t('statePlaceholder')}
            value={state}
            onChangeText={setState}
          />
          <TextInputBox
            placeholder={t('zipCodePlaceholder')}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        {/* Camera Button */}
        <SecondaryButton title={t('verifyRealUserButton')} onSecondaryButtonPress={handleCameraButton} />

        {/* Create User Button */}
        <AccentButton title={t('createUserButton')} onAccentButtonPress={handleCreateUser} />
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
});

export default SignUpScreen;
