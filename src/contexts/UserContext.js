import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ВАЖНО

  // Load user from AsyncStorage on start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          setUserState(JSON.parse(stored));
        } else {
          setUserState(null);
        }
      } catch {
        setUserState(null);
      } finally {
        setLoading(false); // ✅ ЗАГРУЗКА ЗАВЕРШЕНА
      }
    };

    loadUser();
  }, []);

  // Save user to AsyncStorage on change
  const setUser = async (u) => {
    setUserState(u);
    try {
      if (u) {
        await AsyncStorage.setItem('user', JSON.stringify(u));
      } else {
        await AsyncStorage.removeItem('user');
      }
    } catch {}
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
