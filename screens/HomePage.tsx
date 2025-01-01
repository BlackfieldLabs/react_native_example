import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, John Doe!</Text>
        <Text style={styles.subtitle}>Here’s what’s happening today.</Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Appointment</Text>
        <Text style={styles.cardContent}>Consultation with Dr. Smith</Text>
        <Text style={styles.cardContent}>Tomorrow at 10:00 AM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Health Goals Progress</Text>
        <Text style={styles.cardContent}>You’ve logged 8,000 steps today!</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Message Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>View Medical Records</Text>
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
