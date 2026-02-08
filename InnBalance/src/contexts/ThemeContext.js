import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f6f8f7',
  cardBackground: '#dbeee9ff',
  text: '#2f6f62',
  textSecondary: '#666',
  primary: '#2f6f62',
  primaryLight: '#7bc4b3',
  danger: '#d94c4c',
  dangerDark: '#b33939',
  white: '#ffffff',
  border: '#d1d1d1',
  shadow: '#000',
};

export const darkTheme = {
  background: '#1a1a1a',
  cardBackground: '#2d2d2d',
  text: '#e0e0e0',
  textSecondary: '#a0a0a0',
  primary: '#7bc4b3',
  primaryLight: '#9dd4c6',
  danger: '#ff6b6b',
  dangerDark: '#d94c4c',
  white: '#ffffff',
  border: '#404040',
  shadow: '#000',
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
