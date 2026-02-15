/**
 * useWeather Hook
 * 
 * Custom React hook for fetching and managing weather data.
 * Uses the Open-Meteo API to get current weather conditions for a location.
 * 
 * Features:
 * - Automatic data fetching on mount and when coordinates change
 * - Loading and error states
 * - Manual refresh capability
 * - Extracts temperature, wind speed, and weather code
 * 
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 * @returns {Object} { weather, loading, error, refresh }
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * useWeather Hook
 * Fetches weather data for given coordinates
 */
export function useWeather(lat, lon) {
  // Store weather data object
  const [weather, setWeather] = useState(null);
  
  // Loading state for API request
  const [loading, setLoading] = useState(true);
  
  // Error message if fetch fails
  // Error message if fetch fails
  const [error, setError] = useState(null);

  /**
   * Fetch weather data from Open-Meteo API
   * Validates coordinates and handles errors
   */
  const fetchWeather = useCallback(async () => {
    // Validate coordinates are provided
    if (!lat || !lon) {
      setError('Missing coordinates');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call Open-Meteo API with coordinates
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current_weather=true`
      );

      const data = await response.json();

      // Check for valid response and data
      if (!response.ok || !data.current_weather) {
        throw new Error(data?.reason || 'No weather data');
      }

      // Extract and store weather information
      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
      });
    } catch (e) {
      setError(e.message || 'Failed to load weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  // Fetch weather data when hook mounts or coordinates change
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Return weather data, states, and refresh function
  return { weather, loading, error, refresh: fetchWeather };
}
