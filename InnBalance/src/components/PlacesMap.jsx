import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
// Map component
import MapView, { Marker } from 'react-native-maps';
import { usePlaces } from '@/src/hooks/usePlaces';

export default function PlacesMap() {
  const { places, loading } = usePlaces();

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1d16f4ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.2692,   // Innsbruck
          longitude: 11.4041,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >

        {places.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.name}
            description={place.info}
          />
        ))}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
