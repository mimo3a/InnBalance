import { useEffect, useState, useCallback } from 'react';

export function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (!lat || !lon) {
      setError('Missing coordinates');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current_weather=true`
      );

      const data = await response.json();

      if (!response.ok || !data.current_weather) {
        throw new Error(data?.reason || 'No weather data');
      }

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

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, loading, error, refresh: fetchWeather };
}
