import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
  // user = { name: string, password: string }
  const [user, setUserState] = useState({ name: 'User', password: '' });

  // Загрузка пользователя из AsyncStorage при старте
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) setUserState(JSON.parse(stored));
      } catch {}
    })();
  }, []);

  // Сохранять пользователя в AsyncStorage при изменении
  const setUser = async (u) => {
    setUserState(u);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(u));
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
