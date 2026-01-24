import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { places as defaultPlaces } from '@/src/data/places';
import { getDistanceFromLatLonInKm } from '@/src/utils/distance';

const STORAGE_KEY = '@innbalance_user_places';
const INITIALIZED_KEY = '@innbalance_places_initialized';

export function usePlaces(userLocation) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load places initially and when userLocation changes
  useEffect(() => {
    loadPlaces();
  }, [userLocation?.latitude, userLocation?.longitude]);

  // Load or initialize places
  const loadPlaces = async () => {
    try {
      let storedPlaces;

      const isInitialized = await AsyncStorage.getItem(INITIALIZED_KEY);

      if (!isInitialized) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
        await AsyncStorage.setItem(INITIALIZED_KEY, 'true');
        storedPlaces = defaultPlaces;
      } else {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        storedPlaces = data ? JSON.parse(data) : defaultPlaces;
      }

      // Add distance if location available
      if (userLocation) {
        storedPlaces = storedPlaces.map(place => ({
          ...place,
          distance: getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            place.lat,
            place.lng
          ).toFixed(2),
        }));
      }

      setPlaces(storedPlaces);
    } catch (error) {
      console.error('Error loading places:', error);
      setPlaces(defaultPlaces);
    } finally {
      setLoading(false);
    }
  };

  const savePlaces = async updated => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving places:', e);
    }
  };

  const addPlace = async newPlace => {
    const newPlaceWithId = { ...newPlace, id: Date.now() };
    const updated = [...places, newPlaceWithId];
    setPlaces(updated);
    savePlaces(updated);
  };

  const updatePlace = async (id, update) => {
    const updated = places.map(p => (p.id === id ? { ...p, ...update } : p));
    setPlaces(updated);
    savePlaces(updated);
  };

  const deletePlace = async id => {
    const place = places.find(p => p.id === id);

    // Delete image file if local file
    if (place?.image?.startsWith('file://')) {
      try {
        await FileSystem.deleteAsync(place.image, { idempotent: true });
      } catch (e) {
        console.error('Error deleting image file:', e);
      }
    }

    const updated = places.filter(p => p.id !== id);
    setPlaces(updated);
    savePlaces(updated);
  };

  const resetUserPlaces = async () => {
    // Remove uploaded images (only if image is a string path)
    for (const p of places) {
      if (typeof p.image === 'string' && p.image.startsWith('file://')) {
        try {
          await FileSystem.deleteAsync(p.image, { idempotent: true });
        } catch (e) {
          console.error(e);
        }
      }
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
    setPlaces(defaultPlaces);
  };

  return {
    places,
    loading,
    addPlace,
    updatePlace,
    deletePlace,
    resetUserPlaces,
  };
}
