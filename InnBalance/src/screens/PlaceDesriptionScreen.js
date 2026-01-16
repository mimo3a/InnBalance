import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlaces } from '@/src/hooks/usePlaces';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function PlaceDescriptionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { places, loading } = usePlaces();
  const place = places.find(p => p.id === Number(id));
  const { theme } = useTheme();

  const openNavigation = () => {
    if (!place) return;

    const { lat, lng, name } = place;
    const label = encodeURIComponent(name);

    // Build platform-specific navigation URLs
    const scheme = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
    });

    const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    // Try to open native maps app
    Linking.canOpenURL(scheme).then((supported) => {
      if (supported) {
        Linking.openURL(scheme);
      } else {
        // Fallback to web URL
        Linking.openURL(webUrl);
      }
    }).catch(() => {
      Alert.alert('Fehler', 'Navigation konnte nicht gestartet werden');
    });
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Ort nicht gefunden</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.card, { backgroundColor: theme.cardBackground }]}>
        
        
        <View style={styles.imageWrapper}>
          <Image source={place.image} style={styles.image} />

          
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: theme.cardBackground }]} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

       
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.text }]}>{place.name}</Text>

          <View style={[styles.distancePill, { backgroundColor: theme.primary + '20' }]}>
            <Ionicons name="navigate-outline" size={14} color={theme.primary} />
            <Text style={[styles.distanceText, { color: theme.text }]}>{place.distance} km</Text>
          </View>
        </View>

        
        <View style={styles.ratingRow}>
          <Text style={[styles.star, { color: theme.text }]}>⭐ {place.rating}</Text>
          <Text style={[styles.category, { color: theme.textSecondary }]}>· {place.category}</Text>
        </View>

        
        <Text style={[styles.description, { color: theme.text }]}>{place.info}</Text>

        
        <Text style={[styles.rateTitle, { color: theme.text }]}>Bewerte diesen Ort</Text>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Ionicons key={idx} name="star-outline" size={26} color={theme.textSecondary} />
          ))}
        </View>

        
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={openNavigation}>
          <Text style={styles.buttonText}>Navigation starten</Text>
        </TouchableOpacity>

      </ScrollView>
         
          
        
          <Ionicons name="navigate" size={20} color="#fff" style={{ marginRight: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  card: {
    marginTop: 90,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 40,
    paddingHorizontal: 20,
    shadowOpacity: 0.15,
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
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },

  distanceText: {
    marginLeft: 4,
    fontSize: 14,
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 6,
  },

  star: {
    fontSize: 16,
  },

  category: {
    fontSize: 16,
    marginLeft: 6,
  },

  description: {
    marginTop: 16,
    fontSize: 18,
    lineHeight: 26,
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
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
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
