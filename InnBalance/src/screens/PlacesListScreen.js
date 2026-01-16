import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '@/src/components/PlaceCard';
import { usePlaces } from '@/src/hooks/usePlaces';
import { useTheme } from '@/src/contexts/ThemeContext';


export default function PlacesListScreen() {
    const router = useRouter();
    const { places, loading } = usePlaces();
    const { theme } = useTheme();

    if (loading) {
        return (
            <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {places.map((place) => (
                    <PlaceCard 
                        key={`${place.id}-${place.rating}`}
                        name={place.name}
                        info={place.info}
                        rating={place.rating}
                        image={place.image}
                        distance={place.distance}
                        category={place.category}
                        onPress={() => router.push({ pathname: '/description', params: { id: place.id } })}
                    />
                ))}
            </ScrollView>

            {/* Add Place Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/add-place')}
            >
                <Ionicons name="add-circle" size={70} color={theme.primary}  />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 80, // Space for the FAB
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});
