/**
 * HomeScreen Component
 * 
 * Main landing screen where users can:
 * - Select their current mood/state (depression, anxiety, anger, stress, low energy, balance)
 * - View current weather conditions
 * - Get recommendations for breathing exercises or outdoor activities
 * 
 * The selected state is passed to the recommendation screen for personalized suggestions.
 */

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherCard from '@/src/components/WeatherCard';
import { useState } from 'react';

/**
 * HomeScreen Component
 * Primary screen for mood selection and weather display
 */
export default function HomeScreen() {
    // Track the currently selected mood state
    // Track the currently selected mood state
    const [selectedState, setSelectedState] = useState(null);
    

    /**
     * Available mood states with their corresponding icons and labels
     * Each state maps to specific breathing exercises and recommendations
     */
    const STATES = [
        { key: 'depression', icon: 'emoticon-dead-outline', label: 'Depression' },
        { key: 'anxiety', icon: 'alert-circle-outline', label: 'Anxiety' },
        { key: 'anger', icon: 'emoticon-angry-outline', label: 'Anger' },
        { key: 'stress', icon: 'weather-windy', label: 'Stress' },
        { key: 'low_energy', icon: 'battery-low', label: 'Low energy' },
        { key: 'balance', icon: 'scale-balance', label: 'Balance' },
    ];

    // Router for navigation to recommendation screen
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Mood Selection Container */}
            <ThemedView style={styles.moodContainer}>
                <ThemedView style={styles.moodBox}>

                    {/* Mood Icons Grid */}
                    <View style={styles.iconsRow}>
                        {STATES.map(state => {
                            // Check if this state is currently selected
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
                                    {/* Icon with dynamic color based on selection */}
                                    <MaterialCommunityIcons
                                        name={state.icon}
                                        size={32}
                                        color={isSelected ? '#ffffff' : '#2f6f5f'}
                                    />
                                    {/* Label with dynamic color */}
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

                    {/* Visual separator */}
                    <View style={styles.divider} />

                    {/* Navigation Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                !selectedState && styles.nextButtonDisabled,
                            ]}
                            disabled={!selectedState}
                            onPress={() => {
                                // Navigate to recommendation screen with selected mood
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
            
            {/* Weather Widget */}
            <ThemedView style={styles.weatherContainer} >
                <View style={styles.widgetcontainer}>
                    {/* Weather data for Innsbruck coordinates */}
                    <WeatherCard
                        lat={47.2692}   // Innsbruck latitude
                        lon={11.4041}   // Innsbruck longitude
                    />
                </View>
                
            </ThemedView>
            
            {/* Information/Advance Section */}
            <ThemedView style={styles.anvanceContainer}>
                <ThemedText>
                    Choose your mood and get a preliminary recommendation for breathing exercises or a walk in the fresh air, depending on the weather.
                </ThemedText>
            </ThemedView>

            {/* DEV: Open style test screen */}
            <View style={{ marginTop: 16 }}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => router.push("/sample-styles")}
                >
                    <ThemedText style={styles.nextButtonText}>
                        Open Style Test →
                    </ThemedText>
                </TouchableOpacity>
            </View>
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
