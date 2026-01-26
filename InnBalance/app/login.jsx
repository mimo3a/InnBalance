import LoginScreen from '@/src/screens/LoginScreen';

export const options = {
  headerShown: false,   // ⬅ completely removes header and back arrow
};

export default function LoginRoute() {
  return <LoginScreen />;
}
