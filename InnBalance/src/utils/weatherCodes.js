// Человекочитаемые описания
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

// Иконки Expo (MaterialCommunityIcons)
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
