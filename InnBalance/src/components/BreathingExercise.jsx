/**
 * Beautiful Breathing Sphere Animation
 * - Realistic 3D sphere (light + dark mode)
 * - Smooth inhale / hold / exhale transitions
 * - Pulsating animation synced with breathing
 * - Animated progress stroke
 */

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useTheme } from "@/src/contexts/ThemeContext";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingExercise({ config, isPlaying, size = 240 }) {
  const { theme, isDark } = useTheme();

  const radius = size / 2 - 18;
  const circumference = 2 * Math.PI * radius;

  const progress = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = useState("inhale");

  /** BREATHING ANIMATION **/
  useEffect(() => {
    if (!isPlaying || !config) {
      progress.stopAnimation();
      progress.setValue(0);
      pulse.setValue(1);
      setPhase("inhale");
      return;
    }

    let cancelled = false;

    const animateBreathing = () => {
      setPhase("inhale");
      pulse.setValue(0.9);

      Animated.parallel([
        Animated.timing(progress, {
          toValue: 1,
          duration: config.inhale * 1000,
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: config.inhale * 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (cancelled) return;

        setPhase("hold");

        setTimeout(() => {
          if (cancelled) return;

          setPhase("exhale");

          Animated.parallel([
            Animated.timing(progress, {
              toValue: 0,
              duration: config.exhale * 1000,
              useNativeDriver: false,
            }),
            Animated.timing(pulse, {
              toValue: 0.9,
              duration: config.exhale * 1000,
              useNativeDriver: false,
            }),
          ]).start(() => {
            if (!cancelled) animateBreathing();
          });
        }, (config.holdAfterInhale || 0) * 1000);
      });
    };

    animateBreathing();

    return () => {
      cancelled = true;
      progress.stopAnimation();
    };
  }, [isPlaying, config]);

  /** Stroke animation **/
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  /** Sizing pulse animation **/
  const scale = pulse.interpolate({
    inputRange: [0.9, 1.1],
    outputRange: [0.9, 1.1],
  });

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Svg width={size} height={size}>

          {/* Define realistic 3D sphere gradient */}
          <Defs>
            <RadialGradient
              id="sphereGradient"
              cx="30%"
              cy="25%"
              r="75%"
            >
              {/* Edge darkening */}
              <Stop offset="70%" stopColor={theme.primary} stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.35 : 0.18} />
            </RadialGradient>
          </Defs>

          {/* Main sphere with gradient fill */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="url(#sphereGradient)"
          />


          {/* Animated progress stroke */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDark ? theme.primaryLight : theme.primary}
            strokeWidth={12}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />

        </Svg>
      </Animated.View>

      {/* PHASE TEXT INSIDE THE CIRCLE */}
      <Animated.View
        style={{
          position: "absolute",
          top: size / 2 - 14,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.label, { color: "#ffffff" }]}>
          {phase.toUpperCase()}
        </Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "92%",
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  phase: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.2,
    bottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
