import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

/**
 * BreathingAnimation API
 * Props:
 * - source: required Lottie JSON (require('...json'))
 * - width, height: number
 * - speed: playback speed multiplier (default 1)
 * - isPlaying: start/stop external control (default true)
 * - playMs: milliseconds to play before pausing (default 4000)
 * - pauseMs: milliseconds to pause before resuming (default 2000)
 */
export default function BreathingAnimation({
  source,
  width = 200,
  height = 200,
  speed = 1,
  isPlaying = true,
  playMs = 4000,
  pauseMs = 2000,
}) {
  const animationRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const timersRef = useRef({ playTimer: null, pauseTimer: null });
  const runningRef = useRef(false);

  // Control loop of play/pause cycles with a stable recursive scheduler
  useEffect(() => {
    const anim = animationRef.current;

    const clearTimers = () => {
      if (timersRef.current.playTimer) {
        clearTimeout(timersRef.current.playTimer);
        timersRef.current.playTimer = null;
      }
      if (timersRef.current.pauseTimer) {
        clearTimeout(timersRef.current.pauseTimer);
        timersRef.current.pauseTimer = null;
      }
    };

    clearTimers();

    if (!anim) return () => {};

    // Stop cycle when externally paused
    if (!isPlaying) {
      runningRef.current = false;
      anim.pause();
      setPaused(true);
      return () => clearTimers();
    }

    runningRef.current = true;

    const runCycle = () => {
      if (!runningRef.current) return;
      // Play phase
      anim.resume();
      setPaused(false);
      timersRef.current.playTimer = setTimeout(() => {
        if (!runningRef.current) return;
        // Pause phase
        anim.pause();
        setPaused(true);
        timersRef.current.pauseTimer = setTimeout(() => {
          if (!runningRef.current) return;
          // Next iteration
          runCycle();
        }, pauseMs);
      }, playMs);
    };

    runCycle();

    return () => {
      runningRef.current = false;
      clearTimers();
    };
  }, [isPlaying, playMs, pauseMs]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay
        loop
        speed={speed}
        style={{ width, height }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
