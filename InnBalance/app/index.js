/**
 * Index Screen
 * 
 * Entry point that immediately redirects to the main tab navigation.
 * This ensures users always start at the home screen within the tab structure.
 */

import { Redirect } from 'expo-router';

/**
 * Index Component
 * Redirects users to the tab navigation on app launch
 */
export default function Index() {
  // Redirect to the tabs layout
  return <Redirect href="/(tabs)" />;
}

