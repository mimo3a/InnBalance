import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

/* === NEW BREATHING SYSTEM === */
import BreathingExercise from '@/src/components/BreathingExercise';
import { BREATHING_EXERCISES } from '@/src/breathing/exerciseConfigs';

export default function BreathingScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsPlaying(p => !p)}
      activeOpacity={1}
    >
      {/* ✅ NEW BREATHING EXERCISE */}
      <BreathingExercise
        config={BREATHING_EXERCISES.anti_stress}
        isPlaying={isPlaying}
        size={260}
      />

      {/* ===========================
          OLD IMPLEMENTATION (DISABLED)
          =========================== */}

      {/*
      <View style={styles.mainContainer}>
        <View style={styles.boxWrapper}>
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              router.push({ pathname: '/exercise', params: { type: 'exercise1' } })
            }
          >
            <LinearGradient colors={GRADIENT_COLORS} style={styles.gradient}>
              <Exercise1 />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.boxWrapper}>
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              router.push({ pathname: '/exercise', params: { type: 'exercise2' } })
            }
          >
            <LinearGradient colors={GRADIENT_COLORS} style={styles.gradient}>
              <Exercise2 />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.boxWrapper}>
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              router.push({ pathname: '/exercise', params: { type: 'relax1' } })
            }
          >
            <LinearGradient colors={GRADIENT_COLORS} style={styles.gradient}>
              <Relax1 />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f6f5f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* === OLD STYLES (kept for later) === */
  /*
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  boxWrapper: {
    margin: 10,
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  */
});
