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
import { useTheme } from '@/src/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '@/src/contexts/UserContext';

    /**
     * HomeScreen Component
     * Primary screen for mood selection and weather display
     */
    export default function HomeScreen() {
        // Track the currently selected mood state
        // Track the currently selected mood state

        const [selectedState, setSelectedState] = useState(null);
        const { theme, isDark } = useTheme();

         function getGreeting() {
             const hour = new Date().getHours();
             if (hour >= 4 && hour < 13)
             return 'Good Morning';
             if (hour >= 13 && hour < 17)
             return 'Good Afternoon';
             if (hour >= 17 && hour < 20)
             return 'Good Evening';
             if (hour >= 20 || hour < 4)
             return 'Good Night';

             return 'Hello';
         }
        /**
         * Available mood states with their corresponding icons and labels
         * Each state maps to specific breathing exercises and recommendations
         */
        const STATES = [
            { key: 'depression', icon: 'emoticon-dead-outline', label: 'Depression' },
            { key: 'anxiety', icon: 'alert-circle-outline', label: 'Anxiety' },
            { key: 'anger', icon: 'emoticon-angry-outline', label: 'Anger' },
            { key: 'stress', icon: 'lightning-bolt', label: 'Stress' },
            { key: 'low_energy', icon: 'battery-low', label: 'Low energy' },
            { key: 'balance', icon: 'scale-balance', label: 'Balance' },
        ];

        // Router for navigation to recommendation screen
        const router = useRouter();

        return (
            <>
                <StatusBar style ={!isDark ? "dark" : "light"}/>
                <View style={[styles.container, { backgroundColor: theme.background }]}>
                    {/*Welcome Text*/}
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                     <ThemedText type="title" style={{ color: theme.text }}>
                       {getGreeting()}, User
                     </ThemedText>
                     <ThemedText type="subtitle">
                      How are we feeling?
                     </ThemedText>
                    </View>
                    {/* Mood Selection Container */}
                    <ThemedView style={[styles.moodContainer, { backgroundColor: theme.cardBackground }]}>
                        <ThemedView style={[styles.moodBox, { backgroundColor: theme.cardBackground }]}>

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
                                                { backgroundColor: isSelected ? theme.primary : theme.primary + '15' },
                                            ]}
                                            onPress={() => setSelectedState(state.key)}
                                            activeOpacity={0.8}
                                        >
                                            {/* Icon with dynamic color based on selection */}
                                            <MaterialCommunityIcons
                                                name={state.icon}
                                                size={32}
                                                color={isSelected ? '#ffffff' : theme.primary}
                                            />
                                            {/* Label with dynamic color */}
                                            <ThemedText
                                                style={[
                                                    styles.iconLabel,
                                                    { color: isSelected ? '#ffffff' : theme.text },
                                                ]}
                                            >
                                                {state.label}
                                            </ThemedText>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Visual separator */}
                            <View style={[styles.divider, { backgroundColor: theme.border }]} />

                            {/* Navigation Button */}
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[
                                        styles.nextButton,
                                        { backgroundColor: selectedState ? theme.primary : theme.border },
                                    ]}
                                    disabled={!selectedState}
                                    onPress={() => {
                                        // Navigate to recommendation screen with selected mood
                                        router.push(`recommendation?state=${selectedState}`);
                                    }}
                                >
                                    <ThemedText style={styles.nextButtonText}>
                                        Next →
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>


                        </ThemedView>

                    </ThemedView>

                    {/* Weather Widget */}
                    <ThemedView style={[styles.weatherContainer, { backgroundColor: theme.cardBackground }]} >
                        <View style={styles.widgetcontainer}>
                            {/* Weather data for Innsbruck coordinates */}
                            <WeatherCard
                                lat={47.2692}   // Innsbruck latitude
                                lon={11.4041}   // Innsbruck longitude
                            />
                        </View>

                    </ThemedView>

                    {/* Information/Advance Section */}
                    {/* <ThemedView style={[styles.anvanceContainer, { backgroundColor: theme.cardBackground }]}>
                        <ThemedText style={{ color: theme.text }}>
                            Choose your mood and get a preliminary recommendation for breathing exercises or a walk in the fresh air, depending on the weather.
                        </ThemedText>
                    </ThemedView> */}
                </View>
            </>
        );
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            paddingTop: 40,
        },
        moodContainer: {
            marginBottom: 24,
            borderRadius: 16,
            padding: 16,
            width: '100%',
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
        },
        moodBox: {
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
        },
        nextButton: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 16,
            alignItems: 'center',
            elevation: 4,
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
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
            width: '30%',
            minHeight: 80,
            marginBottom: 12,
        },
        weatherContainer: {
            width: '100%',
            marginBottom: 24,
            borderRadius: 16,
            padding: 16,
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
        },

        anvanceContainer: {
            borderRadius: 16,
            padding: 16,
            width: '100%',
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
        },

        footer: {
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
        },
        iconLabel: {
            marginTop: 4,
            fontSize: 12,
            textAlign: 'center',
        },
        touchableWeatherIcon: {
            alignItems: 'center',
        },
        divider: {
            width: '100%',
            height: 1,
            marginVertical: 12,
        },
    });
