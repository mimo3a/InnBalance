import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '@/src/components/PlaceCard';
import { usePlaces } from '@/src/hooks/usePlaces';
import { useTheme } from '@/src/contexts/ThemeContext';
import useCurrentLocation from '@/src/hooks/useCurrentLocation';

export default function PlacesListScreen() {
    const [categoryFilter, setCategoryFilter] = React.useState(null);
    const router = useRouter();

    // Get user location
    const { location: userLocation } = useCurrentLocation();

    // Pass userLocation to usePlaces
    const { places, loading } = usePlaces(userLocation);
    const filteredPlaces = categoryFilter
        ? places.filter((p) => p.category === categoryFilter)
        : places;

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
            <View style={{ flexDirection: 'row', gap: 10, padding: 10 }}>
                <TouchableOpacity onPress={() => setCategoryFilter(null)}>
                    <Ionicons name="filter" size={24} color={theme.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCategoryFilter('Park')}>
                    <View style={{ padding: 8, backgroundColor: theme.primary, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Park</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCategoryFilter('Museum')}>
                    <View style={{ padding: 8, backgroundColor: theme.primary, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Museum</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCategoryFilter('Cafe')}>
                    <View style={{ padding: 8, backgroundColor: theme.primary, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Cafe</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {filteredPlaces.map((place) => (
                    <PlaceCard 
                        key={`${place.id}-${place.rating}-${place.distance}`}
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
            <View style={styles.fillView}/>{/**making the plus-symbol white, instead of transparent */}
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
    fillView:{
        position:'absolute',
        width:30,
        height:30,
        bottom:30,
        right:30,
        backgroundColor:'#fff'
    },

});
