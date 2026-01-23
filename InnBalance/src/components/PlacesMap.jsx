/**
 * PlacesMap Component
 *
 * Displays an interactive map showing all saved relaxation places.
 */

import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';

import { useLocation } from '@/src/contexts/LocationContext';
import { usePlaces } from '@/src/hooks/usePlaces';
import PlaceBottomSheet from '@/src/components/PlaceBottomSheet';

export default function PlacesMap() {
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
});
