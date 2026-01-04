import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherCard from '@/src/components/WeatherCard';
import { useState } from 'react';

export default function HomeScreen() {

    const [selectedState, setSelectedState] = useState(null);
    


    const STATES = [
        { key: 'depression', icon: 'emoticon-dead-outline', label: 'Depression' },
        { key: 'anxiety', icon: 'alert-circle-outline', label: 'Anxiety' },
        { key: 'anger', icon: 'emoticon-angry-outline', label: 'Anger' },
        { key: 'stress', icon: 'weather-windy', label: 'Stress' },
        { key: 'low_energy', icon: 'battery-low', label: 'Low energy' },
        { key: 'balance', icon: 'scale-balance', label: 'Balance' },
    ];


    const router = useRouter();

    return (
        <View style={styles.container}>
            <ThemedView style={styles.moodContainer}>
                <ThemedView style={styles.moodBox}>

                    {/* ИКОНКИ */}
                    <View style={styles.iconsRow}>
                        {STATES.map(state => {
                            const isSelected = selectedState === state.key;

                            return (
                                <TouchableOpacity
                                    key={state.key}
                                    style={[
                                        styles.touchableIcon,
                                        isSelected && styles.iconSelected,
                                    ]}
                                    onPress={() => setSelectedState(state.key)}
                                    activeOpacity={0.8}
                                >
                                    <MaterialCommunityIcons
                                        name={state.icon}
                                        size={32}
                                        color={isSelected ? '#ffffff' : '#2f6f5f'}
                                    />
                                    <ThemedText
                                        style={[
                                            styles.iconLabel,
                                            isSelected && { color: '#ffffff' },
                                        ]}
                                    >
                                        {state.label}
                                    </ThemedText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.divider} />

                    {/* КНОПКА */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                !selectedState && styles.nextButtonDisabled,
                            ]}
                            disabled={!selectedState}
                            onPress={() => {

                                router.push(`recommendation?state=${selectedState}`);
                            }}
                        >
                            <ThemedText style={styles.nextButtonText}>
                                Weiter →
                            </ThemedText>
                        </TouchableOpacity>
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
                
            </ThemedView>
            <ThemedView style={styles.anvanceContainer}>
                
                    <ThemedText>Choose your mood and get a preliminary recommendation for breathing exercises or a walk in the fresh air, depending on the weather. .</ThemedText>
                
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    moodContainer: {
        // width: '100%',
         marginBottom: 24,
        backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  
    },
    moodBox: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#2f6f5f',
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
    nextButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    iconsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
    },
    touchableIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#eef5f2',
        width: '30%',
        minHeight: 80,
        marginBottom: 12,
    },
    weatherContainer: {
        width: '100%',
        marginBottom: 24,
    },
    
    anvanceContainer: {
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  
    },
    // anvanceBox: {
    //     padding: 16,
    //     backgroundColor: '#e0e0e0',
    //     borderRadius: 12,
    // },
    
    footer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: '#a0a0a0',
    },
    iconSelected: {
        backgroundColor: '#2f6f5f',
    },
    iconLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#2f6f5f',
    },
    touchableWeatherIcon: {
        alignItems: 'center',
    },
    divider: {
        width: '100%',
    height: 1,
    backgroundColor: '#d0d8d3',
    marginVertical: 12,
  },
});
