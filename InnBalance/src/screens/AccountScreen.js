/**
 * AccountScreen Component
 * 
 * Manage user account settings:
 * - Profile information (username, email)
 * - Security (change password)
 * - Account actions (log out, delete account)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // Mock user data - in real app, this would come from authentication context
  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('user@example.com');

  const handleSaveProfile = () => {
    // In real app, save to backend/storage
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'Enter your current and new password',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue',
          onPress: () => {
            // In real app, show password input screen or modal
            Alert.alert('Info', 'Password change feature will be implemented with authentication system');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.\n\nAre you absolutely sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            // Second confirmation
            Alert.alert(
              'Final Confirmation',
              'Type "DELETE" to confirm account deletion',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Confirm',
                  style: 'destructive',
                  onPress: async () => {
                    // In real app, delete account from backend
                    await AsyncStorage.removeItem('authToken');
                    router.replace('/login');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
          <MaterialCommunityIcons name="account" size={48} color="#fff" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Account Settings</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Manage your profile and security
        </Text>
      </View>

      {/* Profile Section */}
      <Text style={[styles.sectionLabel, { color: theme.text }]}>Profile Information</Text>
      
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>Username</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>Email Address</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={handleSaveProfile}
        >
          <MaterialCommunityIcons name="content-save" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Security Section */}
      <Text style={[styles.sectionLabel, { color: theme.text }]}>Security</Text>
      
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity style={styles.settingRow} onPress={handleChangePassword}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="lock-reset" size={24} color={theme.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Change Password</Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                Update your password
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Account Actions Section */}
      <Text style={[styles.sectionLabel, { color: theme.text }]}>Account Actions</Text>
      
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Log Out</Text>
        </TouchableOpacity>

        <View style={[styles.dangerZone, { borderColor: theme.danger }]}>
          <View style={styles.dangerHeader}>
            <MaterialCommunityIcons name="alert" size={24} color={theme.danger} />
            <Text style={[styles.dangerTitle, { color: theme.danger }]}>Danger Zone</Text>
          </View>
          <Text style={[styles.dangerDescription, { color: theme.textSecondary }]}>
            Once you delete your account, there is no going back. Please be certain.
          </Text>
          <TouchableOpacity 
            style={[styles.dangerButton, { backgroundColor: theme.danger }]}
            onPress={handleDeleteAccount}
          >
            <MaterialCommunityIcons name="delete-forever" size={20} color="#fff" />
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
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
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dangerZone: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  dangerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  dangerDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
