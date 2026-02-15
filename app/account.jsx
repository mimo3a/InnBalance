import { Stack, useNavigation } from 'expo-router';
import AccountScreen from '@/src/screens/AccountScreen';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect } from 'react';

export default function AccountRoute() {
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
          title: 'Account',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <AccountScreen />
    </>
  );
}
