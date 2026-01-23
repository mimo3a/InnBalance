
import { Stack } from 'expo-router';
import PlacesListScreen from '@/src/screens/PlacesListScreen';

export default function PlacesListRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
        }}
      />
      <PlacesListScreen />
    </>
  );
}
