import { deletePlace as deletePlaceApi, getMyPlaces, updatePlace as updatePlaceApi } from '@/src/api/placesApi';
import { places as defaultPlaces } from '@/src/data/places';
import { getDistanceFromLatLonInKm } from '@/src/utils/distance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@innbalance_user_places';
const INITIALIZED_KEY = '@innbalance_places_initialized';

export function usePlaces(userLocation) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageMap= {
    "BotanischeGarten.png": require("../Images/Places/BotanischeGarten.png"),
    "mci.png": require("../Images/Places/mci.png"),
    "Hofgarten.png": require("../Images/Places/Hofgarten.png"),
    "Rapoldi.png": require("../Images/Places/Rapoldi.png"),
    "Innpromenade.png": require("../Images/Places/Innpromenade.png"),
    "Nordkette.png": require("../Images/Places/Nordkette.png"),
    "Vill.png": require("../Images/Places/Vill.png"),
  }
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

      // Ensure we don't keep backend places in AsyncStorage to avoid duplicates
      storedPlaces = (storedPlaces || []).filter(p => !p.backendId);

      // Load user-specific places from backend and merge with local/default ones
      let allPlaces = storedPlaces;
      try {
        const remote = await getMyPlaces();
        if (Array.isArray(remote) && remote.length > 0) {
          const mappedRemote = remote.map(p => ({
            // use a high offset to avoid id collisions with static places
            id: 1000000 + (p.id ?? 0),
            backendId: p.id,
            name: p.name,
            info: p.description,
            rating: p.rating ?? 0,
            // if backend provides imageUrl, use it; otherwise fallback image
            image: p.imageUrl || require('../Images/Places/missingPicture.png'),
            category: p.category ?? 'User place',
            distance: 0,
            lat: p.latitude,
            lng: p.longitude,
            acces: 'Public',
          }));
          allPlaces = [...storedPlaces, ...mappedRemote];
        }
      } catch (e) {
        console.error('Error loading backend places:', e);
        allPlaces = storedPlaces;
      }

      // Add distance if location available
      // FYI: When adding own places, the distance indicator can take a few seconds to load.
      if (userLocation) {
        allPlaces = allPlaces.map(place => ({
          ...place,
          distance: getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            place.lat,
            place.lng
          ).toFixed(2),
        }));
      }

      setPlaces(allPlaces);
    } catch (error) {
      console.error('Error loading places:', error);
      setPlaces(defaultPlaces);
    } finally {
      setLoading(false);
    }
  };

  const savePlaces = async updated => {
    try {
      // Only persist local/static places; backend places will be re-fetched
      const localOnly = (updated || []).filter(p => !p.backendId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(localOnly));
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
    const target = places.find(p => p.id === id);

    // If this place comes from backend, send update there (e.g. rating)
    if (target?.backendId) {
      try {
        await updatePlaceApi(target.backendId, {
          // currently we only use rating from the app UI
          rating: update.rating,
        });
      } catch (e) {
        console.error('Error updating place on backend:', e);
      }
    }

    const updated = places.map(p => (p.id === id ? { ...p, ...update } : p));
    setPlaces(updated);
    savePlaces(updated);
  };

  const deletePlace = async id => {
    const place = places.find(p => p.id === id);

    // Delete on backend as well if this is a server place
    if (place?.backendId) {
      try {
        await deletePlaceApi(place.backendId);
      } catch (e) {
        console.error('Error deleting place on backend:', e);
      }
    }

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
    // Remove backend places and uploaded images for this user
    for (const p of places) {
      // Delete on backend if this place was stored there
      if (p.backendId) {
        try {
          await deletePlaceApi(p.backendId);
        } catch (e) {
          console.error('Error deleting backend place during reset:', e);
        }
      }

      // Remove uploaded image files (only if image is a string path)
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
