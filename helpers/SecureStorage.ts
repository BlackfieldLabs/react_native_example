/**
 * SecureStorage module for handling secure data storage using React Native Keychain.
 */
import * as Keychain from 'react-native-keychain';

/**
 * SecureStorage provides keys for storing authentication tokens and user credentials.
 */
class SecureStorage {
    static Keys = {
        AuthToken: 'authToken',
        TokenTimestamp: 'tokenTimestamp',
        UserId: 'userId',
        Username: 'username',
        Password: 'password',
        AppLanguage: 'appLanguage',
    };

    /**
     * Saves an authentication token along with a timestamp.
     * @param {string} token - The authentication token to be stored.
     * @returns {Promise<void>}
     */
    static async saveTokenWithTimestamp(token: string): Promise<void> {
        try {
            const timestamp = Date.now().toString();
            await SecureStorage.saveData(SecureStorage.Keys.TokenTimestamp, timestamp);
            await SecureStorage.saveToken(token);
            console.log(`[${new Date().toLocaleString()}] Saved data successfully.`);
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] Error saving token or timestamp:`, error);
        }
    }

    /**
     * Saves a token securely in the Keychain.
     * @param {string} value - The token value to be stored.
     * @returns {Promise<boolean>} - True if the token was saved successfully.
     */
    static async saveToken(value: string): Promise<boolean> {
        try {
            await Keychain.setGenericPassword(SecureStorage.Keys.AuthToken, value);
            console.log(`[${new Date().toLocaleString()}] SecureStorage: Successfully saved key: ${SecureStorage.Keys.AuthToken}`);
            return true;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: Error saving key: ${SecureStorage.Keys.AuthToken}`, error);
            return false;
        }
    }

    /**
     * Retrieves a stored authentication token from the Keychain.
     * @returns {Promise<string | null>} - The retrieved token or null if not found.
     */
    static async getToken(): Promise<string | null> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === SecureStorage.Keys.AuthToken) {
                console.log(`[${new Date().toLocaleString()}] SecureStorage: Successfully retrieved key: ${SecureStorage.Keys.AuthToken}`);
                return credentials.password;
            }
            console.log(`[${new Date().toLocaleString()}] SecureStorage: Key not found: ${SecureStorage.Keys.AuthToken}`);
            return null;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: Error retrieving key: ${SecureStorage.Keys.AuthToken}`, error);
            return null;
        }
    }

    /**
     * Deletes the authentication token from the Keychain.
     * @returns {Promise<void>}
     */
    static async deleteToken(): Promise<void> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === SecureStorage.Keys.AuthToken) {
                await Keychain.resetGenericPassword();
                console.log(`[${new Date().toLocaleString()}] SecureStorage: Successfully deleted key: ${SecureStorage.Keys.AuthToken}`);
            } else {
                console.log(`[${new Date().toLocaleString()}] SecureStorage: Key not found for deletion: ${SecureStorage.Keys.AuthToken}`);
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: Error deleting key: ${SecureStorage.Keys.AuthToken}`, error);
            throw error;
        }
    }

    /**
     * Saves a key-value pair securely in the Keychain.
     * @param {string} key - The key under which to store the data.
     * @param {string} value - The value to be stored.
     * @returns {Promise<boolean>} - True if the data was saved successfully.
     */
    static async saveData(key: string, value: string): Promise<boolean> {
        try {
            await Keychain.setInternetCredentials(key, key, value);
            console.log(`[${new Date().toLocaleString()}] SecureStorage: saveData Successfully saved key: ${key}`);
            return true;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: saveData Error saving key: ${key}`, error);
            return false;
        }
    }

    /**
     * Retrieves a value stored under the given key.
     * @param {string} key - The key for which to retrieve the stored data.
     * @returns {Promise<string | null>} - The stored value or null if not found.
     */
    static async getData(key: string): Promise<string | null> {
        try {
            const credentials = await Keychain.getInternetCredentials(key);
            if (credentials && credentials.username === key) {
                console.log(`[${new Date().toLocaleString()}] SecureStorage: getData Successfully retrieved key: ${key}`);
                return credentials.password;
            }
            console.log(`[${new Date().toLocaleString()}] SecureStorage: getData Key not found: ${key}`);
            return null;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: getData Error retrieving key: ${key}`, error);
            return null;
        }
    }

    /**
     * Deletes a stored value associated with the given key.
     * @param {string} key - The key to be removed.
     * @returns {Promise<void>}
     */
    static async deleteData(key: string): Promise<void> {
        try {
            const credentials = await Keychain.getInternetCredentials(key);
            if (credentials && credentials.username === key) {
                await Keychain.resetInternetCredentials(key);
                console.log(`[${new Date().toLocaleString()}] SecureStorage: Successfully deleted key: ${key}`);
            } else {
                console.log(`[${new Date().toLocaleString()}] SecureStorage: Key not found for deletion: ${key}`);
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage: Error deleting key: ${key}`, error);
            throw error;
        }
    }
}

export default SecureStorage;
