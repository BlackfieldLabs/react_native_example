import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { COLORS, HEIGHT, BORDERS, FONT_SIZES, FONTS, SPACING } from '../styles/theme';
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
import { getText } from '../localization/localization';
//API Call
import APIService from '../services/APIService';
import { isTokenValid } from '../services/APIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
//Storage
import SecureStorage from '../helpers/SecureStorage';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();
    const { showAlert, createSingleButtonAlert, hideAlert } = useAlert();

    useEffect(() => {
        /*const checkToken = async () => {
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
        checkToken();*/
    }, []);

    const signInPressed = async () => {
        console.log(`[${new Date().toLocaleString()}] LoginScreen - Empty username or password? `, username.trim(), password.trim());
        if (username.trim() === '' || password.trim() === '') {
            createSingleButtonAlert(AlertType.Warning, getText('messageEmptyLogin'), () => {
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Empty username or password.`);
            });
            return;
        }
        navigation.navigate('Main');
        /*try {
            showAlert(AlertType.Progress, getText('messageLogin'));
            console.log(`[${new Date().toLocaleString()}] LoginScreen - signInPressed.`);
            const uuidString = uuidv4();
            const response = await APIService.checkCredentials(username, password, '001', uuidString);

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
            }
        } catch (error) {
            hideAlert();
            createSingleButtonAlert(AlertType.Error, getText('messageWrongCredentials'), () => {
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Incorrect username or password.`);
                hideAlert();
                console.log(`[${new Date().toLocaleString()}] LoginScreen - Hide alert should be called.`);
            });
            console.log(`[${new Date().toLocaleString()}] LoginScreen - Error during checkCredentials: `, error);
        }*/
    };

    const signUpPressed = () => {
        console.log(`[${new Date().toLocaleString()}] signUpPressed`);
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView style={sharedStyles.containerStyle}>
            <View style={styles.backgroundContainerStyle}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoStyle}
                />
                <Text style={styles.titleStyle}>{getText('welcomeTitle')}</Text>
                <Text style={styles.subtitleStyle}>{getText('welcomeMessage')}</Text>
                <View style={styles.roundContainerViewStyle}>
                    <TextInputBox
                        placeholder={getText('usernamePlaceholder')}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <PasswordInputBox
                        placeholder={getText('passwordPlaceholder')}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                    <AccentButton title={getText('loginButton')} onAccentButtonPress={signInPressed} />
                    <SecondaryButton title={getText('signUpButton')} onSecondaryButtonPress={signUpPressed} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create ({
    roundContainerViewStyle: {
        position: 'absolute',
        top: (2 / 5) * height,
        height: (2 / 5) * height,
        width: width - 2 * SPACING.medium,
        backgroundColor: COLORS.secondary,
        borderRadius: BORDERS.radiusExtraLarge,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: SPACING.medium,
        paddingTop: SPACING.medium,
        paddingRight: SPACING.medium,
        paddingBottom: SPACING.small,
        marginLeft: SPACING.medium,
        marginRight: SPACING.medium,
    },
    backgroundContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
    },
    logoStyle: {
        width: "60%",
        height: "10%",
        resizeMode: "contain",
        top: (1 / 5) * height,
    },
    titleStyle: {
        fontSize: FONT_SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.extraSmall,
    },
    subtitleStyle: {
        fontSize: FONT_SIZES.medium,
        fontFamily: FONTS.regular,
        color: COLORS.textPrimary,
        marginBottom: SPACING.medium,
    },
});

export default LoginScreen;
