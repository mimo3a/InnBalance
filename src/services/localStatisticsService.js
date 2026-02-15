import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'breathing_sessions';

export async function getSessions() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveSession(session) {
  const existing = await getSessions();
  existing.push(session);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export async function clearSessions() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
