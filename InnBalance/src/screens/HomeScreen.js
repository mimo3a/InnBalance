import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherCard from '@/src/components/WeatherCard';

export default function HomeScreen() {

    const STATES = [
        { key: 'stress', icon: 'brain', label: 'Stress' },
        { key: 'tension', icon: 'weather-windy', label: 'Inner tension' },
        { key: 'tired', icon: 'battery-low', label: 'Low energy' },
        { key: 'balance', icon: 'scale-balance', label: 'Balance' },
        { key: 'calm', icon: 'leaf', label: 'Calm' },
    ];

    const router = useRouter();

    return (
        <View style={styles.container}>
            <ThemedView style={styles.moodContainer}>
                <ThemedView style={styles.moodBox}>
                    <View style={styles.iconsRow}>
                        {STATES.map(state => (
                            <TouchableOpacity
                                key={state.key}
                                style={styles.touchableIcon}
                                onPress={() => {/* save state */ }}
                            >
                                <MaterialCommunityIcons
                                    name={state.icon}
                                    size={32}
                                    color="#2f6f5f"
                                />
                                <ThemedText style={{ fontSize: 11 }}>
                                    {state.label}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>


                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.weatherContainer} >
                <View style={styles.widgetcontainer}>
                    <WeatherCard
                        lat={47.2692}   // Innsbruck
                        lon={11.4041}
                    />
                </View>
                <ThemedView style={styles.weatherBox}>
                    <View style={{ justifyContent: 'center' }}>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
            </ThemedView>
            <ThemedView style={styles.anvanceContainer}>
                <ThemedView style={styles.anvanceBox}>
                    <ThemedText>Choose your mood and get a preliminary recommendation for breathing exercises or a walk in the fresh air, depending on the weather. .</ThemedText>
                </ThemedView>
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
    moodContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',

    },
    moodBox: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
    },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    touchableIcon: {
        padding: 5,
    },
    iconPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherContainer: {
        flex: 1,
        width: '100%',
    },
    weatherBox: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        backgroundColor: '#d0d0d0',
        borderRadius: 10,
    },
    anvanceContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    anvanceBox: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    widgetcontainer: {
        padding: 16,
    },
});
