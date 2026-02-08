/**
 * AccountScreen Component
 *
 * Manage user account settings:
 * - Profile information (username)
 * - Security (change password)
 * - Account actions (log out, delete account)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/src/contexts/UserContext';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AccountScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const { user, setUser } = useUser();

  const [username, setUsername] = useState(user?.name || 'User');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = () => {
    setUser({ ...user, name: username });
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handlePasswordSave = () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }
    if (oldPassword !== user?.password) {
      Alert.alert('Error', 'Current password is incorrect');
      return;
    }

    setUser({ ...user, password: newPassword });
    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    Alert.alert('Success', 'Password changed successfully');
  };

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token'); // ✅ JWT
    await AsyncStorage.removeItem('user');  // ✅ user context
  } catch {}

  setUser(null);               // ✅ очистка контекста
  router.replace('/login');    // ✅ редирект
};


  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: async () => {
            try {
              await AsyncStorage.clear();
            } catch {}
            setUser({ name: 'User', password: '' });
            router.replace('/signup');
          }
        }
      ]
    );
  };

  return (
    <>
      <StatusBar style ={!isDark ? "dark" : "light"}/>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <MaterialCommunityIcons name="account" size={48} color="#fff" />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            Account Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Manage your profile and security
          </Text>
        </View>

        {/* Profile */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>
          Profile Information
        </Text>

        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
          />

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}
            onPress={handleSaveProfile}
          >
            <MaterialCommunityIcons name="content-save" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Security */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>Security</Text>

        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setShowPasswordModal(true)}
          >
            <MaterialCommunityIcons
              name="lock-reset"
              size={24}
              color={theme.primary}
            />
            <Text style={[styles.rowText, { color: theme.text }]}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <Text style={[styles.sectionLabel, { color: theme.text }]}>
          Account Actions
        </Text>

        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primary }]}
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#fff" />
            <Text style={styles.actionText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.danger }]}
            onPress={handleDeleteAccount}
          >
            <MaterialCommunityIcons name="delete-forever" size={20} color="#fff" />
            <Text style={styles.actionText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Password Modal */}
      {showPasswordModal && (
        <View style={styles.overlay}>
          <View
            style={[
              styles.modal,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Change Password
            </Text>

            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.background, color: theme.text },
              ]}
              placeholder="Current password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.background, color: theme.text },
              ]}
              placeholder="New password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <Text style={{ color: theme.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePasswordSave}>
                <Text style={{ color: theme.primary, fontWeight: '600' }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginVertical: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  sectionLabel: { marginLeft: 20, marginTop: 24, fontWeight: '600' },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { fontSize: 16 },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  actionText: { color: '#fff', fontWeight: '600' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
});
