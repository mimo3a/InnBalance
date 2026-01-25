import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '@/src/contexts/ThemeContext';

const { theme, isDark } = useTheme();
const router = useRouter();
export function AddPlaceButton() {
    return(
        <View>    
            {/* Add Place Button */}
            <View style={styles.fillView}/>{/**making the plus-symbol white, instead of transparent */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/add-place')}
            >
                <Ionicons name="add-circle" size={70} color={theme.primary}  />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    fillView:{
        position:'absolute',
        width:30,
        height:30,
        bottom:30,
        right:30,
        backgroundColor:'#fff'
    },

});

