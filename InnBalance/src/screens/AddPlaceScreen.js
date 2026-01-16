import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '@/src/hooks/usePlaces';
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function AddPlaceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
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

  // Update coordinates when returning from map picker
  useEffect(() => {
    if (params.selectedLat && params.selectedLng) {
      setFormData(prev => ({
        ...prev,
        lat: parseFloat(params.selectedLat),
        lng: parseFloat(params.selectedLng),
      }));
    }
  }, [params.selectedLat, params.selectedLng]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      
      try {
        // Save image to permanent storage (like default places)
        const filename = `place_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        
        await FileSystem.copyAsync({
          from: uri,
          to: newPath
        });
        
        // Store file path in AsyncStorage (like places.js stores require() paths)
        setImage(newPath);
        setFormData({ ...formData, image: newPath });
      } catch (error) {
        console.error('Error saving image:', error);
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

        <View style={styles.coordinatesSection}>
          <Text style={[styles.label, { color: theme.text }]}>Koordinaten</Text>
          
          <TouchableOpacity 
            style={[styles.mapButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push({
              pathname: '/map-picker',
              params: { lat: formData.lat, lng: formData.lng }
            })}
          >
            <Ionicons name="map" size={20} color="#fff" />
            <Text style={styles.mapButtonText}>Auf Karte auswählen</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={[styles.subLabel, { color: theme.textSecondary }]}>Breitengrad</Text>
              <TextInput
                style={[styles.input, styles.coordInput, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
                value={String(formData.lat.toFixed(6))}
                onChangeText={(text) => setFormData({ ...formData, lat: parseFloat(text) || 0 })}
                keyboardType="numeric"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={[styles.subLabel, { color: theme.textSecondary }]}>Längengrad</Text>
              <TextInput
                style={[styles.input, styles.coordInput, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
                value={String(formData.lng.toFixed(6))}
                onChangeText={(text) => setFormData({ ...formData, lng: parseFloat(text) || 0 })}
                keyboardType="numeric"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
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
  coordinatesSection: {
    marginBottom: 16,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfInput: {
    width: '48%'
  },
  subLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  coordInput: {
    marginBottom: 0,
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
