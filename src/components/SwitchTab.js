import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SwitchTabs({ selected, onChange }) {
  return (
    <View style={styles.container}>
      {/* MAP */}
      <TouchableOpacity
        style={[styles.tab, selected === 'map' && styles.activeTab]}
        onPress={() => onChange('map')}
      >
        <View style={styles.tabContent}>
          <Ionicons
            name="map-outline"
            size={18}
            color={selected === 'map' ? '#000' : '#7a7a7a'}
          />
          <Text
            style={[
              styles.text,
              selected === 'map' && styles.activeText,
            ]}
          >
            Map
          </Text>
        </View>
      </TouchableOpacity>

      {/* LIST */}
      <TouchableOpacity
        style={[styles.tab, selected === 'list' && styles.activeTab]}
        onPress={() => onChange('list')}
      >
        <View style={styles.tabContent}>
          <Ionicons
            name="list-outline"
            size={18}
            color={selected === 'list' ? '#000' : '#7a7a7a'}
          />
          <Text
            style={[
              styles.text,
              selected === 'list' && styles.activeText,
            ]}
          >
            List
          </Text>
        </View>
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
  tabContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6, 

},
});
