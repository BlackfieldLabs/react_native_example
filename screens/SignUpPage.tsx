import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
//Localization
import { useTranslation } from 'react-i18next';
//Styles
import globalStyles from '../styles/globalStyles';
//Components
import PasswordInputBox from '../components/textbox/PasswordInputBox';
import TextInputBox from '../components/textbox/TextInputBox';
import AccentButton from '../components/button/AccentButton';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';

const SignUpPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

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
    //navigation.navigate('Camera', {mode: CameraMode.PHOTO});
  };

  return (
    <SafeAreaView style={globalStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        {/* Account Information Section */}
        <View style={globalStyles.signUpSection}>
          <Text style={globalStyles.signUpSectionTitle}>{t('SignUpPage.signUpButton')}</Text>
          <TextInputBox
            placeholder={t('SignUpPage.usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
          />
          <PasswordInputBox
            placeholder={t('SignUpPage.passwordPlaceholder')}
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
        <View style={globalStyles.signUpSection}>
          <Text style={globalStyles.signUpSectionTitle}>{t('SignUpPage.personalDetailsTitle')}</Text>
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
        <View style={globalStyles.signUpSection}>
          <Text style={globalStyles.signUpSectionTitle}>{t('SignUpPage.addressInfoTitle')}</Text>
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

export default SignUpPage;