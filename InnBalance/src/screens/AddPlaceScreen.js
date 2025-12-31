import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function AddPlaceScreen() {
  const router = useRouter();
  const { addPlace } = usePlaces();
  
  const [formData, setFormData] = useState({
    name: '',
    info: '',
    category: 'Other',
    lat: 47.2692,
    lng: 11.4041,
    rating: 0,
    distance: 0,
    acces: 'Public'
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Fehler', 'Bitte geben Sie einen Ortsnamen ein');
      return;
    }

    try {
      await addPlace({
        ...formData,
        image: require('../Images/Places/BotanischeGarten.png'), // defolt image
      });
      
      Alert.alert('Erfolgreich', 'Ort wurde hinzugefügt', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Fehler', 'Ort konnte nicht hinzugefügt werden');
    }
  };

  return (
    <View style={styles.container}>
      

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name des Ortes"
        />

        <Text style={styles.label}>Beschreibung</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.info}
          onChangeText={(text) => setFormData({ ...formData, info: text })}
          placeholder="Beschreibung des Ortes"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Kategorie</Text>
        <TextInput
          style={styles.input}
          value={formData.category}
          onChangeText={(text) => setFormData({ ...formData, category: text })}
          placeholder="Park, Museum, Café..."
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Breitengrad</Text>
            <TextInput
              style={styles.input}
              value={String(formData.lat)}
              onChangeText={(text) => setFormData({ ...formData, lat: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Längengrad</Text>
            <TextInput
              style={styles.input}
              value={String(formData.lng)}
              onChangeText={(text) => setFormData({ ...formData, lng: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Ort hinzufügen</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#1d16f4ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
