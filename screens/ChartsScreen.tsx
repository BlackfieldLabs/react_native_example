import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { COLORS, FONT_SIZES, FONTS, HEIGHT, SPACING } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

const ChartsScreen = () => {
  // 📊 Bar Chart Data (Number of devices in rooms)
  const barChartData = {
    labels: ['Living', 'Bedroom', 'Kitchen', 'Office', 'Garage'],
    datasets: [{ data: [5, 3, 7, 2, 4] }], // Devices per room
  };

  // 📈 Line Chart Data (WiFi Signal Strength trends)
  const lineChartData = {
    labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    datasets: [
      { data: [-30, -45, -50, -40, -35] }, // RSSI (WiFi Signal Strength)
    ],
  };

  // 🥧 Pie Chart Data (Room Percentage Distribution)
  const pieChartData = [
    { name: 'Living Room', population: 5, color: COLORS.error, legendFontColor: COLORS.textPrimary, legendFontSize: FONT_SIZES.small },
    { name: 'Bedroom', population: 3, color: COLORS.accent, legendFontColor: COLORS.textPrimary, legendFontSize: FONT_SIZES.small },
    { name: 'Kitchen', population: 7, color: COLORS.graphGreen, legendFontColor: COLORS.textPrimary, legendFontSize: FONT_SIZES.small },
    { name: 'Office', population: 2, color: COLORS.border, legendFontColor: COLORS.textPrimary, legendFontSize: FONT_SIZES.small },
    { name: 'Garage', population: 4, color: COLORS.graphOrange, legendFontColor: COLORS.textPrimary, legendFontSize: FONT_SIZES.small },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 📊 Bar Chart */}
      <Text style={styles.chartTitle}>Devices Installed per Room</Text>
      <BarChart
        data={barChartData}
        width={screenWidth - 2*SPACING.medium}
        height={HEIGHT.graph}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={20}
      />

      {/* 📈 Line Chart */}
      <Text style={styles.chartTitle}>WiFi Signal Strength (RSSI)</Text>
      <LineChart
        data={lineChartData}
        width={screenWidth - 2*SPACING.medium}
        height={HEIGHT.graph}
        chartConfig={chartConfig}
      />

      {/* 🥧 Pie Chart */}
      <Text style={styles.chartTitle}>Room Installation Distribution</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 2*SPACING.extraLarge}
        height={HEIGHT.graph}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="75"
      />
    </ScrollView>
  );
};

// 📌 Chart Configuration (Custom Styling)
const chartConfig = {
  backgroundGradientFrom: COLORS.primary,
  backgroundGradientTo: COLORS.primary,
  decimalPlaces: 0,
  color: (opacity = 1) => COLORS.accent,
  labelColor: (opacity = 1) => COLORS.textPrimary,
  propsForDots: {
    r: '4',
    strokeWidth: '0',
  },
  propsForBackgroundLines: {
    stroke: COLORS.secondary, // ✅ Change the color of horizontal & vertical grid lines
    strokeWidth: 1,    // Optional: Adjust thickness
    strokeDasharray: "0, 0" // Optional: Make the grid dashed
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  chartTitle: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    marginBottom: SPACING.small,
    marginTop: SPACING.medium,
  },
});

export default ChartsScreen;
