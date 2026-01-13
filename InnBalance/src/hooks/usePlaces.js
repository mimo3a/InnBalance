import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { places as defaultPlaces } from '@/src/data/places';

const STORAGE_KEY = '@innbalance_user_places';
const INITIALIZED_KEY = '@innbalance_places_initialized';

export function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load places on mount
  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const isInitialized = await AsyncStorage.getItem(INITIALIZED_KEY);
      
      if (!isInitialized) {
        // First time: Initialize with default places
        // Save them to AsyncStorage so they can be edited
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
        await AsyncStorage.setItem(INITIALIZED_KEY, 'true');
        setPlaces(defaultPlaces);
      } else {
        // Load all places from AsyncStorage (includes edited defaults and new user places)
        const storedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
        const allPlaces = storedPlaces ? JSON.parse(storedPlaces) : defaultPlaces;
        setPlaces(allPlaces);
      }
    } catch (error) {
      console.error('Error loading places:', error);
      setPlaces(defaultPlaces);
    } finally {
      setLoading(false);
    }
  };

  const savePlaces = async (placesToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(placesToSave));
    } catch (error) {
      console.error('Error saving places:', error);
    }
  };

  const addPlace = async (newPlace) => {
    const newPlaceWithId = { ...newPlace, id: Date.now() };
    const updatedPlaces = [...places, newPlaceWithId];
    setPlaces(updatedPlaces);
    await savePlaces(updatedPlaces);
  };

  const updatePlace = async (id, updatedData) => {
    const updatedPlaces = places.map(place => 
      place.id === id ? { ...place, ...updatedData } : place
    );
    setPlaces(updatedPlaces);
    await savePlaces(updatedPlaces);
  };

  const deletePlace = async (id) => {
    // Find place to delete its image file
    const placeToDelete = places.find(place => place.id === id);
    
    // Delete image file if it's a user-uploaded file (file://)
    if (placeToDelete?.image && typeof placeToDelete.image === 'string' && placeToDelete.image.startsWith('file://')) {
      try {
        await FileSystem.deleteAsync(placeToDelete.image, { idempotent: true });
        console.log('Deleted image file:', placeToDelete.image);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }
    
    const updatedPlaces = places.filter(place => place.id !== id);
    setPlaces(updatedPlaces);
    await savePlaces(updatedPlaces);
  };

  const resetUserPlaces = async () => {
    // Delete all user-uploaded image files (file://)
    for (const place of places) {
      if (place?.image && typeof place.image === 'string' && place.image.startsWith('file://')) {
        try {
          await FileSystem.deleteAsync(place.image, { idempotent: true });
          console.log('Deleted image file:', place.image);
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }
    }
    
    // Reset to original default places (unedited)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
    await AsyncStorage.setItem(INITIALIZED_KEY, 'true');
    setPlaces(defaultPlaces);
  };

  return { 
    places, 
    loading, 
    addPlace, 
    updatePlace, 
    deletePlace, 
    resetUserPlaces 
  };
}

