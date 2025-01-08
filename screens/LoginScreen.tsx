import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
//API Call
import VoiceAskAPIService from '../services/VoiceAskAPIService';
//UUID
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

let globalToken: string | null = null;

const LoginScreen = (navigation: { navigate: (arg0: string, arg1: { name: string; }) => void; }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const[token, setToken] = useState<string> ('');

    // Call checkCredentials and save the token
    const signInPressed = async () => {
        try {
            console.log('LoginScreen - Initializing token...');
            const uuidString = uuidv4();
            //setUsername('anandk');
            //setPassword('anandk_7');
            const response = await VoiceAskAPIService.checkCredentials('anandk', 'anandk_7', '001', uuidString);

            if (response?.access_token) {
                console.log('LoginScreen - Token received:', response.access_token);
                setToken(response.access_token);
                globalToken = response.access_token;//TODO: tamara - Open MainLayout if token is acquired and do error handling
                console.log('LoginScreen - Token is stored - NOT SECURE!');
                navigation.navigate('Profile', {name: 'Jane'})
            } else {
                console.error('LoginScreen - Token not found in the response:', response);
            }
        } catch (error) {
            console.error('LoginScreen - Error during checkCredentials:', error);
        }
    };

    const signUpPressed = () => {
        console.log('signUpPressed');
    }

return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
            source={require('../assets/login_background.png')}
            style={styles.backgroundImage}
        >
        <View style={styles.bottomHalf}>
            {/* Image */}
            <Image
                source={require('../assets/login_user.png')}
                style={styles.image}
                resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>WellNuo</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>So you know they are well</Text>

            {/* Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                //value={username} // Bind to state
                value='anandk'
                onChangeText={setUsername} // Update state on text change
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                //value={password} // Bind to state
                value='anandk_7'
                onChangeText={setPassword} // Update state on text change
            />

            {/* Sign In Button */}
            <TouchableOpacity 
                style={styles.button}
                onPress={signInPressed}
                >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity 
                style={styles.buttonSecondary}
                onPress={signUpPressed}
                >
                <Text style={styles.buttonSecondaryText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf0fd',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    bottomHalf: {
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginTop: 'auto', // Push the content to the bottom half
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20, // Add space from the bottom
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4281d3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonSecondary: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#4281d3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonSecondaryText: {
        fontSize: 16,
        color: '#4281d3',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
