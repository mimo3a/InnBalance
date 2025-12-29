import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Exercise1 from '@/src/components/exercise1';
import Exercise2 from '@/src/components/exercise_2';
import Relax1 from '@/src/components/relax1';

export default function BreathingScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams();

    const renderExercise = () => {
        switch (type) {
            case 'exercise2':
                return <Exercise2 width={400} height={400} />;
            case 'relax1':
                return <Relax1 width={400} height={400} />;
            case 'exercise1':
            default:
                return <Exercise1 width={400} height={400} />;
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box}>
                <LinearGradient
                    colors={['#2f8ecdff', '#89b0f36e']}
                    style={styles.gradient}
                >
                    {renderExercise()}
                </LinearGradient>
            </TouchableOpacity>
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
});
