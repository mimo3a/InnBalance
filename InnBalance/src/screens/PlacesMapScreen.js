import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlacesMapScreen() {
  return (
    <View style={styles.container}>
      <Text>Places Map Screen</Text>
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
