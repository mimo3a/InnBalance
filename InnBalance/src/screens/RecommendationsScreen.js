import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BREATHING_EXERCISES } from '../breathing/exerciseConfigs';
import { useTheme } from '@/src/contexts/ThemeContext';

export default function RecommendationsScreen() {
    const { state } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    
    // Get description based on state
    const getDescription = () => {
        switch (state) {
            case 'depression':
                return BREATHING_EXERCISES.anti_depression;
            case 'anxiety':
                return BREATHING_EXERCISES.anti_anxiety;
            case 'anger':
                return BREATHING_EXERCISES.anti_anger;
            case 'stress':
                return BREATHING_EXERCISES.anti_stress;
            case 'low_energy':
                return BREATHING_EXERCISES.anti_low_energy;
            case 'balance':
                return BREATHING_EXERCISES.balance;
            default:
                return BREATHING_EXERCISES.anti_stress;
        }
    };

    const description = getDescription();

    return (
  <View style={[styles.container, { backgroundColor: theme.background }]}>

    {/* HEADER */}
    <View style={styles.header}>
      <Text style={[styles.title, { color: theme.text }]}>{description.title}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Recommended Exercise
      </Text>
    </View>

    {/* DESCRIPTION — РАСТЯГИВАЕТСЯ */}
    <ThemedView style={[styles.descriptionBox, { backgroundColor: theme.cardBackground }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: theme.text }]}>
          {description.description}
        </Text>
      </ScrollView>
    </ThemedView>

    {/* ACTIONS — ПРИЖАТЫ К НИЗУ */}
    <ThemedView style={[styles.actionBox, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.actionTitle, { color: theme.text }]}>
        What would you like to do?
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: theme.primary + '15' }]}
          onPress={() =>
            router.push({ pathname: '/breathing', params: { state } })
          }
        >
          <MaterialCommunityIcons 
  name="circle-slice-8"
  size={44} 
  color={theme.primary}
/>
          <Text style={[styles.actionText, { color: theme.text }]}>Breathing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: theme.primary + '15' }]}
          onPress={() => router.push('/ruheorte')}
        >
          <MaterialCommunityIcons
  name="walk"
  size={44}
  color={theme.primary}
/>
          <Text style={[styles.actionText, { color: theme.text }]}>Walk</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>

  </View>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f8f7',
  },

  header: {
    marginBottom: 12,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // ⬇️ РАСТЯГИВАЕТСЯ
  descriptionBox: {
    flex: 1,                // 🔥 ключевая строка
    backgroundColor: '#dbeee9ff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
  },

  // ⬇️ УЕЗЖАЕТ ВНИЗ
  actionBox: {
    backgroundColor: '#dbeee9ff',
    borderRadius: 14,
    padding: 18,
    marginTop: 'auto',      // 🔥 прижимает вниз
    // iOS
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,

  // Android
  elevation: 3,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  actionCard: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 18,
  paddingHorizontal: 16,
  borderRadius: 14,          // как у descriptionBox
  width: 130,

  backgroundColor: '#dbeee9ff', // тот же фон, что сверху
  
},
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});


