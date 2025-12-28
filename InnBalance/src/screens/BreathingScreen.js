import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Exercise1 from '@/src/components/exercise1';

export default function BreathingScreen() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}}>
                <Exercise1 />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
