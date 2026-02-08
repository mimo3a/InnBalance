/**
 * StatisticScreen Component
 *
 * Safe statistics screen with charts (week / month)
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { getSessions } from '@/src/services/statisticsService';
import { useTheme } from '@/src/contexts/ThemeContext';
import { ThemedText } from '@/src/components/themed-text';

/* =========================
   SAFE DATE HELPER
========================= */
const getSessionDate = (s) => {
  const raw = s?.createdAt || s?.date;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
};

export default function StatisticScreen() {
  const { theme, isDark } = useTheme();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // week | month
  const [offset, setOffset] = useState(0);

  /* =========================
     LOAD SESSIONS
  ========================= */
  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSessions();
      const normalized = (data || [])
        .map((s) => ({ ...s, _date: getSessionDate(s) }))
        .filter((s) => s._date);
      setSessions(normalized);
    } catch (e) {
      console.error('Failed to load sessions', e);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { loadSessions(); }, [loadSessions]));

  /* =========================
     SUMMARY
  ========================= */
  const totalSessions = sessions.length;
  const totalDurationSeconds = sessions.reduce(
    (sum, s) => sum + (s.duration || 0),
    0
  );
  const totalDurationMinutes = Math.round(totalDurationSeconds / 60);

  const firstSessionDate =
    sessions.length > 0
      ? sessions.reduce(
          (min, s) => (s._date < min ? s._date : min),
          sessions[0]._date
        )
      : new Date();

  const diffInDays = Math.max(
    1,
    Math.ceil((Date.now() - firstSessionDate.getTime()) / 86400000)
  );

  const avgMinutesPerDay = (totalDurationMinutes / diffInDays).toFixed(1);
  const avgSessionsPerDay = (totalSessions / diffInDays).toFixed(1);

  /* =========================
     CHART DATA
  ========================= */
  const chartData = useMemo(() => {
    const dataPoints = [];
    const now = new Date();

    if (viewMode === 'week') {
      const base = new Date();
      base.setDate(now.getDate() - offset * 7);

      for (let i = 6; i >= 0; i--) {
        const d = new Date(base);
        d.setDate(d.getDate() - i);
        dataPoints.push({
          date: d.toISOString().split('T')[0],
          label: d.toLocaleDateString('en-US', { weekday: 'short' }),
          count: 0,
          seconds: 0,
        });
      }

      sessions.forEach((s) => {
        const iso = s._date.toISOString().split('T')[0];
        const p = dataPoints.find((x) => x.date === iso);
        if (p) {
          p.count += 1;
          p.seconds += s.duration || 0;
        }
      });
    }

    dataPoints.forEach((p) => {
      p.minutes = Math.round(p.seconds / 60);
    });

    return dataPoints;
  }, [sessions, viewMode, offset]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const maxMinutes = Math.max(...chartData.map((d) => d.minutes), 1);

  /* =========================
     RENDER
  ========================= */
  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 10, color: theme.primary }}>
          Loading statistics…
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style={!isDark ? 'dark' : 'light'} />

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={styles.container}>
          <ThemedText type="title" style={{ marginBottom: 20 }}>
            Statistics
          </ThemedText>

          {/* SUMMARY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.section}>Summary</Text>
            <Text>Total Minutes: {totalDurationMinutes}</Text>
            <Text>Total Sessions: {totalSessions}</Text>
            <Text>Avg. Minutes / Day: {avgMinutesPerDay}</Text>
            <Text>Avg. Sessions / Day: {avgSessionsPerDay}</Text>
          </View>

          {/* CHART */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.chartHeader}>
              <Text style={styles.section}>Last 7 Days</Text>
              <TouchableOpacity
                onPress={() =>
                  setViewMode(viewMode === 'week' ? 'month' : 'week')
                }
              >
                <MaterialCommunityIcons
                  name={
                    viewMode === 'week'
                      ? 'calendar-month'
                      : 'calendar-week'
                  }
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.chartArea}>
              {chartData.map((item, idx) => (
                <View key={idx} style={styles.chartColumn}>
                  <View style={styles.barsWrapper}>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          {
                            backgroundColor: '#8baea4',
                            height: `${(item.minutes / maxMinutes) * 100}%`,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          {
                            backgroundColor: '#2f6f5f',
                            height: `${(item.count / maxCount) * 100}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <Text style={styles.dayLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* HISTORY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.section}>History</Text>

            {sessions.map((s, i) => (
              <View key={i} style={styles.historyRow}>
                <Text>{s._date.toLocaleDateString()}</Text>
                <Text>{s.duration} sec</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 16, borderRadius: 16, marginBottom: 20 },
  section: { fontSize: 18, fontWeight: '600', marginBottom: 10 },

  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartArea: { flexDirection: 'row', height: 180, alignItems: 'flex-end' },
  chartColumn: { flex: 1, alignItems: 'center' },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    gap: 6,
  },
  barContainer: { width: 14, height: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 4 },
  dayLabel: { marginTop: 6, fontSize: 12, color: '#666' },
});
