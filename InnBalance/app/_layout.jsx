/**
 * RootLayout Component
 * Main entry point for the application's navigation structure
 */

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { UserProvider, useUser } from '@/src/contexts/UserContext';
import { MapPickerProvider } from '@/src/contexts/MapPickerContext';
import { LocationProvider } from '@/src/contexts/LocationContext';
import { initializeStatisticsIfEmpty } from '@/src/services/statisticsService';

export default function RootLayout() {
  React.useEffect(() => {
    initializeStatisticsIfEmpty();
  }, []);

  return (
    <LocationProvider>
      <ThemeProvider>
        <UserProvider>
          <MapPickerProvider>
            <RootNavigator />
          </MapPickerProvider>
        </UserProvider>
      </ThemeProvider>
    </LocationProvider>
  );
}

function RootNavigator() {
  const { user, loading } = useUser();

  if (loading) {
    return null; // SplashScreen
  }

  const isAuthenticated = !!user;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="signup" />
          <Stack.Screen name="terms" />
        </>
      ) : (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="breathing" />
        </>
      )}
    </Stack>
  );
}

