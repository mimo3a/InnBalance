import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherWidget() {
  return (
    <View style={styles.container}>
      <Text>Weather Widget</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
