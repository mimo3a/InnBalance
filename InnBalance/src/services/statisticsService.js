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

const DEMO_SESSIONS = [
  // Today
  { duration: 180, date: '2026-01-26T08:30:00.000Z', state: 'stress' },        // 30 min
  { duration: 360, date: '2026-01-26T19:15:00.000Z', state: 'balance' },       // 60 min
  { duration: 90,  date: '2026-01-26T22:00:00.000Z', state: 'low_energy' },    // 15 min
  { duration: 240, date: '2026-01-26T23:00:00.000Z', state: 'depression' },    // 40 min

  // Yesterday
  { duration: 252, date: '2026-01-25T09:00:00.000Z', state: 'anxiety' },       // 42 min

  // 2 days ago
  { duration: 54,  date: '2026-01-24T07:45:00.000Z', state: 'low_energy' },    // 9 min
  { duration: 90,  date: '2026-01-24T12:30:00.000Z', state: 'balance' },       // 15 min
  { duration: 18,  date: '2026-01-24T21:00:00.000Z', state: 'stress' },        // 3 min

  // 1 week ago
  { duration: 360, date: '2026-01-19T08:20:00.000Z', state: 'anger' },          // 60 min
  { duration: 540, date: '2026-01-19T12:00:00.000Z', state: 'anxiety' },        // 90 min
  { duration: 288, date: '2026-01-19T18:40:00.000Z', state: 'balance' },        // 48 min

  // 2 weeks ago
  { duration: 432, date: '2026-01-12T07:30:00.000Z', state: 'depression' },     // 72 min
  { duration: 720, date: '2026-01-12T14:15:00.000Z', state: 'stress' },         // 120 min
  { duration: 216, date: '2026-01-12T20:00:00.000Z', state: 'balance' },        // 36 min

  // 3 weeks ago
  { duration: 180, date: '2026-01-05T20:10:00.000Z', state: 'stress' },         
  { duration: 324, date: '2026-01-05T21:00:00.000Z', state: 'anxiety' },

  // 4 weeks ago
  { duration: 360, date: '2025-12-29T08:00:00.000Z', state: 'balance' },
  { duration: 90,  date: '2025-12-29T18:30:00.000Z', state: 'low_energy' },
  { duration: 270, date: '2025-12-29T22:15:00.000Z', state: 'stress' },

  // 5 weeks ago
  { duration: 198, date: '2025-12-22T09:45:00.000Z', state: 'depression' },
  { duration: 162, date: '2025-12-22T14:20:00.000Z', state: 'anger' },
  { duration: 108, date: '2025-12-22T19:55:00.000Z', state: 'anxiety' },

  // 6 weeks ago
  { duration: 450, date: '2025-12-15T07:10:00.000Z', state: 'balance' },
  { duration: 720, date: '2025-12-15T13:30:00.000Z', state: 'stress' },
  { duration: 360, date: '2025-12-15T20:45:00.000Z', state: 'low_energy' },

  // 7 weeks ago
  { duration: 90,  date: '2025-12-08T10:00:00.000Z', state: 'anger' },
  { duration: 270, date: '2025-12-08T15:25:00.000Z', state: 'anxiety' },
  { duration: 540, date: '2025-12-08T21:40:00.000Z', state: 'balance' },
];




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

export async function initializeStatisticsIfEmpty() {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);

    if (!existing) {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DEMO_SESSIONS)
      );
      console.log('Static demo statistics initialized');
    }
  } catch (error) {
    console.error('Failed to initialize demo statistics', error);
  }
}

