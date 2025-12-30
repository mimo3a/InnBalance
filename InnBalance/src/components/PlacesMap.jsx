import React from 'react';
import { StyleSheet, View } from 'react-native';
// Map component
import MapView, { Marker } from 'react-native-maps';
import { places } from '@/src/data/places';

export default function PlacesMap() {
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
