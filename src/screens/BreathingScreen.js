/**
 * BreathingScreen Component
 * 
 * Displays an interactive breathing exercise based on the user's selected mood.
 * Features:
 * - Animated breathing circle that guides inhale/exhale cycles
 * - Timer to track session duration
 * - Play/Pause controls
 * - Automatic session saving to statistics
 * - Different exercise configurations per mood state
 * 
 * The screen automatically saves completed sessions when pausing or exiting.
 */

import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/src/contexts/ThemeContext';
import { saveSession } from '@/src/services/statisticsService';
import { StatusBar } from 'expo-status-bar';
import { BREATHING_EXERCISES } from '../breathing/exerciseConfigs';
import BreathingExercise from '../components/BreathingExercise';
import TimerControls from '../components/ui/timerControls';


export default function BreathingScreen() {
  const { state } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const { theme, isDark } = useTheme();
  const sessionSavedRef = useRef(false);

  // Select config based on mood state
  const getConfig = () => {
    switch (state) {
      case 'depression':
        return BREATHING_EXERCISES.anti_depression;
      case 'anxiety':
        return BREATHING_EXERCISES.anti_anxiety;
      case 'anger':
        return BREATHING_EXERCISES.anti_anger;
      case 'stress':
        return BREATHING_EXERCISES.anti_stress;
      case 'low_energy':
        return BREATHING_EXERCISES.anti_low_energy;
      case 'balance':
        return BREATHING_EXERCISES.balance;
      default:
        return BREATHING_EXERCISES.anti_stress; // Default fallback
    }
  };

  const config = getConfig();

  const intervalRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const sessionSecondsRef = useRef(sessionSeconds);

  // Synchronize refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    sessionSecondsRef.current = sessionSeconds;
  }, [sessionSeconds]);

  // Timer: increment session seconds every second when playing
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // Handle Play/Pause button press
  const handleToggle = async () => {
    // Toggle between play and pause without resetting the timer.
    // Session saving is handled when navigating away from this screen.
    if (isPlaying) {
      // PAUSE
      setIsPlaying(false);
    } else {
      // PLAY / RESUME
      setIsPlaying(true);
    }
  };

  // Screen exit handler - Save session when user navigates away
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        // Save the session if there is recorded time that hasn't been saved yet,
        // regardless of whether the animation is currently playing or paused.
        if (sessionSecondsRef.current > 0 && !sessionSavedRef.current) {
          saveSession({
            duration: sessionSecondsRef.current,
            date: new Date().toISOString(),
            state: state // Pass the mood for statistics
          });
          sessionSavedRef.current = true;
          sessionSecondsRef.current = 0;
        }
      };
    }, [state])
  );

  // Render the breathing screenc
  // example


  return (
    <>
      <StatusBar style ={!isDark ? "dark" : "light"}/>
        
      <View style={[styles.screen, { backgroundColor: theme.background }]}>
        {/* Header showing current mood */}
        <View style={styles.headerContainer}>
          <Text style={[{ fontSize: 24, fontWeight: 'bold' }, { color: theme.text }]}>{config.title}</Text>
        </View>

        <View style={styles.exerciseContainer}>
          <BreathingExercise
            isPlaying={isPlaying}
            config={config}
          />
        </View>

        {/* Timer and controls at bottom */}
        <View style={styles.timerContainer}>
          <TimerControls
            seconds={sessionSeconds}
            isPlaying={isPlaying}
            onPress={handleToggle}
          />
        </View>
      </View>
  </>
);

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 16,
  },

  exerciseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerContainer: {
    paddingBottom: 24,
  },
  headerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

