import { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Relax1({ width = 200, height = 200, isPlaying = true }) {
    const animation = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            animation.current?.resume();
        } else {
            animation.current?.pause();
        }
    }, [isPlaying]);

    return (
        <View style={styles.container}>
            <View style={styles.breathBox}>
                <LottieView
                    ref={animation}
                    source={require('@/assets/animations/relax1.json')}
                    autoPlay
                    loop
                    style={{ width, height }}
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