import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlaces } from '@/src/hooks/usePlaces';
import { Ionicons } from '@expo/vector-icons';

export default function PlaceDescriptionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { places, loading } = usePlaces();
  const place = places.find(p => p.id === Number(id));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1d16f4ff" />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Ort nicht gefunden</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.card}>
        
        
        <View style={styles.imageWrapper}>
          <Image source={place.image} style={styles.image} />

          
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

       
        <View style={styles.titleRow}>
          <Text style={styles.title}>{place.name}</Text>

          <View style={styles.distancePill}>
            <Ionicons name="navigate-outline" size={14} color="#4a4a4a" />
            <Text style={styles.distanceText}>{place.distance} km</Text>
          </View>
        </View>

        
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐ {place.rating}</Text>
          <Text style={styles.category}>· {place.category}</Text>
        </View>

        
        <Text style={styles.description}>{place.info}</Text>

        
        <Text style={styles.rateTitle}>Bewerte diesen Ort</Text>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Ionicons key={idx} name="star-outline" size={26} color="#555" />
          ))}
        </View>

        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Navigation starten</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#00000055", // легкое затемнение фона
  },

  card: {
    marginTop: 90,
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 40,
    paddingHorizontal: 20,

    // тень / приподнятая карточка
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
  },

  imageWrapper: {
    position: "relative",
    marginTop: -40,
    borderRadius: 18,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 250,
  },

  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  titleRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  distancePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0ec",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },

  distanceText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 6,
  },

  star: {
    fontSize: 16,
    color: "#333",
  },

  category: {
    fontSize: 16,
    color: "#666",
    marginLeft: 6,
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },

  rateTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  starsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 6,
  },

  button: {
    marginTop: 26,
    backgroundColor: "#4a7f68",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
