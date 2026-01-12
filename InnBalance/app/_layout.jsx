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
    </ThemeProvider>
  );
}
