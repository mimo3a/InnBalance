/**
 * SettingsScreen Component
 * 
 * Comprehensive settings interface with multiple sections:
 * - App preferences (language, theme, default exercise)
 * - Account management
 * - Data management (places, statistics)
 * - Privacy & permissions (location services)
 * - Help & support (about, tutorial)
 * 
 * All destructive actions require confirmation before execution.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePlaces } from '@/src/hooks/usePlaces';
import { clearSessions } from '@/src/services/statisticsService';

/**
 * SettingsScreen Component
 * Main settings interface for app configuration
 */
export default function SettingsScreen() {
  // Hook for managing user places
  const { resetUserPlaces } = usePlaces();
  
  // State for toggles
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Handle deletion of user-added places
   * Shows confirmation dialog before proceeding
   * Default places are preserved
   */
  const handleResetOrte = () => {
    Alert.alert(
      'Delete Custom Places',
      'Are you sure you want to delete all places you added? Default places will remain.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await resetUserPlaces();
            Alert.alert('Done', 'Custom places have been deleted');
          },
        },
      ]
    );
  };

  /**
   * Handle deletion of session statistics
   * Shows confirmation dialog before clearing all session data
   */
  const handleResetStatistics = () => {
    Alert.alert(
      'Delete Statistics',
      'Are you sure you want to delete all your session statistics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await clearSessions();
            Alert.alert('Done', 'Statistics have been deleted');
          },
        },
      ]
    );
  }

  const handleLanguageSelect = () => {
    Alert.alert('Language', 'Language selection feature coming soon!');
  };

  const handleDefaultExercise = () => {
    Alert.alert('Default Exercise', 'Exercise selection feature coming soon!');
  };

  const handleAccount = () => {
    Alert.alert('Account', 'Account management feature coming soon!');
  };

  const handleAbout = () => {
    Alert.alert('About InnBalance', 'Version 1.0.0\n\nA mental wellness app for breathing exercises and mindful places.', [{ text: 'OK' }]);
  };

  const handleTutorial = () => {
    Alert.alert('Tutorial', 'Tutorial feature coming soon!');
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset to Defaults',
      'This will reset all settings, delete custom places and statistics. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset All',
          style: 'destructive',
          onPress: async () => {
            await resetUserPlaces();
            await clearSessions();
            setLocationEnabled(true);
            setDarkMode(false);
            Alert.alert('Done', 'All settings have been reset to defaults');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your app preferences
        </Text>
      </View>

      {/* APP PREFERENCES */}
      <Text style={styles.categoryTitle}>App Preferences</Text>

      <ThemedView style={styles.settingBox}>
        <TouchableOpacity style={styles.settingRow} onPress={handleLanguageSelect}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="translate" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingSubtitle}>English</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.settingBox}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingSubtitle}>Toggle dark theme</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d1d1', true: '#7bc4b3' }}
            thumbColor={darkMode ? '#2f6f62' : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.settingBox}>
        <TouchableOpacity style={styles.settingRow} onPress={handleDefaultExercise}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="lungs" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Default Exercise</Text>
              <Text style={styles.settingSubtitle}>Stress relief</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      {/* ACCOUNT */}
      <Text style={styles.categoryTitle}>Account</Text>

      <ThemedView style={styles.settingBox}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAccount}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="account-circle" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Account Settings</Text>
              <Text style={styles.settingSubtitle}>Profile and preferences</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      {/* PRIVACY & PERMISSIONS */}
      <Text style={styles.categoryTitle}>Privacy & Permissions</Text>

      <ThemedView style={styles.settingBox}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingSubtitle}>Find nearby places</Text>
            </View>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#d1d1d1', true: '#7bc4b3' }}
            thumbColor={locationEnabled ? '#2f6f62' : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      {/* DATA MANAGEMENT */}
      <Text style={styles.categoryTitle}>Data Management</Text>

      <ThemedView style={styles.settingBox}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="map-marker-multiple" size={24} color="#2f6f62" />
          <Text style={styles.sectionTitle}>My Places</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Delete all places you have added. Default places will remain intact.
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleResetOrte}>
          <MaterialCommunityIcons name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete My Places</Text>
        </TouchableOpacity>
      </ThemedView>
      
      {/* Statistics Management Section */}
      <ThemedView style={styles.settingBox}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="chart-line" size={24} color="#2f6f62" />
          <Text style={styles.sectionTitle}>My Statistics</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Clear all your session statistics and breathing history.
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleResetStatistics}>
          <MaterialCommunityIcons name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete My Statistics</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* HELP & SUPPORT */}
      <Text style={styles.categoryTitle}>Help & Support</Text>

      <ThemedView style={styles.settingBox}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAbout}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="information" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>About App</Text>
              <Text style={styles.settingSubtitle}>Version and info</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.settingBox}>
        <TouchableOpacity style={styles.settingRow} onPress={handleTutorial}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="help-circle" size={24} color="#2f6f62" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Help & Tutorial</Text>
              <Text style={styles.settingSubtitle}>Learn how to use the app</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      {/* RESET ALL */}
      <Text style={styles.categoryTitle}>Reset</Text>

      <ThemedView style={styles.settingBox}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="restore" size={24} color="#d94c4c" />
          <Text style={[styles.sectionTitle, { color: '#d94c4c' }]}>Reset to Defaults</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Reset all settings to default values and clear all custom data.
        </Text>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: '#b33939' }]} onPress={handleResetAll}>
          <MaterialCommunityIcons name="restore" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Reset All Settings</Text>
        </TouchableOpacity>
      </ThemedView>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f8f7',
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2f6f62',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f6f62',
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingBox: {
    backgroundColor: '#dbeee9ff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f6f62',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2f6f62',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 14,
    lineHeight: 18,
  },
  deleteButton: {
    backgroundColor: '#d94c4c',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
