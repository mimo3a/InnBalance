/**
 * Tab Layout Component
 * 
 * Configures the bottom tab navigation for the main sections of the app.
 * Includes:
 * - Home screen (mood selection and weather)
 * - Statistics screen (session tracking and charts)
 * - Settings screen (app configuration)
 * 
 * Features haptic feedback on tab presses and dynamic theming.
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/src/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

/**
 * TabLayout Component
 * Sets up the bottom tab navigation with themed icons and haptic feedback
 */
export default function TabLayout() {
  // Get current color scheme for theming
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Apply theme-based color to active tabs
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Hide header for cleaner UI
        headerShown: false,
        // Enable haptic feedback on tab press
        tabBarButton: HapticTab,
      }}>
      {/* Home Tab - Mood selection and weather widget */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // Dynamic icon based on focus state
          tabBarIcon: (options) => <Ionicons name={options.focused ? "home" : "home-outline"} size={28} color={options.color} />,
        }}
      />
      
      {/* Statistics Tab - View session history and charts */}
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          // Dynamic stats icon
          tabBarIcon: (options) => <Ionicons name={options.focused ? "stats-chart" : "stats-chart-outline"} size={22} color={options.color} />,
          
        }}
      />
      
      {/* Settings Tab - App configuration and data management */}
      <Tabs.Screen
        name="settings"
        options={{  
          title: 'Settings',
          // Dynamic settings icon
          tabBarIcon: (options) => <Ionicons name={options.focused ? "settings" : "settings-outline"} size={24} color={options.color} />,
        }}
      />
    </Tabs>
  );
}
