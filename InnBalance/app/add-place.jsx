
import { Stack } from 'expo-router';
import AddPlaceScreen from '@/src/screens/AddPlaceScreen';
export default function AddPlaceRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          }} />
      <AddPlaceScreen />
    </>
  );
}
