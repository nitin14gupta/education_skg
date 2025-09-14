import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Background Pattern */}
      <View className="absolute inset-0">
        <View className="w-full h-full gradient-primary opacity-5" />
        <View 
          className="absolute top-20 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-20"
          style={{ transform: [{ scale: 1.5 }] }}
        />
        <View 
          className="absolute bottom-40 left-8 w-24 h-24 bg-secondary-200 rounded-full opacity-20"
          style={{ transform: [{ scale: 1.2 }] }}
        />
      </View>

      {/* Content */}
      <View className="flex-1 px-6 justify-center">
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          }}
          className="items-center"
        >
          {/* Welcome Icon */}
          <View className="w-32 h-32 bg-gradient-primary rounded-3xl items-center justify-center mb-8 shadow-card-lg">
            <Ionicons name="school" size={64} color="white" />
          </View>

          {/* Welcome Text */}
          <Text className="text-display text-text-primary font-fredoka text-center mb-4">
            Welcome to EduAI! 🎉
          </Text>
          
          <Text className="text-h3 text-text-secondary font-inter text-center mb-8 leading-8">
            Let's set up your personalized learning experience
          </Text>

          {/* Features List */}
          <View className="w-full mb-12">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-success-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-body-lg text-text-primary font-inter flex-1">
                AI-powered personalized learning
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-success-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-body-lg text-text-primary font-inter flex-1">
                Gamified study experience
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-success-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-body-lg text-text-primary font-inter flex-1">
                Track progress and achievements
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-success-100 rounded-full items-center justify-center mr-4">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-body-lg text-text-primary font-inter flex-1">
                Connect with teachers and parents
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            onPress={handleGetStarted}
            className="w-full btn-primary mb-6"
          >
            <Text className="text-center text-white font-inter font-semibold text-body-lg">
              Let's Get Started
            </Text>
          </TouchableOpacity>

          {/* Progress Indicator */}
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
          </View>
        </Animated.View>
      </View>

      {/* Bottom Text */}
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="px-6 pb-8"
      >
        <Text className="text-center text-text-secondary font-inter text-body-sm">
          This will only take a few minutes
        </Text>
      </Animated.View>
    </View>
  );
}
