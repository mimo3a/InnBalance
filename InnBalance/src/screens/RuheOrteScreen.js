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
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SwitchTabs from '../components/SwitchTab';
import PlacesListScreen from './PlacesListScreen';
import PlacesMap from '../components/PlacesMap';
import { useTheme } from '@/src/contexts/ThemeContext';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * RuheOrteScreen Component
 * Display relaxation places in either map or list format
 */
export default function RuheOrteScreen() {
  // Track which tab is currently active ('map' or 'list')
  const [activeTab, setActiveTab] = useState('map');
  const { theme } = useTheme();

  const router = useRouter();
  return (

    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Header with tab switcher */}
      <View style={styles.header}>
        <SwitchTabs selected={activeTab} onChange={setActiveTab} />
      </View>

      {/* Content area - conditionally render map or list */}
      <View style={styles.content}>
        {activeTab === 'map' ? <PlacesMap /> : <PlacesListScreen />}
        {/* Add Place Button */}
        <View style={styles.fillView}/>{/**making the plus-symbol white, instead of transparent */}
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/add-place')}
        >
            <Ionicons name="add-circle" size={70} color={theme.primary}  />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 10,
    zIndex: 10,
  },
  content: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fillView:{
    position:'absolute',
    width:30,
    height:30,
    bottom:30,
    right:30,
    backgroundColor:'#fff'
    },
});
