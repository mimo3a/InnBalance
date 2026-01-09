/**
 * PlaceCard Component
 * 
 * A card component displaying information about a relaxation place.
 * Shows image, name, description, rating, distance, and category.
 * 
 * Props:
 * @param {string} name - Place name
 * @param {string} info - Place description
 * @param {string|Object} image - Image URI or require() object
 * @param {number} rating - Star rating (0-5)
 * @param {string|number} distance - Distance in kilometers
 * @param {string} category - Place category (e.g., "Park", "Lake")
 * @param {Function} onPress - Callback when card is pressed
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * PlaceCard Component
 * Displays a place with image, details, and rating
 */
export default function PlaceCard({ name, info, image, rating, distance, category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      
      <View style={styles.row}>
        
        {/* Place Image */}
        <Image 
          source={typeof image === 'string' ? { uri: image } : image} 
          style={styles.image}
        />

        {/* Text and Info Area */}
        <View style={styles.textContainer}>
          
          {/* Row: Title + Distance */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.distance}>{distance} km</Text>
          </View>

          {/* Description (max 2 lines) */}
          <Text style={styles.description} numberOfLines={2}>
            {info}
          </Text>

          {/* Rating and Category Row */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#F4C430" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.category}>{category}</Text>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  row: {
    flexDirection: "row",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  distance: {
    fontSize: 13,
    color: "#777",
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  category: {
    marginLeft: 8,
    fontSize: 13,
    color: "#777",
  },
});
