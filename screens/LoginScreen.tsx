import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { COLORS, HEIGHT } from '../styles/theme';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
//Components
import AccentButton from '../components/button/AccentButton';
import SecondaryButton from '../components/button/SecondaryButton';
import TextInputBox from '../components/textbox/TextInputBox';
import PasswordInputBox from '../components/textbox/PasswordInputBox';
//Styles
import sharedStyles from '../styles/sharedStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Localization
import { getText } from '../localization/localization';
//API Call
import APIService from '../services/APIService';
import { isTokenValid } from '../services/APIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
//Storage
import SecureStorage from '../helpers/SecureStorage';

const LoginScreen = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const checkToken = async () => {
            console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - checkToken on app start`);
            const token = await SecureStorage.getToken();
            const timestampString = await SecureStorage.getData(SecureStorage.Keys.TokenTimestamp);

            if (token && timestampString) {
                const valid = await isTokenValid();
                if (valid) {
                    console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - Token is valid.`);
                    navigation.navigate('Main');
                } else {
                    await SecureStorage.deleteToken();
                    await SecureStorage.deleteData(SecureStorage.Keys.TokenTimestamp);
                    console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - Token invalid.`);
                }
            }
        };
        checkToken();
    }, []);

    const signInPressed = async () => {
        try {
            console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - signInPressed.`);
            const uuidString = uuidv4();
            const response = await APIService.checkCredentials(username, password, '001', uuidString);

            if (response?.access_token) {
                const token = response.access_token;

                await SecureStorage.saveTokenWithTimestamp(token);
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Token is stored on checkCredentials response.`);

                navigation.navigate('Main');
            } else {
                console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - Token not found in the response: `, response);
            }
        } catch (error) {
            console.log(`[${new Date().toLocaleString()}] [${new Date().toLocaleString()}] LoginScreen - Error during checkCredentials: `, error);
        }
    };

    const signUpPressed = () => {
        console.log(`[${new Date().toLocaleString()}] signUpPressed`);
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView style={sharedStyles.containerStyle}>
            <ImageBackground
                source={require('../assets/login_background.png')}
                style={sharedStyles.backgroundImageContainerStyle}
            >
                <View style={sharedStyles.roundBottomContainerViewStyle}>
                    {/* Image */}
                    <Icon
                        name={'account-circle'}
                        size={HEIGHT.image}
                        color={COLORS.accent}
                    />
                    {/* Title */}
                    <Text style={sharedStyles.titleStyle}>{getText('appTitle')}</Text>
                    {/* Subtitle */}
                    <Text style={sharedStyles.subtitleStyle}>{getText('appSubtitle')}</Text>
                    {/* Username Input */}
                    <TextInputBox
                        placeholder={getText('usernamePlaceholder')}
                        value={username}
                        onChangeText={setUsername}
                    />
                    {/* Password Input */}
                    <PasswordInputBox
                        placeholder={getText('passwordPlaceholder')}
                        value={password}
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
};

export default LoginScreen;
