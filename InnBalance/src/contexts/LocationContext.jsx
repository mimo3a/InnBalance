/**
 * LocationContext
 *
 * Single source of truth for app location.
 * Supports real GPS location and test (Innsbruck) mode.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContext = createContext(null);

const INNSBRUCK_COORDS = {
  latitude: 47.2692,
  longitude: 11.4041,
};

const STORAGE_KEY = 'USE_TEST_LOCATION';

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Load test mode from storage + resolve location
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const testMode = stored === '1';
        setIsTestMode(testMode);

        if (testMode) {
          setLocation(INNSBRUCK_COORDS);
          setLoading(false);
          return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(loc.coords);
        setLoading(false);
      } catch (e) {
        setErrorMsg('Failed to get location');
        setLoading(false);
      }
    })();
  }, []);

  // Toggle test mode (Innsbruck ↔ real GPS)
  const setTestMode = async (enabled) => {
    setIsTestMode(enabled);
    await AsyncStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');

    if (enabled) {
      setLocation(INNSBRUCK_COORDS);
      return;
    }

    let loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(loc.coords);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isTestMode,
        setTestMode,
        loading,
        errorMsg,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// Hook
export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error('useLocation must be used inside LocationProvider');
  }
  return ctx;
}
