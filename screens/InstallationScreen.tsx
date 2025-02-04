import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../helpers/RootStackParamList';
import { CameraMode } from './CameraComponent';
//Localization
import { getText } from '../localization/localization';
//Style
import { BORDERS, COLORS, FONT_SIZES, FONTS, HEIGHT, SPACING } from '../styles/theme';
import sharedStyles from '../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//BLE
import { BleManager, Device as BleDevice } from 'react-native-ble-plx';
//Alert
import { useAlert } from '../components/alert/CustomAlertManager';
import { AlertType } from '../components/alert/AlertTypes'
//ActionSheet
import CustomActionSheet from '../components/actionSheet/CustomActionSheet';
//Wi-Fi
import { getAvailableWifiNetworks } from '../components/Wi-Fi/WifiScanner';

const manager = new BleManager();

const InstallationScreen = () => {
  //Alert
  const { createSingleButtonAlert } = useAlert();

  //Wi-Fi
  const [wifiList, setWifiList] = useState<string[]>([]);
  const [selectedWifi, setSelectedWifi] = useState<string | null>(null);

  //Color button
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const buttonRef = useRef<React.ElementRef<typeof TouchableOpacity> | null>(null);

  //ActionSheet options
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetTitle, setSheetTitle] = useState('');
  const [sheetOptions, setSheetOptions] = useState<{ title: string; iconName?: string; iconColor?: string }[]>([]);

  const openSheet = (title: string, options: { title: string; iconName?: string; iconColor?: string }[]) => {
    setSheetTitle(title);
    setSheetOptions(options);
    setSheetVisible(true);
  };

  //Color
  const handleSelect = (index: number) => {
    const selectedItem = sheetOptions[index];
    if (selectedItem) {
      if (sheetTitle === getText('selectNetworkTitle')) {
        setSelectedWifi(selectedItem.title);
      } else if (sheetTitle === getText('pickARoomType')) {
        setSelectedRoomType(selectedItem.title);
        setSelectedRoomImage(selectedItem.iconName ?? '');
      } else if (sheetTitle === getText('pickAColorTitle')) {
        setSelectedColor(selectedItem.iconColor ?? null);
      }
    }
  };

  const colors = [
    { title: 'Red', iconName: 'palette', iconColor: 'red' },
    { title: 'Blue', iconName: 'palette', iconColor: 'blue' },
    { title: 'Purple', iconName: 'palette', iconColor: 'purple' },
    { title: 'Yellow', iconName: 'palette', iconColor: 'yellow' },
    { title: 'Green', iconName: 'palette', iconColor: 'green' },
    { title: 'Pink', iconName: 'palette', iconColor: 'pink' },
    { title: 'Grey', iconName: 'palette', iconColor: 'grey' },
    { title: 'Black', iconName: 'palette', iconColor: 'black' },
  ];

  //RoomTypes
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedRoomImage, setSelectedRoomImage] = useState<string | null>(null);
  const roomTypes = [
    { title: 'Living Room', iconName: 'weekend' },
    { title: 'Bedroom', iconName: 'bed' },
    { title: 'Kitchen', iconName: 'kitchen' },
    { title: 'Bathroom', iconName: 'bathtub' },
    { title: 'Dining Room', iconName: 'dining' },
    { title: 'Office', iconName: 'work' },
    { title: 'Garage', iconName: 'garage' },
    { title: 'Storage Room', iconName: 'store' },
    { title: 'Balcony', iconName: 'balcony' },
  ];

  //Button press
  const handlePress = async (title: string) => {
    console.log(`[${new Date().toLocaleString()}] ${title} Button pressed`);
    if (title === getText('cameraButton')) {
      navigation.navigate('Camera', { mode: CameraMode.QR });
    } else if (title === getText('scanButton')) {
      toggleScan();
    } else if (title === getText('colorButton')) {
      console.log(`[${new Date().toLocaleString()}] ${title} Button pressed`);
      openSheet(getText('pickAColorTitle'), colors);
    } else if (title === getText('selectNetworkButton')) {
      console.log(`[${new Date().toLocaleString()}]Fetching available WiFi networks...`);
      const networks = await getAvailableWifiNetworks();
      console.log(`[${new Date().toLocaleString()}] Available networks:`, networks);

      if (networks.length > 0) {
        openSheet(getText('selectNetworkTitle'), networks.map((ssid) => ({ title: ssid })));
      } else {
        createSingleButtonAlert(AlertType.Warning, getText('messageNoWiFiNetworks'), () => {
          console.log(`[${new Date().toLocaleString()}] No WiFi networks found. Please try again.`);
        });
      }
      //TODO: Tamara add progress
    } else if (title === getText('roomTypeButton')) {
      openSheet(getText('pickARoomType'), roomTypes);
    } else if (title === getText('goToChartsButton')) {
      navigation.navigate('Charts');
    };
  };

  //BLE Devices Scan
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [scannedDevices, setScannedDevices] = useState<BleDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  const handleDeviceRowPress = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const toggleScan = () => {
    if (scanning) {
      stopScan();
    } else {
      startScan();
    }
  };

  const startScan = async () => {
    console.log(`[${new Date().toLocaleString()}] Start scan clicked`);
    const hasPermissions = await requestBluetoothPermissions();
    if (!hasPermissions) {
      createSingleButtonAlert(AlertType.Error, getText('bluetoothPermissionDeniedMessage'), () => {
        console.log(`[${new Date().toLocaleString()}] Bluetooth permissions not granted`);
      });
      return;
    }

    setScanning(true);
    setScannedDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        const message = getText('bluetoothScanErrorMessage') + error;
        createSingleButtonAlert(AlertType.Error, message, () => {
          console.log(`[${new Date().toLocaleString()}] `, message);
        });
        stopScan();
        return;
      }
      if (device && device.name) {
        setScannedDevices((prevDevices) => {
          const exists = prevDevices.some((d) => d.id === device.id);
          return exists ? prevDevices : [...prevDevices, device];
        });
      }
    });
  };

  const stopScan = () => {
    setScanning(false);
    manager.stopDeviceScan();
    console.log(`[${new Date().toLocaleString()}] Scanning stopped.`);
  };

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
          result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  //Navigation
  const navigation = useNavigation<NavigationProp>();

  const nextButtonPressed = () => {
    console.log(`[${new Date().toLocaleString()}] Next button pressed.`);
    navigation.navigate('Beneficiary', { scannedDevices });
  };

  return (
    <SafeAreaView style={sharedStyles.safeLayoutContainerStyle}>
      <ScrollView contentContainerStyle={sharedStyles.scrollContainer}>
        {/* Section 1 */}
        <View style={[sharedStyles.sectionTop, styles.row]}>
          {[getText('scanButton'), getText('clearButton'), getText('cameraButton')].map((title) => (
            <TouchableOpacity
              key={title}
              style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
              onPress={() => handlePress(title)}
            >
              <View style={styles.contentContainer}>
                <MaterialIcons
                  name={(title === getText('cameraButton') ? 'camera-alt' : title === getText('clearButton') ? 'delete' : 'touch-app')}
                  size={HEIGHT.smallImage}
                  color={COLORS.textAlternative}
                  style={styles.icon} />
                <Text style={[sharedStyles.buttonTextPrimary, { textAlign: 'center' }]}>{title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Section 2 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.row}>
            <Text style={[styles.statusText, styles.columnTitle]}>{getText('deployColumn')}</Text>
            <Text style={[styles.statusText, styles.columnTitle]}>{getText('rssiColumn')}</Text>
            <Text style={[styles.columnBig]}></Text>
          </View>
          {scannedDevices.map((device, index) => (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.listRowContainer,
                selectedRow === index && { borderColor: COLORS.selection },
              ]}
              onPress={() => handleDeviceRowPress(index)}
            >
              <View style={[styles.listItem, styles.columnSmall]}>
                <MaterialIcons
                  name={selectedRow === index ? "check-box" : "check-box-outline-blank"}
                  size={HEIGHT.smallImage}
                  color={selectedRow === index ? COLORS.accent : COLORS.textSecondary}
                />
              </View>
              <Text style={[styles.listItem, styles.columnSmall]}>{device.rssi}</Text>
              <Text style={[styles.listItem, styles.columnBig]}>{device.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Section 3 */}
        <View style={[sharedStyles.sectionMiddle, styles.row]}>
          <TouchableOpacity
            style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
            onPress={() => handlePress(getText('roomTypeButton'))}
          >
            <View style={styles.contentContainer}>
              <MaterialIcons
                name={selectedRoomImage || 'home'}
                size={HEIGHT.smallImage}
                color={COLORS.textAlternative}
                style={styles.icon} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={sharedStyles.buttonTextPrimary}>{selectedRoomType || getText('roomTypeButton')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
            onPress={() => handlePress(getText('customDecriptionButton'))}
          >
            <View style={styles.contentContainer}>
              <MaterialIcons
                name={'edit'}
                size={HEIGHT.smallImage}
                color={COLORS.textAlternative}
                style={styles.icon} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={sharedStyles.buttonTextPrimary}>{getText('customDecriptionButton')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Section 4 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.row}>
            {[getText('connectButton'), getText('reportWiFisButton')].map((title) => (
              <TouchableOpacity
                key={title}
                style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
                onPress={() => handlePress(title)}
              >
                <View style={styles.contentContainer}>
                  <MaterialIcons
                    name={(title === getText('connectButton') ? 'bluetooth' : 'wifi')}
                    size={HEIGHT.smallImage} 
                    color={COLORS.textAlternative}
                    style={styles.icon} />
                  <Text style={sharedStyles.buttonTextPrimary}>{title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.dropDownList, sharedStyles.halfWidthButton]}
              onPress={() => handlePress(getText('selectNetworkButton'))}
            >
              <Text style={styles.dropDownText}>{selectedWifi || getText('selectNetworkButton')}</Text>
              <MaterialIcons
                name="arrow-drop-down" 
                size={HEIGHT.smallImage}
                color={COLORS.textPrimary}
                style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              placeholder={getText('enterWiFiPassPlaceholder')}
              placeholderTextColor={COLORS.textPrimary}
              style={[styles.textBox, sharedStyles.halfWidthButton]}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              key={getText('credentialsButton')}
              style={[[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]]}
              onPress={() => handlePress(getText('credentialsButton'))}
            >
              <View style={styles.contentContainer}>
                <MaterialIcons
                  name={'lock'} 
                  size={HEIGHT.smallImage}
                  color={COLORS.textAlternative}
                  style={styles.icon} />
                <Text style={sharedStyles.buttonTextPrimary}>{getText('credentialsButton')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              ref={buttonRef}
              key={getText('colorButton')}
              style={[styles.colorButton, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
              onPress={() => handlePress(getText('colorButton'))}
            >
              <View style={styles.contentContainer}>
                <MaterialIcons
                  name="palette" 
                  size={HEIGHT.smallImage}
                  color={COLORS.textAlternative}
                  style={styles.icon} />
                <Text style={sharedStyles.buttonTextPrimary}>{getText('colorButton')}</Text>
                {selectedColor && (
                  <View style={[styles.colorIndicator, { backgroundColor: selectedColor }]} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Section 5 */}
        <View style={[sharedStyles.sectionMiddle, styles.row]}>
          <TouchableOpacity
            style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
            onPress={() => handlePress(getText('connectionButton'))}
          >
            <View style={styles.contentContainer}>
              <MaterialIcons
                name="link" 
                size={HEIGHT.smallImage}
                color={COLORS.textAlternative}
                style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{getText('connectionButton')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getText('statusText')}</Text>
            <Text style={styles.statusNumber}>313546534321</Text>
          </View>
        </View>
        {/* Section 6  */}
        <View style={[sharedStyles.sectionBottom, styles.row]}>
          <TouchableOpacity
            style={[styles.button, sharedStyles.secondaryButtonColor, sharedStyles.halfWidthButton]}
            onPress={() => handlePress(getText('goToChartsButton'))}
          >
            <View style={styles.contentContainer}>
              <MaterialIcons
                name="bar-chart"
                size={HEIGHT.smallImage}
                color={COLORS.textAlternative}
                style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{getText('goToChartsButton')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, sharedStyles.accentButtonColor, sharedStyles.halfWidthButton]}
            onPress={() => nextButtonPressed()}
          >
            <View style={styles.contentContainer}>
              <MaterialIcons
                name="arrow-forward"
                size={HEIGHT.smallImage}
                color={COLORS.textAlternative}
                style={styles.iconAccent} />
              <Text style={styles.buttonTextAccent}>{getText('nextButton')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <CustomActionSheet
          isVisible={sheetVisible}
          sheetTitle={sheetTitle}
          options={sheetOptions}
          onSelect={handleSelect}
          onClose={() => setSheetVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  listRowContainer: {
    height: HEIGHT.button,
    backgroundColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2 * HEIGHT.border,
    borderRadius: BORDERS.radiusExtraLarge,
    borderColor: COLORS.border,
    marginTop: SPACING.small,
  },
  listItem: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
  columnTitle: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '20%',
  },
  columnSmall: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.textSecondary,
  },
  columnBig: {
    flex: 3,
    alignItems: 'flex-start',
    maxWidth: '60%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderRadius: BORDERS.radiusLarge,
    marginHorizontal: SPACING.extraSmall,
    height: HEIGHT.button,
  },
  buttonTextAccent: {
    color: 'white',
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginLeft: SPACING.small,
  },
  icon: {
    color: COLORS.textSecondary,
    marginRight: SPACING.small,
  },
  iconAccent: {
    color: 'white',
    marginRight: SPACING.small,
  },
  statusContainer: {
    alignItems: 'flex-start',
    paddingLeft: SPACING.medium,
    width: '50%',
  },
  statusText: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statusNumber: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textPrimary,
  },
  dropDownList: {
    flexDirection: 'row',
    height: HEIGHT.button,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.small,
    margin: SPACING.small,
  },
  dropDownText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginHorizontal: SPACING.extraSmall,
    paddingLeft: SPACING.small,
  },
  textBox: {
    height: HEIGHT.button,
    backgroundColor: COLORS.border,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    padding: SPACING.small,
    marginHorizontal: SPACING.extraSmall,
    borderRadius: BORDERS.radiusLarge,
    textDecorationColor: COLORS.secondary,
  },
  colorIndicator: {
    width: HEIGHT.smallImage,
    height: HEIGHT.smallImage,
    borderRadius: BORDERS.radiusLarge,
    marginLeft: SPACING.medium,
    borderWidth: HEIGHT.border,
    borderColor: COLORS.textPrimary,
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderRadius: BORDERS.radiusLarge,
    height: HEIGHT.button,
    backgroundColor: COLORS.border,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.medium,
  },
});

export default InstallationScreen;
