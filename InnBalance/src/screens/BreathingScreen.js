// screens/BreathingScreen.jsx
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BreathingExercise from '../components/BreathingExercise';
import TimerControls from '../components/ui/timerControls';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function BreathingScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const isPlayingRef = useRef(isPlaying);
  const sessionSecondsRef = useRef(sessionSeconds);


  const intervalRef = useRef(null);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    sessionSecondsRef.current = sessionSeconds;
  }, [sessionSeconds]);


  // ⏱️ Таймер
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // ▶️ / ⏹ кнопка
  const handleToggle = () => {
    if (isPlaying) {
      // STOP → сохранить статистику
      setStatistics(prev => [
        ...prev,
        {
          duration: sessionSeconds,
          date: new Date().toISOString(),
        },
      ]);
      console.log('Session saved:', {
        duration: sessionSeconds,
        date: new Date().toISOString(),
      });

      setIsPlaying(false);
      setSessionSeconds(0); // ⬅️ СБРОС
    } else {
      // START → новый сеанс
      setSessionSeconds(0);
      setIsPlaying(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        // экран реально покинут
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        if (isPlayingRef.current && sessionSecondsRef.current > 0) {
          setStatistics(prev => [
            ...prev,
            {
              duration: sessionSecondsRef.current,
              date: new Date().toISOString(),
            },
          ]);
        }
      };
    }, []) // ❗ НИКАКИХ ЗАВИСИМОСТЕЙ
  );





  return (
    <View style={styles.screen}>
      <BreathingExercise
        isPlaying={isPlaying}
        config={{ inhale: 4, holdAfterInhale: 4, exhale: 6 }}
      />

      <TimerControls
        seconds={sessionSeconds}
        isPlaying={isPlaying}
        onPress={handleToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});
