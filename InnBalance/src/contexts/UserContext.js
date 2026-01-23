import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
  // user = { name: string, password: string } or null
  const [user, setUserState] = useState(null);

  // Load user from AsyncStorage on start
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          setUserState(JSON.parse(stored));
        } else {
          setUserState(null);
        }
      } catch {
        setUserState(null);
      }
    })();
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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
