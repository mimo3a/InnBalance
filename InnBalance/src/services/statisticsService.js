import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = 'breathing_sessions';

/**
 * Сохранить одну сессию
 */
export async function saveSession(session) {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const sessions = existing ? JSON.parse(existing) : [];

    sessions.push(session);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
  } catch (error) {
    console.error('Failed to save session', error);
  }
}

/**
 * Получить все сессии
 */
export async function getSessions() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load sessions', error);
    return [];
  }
}

/**
 * Очистить статистику (на будущее)
 */
export async function clearSessions() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
