import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

const ASSETS = [
  { id: 'bike', label: 'Bicycle', icon: '🚲', description: 'I have a bicycle' },
  { id: 'car', label: 'Car', icon: '🚗', description: 'My family has a car' },
  { id: 'fridge', label: 'Refrigerator', icon: '❄️', description: 'We have a refrigerator' },
  { id: 'ac', label: 'Air Conditioner', icon: '❄️', description: 'We have AC at home' },
];

const STUDY_ENVIRONMENTS = [
  { id: 'quiet', label: 'Quiet', icon: '🤫', description: 'Peaceful and quiet place' },
  { id: 'noisy', label: 'Noisy', icon: '🔊', description: 'Some background noise' },
  { id: 'mixed', label: 'Mixed', icon: '🎵', description: 'Sometimes quiet, sometimes noisy' },
];

const INTERNET_QUALITIES = [
  { id: 'excellent', label: 'Excellent', icon: '🚀', description: 'Very fast, no issues' },
  { id: 'good', label: 'Good', icon: '✅', description: 'Generally works well' },
  { id: 'fair', label: 'Fair', icon: '⚠️', description: 'Sometimes slow' },
  { id: 'poor', label: 'Poor', icon: '🐌', description: 'Often slow or disconnected' },
];

export default function BackgroundAssessmentScreen() {
  const router = useRouter();
  const { updateProfile, updateOnboardingStep } = useUser();
  const { showToast } = useToast();
  
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [studyEnvironment, setStudyEnvironment] = useState<string | null>(null);
  const [internetQuality, setInternetQuality] = useState<string | null>(null);

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleContinue = async () => {
    if (!studyEnvironment || !internetQuality) {
      showToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please select your study environment and internet quality',
      });
      return;
    }

    try {
      await updateProfile({
        economicBackground: {
          hasBike: selectedAssets.includes('bike'),
          hasCar: selectedAssets.includes('car'),
          hasFridge: selectedAssets.includes('fridge'),
          hasAC: selectedAssets.includes('ac'),
          studyEnvironment: studyEnvironment as 'quiet' | 'noisy' | 'mixed',
          internetQuality: internetQuality as 'excellent' | 'good' | 'fair' | 'poor',
        },
      });
      
      await updateOnboardingStep(3);
      router.push('/(onboarding)/contacts-permissions');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to save information. Please try again.',
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="gradient-primary px-6 pt-16 pb-8">
        <View className="items-center">
          <Text className="text-h1 text-white font-fredoka text-center mb-2">
            Background Assessment
          </Text>
          <Text className="text-body-lg text-white/90 font-inter text-center">
            Help us understand your study environment
          </Text>
        </View>
      </View>

      {/* Form Container */}
      <View className="px-6 -mt-4">
        <View className="card-lg">
          {/* Assets Section */}
          <View className="mb-8">
            <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
              What do you have at home? 🏠
            </Text>
            <Text className="text-body-md text-text-secondary font-inter mb-6">
              Select all that apply (this helps us personalize your experience)
            </Text>
            
            <View className="space-y-3">
              {ASSETS.map((asset) => (
                <TouchableOpacity
                  key={asset.id}
                  onPress={() => toggleAsset(asset.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    selectedAssets.includes(asset.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border-light bg-white'
                  }`}
                >
                  <Text className="text-2xl mr-4">{asset.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-inter font-medium text-body-lg ${
                      selectedAssets.includes(asset.id)
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {asset.label}
                    </Text>
                    <Text className={`font-inter text-body-sm ${
                      selectedAssets.includes(asset.id)
                        ? 'text-primary-500'
                        : 'text-text-secondary'
                    }`}>
                      {asset.description}
                    </Text>
                  </View>
                  {selectedAssets.includes(asset.id) && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color="#4F46E5" 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Study Environment */}
          <View className="mb-8">
            <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
              How is your study environment? 📚
            </Text>
            
            <View className="space-y-3">
              {STUDY_ENVIRONMENTS.map((env) => (
                <TouchableOpacity
                  key={env.id}
                  onPress={() => setStudyEnvironment(env.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    studyEnvironment === env.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border-light bg-white'
                  }`}
                >
                  <Text className="text-2xl mr-4">{env.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-inter font-medium text-body-lg ${
                      studyEnvironment === env.id
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {env.label}
                    </Text>
                    <Text className={`font-inter text-body-sm ${
                      studyEnvironment === env.id
                        ? 'text-primary-500'
                        : 'text-text-secondary'
                    }`}>
                      {env.description}
                    </Text>
                  </View>
                  {studyEnvironment === env.id && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color="#4F46E5" 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Internet Quality */}
          <View className="mb-8">
            <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
              How is your internet connection? 🌐
            </Text>
            
            <View className="space-y-3">
              {INTERNET_QUALITIES.map((quality) => (
                <TouchableOpacity
                  key={quality.id}
                  onPress={() => setInternetQuality(quality.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    internetQuality === quality.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border-light bg-white'
                  }`}
                >
                  <Text className="text-2xl mr-4">{quality.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-inter font-medium text-body-lg ${
                      internetQuality === quality.id
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {quality.label}
                    </Text>
                    <Text className={`font-inter text-body-sm ${
                      internetQuality === quality.id
                        ? 'text-primary-500'
                        : 'text-text-secondary'
                    }`}>
                      {quality.description}
                    </Text>
                  </View>
                  {internetQuality === quality.id && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color="#4F46E5" 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!studyEnvironment || !internetQuality}
            className={`btn-primary mb-4 ${
              !studyEnvironment || !internetQuality ? 'opacity-50' : ''
            }`}
          >
            <Text className="text-center text-white font-inter font-semibold text-body-lg">
              Continue
            </Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="btn-outline"
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
          <View className="w-2 h-2 bg-gray-300 rounded-full" />
        </View>
      </View>
    </ScrollView>
  );
}
