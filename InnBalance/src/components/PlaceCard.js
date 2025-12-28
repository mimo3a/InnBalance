import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceCard() {
  return (
    <View style={styles.container}>
      <Text>Place Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
  },
});
