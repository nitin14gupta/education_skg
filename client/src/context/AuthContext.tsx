import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
  isMinor: boolean;
  guardianConsent?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  resendOTP: () => Promise<void>;
  otpSent: boolean;
  otpError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (emailOrPhone: string, password?: string) => {
    try {
      setIsLoading(true);
      setOtpError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always send OTP
      setOtpSent(true);
      
      // Store temporary login data
      await AsyncStorage.setItem('tempLogin', JSON.stringify({ emailOrPhone, password }));
    } catch (error) {
      setOtpError('Failed to send OTP. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      setIsLoading(true);
      setOtpError(null);
      
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') { // Demo OTP
        const tempData = await AsyncStorage.getItem('tempLogin');
        const { emailOrPhone } = tempData ? JSON.parse(tempData) : {};
        
        const newUser: User = {
          id: Date.now().toString(),
          email: emailOrPhone?.includes('@') ? emailOrPhone : undefined,
          phone: !emailOrPhone?.includes('@') ? emailOrPhone : undefined,
          name: 'Student User',
          isVerified: true,
          isMinor: true, // Will be determined during onboarding
          guardianConsent: false,
        };
        
        setUser(newUser);
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        await AsyncStorage.removeItem('tempLogin');
        setOtpSent(false);
      } else {
        setOtpError('Invalid OTP. Please try again.');
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setOtpError('OTP verification failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setOtpError(null);
      // Simulate resend
      await new Promise(resolve => setTimeout(resolve, 500));
      setOtpSent(true);
    } catch (error) {
      setOtpError('Failed to resend OTP. Please try again.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('tempLogin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
    if (user) {
      const updatedUser = { ...user, ...userData };
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    verifyOTP,
    logout,
    updateUser,
    resendOTP,
    otpSent,
    otpError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
