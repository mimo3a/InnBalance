import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwitchTabs from '../components/SwitchTab';
import PlacesListScreen from './PlacesListScreen';
import PlacesMap from '../components/PlacesMap';

export default function RuheOrteScreen() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <SwitchTabs selected={activeTab} onChange={setActiveTab} />
      </View>

      <View style={styles.content}>
        {activeTab === 'map' ? <PlacesMap /> : <PlacesListScreen />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 10,
  },
  content: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
});
