/**
 * SettingsScreen Component
 * 
 * Provides user settings and data management options:
 * - Delete all user-added places (keeps default places intact)
 * - Clear all session statistics
 * 
 * Both actions require confirmation before execution.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { usePlaces } from '@/src/hooks/usePlaces';
import { clearSessions } from '@/src/services/statisticsService';

/**
 * SettingsScreen Component
 * Main settings interface for data management
 */
export default function SettingsScreen() {
  // Hook for managing user places
  // Hook for managing user places
  const { resetUserPlaces } = usePlaces();

  /**
   * Handle deletion of user-added places
   * Shows confirmation dialog before proceeding
   * Default places are preserved
   */
  const handleResetOrte = () => {
    Alert.alert(
      'Benutzerdefinierte Orte löschen',
      'Sind Sie sicher, dass Sie alle von Ihnen hinzugefügten Orte löschen möchten? Die Standardorte bleiben erhalten.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            await resetUserPlaces();
            Alert.alert('Fertig', 'Benutzerdefinierte Orte wurden gelöscht');
          },
        },
      ]
    );
  };

  /**
   * Handle deletion of session statistics
   * Shows confirmation dialog before clearing all session data
   */
  const handleResetStatistics = () => {
    Alert.alert(
      'Benutzerdefinierte Statistics löschen',
      'Sind Sie sicher, dass Sie alle von Ihnen hinzugefügten Statistics löschen möchten? Die Standardstatistics bleiben erhalten.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            await clearSessions();
            Alert.alert('Fertig', 'Benutzerdefinierte Statistics wurden gelöscht');
          },
        },
      ]
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Einstellungen</ThemedText>
      
      {/* Place Management Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ortsverwaltung</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetOrte}>
          <Text style={styles.resetButtonText}>Meine Orte löschen</Text>
        </TouchableOpacity>
      </View>
      
      {/* Statistics Management Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statisticsverwaltung</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetStatistics}>
          <Text style={styles.resetButtonText}>Meine Statistics löschen</Text>
        </TouchableOpacity>
      </View>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
