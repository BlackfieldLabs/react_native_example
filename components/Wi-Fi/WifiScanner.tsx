import { PermissionsAndroid, Platform } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

export const getAvailableWifiNetworks = async (): Promise<string[]> => {
    // Request permissions on Android
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'We need location access to scan WiFi networks.',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn('Permission error:', err);
                return false;
            }
        }
        return true;
    };

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
        console.log('WiFi scan permission denied');
        return [];
    }

    try {
        const wifiNetworks = await WifiManager.loadWifiList();
        return wifiNetworks
            .map((network) => network.SSID)
            .filter((ssid) => ssid !== '' && ssid !== '(hidden SSID)');
    } catch (error) {
        console.error('Error fetching WiFi list:', error);
        return [];
    }
};
