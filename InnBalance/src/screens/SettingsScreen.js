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
import { useTheme } from '@/src/contexts/ThemeContext';
import { useRouter } from 'expo-router';

/**
 * SettingsScreen Component
 * Main settings interface for app configuration
 */
export default function SettingsScreen() {
  // Hook for managing user places
  const { resetUserPlaces } = usePlaces();
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  
  // State for toggles
  const [locationEnabled, setLocationEnabled] = useState(true);

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
const handleAccount = () => {
    Alert.alert('Account', 'Account management feature coming soon!');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  const handleTutorial = () => {
    router.push('/help');
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
            Alert.alert('Done', 'All settings have been reset to defaults');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Manage your app preferences
        </Text>
      </View>

      {/* APP PREFERENCES */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>App Preferences</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleLanguageSelect}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="translate" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Language</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>English</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Toggle dark theme</Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primaryLight }}
            thumbColor={isDark ? theme.primary : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      {/* <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleDefaultExercise}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="lungs" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Default Exercise</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Stress relief</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView> */}

      {/* ACCOUNT */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Account</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAccount}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="account-circle" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Account Settings</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Profile and preferences</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      {/* PRIVACY & PERMISSIONS */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Privacy & Permissions</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="map-marker" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Location Services</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Find nearby places</Text>
            </View>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: theme.border, true: theme.primaryLight }}
            thumbColor={locationEnabled ? theme.primary : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      {/* DATA MANAGEMENT */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Data Management</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="map-marker-multiple" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>My Places</Text>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.textSecondary }]}>
          Delete all places you have added. Default places will remain intact.
        </Text>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.danger }]} onPress={handleResetOrte}>
          <MaterialCommunityIcons name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete My Places</Text>
        </TouchableOpacity>
      </ThemedView>
      
      {/* Statistics Management Section */}
      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="chart-line" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>My Statistics</Text>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.textSecondary }]}>
          Clear all your session statistics and breathing history.
        </Text>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.danger }]} onPress={handleResetStatistics}>
          <MaterialCommunityIcons name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete My Statistics</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* HELP & SUPPORT */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Help & Support</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAbout}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="information" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>About App</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Version and info</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleTutorial}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="help-circle" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Help & Tutorial</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>Learn how to use the app</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ThemedView>

      {/* RESET ALL */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Reset</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.settingHeader}>
          <MaterialCommunityIcons name="restore" size={24} color={theme.danger} />
          <Text style={[styles.sectionTitle, { color: theme.danger }]}>Reset to Defaults</Text>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.textSecondary }]}>
          Reset all settings to default values and clear all custom data.
        </Text>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.dangerDark }]} onPress={handleResetAll}>
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
