import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddOrte() {
    return (
        <View style={styles.container}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        justifyContent: 'center',
        alignItems: 'center',
    },
});