import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Exercise1 from '@/src/components/exercise1';
import Exercise2 from '@/src/components/exercise_2';
import Relax1 from '@/src/components/relax1';

const GRADIENT_COLORS = ['#2f8ecdff', '#89b0f36e'];

export default function BreathingScreen() {
    const router = useRouter();
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.box} onPress={() => router.push({ pathname: '/exercise', params: { type: 'exercise1' } })}>
            <LinearGradient
              colors={GRADIENT_COLORS}
              style={styles.gradient}>
              <Exercise1 />
            </LinearGradient>

          </TouchableOpacity>
        </View>
    
            <View style={styles.container}>
                <TouchableOpacity style={styles.box} onPress={() => router.push({ pathname: '/exercise', params: { type: 'exercise2' } })}>
                    <LinearGradient
                        colors={GRADIENT_COLORS}
                        style={styles.gradient}>
                        <Exercise2 />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.box} onPress={() => router.push({ pathname: '/exercise', params: { type: 'relax1' } })}>
                    <LinearGradient
                        colors={GRADIENT_COLORS}
                        style={styles.gradient}>
                        <Relax1 />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
     margin: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  box: {
    margin: 10,
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
});
