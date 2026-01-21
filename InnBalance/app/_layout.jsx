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
import { UserProvider } from '@/src/contexts/UserContext';

// Configure the anchor for navigation
export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * RootLayout Component
 * Main entry point for the application's navigation structure
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <MapPickerProvider>
      {/* Stack navigator for screen transitions */}
      <Stack>
          {/* Entry point - checks auth and redirects */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          
          {/* Authentication screens */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          
          {/* Main tab navigation - hidden header */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Breathing exercise screen */}
          <Stack.Screen name="breathing" options={{ title: 'Breathing Exercise' }} />
          
          {/* List of all places */}
          <Stack.Screen name="places-list" options={{ title: 'All Places' }} />
          
          {/* Add new place screen */}
          <Stack.Screen name="add-place" options={{ title: 'Add New Place' }} />
        </Stack>
        
        {/* Status bar with automatic styling */}
        <StatusBar style="auto" />
      </MapPickerProvider>
=======
      <UserProvider>
        <MapPickerProvider>
          {/* Stack navigator for screen transitions */}
          <Stack>
            {/* Main tab navigation - hidden header */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Breathing exercise screen */}
            <Stack.Screen name="breathing" options={{ title: 'Breathing Exercise' }} />
            {/* List of all places */}
            <Stack.Screen name="places-list" options={{ title: 'All Places' }} />
            {/* Add new place screen */}
            <Stack.Screen name="add-place" options={{ title: 'Add New Place' }} />
          </Stack>
          {/* Status bar with automatic styling */}
          <StatusBar style="auto" />
        </MapPickerProvider>
      </UserProvider>
>>>>>>> d9214f5 (Fix AccountScreen and auth screens)
    </ThemeProvider>
  );
}
