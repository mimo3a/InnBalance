/**
 * StatisticScreen
 * Stable production version
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/src/components/themed-text';
import { useTheme } from '@/src/contexts/ThemeContext';
import { getSessions } from '@/src/services/statisticsService';

/* ---------- SAFE DATE ---------- */
const safeDate = (s) => {
  const raw = s?.createdAt || s?.date;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
};

/* ---------- ICON BY EXERCISE TYPE ---------- */
const getExerciseIcon = (session) => {
  const type = session?.state || session?.exerciseType || 'default';

  switch (type) {
    case 'depression':
      return 'emoticon-dead-outline';
    case 'anxiety':
      return 'alert-circle-outline';
    case 'anger':
      return 'emoticon-angry-outline';
    case 'stress':
      return 'lightning-bolt';
    case 'low_energy':
      return 'battery-low';
    case 'balance':
      return 'scale-balance';
    default:
      return 'meditation';
  }
};

export default function StatisticScreen() {
  const { theme, isDark } = useTheme();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week');
  const [offset, setOffset] = useState(0);

  /* ---------- LOAD ---------- */
  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSessions();
      const normalized = (data || [])
        .map(s => ({ ...s, _date: safeDate(s) }))
        .filter(s => s._date);
      setSessions(normalized);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { loadSessions(); }, [loadSessions]));

  /* ---------- SUMMARY ---------- */
  const totalSessions = sessions.length;
  const totalSeconds = sessions.reduce((s, x) => s + (x.duration || 0), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  const firstDate = sessions.length
    ? sessions.reduce((a, b) => (a._date < b._date ? a : b))._date
    : new Date();

  const days = Math.max(1, Math.ceil((Date.now() - firstDate.getTime()) / 86400000));
  const avgMinDay = (totalMinutes / days).toFixed(1);
  const avgSessDay = (totalSessions / days).toFixed(1);

  /* ---------- CHART DATA ---------- */
  const chartData = useMemo(() => {
    const points = [];
    const now = new Date();

    if (viewMode === 'week') {
      const base = new Date();
      base.setDate(now.getDate() - offset * 7);

      for (let i = 6; i >= 0; i--) {
        const d = new Date(base);
        d.setDate(d.getDate() - i);
        points.push({
          iso: d.toISOString().split('T')[0],
          label: d.toLocaleDateString('en-US', { weekday: 'short' }),
          count: 0,
          seconds: 0,
        });
      }

      sessions.forEach(s => {
        const iso = s._date.toISOString().split('T')[0];
        const p = points.find(x => x.iso === iso);
        if (p) {
          p.count++;
          p.seconds += s.duration || 0;
        }
      });
    }

    points.forEach(p => p.minutes = Math.round(p.seconds / 60));
    return points;
  }, [sessions, viewMode, offset]);

  const maxCount = Math.max(...chartData.map(x => x.count), 1);
  const maxMinutes = Math.max(...chartData.map(x => x.minutes), 1);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  /* ---------- RENDER ---------- */
  return (
    <>
      <StatusBar style={!isDark ? 'dark' : 'light'} />
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View style={styles.container}>

          <ThemedText type="title">Statistics</ThemedText>

          {/* SUMMARY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.section}>Summary</Text>

            <View style={styles.row}>
              <View style={[styles.boxLight]}>
                <Text style={styles.value}>{totalMinutes}</Text>
                <Text>Total Minutes</Text>
              </View>
              <View style={[styles.boxDark]}>
                <Text style={styles.value}>{totalSessions}</Text>
                <Text>Total Sessions</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.boxLight]}>
                <Text style={styles.valueSmall}>{avgMinDay}</Text>
                <Text>Avg. Min/Day</Text>
              </View>
              <View style={[styles.boxDark]}>
                <Text style={styles.valueSmall}>{avgSessDay}</Text>
                <Text>Avg. Sess/Day</Text>
              </View>
            </View>
          </View>

          {/* CHART */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.chartHeader}>
              <Text style={styles.section}>Last 7 Days</Text>
              <TouchableOpacity onPress={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}>
                <MaterialCommunityIcons
                  name={viewMode === 'week' ? 'calendar-month' : 'calendar-week'}
                  size={22}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#8baea4' }]} />
                <Text>Minutes</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#2f6f5f' }]} />
                <Text>Sessions</Text>
              </View>
            </View>

            <View style={styles.chart}>
              {chartData.map((d, i) => (
                <View key={i} style={styles.col}>
                  <View style={styles.bars}>
                    <View style={[styles.bar, {
                      backgroundColor: '#8baea4',
                      height: `${(d.minutes / maxMinutes) * 100}%`
                    }]} />
                    <View style={[styles.bar, {
                      backgroundColor: '#2f6f5f',
                      height: `${(d.count / maxCount) * 100}%`
                    }]} />
                  </View>
                  <Text style={styles.day}>{d.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* HISTORY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.section}>History</Text>

            {sessions.map((s, i) => (
              <View key={i} style={styles.history}>
                <View style={styles.historyLeft}>
                  <MaterialCommunityIcons
                    name={getExerciseIcon(s)}
                    size={18}
                    color={theme.primary}
                  />
                  <Text>{s._date.toLocaleDateString()}</Text>
                </View>
                <Text style={styles.historyTime}>{s.duration} sec</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: { borderRadius: 16, padding: 16, marginBottom: 20 },
  section: { fontSize: 18, fontWeight: '600', marginBottom: 12 },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },

  boxLight: {
    width: '48%',
    backgroundColor: '#8baea4',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  boxDark: {
    width: '48%',
    backgroundColor: '#2f6f5f',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  value: { fontSize: 30, color: '#fff', fontWeight: '700' },
  valueSmall: { fontSize: 20, color: '#fff', fontWeight: '700' },

  chartHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  legend: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  chart: { flexDirection: 'row', height: 180, marginTop: 10 },
  col: { flex: 1, alignItems: 'center' },
  bars: { flexDirection: 'row', gap: 6, height: '100%', alignItems: 'flex-end' },
  bar: { width: 14, borderRadius: 4 },
  day: { marginTop: 6, fontSize: 12 },

  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyTime: {
    fontSize: 14,
  },
});
