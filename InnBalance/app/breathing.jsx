
import { Stack } from 'expo-router';
import BreathingScreen from '@/src/screens/BreathingScreen';
export default function BreathingRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: '' }} />
      <BreathingScreen />
    </>
  );
}
