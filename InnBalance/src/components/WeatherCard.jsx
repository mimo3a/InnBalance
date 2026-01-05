import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useWeather } from '@/src/hooks/useWeather';
import { getWeatherLabel, getWeatherIcon } from '@/src/utils/weatherCodes';

export default function WeatherCard({ lat, lon }) {
  const { weather, loading, error, refresh } = useWeather(lat, lon);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#2f6f5f" />
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>Weather unavailable</Text>
        <TouchableOpacity onPress={refresh}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={getWeatherIcon(weather.weathercode)}
          size={48}
          color="#2f6f5f"
        />

        <View style={styles.tempBlock}>
          <Text style={styles.temp}>
            {Math.round(weather.temperature)}°
          </Text>
          <Text style={styles.label}>
            {getWeatherLabel(weather.weathercode)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rowSmall}>
        <MaterialCommunityIcons
          name="weather-windy"
          size={20}
          color="#5c6f68"
        />
        <Text style={styles.wind}>
          Wind {Math.round(weather.windspeed)} km/h
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
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
    color: '#2f6f5f',
  },

  label: {
    fontSize: 14,
    color: '#4f5d57',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#d0d8d3',
    marginVertical: 12,
  },

  rowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wind: {
    marginLeft: 6,
    fontSize: 13,
    color: '#5c6f68',
  },

  error: {
    color: '#a94442',
  },

  retry: {
    marginTop: 6,
    color: '#2f6f5f',
    fontWeight: '600',
  },
});
