import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
//Localization
import { getText } from '../localization/localization';
//Styles
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
        <View style={sharedStyles.signUpSection}>
          <Text style={sharedStyles.signUpSectionTitle}>{getText('accountInfoTitle')}</Text>
          <TextInputBox
            placeholder={getText('usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
          />
          <PasswordInputBox
            placeholder={getText('passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInputBox
            placeholder={getText('repeatPasswordPlaceholder')}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>

        {/* Personal Details Section */}
        <View style={sharedStyles.signUpSection}>
          <Text style={sharedStyles.signUpSectionTitle}>{getText('personalDetailsTitle')}</Text>
          <TextInputBox
            placeholder={getText('namePlaceholder')}
            value={name}
            onChangeText={setName}
          />
          <TextInputBox
            placeholder={getText('familyNamePlaceholder')}
            value={familyName}
            onChangeText={setFamilyName}
          />
          <TextInputBox
            placeholder={getText('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInputBox
            placeholder={getText('telephonePlaceholder')}
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="numeric"
          />
        </View>

        {/* Address Information Section */}
        <View style={sharedStyles.signUpSection}>
          <Text style={sharedStyles.signUpSectionTitle}>{getText('addressInfoTitle')}</Text>
          <TextInputBox
            placeholder={getText('cityPlaceholder')}
            value={city}
            onChangeText={setCity}
          />
          <TextInputBox
            placeholder={getText('streetAndNumberPlaceholder')}
            value={streetAndNumber}
            onChangeText={setStreetAndNumber}
          />
          <TextInputBox
            placeholder={getText('statePlaceholder')}
            value={state}
            onChangeText={setState}
          />
          <TextInputBox
            placeholder={getText('zipCodePlaceholder')}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        {/* Camera Button */}
        <SecondaryButton title={getText('verifyRealUserButton')} onSecondaryButtonPress={handleCameraButton} />

        {/* Create User Button */}
        <AccentButton title={getText('createUserButton')} onAccentButtonPress={handleCreateUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
