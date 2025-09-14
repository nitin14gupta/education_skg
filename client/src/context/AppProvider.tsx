import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';
import { GameProvider } from './GameContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <GameProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </GameProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
