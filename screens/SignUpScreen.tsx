import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView } from 'react-native';
//Styles
import sharedStyles from '../styles/sharedStyles';
//Localization
import { getText } from '../localization/localization';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <Text style={sharedStyles.titleStyle}>{getText('signUpScreenTitle')}</Text>
      {/* Add your sign-up form here */}
    </SafeAreaView>
  );
};

export default SignUpScreen;
