/**
 * SettingsScreen Component
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePlaces } from '@/src/hooks/usePlaces';
import useCurrentLocation from '@/src/hooks/useCurrentLocation';
import { clearSessions } from '@/src/services/statisticsService';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {

  const { location } = useCurrentLocation();
  const { resetUserPlaces } = usePlaces(location);
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const [locationEnabled, setLocationEnabled] = useState(true);

  /** RESET PLACES **/
  const handleResetOrte = () => {
    Alert.alert(
      'Delete Custom Places',
      'Are you sure you want to delete all places you added?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await resetUserPlaces();
            Alert.alert('Done', 'Custom places deleted');
          },
        },
      ]
    );
  };

  /** RESET STATISTICS **/
  const handleResetStatistics = () => {
    Alert.alert(
      'Delete Statistics',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await clearSessions();
            Alert.alert('Done', 'Statistics deleted');
          },
        },
      ]
    );
  };

  /** NAVIGATION **/
  const handleAccount = () => router.push('/account');
  const handleAbout = () => router.push('/about');
  const handleTutorial = () => router.push('/help');

  /** RESET ALL **/
  const handleResetAll = () => {
    Alert.alert(
      'Reset All',
      'Reset everything?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetUserPlaces();
            await clearSessions();
            setLocationEnabled(true);
            Alert.alert('Done', 'Everything reset');
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

      {/* DARK MODE */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>App Preferences</Text>

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

      {/* ACCOUNT */}
      <Text style={[styles.categoryTitle, { color: theme.text }]}>Account</Text>

      <ThemedView style={[styles.settingBox, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAccount}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="account-circle" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Account Settings</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                Profile and preferences
              </Text>
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
          This will clear all your custom data and reset app to default.
        </Text>

        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: theme.dangerDark }]}
          onPress={handleResetAll}
        >
          <MaterialCommunityIcons name="restore" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Reset All Settings</Text>
        </TouchableOpacity>
      </ThemedView>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

