import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextType {
  isDark: boolean;
  isGreenMode: boolean;
  toggleTheme: () => void;
  toggleGreenMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useLocalStorage('ecocart-theme', false);
  const [isGreenMode, setIsGreenMode] = useLocalStorage('ecocart-green-mode', false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (isGreenMode) {
      document.documentElement.classList.add('green-mode');
    } else {
      document.documentElement.classList.remove('green-mode');
    }
  }, [isGreenMode]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleGreenMode = () => {
    setIsGreenMode(!isGreenMode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, isGreenMode, toggleTheme, toggleGreenMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}