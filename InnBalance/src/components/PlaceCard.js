import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PlaceCard(props) {
  return (
    <View style={styles.card}>
      
      
      <Text style={styles.title}>{props.name}</Text>

      <View style={styles.row}>
        
       
        <Image 
          source={{ uri: props.image }} 
          style={styles.image}
        />

        
        <View style={styles.infoArea}>
          
          <Text style={styles.info} numberOfLines={3}>
            {props.info}
          </Text>

          
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{props.rating} ★</Text>
          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginVertical: 8,
    alignSelf: 'center',

    // Тень
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#cce5ff',
  },

  infoArea: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  info: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 8,
  },

  rating: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#d4edda',
    borderRadius: 8,
  },

  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#155724',
  },
});
