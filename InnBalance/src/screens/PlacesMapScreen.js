import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PlacesMapScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places Map Screen</Text>
      
      {/* Custom Menu in Top Right */}
      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
           <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>

        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { setMenuVisible(false); router.push('/places-list'); }}
            >
              <Ionicons name="list" size={20} color="black" style={{marginRight: 8}} />
              <Text>View All Places</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { setMenuVisible(false); router.push('/add-place'); }}
            >
              <Ionicons name="add-circle-outline" size={20} color="black" style={{marginRight: 8}} />
              <Text>Add New Place</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  menuWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  menuButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    minWidth: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  }
});
