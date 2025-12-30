import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '@/src/components/PlaceCard';

export default function PlacesListScreen() {
    const router = useRouter();

    const places = [
        { id: 1, name: 'Place 1', info: 'Short Info about Place 1', rating: 4.5, image: 'image1.png' },
        { id: 2, name: 'Place 2', info: 'Short Info about Place 2', rating: 4.0, image: 'image2.png' },
        { id: 3, name: 'Place 3', info: 'Short Info about Place 3', rating: 3.5, image: 'image3.png' },
        { id: 4, name: 'Place 4', info: 'Short Info about Place 4', rating: 5.0, image: 'image4.png' },
        { id: 5, name: 'Place 5', info: 'Short Info about Place 5', rating: 4.2, image: 'image5.png' },
        { id: 6, name: 'Place 6', info: 'Short Info about Place 6', rating: 3.8, image: 'image6.png' },
    ];

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {places.map((place) => (
                    <PlaceCard key={place.id}
                        name={place.name}
                        info={place.info}
                        rating={place.rating}
                        image={place.image} />
                ))}
            </ScrollView>

            {/* Add Place Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/add-place')}
            >
                <Ionicons name="add-circle-outline" size={70} color="black" />
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
