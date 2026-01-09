/**
 * PlacesMap Component
 * 
 * Displays an interactive map showing all saved relaxation places.
 * Users can tap on markers to view place details and navigate to the description screen.
 * 
 * Features:
 * - Interactive map centered on Innsbruck
 * - Markers for each saved place
 * - Loading state with spinner
 * - Tap callouts to navigate to place details
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function PlacesMap() {
  const { places, loading } = usePlaces();
  const router = useRouter();

  // Show loading indicator while fetching places
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1d16f4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map view centered on Innsbruck with initial zoom level */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.2692, // Innsbruck
          longitude: 11.4041,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
      >
        {/* Render a marker for each saved place */}
        {places.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.name}
            description={`details...`}         
            // Navigate to place description when callout is pressed
            onCalloutPress={() =>
              router.push({
                pathname: '/description',
                params: { id: place.id },
              })
            }
          >
            
          </Marker>
        ))}
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

  /* Callout */
  calloutBubble: {
    minWidth: 300,
    maxWidth: 380,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  calloutTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  calloutDescription: {
    fontSize: 13,
    color: '#444',
  },
  calloutHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#1d16f4',
    fontWeight: '600',
  },
});
