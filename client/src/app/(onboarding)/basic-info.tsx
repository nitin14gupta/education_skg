import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { useUser } from '../../context/UserContext';
// import { useToast } from '../../context/ToastContext';

const GRADES = [
  { value: 3, label: 'Class 3' },
  { value: 4, label: 'Class 4' },
  { value: 5, label: 'Class 5' },
  { value: 6, label: 'Class 6' },
  { value: 7, label: 'Class 7' },
  { value: 8, label: 'Class 8' },
  { value: 9, label: 'Class 9' },
  { value: 10, label: 'Class 10' },
  { value: 11, label: 'Class 11' },
  { value: 12, label: 'Class 12' },
];

const BOARDS = [
  { value: 'cbse', label: 'CBSE', icon: '🏛️' },
  { value: 'icse', label: 'ICSE', icon: '📚' },
  { value: 'state', label: 'State Board', icon: '🏫' },
  { value: 'ib', label: 'IB', icon: '🌍' },
  { value: 'igcse', label: 'IGCSE', icon: '🎓' },
];

export default function BasicInfoScreen() {
  const router = useRouter();
  // const { updateProfile, updateOnboardingStep } = useUser();
  // const { showToast } = useToast();
  
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState('');

  const handleContinue = async () => {
    if (!selectedGrade || !selectedBoard || !schoolName.trim()) {
      return;
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="gradient-primary px-6 pt-16 pb-8">
          <View className="items-center">
            <Text className="text-h1 text-white font-fredoka text-center mb-2">
              Tell us about yourself
            </Text>
            <Text className="text-body-lg text-white/90 font-inter text-center">
              Help us personalize your learning experience
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-6 -mt-4">
          <View className="card-lg">
            {/* Grade Selection */}
            <View className="mb-6">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                What grade are you in? 📚
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {GRADES.map((grade) => (
                  <TouchableOpacity
                    key={grade.value}
                    onPress={() => setSelectedGrade(grade.value)}
                    className={`px-4 py-3 rounded-xl border-2 ${
                      selectedGrade === grade.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-border-light bg-white'
                    }`}
                  >
                    <Text className={`font-inter font-medium ${
                      selectedGrade === grade.value
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {grade.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Board Selection */}
            <View className="mb-6">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                Which board do you follow? 🏫
              </Text>
              <View className="space-y-3">
                {BOARDS.map((board) => (
                  <TouchableOpacity
                    key={board.value}
                    onPress={() => setSelectedBoard(board.value)}
                    className={`flex-row items-center p-4 rounded-xl border-2 ${
                      selectedBoard === board.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-border-light bg-white'
                    }`}
                  >
                    <Text className="text-2xl mr-4">{board.icon}</Text>
                    <Text className={`font-inter font-medium text-body-lg ${
                      selectedBoard === board.value
                        ? 'text-primary-600'
                        : 'text-text-primary'
                    }`}>
                      {board.label}
                    </Text>
                    {selectedBoard === board.value && (
                      <Ionicons 
                        name="checkmark-circle" 
                        size={24} 
                        color="#4F46E5" 
                        className="ml-auto"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* School Name */}
            <View className="mb-8">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                What's your school name? 🏫
              </Text>
              <TextInput
                value={schoolName}
                onChangeText={setSchoolName}
                placeholder="Enter your school name"
                className="input-field"
                autoCapitalize="words"
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={!selectedGrade || !selectedBoard || !schoolName.trim()}
              className={`btn-primary mb-4 ${
                !selectedGrade || !selectedBoard || !schoolName.trim() ? 'opacity-50' : ''
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
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
