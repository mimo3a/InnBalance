import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { getSessions } from '../services/statisticsService';
import { useFocusEffect } from '@react-navigation/native';

export default function StatisticScreen() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSessions();
      setSessions(data);
      console.log('📊 SAVED SESSIONS:', data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [loadSessions])
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Statistics</ThemedText>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Statistics</ThemedText>

      {sessions.length === 0 ? (
        <ThemedText>No sessions yet</ThemedText>
      ) : (
        sessions.map((s, index) => (
          <ThemedText key={index}>
            {new Date(s.date).toLocaleString()} — {s.duration}s
          </ThemedText>
        ))
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
