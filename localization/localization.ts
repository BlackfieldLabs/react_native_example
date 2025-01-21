// Localization strings for different languages
const en = {
  usernamePlaceholder: 'Username',
  passwordPlaceholder: 'Password',
  loginButton: 'Sign In',
  signUpButton: 'Sign Up',
  accountInfoTitle: 'Account Information',
  personalDetailsTitle: 'Personal Details',
  addressInfoTitle: 'Address Information',
  appTitle: 'WellNuo',
  appSubtitle: 'So you know they are well',
  microphonePermissionTitle: 'Microphone Permission',
  microphonePermissionMessage: 'This app requires access to your microphone for speech recognition.',
  microphonePermissionButton: 'OK',
  toggleSpeechRecognition: 'Click to Speak',
  signUpScreenTitle: 'Sign Up',
  mainLayoutTitle: 'Dashboard',
  repeatPasswordPlaceholder: 'Repeat password',
  namePlaceholder: 'First name',
  familyNamePlaceholder: 'Family name',
  emailPlaceholder: 'Email',
  telephonePlaceholder: 'Telephone number',
  cityPlaceholder: 'City',
  streetNumberPlaceholder: 'Street and number',
  statePlaceholder: 'State',
  zipCodePlaceholder: 'Zip code',
  createUserButton: 'Create User',
  verifyRealUserButton: 'Open camera to verify user',
  roleSelectionTitle: 'Select a role',
  installationTitle: 'Devices',
  beneficiaryTitle: 'Deployment',
  scanButton: 'Scan',
  clearButton: 'Clear',
  cameraButton: 'Camera',
  deployColumn: 'Deploy',
  rssiColumn: 'RSSI',
  goToChartsButton: 'Go to Charts',
  nextButton: 'Next',
  roomTypeButton: 'Room type',
  customDecriptionButton: 'Custom desc',
  connectionButton: 'Connection',
  statusText: 'STATUS',
  selectNetworkButton: 'Select network',
  enterWiFiPassPlaceholder: 'Enter Wi-Fi pass',
  connectButton: 'Connect',
  reportWiFisButton: 'Report Wi-Fis',
  credentialsButton: 'Credentials',
  colorButton: 'Color',
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
  sendButtonTitle: 'Send deployment to server',
  submitButtonTitle: 'Submit',
  cancelButtonTitle: 'Cancel',
  proceedButtonTitle: 'Proceed',
  takePhotoTitle: 'Take another photo',
  takePhotoSubtitle: 'Take a photo of beneficiary',
  checkingCredentials: 'Checking credentials...',
};

  const hr = {
    usernamePlaceholder: 'Unesite korisničko ime',
    passwordPlaceholder: 'Unesite lozinku',
    loginButton: 'Prijava',
    signUpButton: 'Registracija',
    appTitle: 'WellNuo',
    appSubtitle: 'Da znate da su dobro',
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
