import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { places as defaultPlaces } from '@/src/data/places';

const STORAGE_KEY = '@innbalance_user_places';

export function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load places on mount
  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const storedUserPlaces = await AsyncStorage.getItem(STORAGE_KEY);
      const userPlaces = storedUserPlaces ? JSON.parse(storedUserPlaces) : [];
      
      // Combine default places with user places
      setPlaces([...defaultPlaces, ...userPlaces]);
    } catch (error) {
      console.error('Error loading places:', error);
      setPlaces(defaultPlaces);
    } finally {
      setLoading(false);
    }
  };

  const saveUserPlaces = async (userPlaces) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userPlaces));
    } catch (error) {
      console.error('Error saving places:', error);
    }
  };

  const getUserPlaces = () => {
    // Filter only user places (those not in default places)
    const defaultIds = new Set(defaultPlaces.map(p => p.id));
    return places.filter(place => !defaultIds.has(place.id));
  };

  const addPlace = async (newPlace) => {
    const newPlaceWithId = { ...newPlace, id: Date.now() };
    const updatedPlaces = [...places, newPlaceWithId];
    setPlaces(updatedPlaces);
    
    const userPlaces = [...getUserPlaces(), newPlaceWithId];
    await saveUserPlaces(userPlaces);
  };

  const updatePlace = async (id, updatedData) => {
    const updatedPlaces = places.map(place => 
      place.id === id ? { ...place, ...updatedData } : place
    );
    setPlaces(updatedPlaces);
    
    // Save only if it's a user place
    const defaultIds = new Set(defaultPlaces.map(p => p.id));
    if (!defaultIds.has(id)) {
      const userPlaces = updatedPlaces.filter(place => !defaultIds.has(place.id));
      await saveUserPlaces(userPlaces);
    }
  };

  const deletePlace = async (id) => {
    // Check that it's not a default place
    const defaultIds = new Set(defaultPlaces.map(p => p.id));
    if (defaultIds.has(id)) {
      console.warn('Cannot delete default place');
      return;
    }

    const updatedPlaces = places.filter(place => place.id !== id);
    setPlaces(updatedPlaces);
    
    const userPlaces = updatedPlaces.filter(place => !defaultIds.has(place.id));
    await saveUserPlaces(userPlaces);
  };

  const resetUserPlaces = async () => {
    setPlaces(defaultPlaces);
    await AsyncStorage.removeItem(STORAGE_KEY);
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
