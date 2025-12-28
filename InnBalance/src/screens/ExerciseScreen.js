import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Exercise1 from '@/src/components/exercise1';

export default function BreathingScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box}>
                <LinearGradient
                    colors={['#a18cd1', '#fbc2eb']}
                    style={styles.gradient}
                >
                    <Exercise1 width={400} height={400} />
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
