import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

import BreathingExercise from '../components/BreathingExercise';
import TimerControls from '../components/ui/timerControls';
import { saveSession } from '../services/statisticsService';
import { BREATHING_EXERCISES } from '../breathing/exerciseConfigs';

export default function BreathingScreen() {
  const { state } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Выбираем конфиг в зависимости от state
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
        return BREATHING_EXERCISES.anti_stress; // по умолчанию
    }
  };

  const config = getConfig();

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

  // ▶️ / ⏸️ кнопка Play / Pause
  const handleToggle = async () => {
    if (isPlaying) {
      // PAUSE - сохраняем текущую сессию и останавливаем
      if (sessionSeconds > 0) {
        console.log('Saving session on pause:', sessionSeconds);
        await saveSession({
          duration: sessionSeconds,
          date: new Date().toISOString(),
          state: state // für die Übergabe des Moods
        });
      }
      setIsPlaying(false);
      setSessionSeconds(0);
    } else {
      // PLAY - начинаем заново
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
            state: state // für die Übergabe des Moods
          });
          sessionSecondsRef.current = 0;
        }
      };
    }, [state])
  );

  return (
  <View style={styles.screen}>
    {/* Центр экрана */}
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{state}</Text>
    </View>

    <View style={styles.exerciseContainer}>
      <BreathingExercise
        isPlaying={isPlaying}
        config={config}
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
  headerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

