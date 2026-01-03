// components/TimerControls.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TimerControls({ seconds, isPlaying, onPress }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <View style={styles.card}>
      <Text style={styles.time}>
        {minutes.toString().padStart(2, '0')}:
        {secs.toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons
          name={isPlaying ? 'stop' : 'play'}
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#dbeee9ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  time: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1e3d34',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0b4a39',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
