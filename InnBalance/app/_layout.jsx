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
<<<<<<< HEAD
          </gitMapPickerProvider>
=======
          </MapPickerProvider>
>>>>>>> review-branch
        </UserProvider>
      </ThemeProvider>
    </LocationProvider>
  );
}

function RootNavigator() {
<<<<<<< HEAD
  const { user } = useUser();
  const isAuthenticated = user?.name && user?.password;
=======
  const { user, loading } = useUser();

  // ⏳ Ждём, пока загрузится пользователь
  if (loading) {
    return null; // или SplashScreen
  }

  const isAuthenticated = !!user;
>>>>>>> review-branch

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="signup" />
      ) : (
        <>
<<<<<<< HEAD
          <Stack.Screen name="breathing" />
          
          

          
=======
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="breathing" />
>>>>>>> review-branch
        </>
      )}
    </Stack>
  );
}

<<<<<<< HEAD
=======

>>>>>>> review-branch
