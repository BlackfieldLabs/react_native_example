import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import { COLORS, HEIGHT, BORDERS } from '../styles/theme';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
//Components
import AccentButton from '../components/button/AccentButton';
import SecondaryButton from '../components/button/SecondaryButton';
import TextInputBox from '../components/textbox/TextInputBox';
import PasswordInputBox from '../components/textbox/PasswordInputBox';
import { useAlert } from '../components/alert/CustomAlertManager';
import { AlertType } from '../components/alert/AlertTypes'
//Styles
import sharedStyles from '../styles/sharedStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Localization
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../localization/i18n";
//API Call
import APIService from '../services/APIService';
import { isTokenValid } from '../services/APIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
//Storage
import SecureStorage from '../helpers/SecureStorage';

const LoginScreen = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();
    const { showAlert, createSingleButtonAlert, hideAlert } = useAlert();

    useEffect(() => {
        const checkToken = async () => {
            console.log(`[${new Date().toLocaleString()}] LoginScreen - checkToken on app start`);
            const token = await SecureStorage.getToken();
            const timestampString = await SecureStorage.getData(SecureStorage.Keys.TokenTimestamp);
            if (token && timestampString) {
                const valid = await isTokenValid();
                if (valid) {
                    console.log(`[${new Date().toLocaleString()}] LoginScreen - Token is valid.`);
                    navigation.navigate('Main');
                } else {
                    await SecureStorage.deleteToken();
                    await SecureStorage.deleteData(SecureStorage.Keys.TokenTimestamp);
                    console.log(`[${new Date().toLocaleString()}] LoginScreen - Token invalid.`);
                }
            }
        };
        checkToken();
    }, []);

    const signInPressed = async () => {
        console.log(`[${new Date().toLocaleString()}] LoginScreen - Empty username or password? `, username.trim(), password.trim());
        if (username.trim() === '' || password.trim() === '') {
            createSingleButtonAlert(AlertType.Warning, t('messageEmptyLogin'), () => {
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Empty username or password.`);
            });
            return;
        }
        try {
            showAlert(AlertType.Progress, t('messageLogin'));
            console.log(`[${new Date().toLocaleString()}] LoginScreen - signInPressed.`);
            //const uuidString = uuidv4();
            navigation.navigate('Main');
            hideAlert();
            /*const response = await APIService.checkCredentials(username, password, '001', uuidString);
            if (response?.access_token) {
                const token = response.access_token;
                hideAlert();
                await SecureStorage.saveTokenWithTimestamp(token);
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Token is stored on checkCredentials response.`);
                navigation.navigate('Main');
            } else {
                hideAlert();
                createSingleButtonAlert(AlertType.Error, getText('messageWrongCredentials'), () => {
                    console.log(`[${new Date().toLocaleString()}] LoginScreen - Incorrect username or password <3.`);
                    hideAlert();
                    console.log(`[${new Date().toLocaleString()}] LoginScreen - Hide alert should be called.`);
                });
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Token not found in the response: `, response);
            }*/
        } catch (error) {
            hideAlert();
            createSingleButtonAlert(AlertType.Error, t('messageWrongCredentials'), () => {
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Incorrect username or password.`);
                hideAlert();
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Hide alert should be called.`);
            });
            console.log(`[${new Date().toLocaleString()}] LoginScreen - Error during checkCredentials: `, error);
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
                style={styles.backgroundImageContainerStyle}
            >
                <View style={styles.roundBottomContainerViewStyle}>
                    {/* Image */}
                    <Icon
                        name={'account-circle'}
                        size={HEIGHT.image}
                        color={COLORS.accent}
                    />
                    {/* Title */}
                    <Text style={sharedStyles.titleStyle}>{t('appTitle')}</Text>
                    {/* Subtitle */}
                    <Text style={sharedStyles.subtitleStyle}>{t('appSubtitle')}</Text>
                    {/* Username Input */}
                    <TextInputBox
                        placeholder={t('usernamePlaceholder')}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    {/* Password Input */}
                    <PasswordInputBox
                        placeholder={t('passwordPlaceholder')}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    //secureTextEntry
                    />
                    {/* Sign In Button */}
                    <AccentButton title={t('loginButton')} onAccentButtonPress={signInPressed} />
                    {/* Sign Up Button */}
                    <SecondaryButton title={t('signUpButton')} onSecondaryButtonPress={signUpPressed} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    roundBottomContainerViewStyle: {
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        borderRadius: BORDERS.radiusExtraLarge,
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginTop: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    backgroundImageContainerStyle: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default LoginScreen;
