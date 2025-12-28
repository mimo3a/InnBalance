import { Stack } from 'expo-router';
import ExerciseScreen from '@/src/screens/ExerciseScreen';

export default function ExerciseRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Exercise 1' }} />
      <ExerciseScreen  />
    </>
  );
}