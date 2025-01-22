import * as Keychain from 'react-native-keychain';

class SecureStorage {
    static Keys = {
        AuthToken: 'authToken',
        TokenTimestamp: 'tokenTimestamp',
        UserId: 'userId',
        Username: 'username',
        Password: 'password',
    };

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
     * Save data in the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     * @param value - The value to save.
     */
    static async saveToken(value: string): Promise<boolean> {
        try {
            await Keychain.setGenericPassword(SecureStorage.Keys.AuthToken, value); // Save the data securely
            console.log(`[${new Date().toLocaleString()}] SecureStorage - Successfully saved key: ${SecureStorage.Keys.AuthToken}`);
            return true; // Return true if successful
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - Error saving key: ${SecureStorage.Keys.AuthToken}`, error);
            return false; // Return false if there was an error
        }
    }

    /**
     * Retrieve data from the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     * @returns The saved value or null if not found.
     */
    static async getToken(): Promise<string | null> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === SecureStorage.Keys.AuthToken) {
                console.log(`[${new Date().toLocaleString()}] SecureStorage - Successfully retrieved key: ${SecureStorage.Keys.AuthToken}`);
                return credentials.password;
            }
            console.log(`[${new Date().toLocaleString()}] SecureStorage - Key not found: ${SecureStorage.Keys.AuthToken}`);
            return null;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - Error retrieving key: ${SecureStorage.Keys.AuthToken}`, error);
            return null;
        }
    }

    /**
     * Delete data from the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     */
    static async deleteToken(): Promise<void> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === SecureStorage.Keys.AuthToken) {
                await Keychain.resetGenericPassword();
                console.log(`[${new Date().toLocaleString()}] SecureStorage - Successfully deleted key: ${SecureStorage.Keys.AuthToken}`);
            } else {
                console.log(`[${new Date().toLocaleString()}] SecureStorage - Key not found for deletion: ${SecureStorage.Keys.AuthToken}`);
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - Error deleting key: ${SecureStorage.Keys.AuthToken}`, error);
            throw error;
        }
    }

    static async saveData(key: string, value: string): Promise<boolean> {
        try {
            await Keychain.setInternetCredentials(key, key, value); // Save the data securely
            console.log(`[${new Date().toLocaleString()}] SecureStorage - saveData Successfully saved key: ${key}`);
            return true; // Return true if successful
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - saveData Error saving key: ${key}`, error);
            return false; // Return false if there was an error
        }
    }

    static async getData(key: string): Promise<string | null> {
        try {
            const credentials = await Keychain.getInternetCredentials(key);
            if (credentials && credentials.username === key) {
                console.log(`[${new Date().toLocaleString()}] SecureStorage - getData Successfully retrieved key: ${key}`);
                return credentials.password;
            }
            console.log(`[${new Date().toLocaleString()}] SecureStorage - getData Key not found: ${key}`);
            return null;
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - getData Error retrieving key: ${key}`, error);
            return null;
        }
    }

    static async deleteData(key: string): Promise<void> {
        try {
            const credentials = await Keychain.getInternetCredentials(key);
            if (credentials && credentials.username === key) {
                await Keychain.resetInternetCredentials(key);
                console.log(`[${new Date().toLocaleString()}] SecureStorage - Successfully deleted key: ${key}`);
            } else {
                console.log(`[${new Date().toLocaleString()}] SecureStorage - Key not found for deletion: ${key}`);
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] SecureStorage - Error deleting key: ${key}`, error);
            throw error;
        }
    }
}

export default SecureStorage;
