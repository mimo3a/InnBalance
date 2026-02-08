import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '@/src/components/PlaceCard';
import { usePlaces } from '@/src/hooks/usePlaces';
import { useTheme } from '@/src/contexts/ThemeContext';
import useCurrentLocation from '@/src/hooks/useCurrentLocation';
import { StatusBar } from 'expo-status-bar';
import { AddPlaceButton } from '../components/AddPlaceButton';
export default function PlacesListScreen() {
    const [categoryFilters, setCategoryFilters] = React.useState([]);

    const router = useRouter();
    const { location: userLocation } = useCurrentLocation();
    const { places, loading } = usePlaces(userLocation);
    const { theme, isDark } = useTheme();

    const categories = [...new Set(places.map((p) => p.category))];

    const toggleCategory = (cat) => {
        setCategoryFilters((prev) =>
            prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
        );
    };

    const filteredPlaces =
        categoryFilters.length === 0
            ? places
            : places.filter((p) => categoryFilters.includes(p.category));


    if (loading) {
        return (
            <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
            <StatusBar style ={!isDark ? "dark" : "light"}/>
            {/* FILTER-BAR */}
            <View style={{ flexDirection: 'row', gap: 10, padding: 10, flexWrap: 'wrap' }}>
                
                {/* Reset Button */}
                <TouchableOpacity onPress={() => setCategoryFilters([])}>
                    <Ionicons name="filter" size={24} color={theme.primary} />
                </TouchableOpacity>

                {/* Dynamische Kategorie-Chips */}
                {categories.map((cat) => {
                    const isActive = categoryFilters.includes(cat);

                    return (
                        <TouchableOpacity key={cat} onPress={() => toggleCategory(cat)}>
                            <View
                                style={{
                                    padding: 8,
                                    borderRadius: 8,
                                    backgroundColor: isActive ? theme.primary : theme.cardBackground
                                }}
                            >
                                <Text style={{ color: isActive ? '#fff' : theme.primary }}>
                                    {cat}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                contentInsetAdjustmentBehavior = 'automatic'
                >
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
            <AddPlaceButton style={styles.addButton}/>
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
