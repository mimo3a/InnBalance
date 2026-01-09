/**
 * Weather Codes Utility
 * 
 * Converts WMO weather codes (from Open-Meteo API) to human-readable labels
 * and corresponding Material Community Icons.
 * 
 * WMO Weather Codes:
 * 0 - Clear sky
 * 1-2 - Partly cloudy
 * 3 - Cloudy
 * 45-48 - Fog
 * 51-67 - Rain (various intensities)
 * 71-77 - Snow
 * 80-82 - Heavy rain showers
 * 95+ - Thunderstorm
 */

/**
 * Get human-readable weather description from WMO code
 * 
 * @param {number} code - WMO weather code
 * @returns {string} Weather description
 */
export function getWeatherLabel(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Cloudy';
  if (code <= 48) return 'Fog';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Heavy rain';
  if (code >= 95) return 'Thunderstorm';

  return 'Unknown weather';
}

/**
 * Get Material Community Icon name for weather code
 * 
 * @param {number} code - WMO weather code
 * @returns {string} Icon name from MaterialCommunityIcons
 */
export function getWeatherIcon(code) {
  if (code === 0) return 'weather-sunny';
  if (code <= 2) return 'weather-partly-cloudy';
  if (code === 3) return 'weather-cloudy';
  if (code <= 48) return 'weather-fog';
  if (code <= 67) return 'weather-rainy';
  if (code <= 77) return 'weather-snowy';
  if (code <= 82) return 'weather-pouring';
  if (code >= 95) return 'weather-lightning';

  return 'weather-cloudy-alert';
}
