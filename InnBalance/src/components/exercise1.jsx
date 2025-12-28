import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Exercise1() {
    return (
        <View style={styles.container}>
            <View style={styles.breathBox}>
                <LottieView
                    source={require('@/assets/animations/BreathingPraxis_1.json')}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: 'center', 
  },
breathBox: {
    
    margin: 10,
    width: '100%',
    height: 200,
    backgroundColor: '#ec80d8ff',
    borderRadius: 10,
  
    },
});