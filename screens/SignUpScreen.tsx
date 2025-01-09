import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView } from 'react-native';
    //Styles
import sharedStyles from '../styles/sharedStyles';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <Text style={sharedStyles.titleStyle}>Sign Up</Text>
      {/* Add your sign-up form here */}
    </SafeAreaView>
  );
};

export default SignUpScreen;
