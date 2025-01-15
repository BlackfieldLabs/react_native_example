import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
//Localization
import { getText } from '../localization/localization';
//Styles
import sharedStyles from '../styles/sharedStyles';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme';
//Components
import PasswordInputBox from '../components/textbox/PasswordInputBox';
import TextInputBox from '../components/textbox/TextInputBox';
import AccentButton from '../components/button/AccentButton';
import SecondaryButton from '../components/button/SecondaryButton';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';

const SignUpScreen = () => {

  const navigation = useNavigation<NavigationProp>();
  const handleCreateUser = () => {
    console.log('Create User button pressed');
    navigation.navigate('SelectRole');
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
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginBottom: 12,
    color: COLORS.textSecondary,
  },
  
});

export default SignUpScreen;
