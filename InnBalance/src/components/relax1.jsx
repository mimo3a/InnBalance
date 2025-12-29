import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Relax1({ width = 200, height = 200 }) {
    return (
        <View style={styles.container}>
            <View style={styles.breathBox}>
                <LottieView
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