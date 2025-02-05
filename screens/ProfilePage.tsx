import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import globalStyles from '../styles/globalStyles';

const ProfilePage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng); // Switch the language
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.profileContainer, { flexGrow: 1 }]}>
      {/* User Info Section */}
      <View style={[globalStyles.center, { marginBottom: 24 }]}>
        <Text style={[globalStyles.title, { marginBottom: 4 }]}>Nenad Stojkovic</Text>
        <Text style={[globalStyles.subtitle, { marginBottom: 16 }]}>charlie060589@gmail.com</Text>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          {t('SettingsPage.CurrentLanguage')}: {i18n.language}
        </Text>
      </View>

      {/* Options Section */}
      {[
        { icon: require('../assets/icons/privacy.png'), label: t('SettingsPage.Privacy') },
        { icon: require('../assets/icons/download.png'), label: t('SettingsPage.DownloadDocuments') },
        { icon: require('../assets/icons/settings.png'), label: t('SettingsPage.AccountSettings') },
        { icon: require('../assets/icons/settings.png'), label: t('SettingsPage.AppSettings') },
        { icon: require('../assets/icons/contact.png'), label: t('SettingsPage.Contact') },
        {
          icon: require('../assets/icons/language.png'),
          label: t('SettingsPage.ChangeLanguage'),
          onPress: () => changeLanguage(i18n.language === 'en' ? 'sr' : 'en'),
        },
        { icon: require('../assets/icons/logout.png'), label: t('SettingsPage.LogOut') },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={globalStyles.card}
          onPress={item.onPress || (() => {})}
        >
          <View style={globalStyles.profileCardContent}>
            <Image source={item.icon} style={globalStyles.icon} />
            <Text style={globalStyles.cardText}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Footer Section */}
      <View style={[globalStyles.center, { marginTop: 16 }]}>
        <Text style={globalStyles.footerText}>
          {t('SettingsPage.Version', { version: '0.0.1' })}
        </Text>
        <Text style={globalStyles.footerText}>Blackfield Labs</Text>
        <TouchableOpacity>
          <Text style={globalStyles.link}>{t('SettingsPage.Share')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
