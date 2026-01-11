import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/src/components/themed-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BREATHING_EXERCISES_DESCRIPTION } from '../breathing/ExerciseDescription';

export default function RecommendationsScreen() {
    const { state } = useLocalSearchParams();
    const router = useRouter();
    
    // Get description based on state
    const getDescription = () => {
        switch (state) {
            case 'depression':
                return BREATHING_EXERCISES_DESCRIPTION.anti_depression;
            case 'anxiety':
                return BREATHING_EXERCISES_DESCRIPTION.anti_anxiety;
            case 'anger':
                return BREATHING_EXERCISES_DESCRIPTION.anti_anger;
            case 'stress':
                return BREATHING_EXERCISES_DESCRIPTION.anti_stress;
            case 'low_energy':
                return BREATHING_EXERCISES_DESCRIPTION.anti_low_energy;
            case 'balance':
                return BREATHING_EXERCISES_DESCRIPTION.balance;
            default:
                return BREATHING_EXERCISES_DESCRIPTION.anti_stress;
        }
    };

    const description = getDescription();

    return (
  <View style={styles.container}>

    {/* HEADER */}
    <View style={styles.header}>
      <Text style={styles.title}>{description.title}</Text>
      <Text style={styles.subtitle}>
        Рекомендованное упражнение
      </Text>
    </View>

    {/* DESCRIPTION — РАСТЯГИВАЕТСЯ */}
    <ThemedView style={styles.descriptionBox}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          {description.description}
        </Text>
      </ScrollView>
    </ThemedView>

    {/* ACTIONS — ПРИЖАТЫ К НИЗУ */}
    <ThemedView style={styles.actionBox}>
      <Text style={styles.actionTitle}>
        Что вы хотите сделать?
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push({ pathname: '/breathing', params: { state } })
          }
        >
          <MaterialCommunityIcons
            name="weather-partly-cloudy"
            size={42}
            color="#2f6f62"
          />
          <Text style={styles.actionText}>Дыхание</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/ruheorte')}
        >
          <MaterialCommunityIcons
            name="walk"
            size={42}
            color="#2f6f62"
          />
          <Text style={styles.actionText}>Прогулка</Text>
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
    padding: 14,
    borderRadius: 12,
    width: 120,
    backgroundColor: '#ffffff',
    elevation: 1,
  },

  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});


