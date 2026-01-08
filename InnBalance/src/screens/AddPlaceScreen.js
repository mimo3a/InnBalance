import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '@/src/hooks/usePlaces';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';

export default function AddPlaceScreen() {
  const router = useRouter();
  const { addPlace } = usePlaces();

  const [image, setImage] = useState(null); // <-- Bild aus Galerie

  const [formData, setFormData] = useState({
    name: '',
    info: '',
    category: 'Other',
    lat: 47.2692,
    lng: 11.4041,
    rating: 0,
    distance: 0,
    acces: 'Public',
    image: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setFormData({ ...formData, image: uri });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Fehler', 'Bitte geben Sie einen Ortsnamen ein');
      return;
    }

    try {
      await addPlace({
        ...formData,
        image: formData.image || require('../Images/Places/missingPicture.png'),
      });

      Alert.alert('Erfolgreich', 'Ort wurde hinzugefügt', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Fehler', 'Ort konnte nicht hinzugefügt werden');
    }
  };

  const fallbackImage = require('../Images/Places/missingPicture.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <ImageBackground
          style={styles.image}
          source={image ? { uri: image } : fallbackImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={styles.linearGradient}
          />
        </ImageBackground>
      </TouchableOpacity>

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
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { width: '100%', height: '40%' },
  image: { flex: 1, resizeMode: 'cover' },
  linearGradient: { flex: 1 },
  form: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
  input: {
    marginBottom: 24,
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfInput: {
    width: '48%'
  },
  submitButton: {
    backgroundColor: '#2f6f5f',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});
