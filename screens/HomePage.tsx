import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import globalStyles from './styles/globalStyles';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, backgroundColor: '#f9f9f9' }}>
      {/* Welcome Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          {t('HomePage.Welcome', { name: 'John Doe' })}
        </Text>
        <Text style={{ fontSize: 16, color: '#555' }}>
          {t('HomePage.Subtitle')}
        </Text>
      </View>

      {/* Key Metrics */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>
          {t('HomePage.UpcomingAppointment')}
        </Text>
        <Text style={globalStyles.cardContent}>
          {t('HomePage.ConsultationWith', { doctor: 'Dr. Smith' })}
        </Text>
        <Text style={globalStyles.cardContent}>
          {t('HomePage.AppointmentTime', { time: 'Tomorrow at 10:00 AM' })}
        </Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>
          {t('HomePage.HealthGoalsProgress')}
        </Text>
        <Text style={globalStyles.cardContent}>
          {t('HomePage.StepsLogged', { count: 8000 })}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>
            {t('HomePage.BookAppointment')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
          <Text style={globalStyles.buttonText}>
            {t('HomePage.MessageDoctor')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
          <Text style={globalStyles.buttonText}>
            {t('HomePage.ViewMedicalRecords')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomePage;
