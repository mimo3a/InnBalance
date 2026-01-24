import { Stack } from 'expo-router';
import RecommendationsScreen from '@/src/screens/RecommendationsScreen';

export default function RecommendationsScreenRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <RecommendationsScreen />
    </>
  );
}
