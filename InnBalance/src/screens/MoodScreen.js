import { StyleSheet } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';

export default function MoodScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mood Screen</ThemedText>
      <ThemedText>This is your new separate page.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
