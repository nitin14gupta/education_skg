import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  grade: number;
  board: string;
  school: string;
  marksHistory?: {
    subject: string;
    marks: number;
    totalMarks: number;
    examDate: string;
  }[];
  lastExamPercentage?: number;
  economicBackground: {
    hasBike: boolean;
    hasCar: boolean;
    hasFridge: boolean;
    hasAC: boolean;
    studyEnvironment: 'quiet' | 'noisy' | 'mixed';
    internetQuality: 'excellent' | 'good' | 'fair' | 'poor';
  };
  contacts: {
    classTeacher: {
      name: string;
      phone: string;
      email?: string;
    };
    parent: {
      name: string;
      phone: string;
      profession: string;
      education: string;
    };
  };
  preferences: {
    diagnosticType: 'quick' | 'full';
    notifications: boolean;
    dataUsage: boolean;
    messaging: boolean;
  };
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  profile: StudentProfile | null;
  isLoading: boolean;
  updateProfile: (profileData: Partial<StudentProfile>) => Promise<void>;
  completeOnboarding: (profileData: StudentProfile) => Promise<void>;
  updateOnboardingStep: (step: number) => Promise<void>;
  currentOnboardingStep: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('studentProfile');
      const onboardingStep = await AsyncStorage.getItem('onboardingStep');
      
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
      
      if (onboardingStep) {
        setCurrentOnboardingStep(parseInt(onboardingStep));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<StudentProfile>) => {
    try {
      setIsLoading(true);
      
      const updatedProfile = profile ? { ...profile, ...profileData, updatedAt: new Date().toISOString() } : profileData as StudentProfile;
      
      setProfile(updatedProfile);
      await AsyncStorage.setItem('studentProfile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (profileData: StudentProfile) => {
    try {
      setIsLoading(true);
      
      const completedProfile: StudentProfile = {
        ...profileData,
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProfile(completedProfile);
      setCurrentOnboardingStep(5); // Mark as completed
      
      await AsyncStorage.setItem('studentProfile', JSON.stringify(completedProfile));
      await AsyncStorage.setItem('onboardingStep', '5');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOnboardingStep = async (step: number) => {
    try {
      setCurrentOnboardingStep(step);
      await AsyncStorage.setItem('onboardingStep', step.toString());
    } catch (error) {
      console.error('Error updating onboarding step:', error);
    }
  };

  const value: UserContextType = {
    profile,
    isLoading,
    updateProfile,
    completeOnboarding,
    updateOnboardingStep,
    currentOnboardingStep,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
