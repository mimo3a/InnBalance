import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Timer({ width = '100%', height = 100, isPlaying = false }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            interval = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

  return (
      <View style={[styles.container, { width, height }]}>
            <View style={styles.box}>
                <Text style={styles.text}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    height: '100%',
    backgroundColor: '#80d8ecff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});