import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';

export default function SettingsScreen() {
  return (
      <ThemedView style={styles.container}>
          <ThemedText type="title">Settings Screen</ThemedText>
          <ThemedText>This is your new separate page.</ThemedText>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
