import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


export default function useCurrentLocation(forceInnsbruck = false) {
  const innsbruckCoords = { latitude: 47.2692, longitude: 11.4041 };
  const [location, setLocation] = useState(
    forceInnsbruck ? innsbruckCoords : null
  );

  useEffect(() => {
    if (forceInnsbruck) {
      setLocation(innsbruckCoords);
      return;
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc.coords);
    })();
  }, [forceInnsbruck]);

  useEffect(() => {
  console.log('useCurrentLocation | forceInnsbruck =', forceInnsbruck);

  if (forceInnsbruck) {
    console.log('FORCING INNSBRUCK');
    setLocation(innsbruckCoords);
    return;
  }

  console.log('USING REAL GPS');

  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    let loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    console.log('REAL GPS COORDS:', loc.coords);
    setLocation(loc.coords);
  })();
}, [forceInnsbruck]);


  return { location };
}
