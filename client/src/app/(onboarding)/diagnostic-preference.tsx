import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { useUser } from '../../context/UserContext';
// import { useToast } from '../../context/ToastContext';

const DIAGNOSTIC_OPTIONS = [
  {
    id: 'quick',
    title: 'Quick Diagnostic',
    duration: '10 minutes',
    icon: '⚡',
    description: 'Fast assessment to get you started quickly',
    benefits: [
      'Get started immediately',
      'Basic learning style detection',
      'Quick recommendations',
      'Perfect for busy schedules'
    ],
    color: '#10B981'
  },
  {
    id: 'full',
    title: 'Comprehensive Diagnostic',
    duration: '30 minutes',
    icon: '🔍',
    description: 'Detailed assessment for personalized learning',
    benefits: [
      'Complete learning profile',
      'Detailed strength analysis',
      'Personalized study plan',
      'Advanced recommendations'
    ],
    color: '#4F46E5'
  }
];

export default function DiagnosticPreferenceScreen() {
  const router = useRouter();
  // const { completeOnboarding, updateProfile } = useUser();
  // const { showToast } = useToast();
  
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (!selectedDiagnostic) {
      return;
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="gradient-primary px-6 pt-16 pb-8">
        <View className="items-center">
          <Text className="text-h1 text-white font-fredoka text-center mb-2">
            Almost There! 🎯
          </Text>
          <Text className="text-body-lg text-white/90 font-inter text-center">
            Choose your diagnostic preference
          </Text>
        </View>
      </View>

      {/* Form Container */}
      <View className="px-6 -mt-4">
        <View className="card-lg">
          <Text className="text-h3 text-text-primary font-inter font-semibold mb-6 text-center">
            How would you like to start? 🚀
          </Text>

          {/* Diagnostic Options */}
          <View className="space-y-4 mb-8">
            {DIAGNOSTIC_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedDiagnostic(option.id)}
                className={`p-6 rounded-2xl border-2 ${
                  selectedDiagnostic === option.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border-light bg-white'
                }`}
              >
                <View className="flex-row items-start mb-4">
                  <View 
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                    style={{ backgroundColor: option.color + '20' }}
                  >
                    <Text className="text-2xl">{option.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className={`text-h3 font-inter font-semibold mb-1 ${
                      selectedDiagnostic === option.id
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {option.title}
                    </Text>
                    <Text className="text-body-md text-text-secondary font-inter">
                      {option.duration} • {option.description}
                    </Text>
                  </View>
                  {selectedDiagnostic === option.id && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color="#4F46E5" 
                    />
                  )}
                </View>

                <View className="ml-16">
                  <Text className="text-body-sm text-text-secondary font-inter mb-2">
                    Benefits:
                  </Text>
                  {option.benefits.map((benefit, index) => (
                    <View key={index} className="flex-row items-center mb-1">
                      <Ionicons 
                        name="checkmark" 
                        size={16} 
                        color={option.color} 
                        className="mr-2"
                      />
                      <Text className="text-body-sm text-text-secondary font-inter">
                        {benefit}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Box */}
          <View className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-8">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#3B82F6" className="mr-3 mt-0.5" />
              <View className="flex-1">
                <Text className="text-body-sm text-blue-800 font-inter">
                  <Text className="font-semibold">Note:</Text> You can always change your diagnostic preference later in settings. 
                  The comprehensive diagnostic provides more detailed insights but takes longer to complete.
                </Text>
              </View>
            </View>
          </View>

          {/* Complete Button */}
          <TouchableOpacity
            onPress={handleComplete}
            disabled={!selectedDiagnostic || isCompleting}
            className={`btn-primary mb-4 ${
              !selectedDiagnostic || isCompleting ? 'opacity-50' : ''
            }`}
          >
            <Text className="text-center text-white font-inter font-semibold text-body-lg">
              {isCompleting ? 'Setting up your account...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={isCompleting}
            className={`btn-outline ${isCompleting ? 'opacity-50' : ''}`}
          >
            <Text className="text-center text-primary-500 font-inter font-semibold text-body-lg">
              Back
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View className="flex-row justify-center items-center mt-6">
          <View className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
          <View className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
          <View className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
          <View className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
          <View className="w-2 h-2 bg-primary-500 rounded-full" />
        </View>

        {/* Completion Message */}
        <View className="mt-6 p-4 bg-success-50 border border-success-200 rounded-xl">
          <Text className="text-center text-success-800 font-inter text-body-sm">
            🎉 You're all set! Get ready for an amazing learning experience with EduAI.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
