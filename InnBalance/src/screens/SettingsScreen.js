import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function SettingsScreen() {
  const { resetUserPlaces } = usePlaces();

  const handleReset = () => {
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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Einstellungen</ThemedText>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ortsverwaltung</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Meine Orte löschen</Text>
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
