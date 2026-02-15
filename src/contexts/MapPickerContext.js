/**
 * MapPickerContext
 * 
 * Global state for selected coordinates from map picker.
 * Used to pass coordinates back to AddPlaceScreen without losing form data.
 */

import React, { createContext, useContext, useState } from 'react';

const MapPickerContext = createContext();

export function MapPickerProvider({ children }) {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const selectCoordinates = (lat, lng) => {
    setSelectedCoordinates({ lat, lng });
  };

  const clearCoordinates = () => {
    setSelectedCoordinates(null);
  };

  return (
    <MapPickerContext.Provider value={{ selectedCoordinates, selectCoordinates, clearCoordinates }}>
      {children}
    </MapPickerContext.Provider>
  );
}

export function useMapPicker() {
  const context = useContext(MapPickerContext);
  if (!context) {
    throw new Error('useMapPicker must be used within MapPickerProvider');
  }
  return context;
}
