import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => Promise<void>;
  colors: {
    background: string;
    card: string;
    text: {
      primary: string;
      secondary: string;
    };
    border: {
      light: string;
      dark: string;
    };
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
  };
}

const lightColors = {
  background: '#FAFAFA',
  card: '#FFFFFF',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
  },
  border: {
    light: '#E5E7EB',
    dark: '#D1D5DB',
  },
  primary: '#4F46E5',
  secondary: '#7C3AED',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const darkColors = {
  background: '#111827',
  card: '#1F2937',
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
  },
  border: {
    light: '#374151',
    dark: '#4B5563',
  },
  primary: '#6366F1',
  secondary: '#8B5CF6',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const systemColorScheme = useColorScheme();
  
  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value: ThemeContextType = {
    theme,
    isDark,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
