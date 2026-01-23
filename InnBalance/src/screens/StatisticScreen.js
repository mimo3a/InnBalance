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

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { getSessions } from '../services/statisticsService';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';

/**
 * StatisticScreen Component
 * Main statistics dashboard for tracking breathing exercises
 */
export default function StatisticScreen() {
  // Store all session data
  const [sessions, setSessions] = useState([]);
  
  // Loading state for data fetch
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

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
   * - Total number of sessions (totalSessions)
   * - Total duration in minutes (totalDurationMinutes)
   * - Average sessions per day (avgSessionsPerDay)
   * - Average minutes per day (avgMinutesPerDay)
   */
  const totalSessions = sessions.length;
  const totalDurationSeconds = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
  const totalDurationMinutes = Math.round(totalDurationSeconds / 60);

  // Calculate averages for Summary
  // Find first Session & safetycheck if no sessions available
  const hasSessions = sessions && sessions.length > 0;
  const timestamps = hasSessions ? sessions.map(s => new Date(s.date).getTime()) : [];
  const firstSessionTimestamp = hasSessions ? Math.min(...timestamps) : new Date().getTime();

  // Timedifference calculated in Days (rounded)
  const diffInMs = new Date().getTime() - firstSessionTimestamp;
  const diffInDays = Math.max(1, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));
  
  const avgMinutesPerDay = (totalDurationMinutes / diffInDays).toFixed(1);
  const avgSessionsPerDay = (totalSessions / diffInDays).toFixed(1);

  /* 
  ==== Weekly Summary ==== (old)
  // Round to next full week
  const weeksSinceStart = Math.ceil(diffInDays / 7);

  // Final calculation
  const avgMinutesPerWeek = Math.round(totalDurationMinutes / weeksSinceStart);
  const avgSessionsPerWeek = (totalSessions / weeksSinceStart).toFixed(1);
  */
 
  // State for chart view and Navigation
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
  const [offset, setOffset] = useState(0);


  /**
   * CHART LOGIC
   * - Calculates data based on view mode and offset
   */
  const chartData = useMemo(() => {
  const dataPoints = [];
  const now = new Date();

  if (viewMode === 'week') {
    // Week View: Rolling 7-day window based on offset
    const baseDate = new Date();
    baseDate.setDate(now.getDate() - (offset * 7));

    for (let i = 6; i >= 0; i--) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() - i);
      
      dataPoints.push({
        date: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: 0,
        seconds: 0
      });
    }

    // Fill week data
    sessions.forEach(session => {
      const sIso = new Date(session.date).toISOString().split('T')[0];
      const point = dataPoints.find(p => p.date === sIso);
      
      if (point) {
        point.count += 1;
        point.seconds += (session.duration || 0);
      }
    });

  } else {
    // Month View: Real calendar weeks logic
    const targetDate = new Date();
    targetDate.setMonth(now.getMonth() - offset);
    
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const monthName = targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric'});

    // Determine starting weekday of the month (0=Mon, 6=Sun for easier math)
    const firstDayOfMonth = new Date(year, month, 1);
    const jsDay = firstDayOfMonth.getDay(); 
    const startOffset = jsDay === 0 ? 6 : jsDay - 1; 

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate required rows (4, 5, or 6 weeks)
    const weeksCount = Math.ceil((daysInMonth + startOffset) / 7);

    // Create buckets
    for (let i = 0; i < weeksCount; i++) {
      dataPoints.push({
        label: `W${i + 1}`,
        count: 0,
        seconds: 0,
        isMonth: true,
        monthName,
        monthIdx: month,
        year
      });
    }

    // Map sessions to week buckets
    sessions.forEach(session => {
      const sDate = new Date(session.date);
      
      // Only process sessions belonging to the displayed month
      if (sDate.getMonth() === month && sDate.getFullYear() === year) {
        const dayOfMonth = sDate.getDate();
        
        // Calculate which row (week index) this day belongs to
        const weekIndex = Math.floor((dayOfMonth + startOffset - 1) / 7);

        if (dataPoints[weekIndex]) {
          dataPoints[weekIndex].count += 1;
          dataPoints[weekIndex].seconds += (session.duration || 0);
        }
      }
    });
  }

  // Common: Convert seconds to minutes for display
  dataPoints.forEach(p => p.minutes = Math.round(p.seconds / 60));

  return dataPoints;

}, [sessions, viewMode, offset]);

  const maxCount = Math.max(...chartData.map(d => d.count), 1); 
  const maxMinutes = Math.max(...chartData.map(d => d.minutes), 1);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <ThemedText style={{ marginTop: 10, color: theme.primary }}>Lade Statistik...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        <ThemedText type="title" style={[{ marginBottom: 20 }, { color: theme.text }]}>Statistics</ThemedText>

        {/* SECTION 1 - Summary Cards */}
        <View style={[styles.cardContainer, { backgroundColor: theme.cardBackground }]}>
          <ThemedText type="subtitle" style={[styles.sectionHeader, { color: theme.text }]}>Summary</ThemedText>

        {/*Row 1*/}  
          <View style={styles.statsRow}>
            {/* Card 1 - Total Minutes (Light Green) */}
            <View style={[styles.statBoxLarge, { backgroundColor: theme.primaryLight }]}>
              <Text style={styles.statValueLight}>{totalDurationMinutes}</Text>
              <Text style={styles.statLabelLight}>Minutes</Text>
            </View>
            
            {/* Card 2 - Total Sessions (Dark Green) */}
            <View style={[styles.statBoxLarge, { backgroundColor: theme.primary }]}>
              <Text style={styles.statValueLight}>{totalSessions}</Text>
              <Text style={styles.statLabelLight}>Sessions</Text>
            </View>
          </View>

        {/*Row 2*/} 
        <View style={styles.statsRow}>
            {/* Card 3 - Average minutes per week (Light Green) */}
            <View style={[styles.statBoxSmall, { backgroundColor: theme.primaryLight }]}>
              <Text style={styles.statValueLightSmall}>{avgMinutesPerDay}</Text>
              <Text style={styles.statLabelLightSmall}>Avg. Minutes/Day</Text>
            </View>
            
            {/* Card 4 - Average sessions per week (Dark Green) */}
            <View style={[styles.statBoxSmall, { backgroundColor: theme.primary }]}>
              <Text style={styles.statValueLightSmall}>{avgSessionsPerDay}</Text>
              <Text style={styles.statLabelLightSmall}>Avg. Sessions/Day</Text>
            </View>
          </View>
        </View>

        {/* SECTION 2 - Chart */}
        <View style={[styles.cardContainer, { backgroundColor: theme.cardBackground }]}>
          
          {/* Dynamic Header with Navigation and Toggle */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <View>
              <ThemedText type="subtitle" style={{ color: theme.text, marginBottom: 0 }}>
                {viewMode === 'week' 
                  ? (offset === 0 
                      ? 'Last 7 Days' 
                      : `${new Date(chartData[0]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(chartData[6]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`)
                  : `${chartData[0]?.monthName || ''}`}
              </ThemedText>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              {/* Toggle Week/Month View */}
              <TouchableOpacity 
                onPress={() => { setViewMode(viewMode === 'week' ? 'month' : 'week'); setOffset(0); }}
                style={{ padding: 5, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8 }}
              >
                <MaterialCommunityIcons 
                  name={viewMode === 'week' ? 'calendar-month' : 'calendar-week'} 
                  size={24} 
                  color={theme.primary} 
                />
              </TouchableOpacity>

              {/* Navigation Controls */}
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10 }}>
                
                {/* left chevron (always active) */}
                <TouchableOpacity onPress={() => setOffset(prev => prev + 1)}>
                  <MaterialCommunityIcons name="chevron-left" size={30} color={theme.primary} />
                </TouchableOpacity>
                
                {/* Today button: can get inactive if view in current week */}
                <TouchableOpacity 
                  onPress={() => setOffset(0)} 
                  style={{ paddingHorizontal: 5 }}
                  disabled={offset === 0} // deactivate, if already at offset 0
                >
                  <MaterialCommunityIcons 
                    name="calendar-today" 
                    size={20} 
                    color={offset === 0 ? theme.border : theme.primary} // change color: grey if 0 else green
                  />
                </TouchableOpacity>

                {/* right chevron: can get inactive if view in current week */}
                <TouchableOpacity 
                  onPress={() => setOffset(prev => Math.max(0, prev - 1))}
                  disabled={offset === 0}
                >
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={30} 
                    color={offset === 0 ? theme.border : theme.primary} // change color: grey if 0 else green
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Legend for chart colors */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8baea4' }]} />
              <Text style={styles.legendText}>Minutes</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2f6f5f' }]} />
              <Text style={styles.legendText}>Sessions</Text>
            </View>
          </View>

          {/* Bar Chart */}
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
                          minHeight: item.minutes > 0 ? 20 : 2
                        }
                      ]}>
                          {item.minutes > 0 && (
                            <Text style={styles.innerBarLabel}>{item.minutes}</Text>
                          )}
                      </View>
                  </View>

                  {/* Bar 2 - Sessions Count (Dark Green) */}
                  <View style={styles.barContainer}>
                      <View style={[
                        styles.bar, 
                        { 
                          backgroundColor: '#2f6f5f',
                          height: `${(item.count / maxCount) * 100}%`,
                          minHeight: item.count > 0 ? 20 : 2
                        }
                      ]}>
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
        <View style={[styles.historyContainer, { backgroundColor: theme.cardBackground }]}>
          <ThemedText type="subtitle" style={[styles.sectionHeader, { color: theme.text }]}>History</ThemedText>
          
          {sessions.length === 0 ? (
            <ThemedText style={{ color: theme.textSecondary, fontStyle: 'italic' }}>
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
                        <View style={{ backgroundColor: theme.background, padding: 6, borderRadius: 8 }}>
                          <MaterialCommunityIcons name={iconName} size={18} color={theme.primary} />
                        </View>
                      )}
                      <ThemedText style={[styles.historyDate, { color: theme.text }]}>
                        {new Date(s.date).toLocaleDateString()}
                      </ThemedText>
                    </View>
                    <View style={[styles.historyBadge, { backgroundColor: theme.primaryLight }]}>
                      <Text style={styles.historyDuration}>{s.duration} Sec.</Text>
                    </View>
                  </View>
                  {index < sessions.length - 1 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
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
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: 12,
  },
  statBoxLarge: {
    width: '48%',
    // Backgroundcolor set inline
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
  statBoxSmall: {
    width: '48%',
    height: 'auto',
    // Backgroundcolor set inline
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Light style for colored containers
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
  // Light style for colored containers, small
  statValueLightSmall: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginTop: 1,
    marginBottom: 1 
  },
  statLabelLightSmall: { 
    fontSize: 12, 
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
    marginTop: 1,
    marginBottom: 1,
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
    // minHeigt set dynamically
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