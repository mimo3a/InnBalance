/**
 * HelpScreen Component
 * 
 * Provides tutorials and guidance on how to use the app:
 * - Getting started guide
 * - Feature explanations
 * - Tips and best practices
 * - Troubleshooting common issues
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function HelpScreen() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style ={!isDark ? "dark" : "light"}/>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="help-circle" size={64} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>Help & Tutorial</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Learn how to use InnBalance
          </Text>
        </View>

        {/* Getting Started */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="rocket-launch" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Getting Started</Text>
          </View>
          <Text style={[styles.stepNumber, { color: theme.primary }]}>Step 1</Text>
          <Text style={[styles.stepText, { color: theme.text }]}>
            On the home screen, select your current emotional state (depression, anxiety, anger, stress, low energy, or balance).
          </Text>
          
          <Text style={[styles.stepNumber, { color: theme.primary }]}>Step 2</Text>
          <Text style={[styles.stepText, { color: theme.text }]}>
            Review the recommended breathing exercise description and choose either "Breathing" for a guided exercise or "Walk" to find peaceful outdoor locations.
          </Text>

          <Text style={[styles.stepNumber, { color: theme.primary }]}>Step 3</Text>
          <Text style={[styles.stepText, { color: theme.text }]}>
            Follow the breathing guide or explore relaxation places on the map.
          </Text>
        </View>

        {/* Breathing Exercises */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lungs" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Breathing Exercises</Text>
          </View>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            The breathing exercises guide you through inhale, hold, and exhale cycles. 
            Watch the animated circle and follow the phase labels:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              <Text style={{ fontWeight: '600' }}>INHALE</Text> - Breathe in slowly as the circle fills
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              <Text style={{ fontWeight: '600' }}>HOLD</Text> - Hold your breath briefly
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              <Text style={{ fontWeight: '600' }}>EXHALE</Text> - Release slowly as the circle empties
            </Text>
          </View>
          <Text style={[styles.tipText, { color: theme.textSecondary }]}>
            Tip: Press the play button to start, and stop when you feel relaxed. Your session time is automatically saved.
          </Text>
        </View>

        {/* Places Feature */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="map-marker" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Relaxation Places</Text>
          </View>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Discover peaceful locations for outdoor relaxation:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Switch between Map and List views using the toggle
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Tap a place card or marker for detailed information
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Add your own favorite places using the + button
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Upload photos and add descriptions
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chart-line" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistics</Text>
          </View>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Track your progress in the Statistics tab:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              View total sessions and time spent
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              See your weekly activity chart
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Review individual session history with mood indicators
            </Text>
          </View>
        </View>

        {/* Dark Mode */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Toggle between light and dark themes in Settings → Dark Mode. 
            Your preference is saved automatically and applies across the entire app.
          </Text>
        </View>

        {/* Tips */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Best Practices</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Practice breathing exercises daily for best results
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Find a quiet, comfortable space before starting
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Use the weather widget to plan outdoor activities
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.primary }]}>•</Text>
            <Text style={[styles.bulletText, { color: theme.text }]}>
              Save places you discover for quick access later
            </Text>
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="wrench" size={24} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Troubleshooting</Text>
          </View>
          <Text style={[styles.problemTitle, { color: theme.text }]}>Weather not loading?</Text>
          <Text style={[styles.solutionText, { color: theme.textSecondary }]}>
            Check your internet connection and tap the retry button.
          </Text>

          <Text style={[styles.problemTitle, { color: theme.text }]}>Statistics not saving?</Text>
          <Text style={[styles.solutionText, { color: theme.textSecondary }]}>
            Make sure to press the stop button before exiting the breathing screen.
          </Text>

          <Text style={[styles.problemTitle, { color: theme.text }]}>Can't add places?</Text>
          <Text style={[styles.solutionText, { color: theme.textSecondary }]}>
            Grant the app permission to access your photo library in device settings.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  tipText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 20,
  },
  problemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  solutionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
