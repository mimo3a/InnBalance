import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import BreathingExercise from '../components/BreathingExercise';
import TimerControls from '../components/ui/timerControls';
import { saveSession } from '../services/statisticsService';

export default function BreathingScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const intervalRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const sessionSecondsRef = useRef(sessionSeconds);

  // 🔁 синхронизация refs
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    sessionSecondsRef.current = sessionSeconds;
  }, [sessionSeconds]);

  // ⏱️ таймер
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

  // ▶️ / ⏹ кнопка Start / Stop
  const handleToggle = async () => {
    if (isPlaying) {
      const session = {
        duration: sessionSeconds,
        date: new Date().toISOString(),
      };

      await saveSession(session);

      sessionSecondsRef.current = 0;
      setIsPlaying(false);
      setSessionSeconds(0);
    } else {
      setSessionSeconds(0);
      setIsPlaying(true);
    }
  };

  // ⬅️ выход с экрана = Stop
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        if (isPlayingRef.current && sessionSecondsRef.current > 0) {
          saveSession({
            duration: sessionSecondsRef.current,
            date: new Date().toISOString(),
          });
          sessionSecondsRef.current = 0;
        }
      };
    }, [])
  );

  return (
  <View style={styles.screen}>
    {/* Центр экрана */}
    <View style={styles.exerciseContainer}>
      <BreathingExercise
        isPlaying={isPlaying}
        config={{ inhale: 4, holdAfterInhale: 4, exhale: 6 }}
      />
    </View>

    {/* Низ экрана */}
    <View style={styles.timerContainer}>
      <TimerControls
        seconds={sessionSeconds}
        isPlaying={isPlaying}
        onPress={handleToggle}
      />
    </View>
  </View>
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
});

