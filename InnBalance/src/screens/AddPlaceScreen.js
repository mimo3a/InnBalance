import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '@/src/hooks/usePlaces';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function AddPlaceScreen() {
  const router = useRouter();
  const { addPlace } = usePlaces();
  const { theme } = useTheme();

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
      
      // Copy image to permanent storage
      const filename = `place_${Date.now()}.jpg`;
      const newPath = `${FileSystem.documentDirectory}${filename}`;
      
      try {
        await FileSystem.copyAsync({
          from: uri,
          to: newPath
        });
        
        // Use permanent path instead of temporary URI
        setImage(newPath);
        setFormData({ ...formData, image: newPath });
      } catch (error) {
        console.error('Error copying image:', error);
        Alert.alert('Fehler', 'Bild konnte nicht gespeichert werden');
      }
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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

      <ScrollView style={[styles.form, { backgroundColor: theme.background }]}>
        <Text style={[styles.label, { color: theme.text }]}>Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name des Ortes"
          placeholderTextColor={theme.textSecondary}
        />

        <Text style={[styles.label, { color: theme.text }]}>Beschreibung</Text>
        <TextInput
          style={[styles.input, styles.textArea, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          value={formData.info}
          onChangeText={(text) => setFormData({ ...formData, info: text })}
          placeholder="Beschreibung des Ortes"
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
        />

        <Text style={[styles.label, { color: theme.text }]}>Kategorie</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
          value={formData.category}
          onChangeText={(text) => setFormData({ ...formData, category: text })}
          placeholder="Park, Museum, Café..."
          placeholderTextColor={theme.textSecondary}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.text }]}>Breitengrad</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
              value={String(formData.lat)}
              onChangeText={(text) => setFormData({ ...formData, lat: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={[styles.label, { color: theme.text }]}>Längengrad</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
              value={String(formData.lng)}
              onChangeText={(text) => setFormData({ ...formData, lng: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholderTextColor={theme.textSecondary}
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
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
