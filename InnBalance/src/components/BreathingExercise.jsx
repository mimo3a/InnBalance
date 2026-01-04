import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';





// ❗ ТОЛЬКО ОДИН РАЗ
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingExercise({ config, isPlaying, size = 220 }) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;

  const progress = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    // Всегда сбрасываем при остановке
    if (!isPlaying || !config) {
      progress.stopAnimation();
      progress.setValue(0);
      setPhase('inhale');
      return;
    }

    let cancelled = false;

    const run = () => {
      // Сброс перед началом нового цикла
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
    <View style={styles.card}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="sphereGradient" cx="40%" cy="40%">
            <Stop offset="0%" stopColor="#e8f5f0" stopOpacity="1" />
            <Stop offset="50%" stopColor="#a8d5c3" stopOpacity="1" />
            <Stop offset="100%" stopColor="#2f6f5f" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="url(#sphereGradient)"
        />
        
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d6e7e1"
          strokeWidth={12}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0b4a39"
          strokeWidth={10}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <Text style={styles.label}>{phase.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#dbeee9ff',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  label: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3d34',
    letterSpacing: 1,
  },
});
