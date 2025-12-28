import { useState, useEffect } from 'react';

export function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get location logic here
  }, []);

  return { location };
}
