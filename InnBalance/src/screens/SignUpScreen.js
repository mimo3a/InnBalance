import { api } from '@/src/api/apiClient';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useUser } from '@/src/contexts/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const { setUser } = useUser();
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the Terms and Conditions');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/signup', {
        username,
        email,
        password,
      });

      await AsyncStorage.setItem('token', res.token);
      setUser({ username: res.username });

      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Sign up failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style={!isDark ? 'dark' : 'light'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: theme.background }]}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <MaterialCommunityIcons name="account-plus" size={48} color="#fff" />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
          </View>

          {/* Username */}
          <Input
            icon="account-outline"
            label="Username"
            value={username}
            onChangeText={setUsername}
            theme={theme}
          />

          {/* Email */}
          <Input
            icon="email-outline"
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={theme}
          />

          {/* Password */}
          <Input
            icon="lock-outline"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            theme={theme}
          />

          {/* Confirm password */}
          <Input
            icon="lock-check-outline"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            theme={theme}
          />

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <MaterialCommunityIcons
              name={acceptTerms ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={theme.primary}
            />
            <Text style={{ color: theme.text }}>I accept the Terms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating…' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

/* ---------- reusable input ---------- */
function Input({ icon, label, theme, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: theme.text, marginBottom: 4 }}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: theme.cardBackground, borderColor: theme.border },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.textSecondary}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 24, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 32 },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: '700' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
