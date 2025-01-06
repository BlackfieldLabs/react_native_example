import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>{t('HomePage.Welcome', { name: 'John Doe' })}</Text>
        <Text style={styles.subtitle}>{t('HomePage.Subtitle')}</Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('HomePage.UpcomingAppointment')}</Text>
        <Text style={styles.cardContent}>{t('HomePage.ConsultationWith', { doctor: 'Dr. Smith' })}</Text>
        <Text style={styles.cardContent}>{t('HomePage.AppointmentTime', { time: 'Tomorrow at 10:00 AM' })}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('HomePage.HealthGoalsProgress')}</Text>
        <Text style={styles.cardContent}>{t('HomePage.StepsLogged', { count: 8000 })}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{t('HomePage.BookAppointment')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{t('HomePage.MessageDoctor')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{t('HomePage.ViewMedicalRecords')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
  },
  quickActions: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#00BFA6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
