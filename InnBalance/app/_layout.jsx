/**
 * Root Layout Component
 * 
 * This is the main layout component for the entire application.
 * It sets up the navigation structure and applies theming based on the device's color scheme.
 * 
 * Features:
 * - Dynamic theme switching (light/dark mode)
 * - Stack navigation configuration
 * - Status bar management
 * - Route definitions for all screens
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { MapPickerProvider } from '@/src/contexts/MapPickerContext';
import { UserProvider, useUser } from '@/src/contexts/UserContext';

// Configure the anchor for navigation
export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * RootLayout Component
 * Main entry point for the application's navigation structure
 */
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

function AuthGate() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user?.name || !user?.password) {
      router.replace('/signup');
    }
  }, [user, router]);
  if (!user?.name || !user?.password) return null;
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="breathing" options={{ title: 'Breathing Exercise' }} />
        <Stack.Screen name="places-list" options={{ title: 'All Places' }} />
        <Stack.Screen name="add-place" options={{ title: 'Add New Place' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MapPickerProvider>
          <RootNavigator />
        </MapPickerProvider>
      </UserProvider>
    </ThemeProvider>
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
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="breathing" options={{ title: 'Breathing Exercise' }} />
            <Stack.Screen name="places-list" options={{ title: 'All Places' }} />
            <Stack.Screen name="add-place" options={{ title: 'Add New Place' }} />
          </>
        )}
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}

