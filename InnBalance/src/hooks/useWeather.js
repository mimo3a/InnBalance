import { useState, useEffect } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch weather logic here
  }, []);

  return { weather };
}
