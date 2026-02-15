import HelpScreen from '@/src/screens/HelpScreen';
import { Stack, useNavigation } from "expo-router";
import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect } from 'react';

export default function HelpRoute() {
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
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <HelpScreen />
    </>
  ) 
}


