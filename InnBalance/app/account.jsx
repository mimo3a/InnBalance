
import { Stack } from 'expo-router';
import AccountScreen from '@/src/screens/AccountScreen';

export default function AccountRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Account',
          headerShown: true,
        }}
      />
      <AccountScreen />
    </>
  );
}
