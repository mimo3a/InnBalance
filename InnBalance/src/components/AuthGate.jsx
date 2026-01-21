import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/src/contexts/UserContext';

export default function AuthGate({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.name || !user?.password) {
      router.replace('/signup');
    }
  }, [user, router]);

  if (!user?.name || !user?.password) {
    return null;
  }
  return children;
}
