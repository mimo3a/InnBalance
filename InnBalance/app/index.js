/**
 * Index Screen
 * 
 * Entry point that checks authentication status and redirects accordingly:
 * - If authenticated → main tab navigation
 * - If not authenticated → login screen
 */

import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/src/contexts/ThemeContext';

/**
 * Index Component
 * Checks auth status and redirects users on app launch
 */
export default function Index() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user has auth token
      const authToken = await AsyncStorage.getItem('authToken');
      console.log('Auth token:', authToken);
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Redirect based on auth status
  return <Redirect href={isAuthenticated ? "/(tabs)" : "/login"} />;
}

