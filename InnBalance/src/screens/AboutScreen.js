/**
 * AboutScreen Component
 * 
 * Displays information about the InnBalance app including:
 * - App version
 * - Description and purpose
 * - Features overview
 * - Developer information
 * - Legal information
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* App Icon and Title */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
          <MaterialCommunityIcons name="spa" size={48} color="#fff" />
        </View>
        <Text style={[styles.appName, { color: theme.text }]}>InnBalance</Text>
        <Text style={[styles.version, { color: theme.textSecondary }]}>Version 1.0.0</Text>
      </View>

      {/* Description Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="information" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
        </View>
        <Text style={[styles.sectionText, { color: theme.text }]}>
          InnBalance is a mental wellness application designed to help you manage stress, 
          anxiety, and emotional well-being through guided breathing exercises and mindful 
          outdoor activities.
        </Text>
      </View>

      {/* Features Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="star-four-points" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Features</Text>
        </View>
        
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="lungs" size={20} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Guided breathing exercises for various emotional states
          </Text>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="map-marker" size={20} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Discover and save peaceful places for relaxation
          </Text>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="chart-line" size={20} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Track your breathing sessions and progress
          </Text>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Weather-based activity recommendations
          </Text>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="theme-light-dark" size={20} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Light and dark theme support
          </Text>
        </View>
      </View>

      {/* Developer Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="account-group" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Development</Text>
        </View>
        <Text style={[styles.sectionText, { color: theme.text }]}>
          Developed as a mobile wellness solution for improving mental health 
          through simple, accessible breathing techniques and outdoor activity promotion.
        </Text>
      </View>

      {/* Legal Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="shield-check" size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Privacy & Data</Text>
        </View>
        <Text style={[styles.sectionText, { color: theme.text }]}>
          All your data is stored locally on your device. We do not collect, transmit, 
          or share any personal information. Your breathing sessions, saved places, and 
          preferences remain private and under your control.
        </Text>
      </View>

      {/* Copyright */}
      <View style={styles.footer}>
        <Text style={[styles.copyright, { color: theme.textSecondary }]}>
          © 2026 InnBalance
        </Text>
        <Text style={[styles.copyright, { color: theme.textSecondary }]}>
          All rights reserved
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  copyright: {
    fontSize: 13,
    marginBottom: 4,
  },
});
