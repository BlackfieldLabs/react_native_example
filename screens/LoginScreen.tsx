import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
//Components
import AccentButton from '../components/button/AccentButton';
import SecondaryButton from '../components/button/SecondaryButton';
import TextInputBox from '../components/textbox/TextInputBox';
import PasswordInputBox from '../components/textbox/PasswordInputBox';
//Styles
import sharedStyles from '../styles/sharedStyles';
//Localization
import { getText } from '../localization/localization';
//API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Call checkCredentials and save the token
    const signInPressed = async () => {
        try {
            console.log('LoginScreen - Initializing token...');
            const uuidString = uuidv4();
            //setUsername('anandk');
            //setPassword('anandk_7');
            const response = await VoiceAskAPIService.checkCredentials(username, password, '001', uuidString);

            if (response?.access_token) {
                const token = response.access_token;
                console.log('LoginScreen - Token is stored - NOT SECURE! Token: ', token);
                navigation.navigate('Main', {token});
            } else {
                console.error('LoginScreen - Token not found in the response:', response);
            }
        } catch (error) {
            console.error('LoginScreen - Error during checkCredentials:', error);
        }
    };

    const signUpPressed = () => {
        console.log('signUpPressed');
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView style={sharedStyles.containerStyle}>
            <ImageBackground
                source={require('../assets/login_background.png')}
                style={sharedStyles.backgroundImageContainerStyle}
            >
                <View style={sharedStyles.roundBottomContainerViewStyle}>
                    {/* Image */}
                    <Image
                        source={require('../assets/login_user.png')}
                        style={sharedStyles.imageStyle}
                        resizeMode="contain"
                    />
                    {/* Title */}
                    <Text style={sharedStyles.titleStyle}>{getText('appTitle')}</Text>
                    {/* Subtitle */}
                    <Text style={sharedStyles.subtitleStyle}>{getText('appSubtitle')}</Text>
                    {/* Username Input */}
                    <TextInputBox
                        placeholder= {getText('usernamePlaceholder')}
                        value={username}//'anandk'//
                        onChangeText={setUsername}
                    />
                    {/* Password Input */}
                    <PasswordInputBox
                        placeholder={getText('passwordPlaceholder')}
                        value={password}//'anandk_7'//
                        onChangeText={setPassword}
                        //secureTextEntry
                    />
                    {/* Sign In Button */}
                    <AccentButton title={getText('loginButton')} onAccentButtonPress={signInPressed} />
                    {/* Sign Up Button */}
                    <SecondaryButton title={getText('signUpButton')} onSecondaryButtonPress={signUpPressed} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default LoginScreen;
