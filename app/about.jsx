import AboutScreen from '@/src/screens/AboutScreen';
import { Stack, useNavigation } from "expo-router";
import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect } from 'react';

export default function AboutRoute() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: isDark ? theme.white : theme.text,
    });
  }, [isDark, theme.white, theme.text, navigation]);

  return(
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <AboutScreen />
    </>
  );
}

