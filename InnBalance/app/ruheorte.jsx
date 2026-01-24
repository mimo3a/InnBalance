import RuheOrteScreen from '@/src/screens/RuheOrteScreen';
import { Stack } from 'expo-router';

export default function RuheOrteRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <RuheOrteScreen />
    </>
  );
}
