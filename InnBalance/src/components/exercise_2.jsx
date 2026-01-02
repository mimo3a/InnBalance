import { View, StyleSheet } from 'react-native';
import BreathingAnimation from './BreathingAnimation';

export default function Exercise2({ width = 200, height = 200, isPlaying = true, speed = 1, playMs = 4000, pauseMs = 2000 }) {
    return (
        <View style={styles.container}>
            <View style={styles.breathBox}>
                <BreathingAnimation
                    source={require('@/assets/animations/BreathingPraxis_2.json')}
                    width={width}
                    height={height}
                    isPlaying={isPlaying}
                    // speed={speed}
                    // playMs={playMs}
                    // pauseMs={pauseMs}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});