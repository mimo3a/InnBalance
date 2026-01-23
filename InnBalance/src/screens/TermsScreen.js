import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function TermsScreen() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: theme.primary }]}>Terms and Conditions</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Introduction</Text>
      <Text style={[styles.text, { color: theme.text }]}>Welcome to InnBalance! By creating an account and using our app, you agree to the following terms and conditions. Please read them carefully.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>2. User Responsibilities</Text>
      <Text style={[styles.text, { color: theme.text }]}>You agree to provide accurate information during registration and to keep your account credentials secure. You are responsible for all activities that occur under your account.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>3. Privacy Policy</Text>
      <Text style={[styles.text, { color: theme.text }]}>We value your privacy. Your personal data will be handled according to our Privacy Policy. We do not share your information with third parties except as required by law.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>4. App Usage</Text>
      <Text style={[styles.text, { color: theme.text }]}>You agree to use the app for lawful purposes only. Any misuse, including attempts to access unauthorized data or disrupt service, is strictly prohibited.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>5. Intellectual Property</Text>
      <Text style={[styles.text, { color: theme.text }]}>All content, trademarks, and data on InnBalance are the property of their respective owners. You may not copy, modify, or distribute any part of the app without permission.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>6. Limitation of Liability</Text>
      <Text style={[styles.text, { color: theme.text }]}>InnBalance is provided "as is". We are not liable for any damages resulting from the use or inability to use the app.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>7. Changes to Terms</Text>
      <Text style={[styles.text, { color: theme.text }]}>We may update these terms from time to time. Continued use of the app after changes means you accept the new terms.</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>8. Contact Us</Text>
      <Text style={[styles.text, { color: theme.text }]}>If you have any questions about these terms, please contact us at support@innbalance.app.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});
