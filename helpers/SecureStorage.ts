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
          await Keychain.setGenericPassword(this.Keys.AuthToken, token);
          await Keychain.setGenericPassword(this.Keys.TokenTimestamp, timestamp);
          console.log('Token and timestamp saved.');
        } catch (error) {
          console.error('Error saving token or timestamp:', error);
        }
      }

    /**
     * Save data in the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     * @param value - The value to save.
     */
    static async save(key: string, value: string): Promise<void> {
        try {
            await Keychain.setGenericPassword(key, value);
            console.log(`SecureStorage - Successfully saved key: ${key}`);
        } catch (error) {
            console.error(`SecureStorage - Error saving key: ${key}`, error);
            throw error;
        }
    }

    /**
     * Retrieve data from the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     * @returns The saved value or null if not found.
     */
    static async get(key: string): Promise<string | null> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === key) {
                console.log(`SecureStorage - Successfully retrieved key: ${key}`);
                return credentials.password;
            }
            console.log(`SecureStorage - Key not found: ${key}`);
            return null;
        } catch (error) {
            console.error(`SecureStorage - Error retrieving key: ${key}`, error);
            throw error;
        }
    }

    /**
     * Delete data from the Keychain.
     * @param key - Unique key to identify the data (use SecureStorage.Keys).
     */
    static async delete(key: string): Promise<void> {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.username === key) {
                await Keychain.resetGenericPassword();
                console.log(`SecureStorage - Successfully deleted key: ${key}`);
            } else {
                console.log(`SecureStorage - Key not found for deletion: ${key}`);
            }
        } catch (error) {
            console.error(`SecureStorage - Error deleting key: ${key}`, error);
            throw error;
        }
    }

    static async isTokenValid(): Promise<boolean> {
        try {
            const token = await SecureStorage.get(SecureStorage.Keys.AuthToken);
            const timestampString = await SecureStorage.get(SecureStorage.Keys.TokenTimestamp);

            if (!token || !timestampString) {
                console.log('SecureStorage - No token or timestamp found.');
                return false;
            }

            const timestamp = parseInt(timestampString, 10);
            const currentTime = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;

            // Check if the token is older than 24 hours
            if (currentTime - timestamp > twentyFourHours) {
                console.log('SecureStorage - Token expired. Deleting it.');
                await SecureStorage.delete(SecureStorage.Keys.AuthToken);
                await SecureStorage.delete(SecureStorage.Keys.TokenTimestamp);
                return false;
            }

            console.log('SecureStorage - Token is valid.');
            return true;
        } catch (error) {
            console.error('SecureStorage - Error checking token validity:', error);
            return false;
        }
    }
}

export default SecureStorage;
