import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/register');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 gradient-primary items-center justify-center">
      {/* Background Pattern */}
      <View className="absolute inset-0 opacity-10">
        <View className="w-full h-full bg-white/10 rounded-full" style={{ transform: [{ scale: 2 }] }} />
      </View>
      
      {/* Main Content */}
      <View className="items-center justify-center flex-1">
        {/* Logo Container */}
        <View className="items-center mb-8">
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
        </View>

        {/* Loading Indicator */}
        <View className="items-center">
          <View className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full" />
          <Text className="text-body-lg text-white/80 font-inter mt-4">
            Loading your learning journey...
          </Text>
        </View>
      </View>

      {/* Bottom Branding */}
      <View className="absolute bottom-12 items-center">
        <Text className="text-body-md text-white/70 font-inter">
          Powered by AI • Personalized Learning
        </Text>
      </View>
    </View>
  );
}