/**
 * BreathingExercise Component
 * 
 * An animated breathing guide that displays a pulsating circle with visual feedback.
 * The circle fills and empties following the breathing pattern (inhale/hold/exhale).
 * 
 * Features:
 * - Smooth animations using React Native Animated API
 * - SVG-based circular progress indicator
 * - Dynamic phase labels (INHALE, HOLD, EXHALE)
 * - Configurable timing through exercise config objects
 * - Gradient fill effect for visual appeal
 * 
 * Props:
 * @param {Object} config - Exercise configuration with inhale, exhale, and holdAfterInhale durations
 * @param {boolean} isPlaying - Whether the exercise is currently active
 * @param {number} size - Diameter of the breathing circle (default: 220)
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/src/contexts/ThemeContext';





// Create animated circle component only once (outside component to avoid recreation)
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingExercise({ config, isPlaying, size = 220 }) {
  const { theme } = useTheme();
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;

  const progress = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    // Always reset on stop
    if (!isPlaying || !config) {
      progress.stopAnimation();
      progress.setValue(0);
      setPhase('inhale');
      return;
    }

    let cancelled = false;

    const run = () => {
      // Reset before starting new cycle
      progress.stopAnimation();
      progress.setValue(0);
      setPhase('inhale');
      
      Animated.timing(progress, {
        toValue: 1,
        duration: config.inhale * 1000,
        useNativeDriver: false,
      }).start(() => {
        if (cancelled) return;

        setPhase('hold');
        setTimeout(() => {
          if (cancelled) return;

          setPhase('exhale');
          Animated.timing(progress, {
            toValue: 0,
            duration: config.exhale * 1000,
            useNativeDriver: false,
          }).start(() => {
            if (!cancelled) run();
          });
        }, (config.holdAfterInhale || 0) * 1000);
      });
    };

    run();

    return () => {
      cancelled = true;
      progress.stopAnimation();
    };
  }, [isPlaying, config, progress]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      {/* SVG circle with gradient and progress indicator */}
      <Svg width={size} height={size}>
        {/* Define gradient for 3D sphere effect */}
        <Defs>
          <RadialGradient id="sphereGradient" cx="40%" cy="40%">
            <Stop offset="0%" stopColor={theme.primary + '30'} stopOpacity="1" />
            <Stop offset="50%" stopColor={theme.primary + '80'} stopOpacity="1" />
            <Stop offset="100%" stopColor={theme.primary} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        
        {/* Background circle with gradient fill */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="url(#sphereGradient)"
        />
        
        {/* Background stroke (light gray track) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.border}
          strokeWidth={12}
          fill="none"
        />
        
        {/* Animated progress stroke */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.primary}
          strokeWidth={10}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      {/* Phase label (INHALE, HOLD, EXHALE) */}
      <Text style={[styles.label, { color: theme.text }]}>{phase.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  label: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
