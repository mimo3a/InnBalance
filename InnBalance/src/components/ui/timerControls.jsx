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
import { useTheme } from '@/src/contexts/ThemeContext';

/**
 * TimerControls Component
 * Renders timer display and control button
 */
export default function TimerControls({ seconds, isPlaying, onPress }) {
  const { theme } = useTheme();
  // Convert total seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      {/* Timer display in MM:SS format */}
      <Text style={[styles.time, { color: theme.text }]}>
        {minutes.toString().padStart(2, '0')}:
        {secs.toString().padStart(2, '0')}
      </Text>

      {/* Play/Stop toggle button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={onPress}>
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  time: {
    fontSize: 28,
    fontWeight: '600',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
});
