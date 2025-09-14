import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, isLoading: userLoading } = useUser();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Handle navigation after loading
    const timer = setTimeout(() => {
      if (!authLoading && !userLoading) {
        if (!isAuthenticated) {
          router.replace('/(auth)/login');
        } else if (!profile?.onboardingCompleted) {
          router.replace('/(onboarding)/welcome');
        } else {
          router.replace('/(tabs)');
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, profile, authLoading, userLoading]);

  return (
    <View className="flex-1 gradient-primary items-center justify-center">
      {/* Background Pattern */}
      <View className="absolute inset-0 opacity-10">
        <View className="w-full h-full bg-white/10 rounded-full" style={{ transform: [{ scale: 2 }] }} />
      </View>
      
      {/* Main Content */}
      <View className="items-center justify-center flex-1">
        {/* Logo Container */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center mb-8"
        >
          {/* App Icon */}
          <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-4 shadow-card-lg">
            <Text className="text-4xl">🎓</Text>
          </View>
          
          {/* App Name */}
          <Text className="text-display text-white font-fredoka text-center">
            EduAI
          </Text>
          <Text className="text-h3 text-white/90 font-inter text-center mt-2">
            Smart Learning for K12
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="items-center"
        >
          <View className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full" style={{ transform: [{ rotate: '0deg' }] }} />
          <Text className="text-body-lg text-white/80 font-inter mt-4">
            Loading your learning journey...
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Branding */}
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="absolute bottom-12 items-center"
      >
        <Text className="text-body-md text-white/70 font-inter">
          Powered by AI • Personalized Learning
        </Text>
      </Animated.View>
    </View>
  );
}
