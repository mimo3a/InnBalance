import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlacesListScreen() {
  return (
    <View style={styles.container}>
      <Text>Places List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
