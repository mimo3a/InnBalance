/**
 * PlacesMap Component
 *
 * Displays an interactive map showing all saved relaxation places.
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useLocation } from '@/src/contexts/LocationContext';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function PlacesMap() {
  const router = useRouter();

  // ✅ get location from context
  const { location, loading: locationLoading } = useLocation();

  const placesHook = usePlaces(location && location.latitude ? location : null);

  const places = placesHook?.places ?? [];
  const placesLoading = placesHook?.loading ?? true;

  // Combined loading state
  if (!location || locationLoading || placesLoading) {
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
          latitude: Number(location.latitude) || 48.2082,
          longitude: Number(location.longitude) || 16.3738,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
}}
        showsUserLocation
      >
       {places?.map?.((place, index) => {
  if (
    typeof place.lat !== "number" ||
    typeof place.lng !== "number"
  ) {
    return null;
  }

  return (
    <Marker
      key={`${place.backendId ?? 'local'}-${place.id}-${index}`}
      coordinate={{
        latitude: place.lat,
        longitude: place.lng,
      }}
      title={place.name}
      onPress={() =>
        router.push({
          pathname: '/description',
          params: { id: place.id },
        })
      }
    />
  );
})}
      </MapView>
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
