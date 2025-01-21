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
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
//Storage
import SecureStorage from '../helpers/SecureStorage';

const LoginScreen = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const checkToken = async () => {
            const token = await SecureStorage.get(SecureStorage.Keys.AuthToken);
            const timestampString = await SecureStorage.get(SecureStorage.Keys.TokenTimestamp);

            if (token && timestampString) {
                const timestamp = parseInt(timestampString, 10);
                const currentTime = Date.now();
                const twentyFourHours = 24 * 60 * 60 * 1000;
                if (currentTime - timestamp <= twentyFourHours) {
                    navigation.navigate('Main');
                    return;
                }
            }
            setLoading(false);
        };
        checkToken();
    }, [navigation]);

    const signInPressed = async () => {
        try {
            console.log('LoginScreen - Initializing token...');
            const uuidString = uuidv4();
            const response = await APIService.checkCredentials(username, password, '001', uuidString);

            if (response?.access_token) {
                const token = response.access_token;

                await SecureStorage.saveTokenWithTimestamp(token);
                console.log('LoginScreen - Token is stored - NOT SECURE! Token: ', token);

                navigation.navigate('Main');
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
    };

    if (loading) {
        return (
            <View style={sharedStyles.containerStyle}>
                <ActivityIndicator size="large" color={COLORS.accent} />
                <Text>{getText('checkingCredentials')}</Text>
            </View>
        );
    }

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
