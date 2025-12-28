import { useState, useEffect } from 'react';

export function usePlaces() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Load places logic here
  }, []);

  return { places };
}
