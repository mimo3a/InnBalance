import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (options) => <Ionicons name={options.focused ? "home" : "home-outline"} size={28} color={options.color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: (options) => <Ionicons name={options.focused ? "stats-chart" : "stats-chart-outline"} size={22} color={options.color} />,
          
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{  
          title: 'Settings',
          tabBarIcon: (options) => <Ionicons name={options.focused ? "settings" : "settings-outline"} size={24} color={options.color} />,
        }}
      />
    </Tabs>
  );
}
