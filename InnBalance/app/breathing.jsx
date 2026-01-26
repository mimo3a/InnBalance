

import { Stack, useNavigation } from 'expo-router';
import BreathingScreen from '@/src/screens/BreathingScreen';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect } from 'react';

export default function BreathingRoute() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: {
        backgroundColor: isDark ? theme.cardBackground : theme.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: isDark ? theme.white : theme.primary,
      headerBackTitleVisible: false,
    });
  }, [isDark, theme, navigation]);

  return <BreathingScreen />;
}
