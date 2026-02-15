/**
 * WeatherCard Component
 * 
 * Displays current weather information for a given location.
 * Fetches data from Open-Meteo API using the useWeather hook.
 * 
 * Features:
 * - Temperature display
 * - Weather condition icon and label
 * - Wind speed
 * - Loading state
 * - Error handling with retry option
 * 
 * Props:
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 */

import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';

import { useWeather } from '@/src/hooks/useWeather';
import { getWeatherLabel, getWeatherIcon } from '@/src/utils/weatherCodes';

/**
 * WeatherCard Component
 * Displays current weather conditions in a styled card
 */


export const getSmartWeatherRecommendation = (temp, weathercode) => {
  const isRainy = (weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 99);
  const isSunny = weathercode === 0;

  if (isRainy && temp < 5) {
    return 'Cold and rainy — a warm jacket and an umbrella would be ideal.';
  }
  if (isRainy) {
    return 'Rainy weather today. Don’t forget an umbrella.';
  }
  if (isSunny && temp > 15) {
    return 'Sunny and warm — perfect weather to enjoy the outdoors.';
  }
  if (temp < 5) {
    return 'It’s quite cold outside. Consider wearing a warm jacket.';
  }
  if (temp >= 5 && temp <= 15) {
    return 'It’s a little chilly. A light jacket might feel nice.';
  }
  if (temp > 15) {
    return 'It should be comfortably warm. Enjoy the fresh air.';
  }
  return '';
};


export default function WeatherCard({ lat, lon }) {
  // Fetch weather data using custom hook
  // Fetch weather data using custom hook
  const { weather, loading, error, refresh } = useWeather(lat, lon);
  const { theme } = useTheme();

  // Show loading spinner while fetching
  if (loading) {
    return (
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Show error message with retry button if fetch fails
  if (error || !weather) {
    return (
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.error, { color: theme.error }]}>Weather unavailable</Text>
        <TouchableOpacity onPress={refresh}>
          <Text style={[styles.retry, { color: theme.primary }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Display weather data
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      {/* Temperature and weather icon row */}
      <View style={styles.row}>
        {/* Weather condition icon */}
        <MaterialCommunityIcons
          name={getWeatherIcon(weather.weathercode)}
          size={48}
          color={theme.primary}
        />

        {/* Temperature and condition label */}
        <View style={styles.tempBlock}>
          <Text style={[styles.temp, { color: theme.primary }]}>
            {Math.round(weather.temperature)}°
          </Text>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {getWeatherLabel(weather.weathercode)}
          </Text>
        </View>
      </View>

      {/* Divider line */}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Wind speed row */}
      <View style={styles.rowSmall}>
        <MaterialCommunityIcons
          name="weather-windy"
          size={20}
          color={theme.textSecondary}
        />
        <Text style={[styles.wind, { color: theme.textSecondary }]}>
          Wind {Math.round(weather.windspeed)} km/h
        </Text>
      </View>
      <Text style={[styles.recommendation, { color: theme.textSecondary }]}>
        {getSmartWeatherRecommendation(
          weather.temperature,
          weather.weathercode
        )}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tempBlock: {
    marginLeft: 14,
  },

  temp: {
    fontSize: 32,
    fontWeight: '700',
  },

  label: {
    fontSize: 14,
    marginTop: 2,
  },

  divider: {
    height: 1,
    marginVertical: 12,
  },

  rowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wind: {
    marginLeft: 6,
    fontSize: 13,
  },

  recommendation: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
  },
  error: {
    fontSize: 14,
  },

  retry: {
    marginTop: 6,
    color: '#2f6f5f',
    fontWeight: '600',
  },
});
