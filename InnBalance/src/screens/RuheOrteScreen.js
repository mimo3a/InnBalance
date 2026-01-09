/**
 * RuheOrteScreen Component
 * 
 * Main screen for viewing relaxation places ("Ruhe Orte" = Quiet Places).
 * Provides two viewing modes:
 * - Map view: Interactive map showing all places with markers
 * - List view: Scrollable list of places with detailed cards
 * 
 * Features:
 * - Tab switcher to toggle between map and list views
 * - Maintains active tab state
 * - Responsive layout with proper spacing
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchTabs from '../components/SwitchTab';
import PlacesListScreen from './PlacesListScreen';
import PlacesMap from '../components/PlacesMap';

/**
 * RuheOrteScreen Component
 * Display relaxation places in either map or list format
 */
export default function RuheOrteScreen() {
  // Track which tab is currently active ('map' or 'list')
  const [activeTab, setActiveTab] = useState('map');

  return (
    <View style={styles.container}>
      
      {/* Header with tab switcher */}
      <View style={styles.header}>
        <SwitchTabs selected={activeTab} onChange={setActiveTab} />
      </View>

      {/* Content area - conditionally render map or list */}
      <View style={styles.content}>
        {activeTab === 'map' ? <PlacesMap /> : <PlacesListScreen />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 10,
  },
  content: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
});
