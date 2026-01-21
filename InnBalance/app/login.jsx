import LoginScreen from '@/src/screens/LoginScreen';

export const options = {
  headerShown: false,   // ⬅ полностью убирает header и стрелку
};

export default function LoginRoute() {
  return <LoginScreen />;
}
