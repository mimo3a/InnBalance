import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SwitchTabs({ selected, onChange }) {
  return (
    <View style={styles.container}>
      {/* Karte */}
      <TouchableOpacity
        style={[styles.tab, selected === "map" && styles.activeTab]}
        onPress={() => onChange("map")}
      >
        <Ionicons
          name="map-outline"
          size={18}
          color={selected === "map" ? "#000" : "#777"}
        />
        <Text style={[styles.tabText, selected === "map" && styles.activeText]}>
          Karte
        </Text>
      </TouchableOpacity>

      {/* Liste */}
      <TouchableOpacity
        style={[styles.tab, selected === "list" && styles.activeTab]}
        onPress={() => onChange("list")}
      >
        <Ionicons
          name="list-outline"
          size={18}
          color={selected === "list" ? "#000" : "#777"}
        />
        <Text style={[styles.tabText, selected === "list" && styles.activeText]}>
          Liste
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e8f0f2",
    padding: 4,
    borderRadius: 30,
    marginVertical: 10,
    justifyContent: "space-between",
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 25,
  },

  tabText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },

  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  activeText: {
    color: "#000",
    fontWeight: "600",
  },
});
