/**
 * MapPickerScreen
 * 
 * Full-screen interactive map for selecting place coordinates.
 * User taps anywhere on the map to select location, then confirms the selection.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function MapPickerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();

  // Get initial coordinates from params or use default (Innsbruck)
  const initialLat = params.lat ? parseFloat(params.lat) : 47.2692;
  const initialLng = params.lng ? parseFloat(params.lng) : 11.4041;

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialLat,
    longitude: initialLng,
  });

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirm = () => {
    // Navigate back to add-place with selected coordinates
    router.push({
      pathname: '/add-place',
      params: {
        selectedLat: selectedLocation.latitude.toString(),
        selectedLng: selectedLocation.longitude.toString(),
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLat,
          longitude: initialLng,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        onPress={handleMapPress}
      >
        {/* Show marker at selected location */}
        <Marker
          coordinate={selectedLocation}
          title="Ausgewählter Ort"
          pinColor={theme.primary}
        />
      </MapView>

      {/* Info Bar */}
      <View style={[styles.infoBar, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          Tippen Sie auf die Karte, um einen Ort auszuwählen
        </Text>
        <Text style={[styles.coordsText, { color: theme.textSecondary }]}>
          {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Abbrechen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.confirmButton, { backgroundColor: theme.primary }]}
          onPress={handleConfirm}
        >
          <Ionicons name="checkmark" size={24} color="#fff" />
          <Text style={[styles.buttonText, { color: '#fff' }]}>Bestätigen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  coordsText: {
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    gap: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  confirmButton: {
    // backgroundColor set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
