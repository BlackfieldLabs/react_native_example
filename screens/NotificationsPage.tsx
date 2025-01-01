import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Appointment Reminder',
      description: 'Your appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.',
      timestamp: '2025-01-01 09:00',
    },
    {
      id: '2',
      title: 'New Lab Results',
      description: 'Your lab results are now available. Click to view.',
      timestamp: '2024-12-30 15:45',
    },
    {
      id: '3',
      title: 'Health Tip of the Day',
      description: 'Drink 8 glasses of water daily to stay hydrated.',
      timestamp: '2024-12-29 08:00',
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  notificationCard: {
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationsPage;
