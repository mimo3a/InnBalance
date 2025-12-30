import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SwitchTabs({ selected, onChange }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selected === 'map' && styles.activeTab]}
        onPress={() => onChange('map')}
      >
        <Text style={[styles.text, selected === 'map' && styles.activeText]}>Karte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selected === 'list' && styles.activeTab]}
        onPress={() => onChange('list')}
      >
        <Text style={[styles.text, selected === 'list' && styles.activeText]}>Liste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e8eef1',
    borderRadius: 30,
    padding: 4,
    width: 220,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#7a7a7a',
  },
  activeText: {
    fontWeight: '600',
    color: '#000',
  },
});
