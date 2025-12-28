import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RatingStars({ rating = 0 }) {
  return (
    <View style={styles.container}>
      <Text>Rating: {rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
