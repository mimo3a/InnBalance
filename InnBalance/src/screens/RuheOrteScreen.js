import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SwitchTabs from '../components/SwitchTab';
import PlacesListScreen from './PlacesListScreen';

export default function RuheOrteScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('map');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <SwitchTabs selected={activeTab} onChange={setActiveTab} />
      </View>
      
      <View style={styles.content}>
        {activeTab === 'map' ? (
          <View style={styles.mapContainer}>
            <Text style={styles.title}>Places Map Screen</Text>
            {/* Map component will go here later */}
          </View>
        ) : (
          <PlacesListScreen />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 10,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
