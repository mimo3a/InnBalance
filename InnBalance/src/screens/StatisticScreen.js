/**
 * StatisticScreen Component
 * 
 * Displays comprehensive statistics about user's breathing exercise sessions:
 * - Total sessions completed
 * - Total time spent in minutes
 * - Weekly overview chart showing sessions and minutes per day
 * - Detailed history of all sessions with mood icons
 * 
 * Data is loaded from AsyncStorage and refreshed when screen gains focus.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { getSessions } from '../services/statisticsService';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * StatisticScreen Component
 * Main statistics dashboard for tracking breathing exercises
 */
export default function StatisticScreen() {
  // Store all session data
  const [sessions, setSessions] = useState([]);
  
  // Loading state for data fetch
  // Loading state for data fetch
  const [loading, setLoading] = useState(true);

  /**
   * Load sessions from storage
   * Fetches all saved breathing sessions from AsyncStorage
   */
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

  // Reload sessions when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [loadSessions])
  );

  /**
   * Calculate summary statistics
   * - Total number of sessions
   * - Total duration in minutes
   */
  const totalSessions = sessions.length;
  const totalDurationSeconds = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
  const totalDurationMinutes = Math.round(totalDurationSeconds / 60);

  /**
   * Generate chart data for last 7 days
   * Creates an array of day objects with counts and durations
   */
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('de-DE', { weekday: 'short' }); 
      days.push({ date: isoDate, label, count: 0, minutes: 0, seconds: 0 });
    }
    return days;
  };

  const chartData = getLast7Days();
  
  sessions.forEach(session => {
    const sessionDate = new Date(session.date).toISOString().split('T')[0];
    const dayStat = chartData.find(d => d.date === sessionDate);
    if (dayStat) {
      dayStat.count += 1;
      dayStat.seconds += (session.duration || 0);
    }
  });

  // Umrechnung Sekunden -> Minuten pro Tag
  chartData.forEach(day => {
    day.minutes = Math.round(day.seconds / 60);
  });

  const maxCount = Math.max(...chartData.map(d => d.count), 1); 
  const maxMinutes = Math.max(...chartData.map(d => d.minutes), 1);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2f6f5f" />
        <ThemedText style={{ marginTop: 10, color: '#2f6f5f' }}>Lade Statistik...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        
        <ThemedText type="title" style={{ marginBottom: 20 }}>Statistics</ThemedText>

        {/* SECTION 1 - Summary Cards */}
        <View style={styles.cardContainer}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>Zusammenfassung</ThemedText>
          
          <View style={styles.statsRow}>
            {/* Card 1 - Total Minutes (Light Green) */}
            <View style={[styles.statBox, { backgroundColor: '#8baea4' }]}>
              <Text style={styles.statValueLight}>{totalDurationMinutes}</Text>
              <Text style={styles.statLabelLight}>Minuten</Text>
            </View>
            
            {/* Card 2 - Total Sessions (Dark Green) */}
            <View style={[styles.statBox, { backgroundColor: '#2f6f5f' }]}>
              <Text style={styles.statValueLight}>{totalSessions}</Text>
              <Text style={styles.statLabelLight}>Sessions</Text>
            </View>
          </View>
        </View>

        {/* SECTION 2 - Weekly Chart */}
        <View style={styles.cardContainer}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>Wochenübersicht</ThemedText>
          
          {/* Legend for chart colors */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8baea4' }]} />
              <Text style={styles.legendText}>Minuten</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2f6f5f' }]} />
              <Text style={styles.legendText}>Sessions</Text>
            </View>
          </View>

          {/* Bar Chart - 7 days */}
          <View style={styles.chartArea}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.chartColumn}>
                
                <View style={styles.barsWrapper}>
                  {/* Bar 1 - Minutes (Light Green) */}
                  <View style={styles.barContainer}>
                      <View style={[
                        styles.bar, 
                        { 
                          backgroundColor: '#8baea4',
                          height: `${(item.minutes / maxMinutes) * 100}%`,
                          // Logic: Flat (2px) if zero, tall enough for text (20px) if data exists
                          minHeight: item.minutes > 0 ? 20 : 2
                        }
                      ]}>
                         {/* Data label inside bar */}
                         {item.minutes > 0 && (
                           <Text style={styles.innerBarLabel}>{item.minutes}</Text>
                         )}
                      </View>
                  </View>

                  {/* Bar 2 - Count (Dark Green) */}
                  <View style={styles.barContainer}>
                      <View style={[
                        styles.bar, 
                        { 
                          backgroundColor: '#2f6f5f',
                          height: `${(item.count / maxCount) * 100}%`,
                          // Flat (2px) if value = 0, tall enough for text (20px) otherwise
                          minHeight: item.count > 0 ? 20 : 2
                        }
                      ]}>
                         {/* Data label inside bar */}
                         {item.count > 0 && (
                           <Text style={styles.innerBarLabel}>{item.count}</Text>
                         )}
                      </View>
                  </View>
                </View>

                {/* Day label below bars */}
                <Text style={styles.dayLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION 3 - Session History */}
        <View style={styles.historyContainer}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>Verlauf</ThemedText>
          
          {sessions.length === 0 ? (
            <ThemedText style={{ color: '#666', fontStyle: 'italic' }}>
              Noch keine Übungen absolviert.
            </ThemedText>
          ) : (
            sessions.map((s, index) => {
               const moodIcons = {
                depression: 'emoticon-dead-outline',
                anxiety: 'alert-circle-outline',
                anger: 'emoticon-angry-outline',
                stress: 'weather-windy',
                low_energy: 'battery-low',
                balance: 'scale-balance',
              };
              const moodKey = s.mood || s.state || null; 
              const iconName = moodKey ? (moodIcons[moodKey] || 'help-circle-outline') : null;

              return (
                <View key={index}>
                  <View style={styles.historyRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                      {iconName && (
                        <View style={{ backgroundColor: '#eef5f2', padding: 6, borderRadius: 8 }}>
                          <MaterialCommunityIcons name={iconName} size={18} color="#2f6f5f" />
                        </View>
                      )}
                      <ThemedText style={styles.historyDate}>
                        {new Date(s.date).toLocaleDateString()}
                      </ThemedText>
                    </View>
                    <View style={styles.historyBadge}>
                      <Text style={styles.historyDuration}>{s.duration} Sek.</Text>
                    </View>
                  </View>
                  {index < sessions.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })
          )}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  sectionHeader: { marginBottom: 12, fontSize: 18, color: '#2f6f5f', fontWeight: '600' },
  
  // --- CONTAINER STYLES ---
  cardContainer: {
    marginBottom: 24,
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  // --- STATS BOXES ---
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    width: '48%',
    // Hintergrundfarbe wird inline gesetzt
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Helle Schrift für die farbigen Boxen
  statValueLight: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 4 
  },
  statLabelLight: { 
    fontSize: 14, 
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
  },

  // --- CHART STYLES ---
  legendContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },
  
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '85%', 
    width: '100%',
    justifyContent: 'center',
    gap: 6, 
  },
  barContainer: {
    height: '100%',
    width: 14,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    // minHeight wird dynamisch gesetzt
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4, 
  },
  innerBarLabel: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }],
    width: 30,
    textAlign: 'center',
    marginTop: 2,
  },
  dayLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },

  // --- HISTORY STYLES ---
  historyContainer: {
    backgroundColor: '#eef3ef',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 40,
  },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  historyDate: { fontSize: 16, color: '#333' },
  historyBadge: { backgroundColor: '#2f6f5f', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  historyDuration: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  divider: { width: '100%', height: 1, backgroundColor: '#d0d8d3', marginVertical: 4 },
});