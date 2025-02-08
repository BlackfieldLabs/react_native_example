// Localization strings for different languages
const en = {
  // Authentication & User Account
  welcomeTitle: 'Welcome!',
  welcomeMessage: 'Glad to see you here!',
  usernamePlaceholder: 'Username',
  passwordPlaceholder: 'Password',
  repeatPasswordPlaceholder: 'Repeat password',
  loginButton: 'Sign In',
  signUpButton: 'Sign Up',
  namePlaceholder: 'First name',
  familyNamePlaceholder: 'Family name',
  emailPlaceholder: 'Email',
  telephonePlaceholder: 'Telephone number',
  cityPlaceholder: 'City',
  streetAndNumberPlaceholder: 'Street and number',
  statePlaceholder: 'State',
  zipCodePlaceholder: 'Zip code',
  roleSelectionTitle: 'Select a role',
  createUserButton: 'Create User',
  signUpScreenTitle: 'Sign Up',
  accountInfoTitle: 'Account Information',
  personalDetailsTitle: 'Personal Details',
  addressInfoTitle: 'Address Information',

  // Notifications & Alerts
  warningTitle: 'Warning',
  errorTitle: 'Error',
  pleaseWaitTitle: 'Please wait...',
  checkingCredentials: 'Checking credentials...',
  messageLogIn: 'Sign In in progress...?',
  messageLogOut: 'Are you sure you want to Sign Out?',
  messageWrongCredentials: 'Incorrect username or password. Please try again.',
  messageLogin: 'Signing in progress, please wait...',
  messageEmptyLogin: 'You need to enter username and password before you continue.',
  messageNoWiFiNetworks: 'No WiFi networks found. Please try again.',

  // Action Sheet
  pickAColorTitle: 'Pick a color',
  selectNetworkTitle: 'Available WiFi Networks',
  pickARoomType: 'Pick a room type',

  // User Interface Buttons
  nextButton: 'Next',
  cancelButtonTitle: 'Cancel',
  okButtonTitle: 'OK',
  proceedButtonTitle: 'Proceed',
  submitButtonTitle: 'Submit',
  sendButtonTitle: 'Send deployment to server',

  // Permissions & Alerts
  microphonePermissionTitle: 'Microphone Permission',
  microphonePermissionMessage: 'This app requires access to your microphone for speech recognition.',
  cameraPermissionTitle: 'Camera Permission',
  cameraPermissionMessage: 'We need access to your camera to take photos and scan QR codes.',
  cameraPermissionDeniedMessage: 'Permission denied. Camera access is required to use this feature.',
  bluetoothPermissionDeniedMessage: 'Bluetooth permissions not granted.',
  bluetoothScanErrorMessage: 'BLE Scan Error: ',

  // Camera & QR Code Scanning
  scanQRCodeTitle: 'Scan QR Code on a device',
  scanQRCodeSubtitle: 'Your device will be added to the device list',
  takePictureTitle: 'Take a picture of the beneficiary',
  takePictureSubtitle: 'A person that receives help',
  takePhotoTitle: 'Take another photo',
  takePhotoSubtitle: 'Take a photo of beneficiary',
  mobileCameraViewTitle: 'Mobile camera view',
  takeAPictureTitle: 'Take a picture',

  //Main layout
  toggleSpeechRecognition: 'Click to Speak',
  mainLayoutTitle: 'Dashboard',
  messageErrorStoppingListenning: 'Error stopping listening: ',
  messageErrorStoppingRecognition: 'Error stopping recognition: ',
  
  //Installation
  scanButton: 'Scan',
  clearButton: 'Clear',
  cameraButton: 'Camera',
  installationTitle: 'Devices',
  beneficiaryTitle: 'Deployment',
  deployColumn: 'Deploy',
  rssiColumn: 'RSSI',
  goToChartsButton: 'Go to Charts',
  roomTypeButton: 'Room type',
  customDecriptionButton: 'Custom description',
  connectionButton: 'Connection',
  statusText: 'STATUS',
  selectNetworkButton: 'Select network',
  enterWiFiPassPlaceholder: 'Enter Wi-Fi pass',
  connectButton: 'Connect',
  reportWiFisButton: 'Report Wi-Fis',
  credentialsButton: 'Credentials',
  colorButton: 'Color',

  // Beneficiary Information
  titleBeneficiary: 'Beneficiary / deployment',
  beneficiaryNamePlaceholder: 'Beneficiary\'s first and last name',
  beneficiaryEmailPlaceholder: 'Beneficiary\'s email',
  beneficiaryAddressPlaceholder: 'Beneficiary\'s address',
  numberOfPeoplePlaceholder: 'Number of people',
  genderPlaceholder: 'Gender',
  pronounsPlaceholder: 'Pronouns',
  yearBornPlaceholder: 'Year born',
  petsPlaceholder: 'Pets',
  titleChangeBeneficiaryPhoto: 'Change beneficiary photo',
  titleListOfDevicesInDeployment: 'List of devices in deployment',

  //Charts
  chartsTitle: 'Charts',
};

const hr = {
  usernamePlaceholder: 'Unesite korisničko ime',
  passwordPlaceholder: 'Unesite lozinku',
  loginButton: 'Prijava',
  signUpButton: 'Registracija',
  microphonePermissionTitle: 'Dozvola za mikrofon',
  microphonePermissionMessage: 'Ova aplikacija zahtijeva pristup mikrofonu za prepoznavanje govora.',
  microphonePermissionButton: 'U redu',
  toggleSpeechRecognition: 'Kliknite za govor',
  signUpScreenTitle: 'Registracija',
  mainLayoutTitle: 'Nadzorna ploča',
};

// Type for the keys in the language objects
type LanguageKeys = keyof typeof en;

// Export default language and utilities
const LANGUAGES = { en };
let currentLanguage: keyof typeof LANGUAGES = 'en';

/**
 * Get text for the current language by key.
 * @param {LanguageKeys} key - The key for the text string.
 * @returns {string} - The localized string or the key if not found.
 */
export const getText = (key: LanguageKeys): string => {
  const text = LANGUAGES[currentLanguage][key];
  return text || key;
};

/**
 * Set the current language.
 * @param {keyof typeof LANGUAGES} lang - The language code to set (e.g., 'en', 'hr').
 */
export const setLanguage = (lang: keyof typeof LANGUAGES): void => {
  if (LANGUAGES[lang]) {
    currentLanguage = lang;
  }
};

export default LANGUAGES;
