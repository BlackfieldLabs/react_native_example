import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

const SignUpScreen = () => {
  const handleCreateUser = () => {
    console.log('Create User button pressed');
  };

  const handleCameraButton = () => {
    console.log('Camera button pressed');
  };

  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Account Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('accountInfoTitle')}</Text>
          <TextInputBox
            placeholder={getText('usernamePlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <PasswordInputBox
            placeholder={getText('passwordPlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <PasswordInputBox
            placeholder={getText('repeatPasswordPlaceholder')}
            value=""
            onChangeText={() => {}}
          />
        </View>

        {/* Personal Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('personalDetailsTitle')}</Text>
          <TextInputBox
            placeholder={getText('namePlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('familyNamePlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('emailPlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('telephonePlaceholder')}
            value=""
            onChangeText={() => {}}
          />
        </View>

        {/* Address Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('addressInfoTitle')}</Text>
          <TextInputBox
            placeholder={getText('cityPlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('streetNumberPlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('statePlaceholder')}
            value=""
            onChangeText={() => {}}
          />
          <TextInputBox
            placeholder={getText('zipCodePlaceholder')}
            value=""
            onChangeText={() => {}}
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

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'gray',
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createUserButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  createUserButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignUpScreen;
