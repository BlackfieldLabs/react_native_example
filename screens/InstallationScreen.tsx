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
//Popover
import Popover from 'react-native-popover-view';

const manager = new BleManager();

const InstallationScreen = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const buttonRef = useRef<React.ElementRef<typeof TouchableOpacity> | null>(null);
  const colors = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Purple', value: 'purple' },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setPopoverVisible(false);
  };

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const [scannedDevices, setScannedDevices] = useState<BleDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const { createSingleButtonAlert } = useAlert();

  const handleRowPress = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handlePress = (title: string) => {
    console.log(`[${new Date().toLocaleString()}] ${title} Button pressed`);
    if (title === getText('cameraButton')) {
      navigation.navigate('Camera', { mode: CameraMode.QR });
    }
    if (title === getText('scanButton')) {
      toggleScan();
    }
    if (title === getText('colorButton')) {
      console.log(`[${new Date().toLocaleString()}] ${title} Button pressed`);
      if (title === getText('colorButton')) {
        setPopoverVisible(true);
      }
    };
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
              style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
              onPress={() => handlePress(title)}
            >
              <MaterialIcons name={(title === getText('cameraButton') ? 'camera-alt' : title === getText('clearButton') ? 'delete' : 'touch-app')} size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Section 2 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.listHeader}>
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
              onPress={() => handleRowPress(index)}
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
          {[getText('roomTypeButton'), getText('customDecriptionButton')].map((title) => (
            <TouchableOpacity
              key={title}
              style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
              onPress={() => handlePress(title)}
            >
              <MaterialIcons name={(title === getText('roomTypeButton') ? 'home' : 'edit')} size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section 4 */}
        <View style={sharedStyles.sectionMiddle}>
          <View style={styles.row}>
            {[getText('connectButton'), getText('reportWiFisButton')].map((title) => (
              <TouchableOpacity
                key={title}
                style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
                onPress={() => handlePress(title)}
              >
                <MaterialIcons name={(title === getText('connectButton') ? 'bluetooth' : 'wifi')} size={HEIGHT.smallImage} color="white" style={styles.icon} />
                <Text style={sharedStyles.buttonTextPrimary}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.dropDownList, styles.halfWidthButton]}
              onPress={() => handlePress(getText('selectNetworkButton'))}
            >
              <Text style={styles.dropDownText}>{getText('selectNetworkButton')}</Text>
              <MaterialIcons name="arrow-drop-down" size={HEIGHT.smallImage} color={COLORS.textPrimary} style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              placeholder={getText('enterWiFiPassPlaceholder')}
              placeholderTextColor={COLORS.textPrimary}
              style={[styles.textBox, styles.halfWidthButton]}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              key={getText('credentialsButton')}
              style={[[styles.button, styles.secondaryButton, styles.halfWidthButton]]}
              onPress={() => handlePress(getText('credentialsButton'))}
            >
              <MaterialIcons name={'lock'} size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{getText('credentialsButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              ref={buttonRef}
              key={getText('colorButton')}
              style={[styles.colorButton, styles.secondaryButton,styles.halfWidthButton]}
              onPress={() => handlePress(getText('colorButton'))}
            >
              <MaterialIcons name="palette" size={HEIGHT.smallImage} color="white" style={styles.icon} />
              <Text style={sharedStyles.buttonTextPrimary}>{getText('colorButton')}</Text>

              {/* Selected Color Indicator (Inside Button) */}
              {selectedColor && (
                <View style={[styles.colorIndicator, { backgroundColor: selectedColor }]} />
              )}
            </TouchableOpacity>
            {/* Popover for Color Selection */}
            <Popover
              isVisible={popoverVisible}
              from={buttonRef}
              onRequestClose={() => setPopoverVisible(false)}
              popoverStyle={styles.roundedPopover}
              backgroundStyle={{ backgroundColor: COLORS.overlay }}
            >
              <View style={styles.popoverContainer}>
                {/* Title */}
                <Text style={sharedStyles.titleStyle}>Pick a color</Text>

                {/* Color Options with Dividers */}
                {colors.map((color, index) => (
                  <View key={color.value}>
                    <TouchableOpacity
                      style={styles.popoverItem}
                      onPress={() => handleColorSelect(color.value)}
                    >
                      <Text style={[sharedStyles.buttonText, { color: COLORS.textPrimary }]}>{color.label}</Text>
                      <View style={[styles.colorPreview, { backgroundColor: color.value }]} />
                    </TouchableOpacity>

                    {/* Divider except for the last item */}
                    {index < colors.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </View>
            </Popover>
          </View>
        </View>

        {/* Section 5 */}
        <View style={[sharedStyles.sectionMiddle, styles.row]}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
            onPress={() => handlePress(getText('connectionButton'))}
          >
            <MaterialIcons name="link" size={HEIGHT.smallImage} color="white" style={styles.icon} />
            <Text style={sharedStyles.buttonTextPrimary}>{getText('connectionButton')}</Text>
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getText('statusText')}</Text>
            <Text style={styles.statusNumber}>313546534321</Text>
          </View>
        </View>

        {/* Section 6  */}
        <View style={[sharedStyles.sectionBottom, styles.row]}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.halfWidthButton]}
            onPress={() => handlePress(getText('goToChartsButton'))}
          >
            <MaterialIcons name="bar-chart" size={HEIGHT.smallImage} color="white" style={styles.icon} />
            <Text style={sharedStyles.buttonTextPrimary}>{getText('goToChartsButton')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.accentButton, styles.halfWidthButton]}
            onPress={() => nextButtonPressed()}
          >
            <MaterialIcons name="arrow-forward" size={HEIGHT.smallImage} color="white" style={styles.iconAccent} />
            <Text style={styles.buttonTextAccent}>{getText('nextButton')}</Text>
          </TouchableOpacity>
        </View>
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
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  secondaryButton: {
    backgroundColor: COLORS.border, // Secondary button color
  },
  accentButton: {
    backgroundColor: COLORS.accent, // Accent button color
  },
  halfWidthButton: {
    flex: 1,
    maxWidth: '50%',
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
    marginLeft: SPACING.small,
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
  roundedPopover: {
    borderRadius: BORDERS.radiusLarge,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  popoverContainer: {
    width: '100%',
    padding: SPACING.small,
    backgroundColor: COLORS.background,
    borderRadius: BORDERS.radiusLarge,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  colorPreview: {
    width: HEIGHT.smallImage,
    height: HEIGHT.smallImage,
    borderRadius: BORDERS.radiusLarge,
    marginRight: SPACING.small,
    borderWidth: HEIGHT.border,
    borderColor: COLORS.textPrimary,
    marginLeft: SPACING.small,
  },
  divider: {
    height: HEIGHT.border,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.extraSmall,
  },
});

export default InstallationScreen;
