import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '@/src/components/PlaceCard';
import { places } from '@/src/data/places';


export default function PlacesListScreen() {
    const router = useRouter();

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {places.map((place) => (
                    <PlaceCard key={place.id}
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
                <Ionicons name="add-circle-outline" size={70} color="#1d16f4ff" />
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
        bottom: 20,
        right: 20,
    },
});
