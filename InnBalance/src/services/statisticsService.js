/**
 * Statistics Service
 * 
 * Manages breathing exercise session data using AsyncStorage.
 * Provides functions to save, retrieve, and clear session statistics.
 * 
 * Each session contains:
 * - duration: Session length in seconds
 * - date: ISO timestamp of when session occurred
 * - state: User's mood/state during the session
 */

import AsyncStorage from '@react-native-async-storage/async-storage';


// Storage key for AsyncStorage
const STORAGE_KEY = 'breathing_sessions';

/**
 * Save a new breathing session to storage
 * Appends the session to existing sessions array
 * 
 * @param {Object} session - Session object with duration, date, and state
 * @returns {Promise<void>}
 */
export async function saveSession(session) {
  try {
    // Retrieve existing sessions
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const sessions = existing ? JSON.parse(existing) : [];
    
    console.log('Before save - existing sessions:', sessions.length);
    console.log('Saving new session:', session);

    // Add new session to array
    sessions.push(session);

    // Save updated array back to storage
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
    
    console.log('After save - total sessions:', sessions.length);
  } catch (error) {
    console.error('Failed to save session', error);
  }
}

/**
 * Retrieve all saved breathing sessions
 * 
 * @returns {Promise<Array>} Array of session objects
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
 * Clear all session statistics from storage
 * Used when user wants to reset their statistics
 * 
 * @returns {Promise<void>}
 */
export async function clearSessions() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
