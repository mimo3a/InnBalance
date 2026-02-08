import { Stack, useNavigation } from "expo-router";
import TermsScreen from "@/src/screens/TermsScreen";
import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect } from 'react';

export default function TermsRoute() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: isDark ? theme.white : theme.text,
    });
  }, [isDark, theme.white, theme.text, navigation]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <TermsScreen />
    </>
  );
}
