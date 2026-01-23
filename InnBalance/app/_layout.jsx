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

export default function RootLayout() {
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
  const { user } = useUser();
  const isAuthenticated = user?.name && user?.password;

  return (
    <>
      <Stack>
        {!isAuthenticated ? (
          <Stack.Screen
            name="signup"
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="breathing"
              options={{ title: 'Breathing Exercise' }}
            />
            <Stack.Screen
              name="places-list"
              options={{ title: 'All Places' }}
            />
            <Stack.Screen
              name="add-place"
              options={{ title: 'Add New Place' }}
            />
          </>
        )}
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}
