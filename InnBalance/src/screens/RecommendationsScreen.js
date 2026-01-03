import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RecommendationsScreen() {
    const { state } = useLocalSearchParams();
    const router = useRouter();
    

    return (
        <View style={styles.container}>
            <ThemedView style={styles.recommendationsBox}>
                <Text style={styles.text}>{`Your state: ${state ?? 'unknown'}`}</Text>

                </ThemedView>
            <ThemedView style={styles.weatherBox}>
                    
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <TouchableOpacity style={styles.touchableWeatherIcon} onPress={() => router.push('/breathing')}>
                            <View >
                                <MaterialCommunityIcons name="weather-partly-cloudy" size={48} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableWeatherIcon} onPress={() => router.push('/ruheorte')}>
                            <View >
                                <MaterialCommunityIcons name="weather-sunny" size={48} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </ThemedView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    weatherBox: {
        
        justifyContent: 'space-around',
        marginTop: 10,
        width: '100%',
        height: 200,
        marginBottom: 24,
        backgroundColor: '#dbeee9ff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    
    touchableWeatherIcon: {
        padding: 10,
        borderRadius: 10,
       
    },
    
    recommendationsBox: {
        width: '100%',
        height: 200,
        marginBottom: 24,
        backgroundColor: '#dbeee9ff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});
