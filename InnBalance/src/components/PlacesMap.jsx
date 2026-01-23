/**
 * PlacesMap Component
 *
 * Displays an interactive map showing all saved relaxation places.
 */

import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

import { useLocation } from '@/src/contexts/LocationContext';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function PlacesMap() {
  const router = useRouter();

  // 🔹 global location (from Context)
  const { location, loading: locationLoading, errorMsg } = useLocation();

  // 🔹 places depend on location
  const { places, loading: placesLoading } = usePlaces(location);

  // 🔄 loading state
  if (locationLoading || placesLoading || !location) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1d16f4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        showsUserLocation
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.name}
            description="details..."
            onCalloutPress={() =>
              router.push({
                pathname: '/description',
                params: { id: place.id },
              })
            }
          />
        ))}
      </MapView>

      {errorMsg && (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
