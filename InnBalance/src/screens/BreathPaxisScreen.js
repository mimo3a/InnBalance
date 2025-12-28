import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

export default function BreathPaxisScreen() {
  return (
    <View style={styles.container}>
      <Text>Breath Paxis Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});