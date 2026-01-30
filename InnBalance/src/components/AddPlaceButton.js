import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '@/src/contexts/ThemeContext';

export function AddPlaceButton({ style }) {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <View style={style}>
            <TouchableOpacity onPress={() => router.push('/add-place')}>
                <Ionicons name="add-circle" size={70} color={theme.primary} />
            </TouchableOpacity>
        </View>
    );
}
