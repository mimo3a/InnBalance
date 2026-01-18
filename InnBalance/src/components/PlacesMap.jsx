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

import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { usePlaces } from '@/src/hooks/usePlaces';
import PlaceBottomSheet from '@/src/components/PlaceBottomSheet';

export default function PlacesMap() {
  const { places, loading } = usePlaces();
  const router = useRouter();

  // New: state for the "google maps like" popup
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  // Show loading indicator while fetching places
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1d16f4" />
      </View>
    );
  }

  // New: open/close helpers (kept very simple)
  const openSheet = (place) => {
    setSelectedPlace(place);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setTimeout(() => setSelectedPlace(null), 250);
  };

  const openDetails = () => {
    if (!selectedPlace) return;
    closeSheet();
    router.push({
      pathname: '/description',
      params: { id: selectedPlace.id },
    });
  };

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
            // New: open bottom sheet on marker tap
            onPress={() => openSheet(place)}
            // Old behaviour kept (not used right now, but not deleted)
            onCalloutPress={() =>
              router.push({
                pathname: '/description',
                params: { id: place.id },
              })
            }
          >
            {/* Keeping this empty block like in your original */}
          </Marker>
        ))}
      </MapView>

      {/* New: Google Maps-like bottom sheet */}
      <PlaceBottomSheet
        place={selectedPlace}
        visible={sheetVisible}
        onClose={closeSheet}
        onOpen={openDetails}
      />
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
