import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import Exercise1 from '@/src/components/exercise1';
import Exercise2 from '@/src/components/exercise_2';

export default function BreathingScreen() {
    const router = useRouter();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.box} onPress={() => router.push('/exercise')}>
                    <Exercise1 />
                </TouchableOpacity>
            </View>
    
            <View style={styles.container}>
                <TouchableOpacity style={styles.box} onPress={() => router.push('/exercise')}>
                    <Exercise2 />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    margin: 10,
    alignItems: 'center',
  },
  box: {
    margin: 10,
    width: '100%',
    height: 200,
    backgroundColor: '#ec80d8ff',
    borderRadius: 10,
  },
});
