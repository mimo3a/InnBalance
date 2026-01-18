/**
 * Statistics Service
 * 
 * Manages breathing exercise session data using AsyncStorage.
 * Provides functions to save, retrieve, and clear session statistics.
 * 
 * Each session contains:
 * - id: Unique identifier (timestamp-based)
 * - duration: Session length in seconds
 * - date: ISO timestamp of when session occurred
 * - state: User's mood/state during the session
 * 
 * TODO: Consider migrating to TypeScript for better type safety and session shape enforcement
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for AsyncStorage
const STORAGE_KEY = 'breathing_sessions';

// Queue to prevent concurrent write operations
let writeQueue = Promise.resolve();

/**
 * Generate a unique ID for a session
 * Uses timestamp-based approach for simplicity
 * Alternative: Can use 'uuid' or 'react-native-uuid' package for more robust IDs
 * 
 * @returns {string} Unique session ID
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Ensure date is in ISO string format
 * 
 * @param {Date|string|number} date - Date to normalize
 * @returns {string} ISO date string
 */
function normalizeDate(date) {
  if (date instanceof Date) {
    return date.toISOString();
  }
  if (typeof date === 'number') {
    return new Date(date).toISOString();
  }
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  return new Date().toISOString();
}

/**
 * Save a new breathing session to storage
 * Appends the session to existing sessions array
 * Uses a queue to prevent concurrent write operations
 * 
 * @param {Object} session - Session object with duration, date, and state
 * @returns {Promise<Object>} Saved session with generated ID
 */
export async function saveSession(session) {
  // Queue this write operation to prevent race conditions
  writeQueue = writeQueue.then(async () => {
    try {
      // Generate unique ID and normalize date
      const sessionWithId = {
        ...session,
        id: session.id || generateSessionId(),
        date: normalizeDate(session.date || new Date())
      };

      // Retrieve existing sessions
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const sessions = existing ? JSON.parse(existing) : [];
      
      console.log('Before save - existing sessions:', sessions.length);
      console.log('Saving new session:', sessionWithId);

      // Add new session to array
      sessions.push(sessionWithId);

      // Save updated array back to storage
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sessions)
      );
      
      console.log('After save - total sessions:', sessions.length);
      return sessionWithId;
    } catch (error) {
      console.error('Failed to save session', error);
      throw error;
    }
  });

  return writeQueue;
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
 * Uses a queue to prevent race conditions with concurrent saves
 * 
 * @returns {Promise<void>}
 */
export async function clearSessions() {
  // Queue this write operation
  writeQueue = writeQueue.then(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  });

  return writeQueue;
}
