import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const ProfilePage = () => {
  const {t, i18n} = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng); // Switch the language
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Nenad Stojkovic</Text>
        <Text style={styles.userEmail}>charlie060589@gmail.com</Text>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Current Language: {i18n.language}
        </Text>
      </View>

      {/* Options Section */}

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/privacy.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Privacy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/download.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Download documents</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/settings.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Account settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/settings.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>App settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/contact.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Contact</Text>
        </View>
      </TouchableOpacity>
      {/* Language Change Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => changeLanguage(i18n.language === 'en' ? 'rs' : 'en')}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/language.png')} // Add your language icon
            style={styles.icon}
          />
          <Text style={styles.optionText}>{t('settings.language')}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <View style={styles.optionContent}>
          <Image
            source={require('../assets/icons/logout.png')}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Log out</Text>
        </View>
      </TouchableOpacity>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.version}>Version 0.0.1</Text>
        <Text style={styles.company}>Blackfield Labs</Text>
        <TouchableOpacity>
          <Text style={styles.shareLink}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  stats: {
    width: '100%',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  version: {
    fontSize: 12,
    color: '#888',
  },
  company: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  shareLink: {
    fontSize: 12,
    color: '#00BFA6',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
