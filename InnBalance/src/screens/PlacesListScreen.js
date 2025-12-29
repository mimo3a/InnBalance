import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PlaceCard from '@/src/components/PlaceCard';

export default function PlacesListScreen() {

    const places = [ 
    { id: 1, name: 'Place 1', info: 'Short Info about Place 1', rating: 4.5, image: 'image1.png' },
    { id: 2, name: 'Place 2', info: 'Short Info about Place 2', rating: 4.0, image: 'image2.png' },
    { id: 3, name: 'Place 3', info: 'Short Info about Place 3', rating: 3.5, image: 'image3.png' },
    { id: 4, name: 'Place 4', info: 'Short Info about Place 4', rating: 5.0, image: 'image4.png' },
    { id: 5, name: 'Place 5', info: 'Short Info about Place 5', rating: 4.2, image: 'image5.png' },
    { id: 6, name: 'Place 6', info: 'Short Info about Place 6', rating: 3.8, image: 'image6.png' },
    ];

    return (
        <ScrollView>
        <View style={styles.container}>
            {places.map((place) => (

                <PlaceCard key={place.id}
                    name={place.name}
                    info={place.info}
                    rating={place.rating}
                    image={place.image} />
            ))}

        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
