import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


import Exercise1 from '@/src/components/exercise1';
import Exercise2 from '@/src/components/exercise_2';
import Relax1 from '@/src/components/relax1';
import Timer from '@/src/components/timer';

export default function BreathingScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams();
    const [isPlaying, setIsPlaying] = useState(true);

    const renderExercise = () => {
        switch (type) {
            case 'exercise2':
                return <Exercise2 width={400} height={400} isPlaying={isPlaying} />;
            case 'relax1':
                return <Relax1 width={400} height={400} isPlaying={isPlaying} />;
            case 'exercise1':
            default:
                return  <Exercise1 width={400} height={400} isPlaying={isPlaying} />;
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => setIsPlaying(!isPlaying)} activeOpacity={1}>
                <LinearGradient
                    colors={['#2f8ecdff', '#89b0f36e']}
                    style={styles.gradient}
                >
                    {renderExercise()}
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.timer} >
              <Timer width={400} height={100} isPlaying={isPlaying} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    margin: 10,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    width: '95%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    width: '95%',
    height: 100,
    marginBottom: 20,
  },
});
