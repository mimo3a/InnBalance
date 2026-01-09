/**
 * TimerControls Component
 * 
 * Displays the session timer and play/stop control button.
 * Shows elapsed time in MM:SS format with a toggle button.
 * 
 * Props:
 * @param {number} seconds - Total elapsed seconds
 * @param {boolean} isPlaying - Whether the timer is currently running
 * @param {Function} onPress - Callback for play/stop button press
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * TimerControls Component
 * Renders timer display and control button
 */
export default function TimerControls({ seconds, isPlaying, onPress }) {
  // Convert total seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <View style={styles.card}>
      {/* Timer display in MM:SS format */}
      <Text style={styles.time}>
        {minutes.toString().padStart(2, '0')}:
        {secs.toString().padStart(2, '0')}
      </Text>

      {/* Play/Stop toggle button */}
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
