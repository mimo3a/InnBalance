import PlaceDescriptionScreen from "@/src/screens/PlaceDesriptionScreen";
import { Stack } from "expo-router";
import { useTheme } from '@/src/contexts/ThemeContext';

export default function DescriptionRoute() {
const { theme, isDark } = useTheme();
  return (
    <>
    <Stack.Screen
      options={{
        headerTintColor: isDark ? theme.white : theme.text,
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        }} />
    <PlaceDescriptionScreen />
    </>
  )
}