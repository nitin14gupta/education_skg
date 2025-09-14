import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { useUser } from '../../context/UserContext';
// import { useToast } from '../../context/ToastContext';

const SUBJECTS = [
  { value: 'math', label: 'Mathematics', icon: '🔢', color: '#EF4444' },
  { value: 'science', label: 'Science', icon: '🔬', color: '#10B981' },
  { value: 'english', label: 'English', icon: '📚', color: '#3B82F6' },
  { value: 'social', label: 'Social Studies', icon: '🌍', color: '#8B5CF6' },
  { value: 'hindi', label: 'Hindi', icon: '🇮🇳', color: '#F59E0B' },
  { value: 'physics', label: 'Physics', icon: '⚛️', color: '#06B6D4' },
  { value: 'chemistry', label: 'Chemistry', icon: '🧪', color: '#EC4899' },
  { value: 'biology', label: 'Biology', icon: '🧬', color: '#84CC16' },
];

export default function AcademicHistoryScreen() {
  const router = useRouter();
  // const { updateProfile, updateOnboardingStep } = useUser();
  // const { showToast } = useToast();
  
  const [lastExamPercentage, setLastExamPercentage] = useState('');
  const [marksHistory, setMarksHistory] = useState<{[key: string]: string}>({});
  const [hasUploadedMarks, setHasUploadedMarks] = useState(false);

  const handleMarksChange = (subject: string, marks: string) => {
    setMarksHistory(prev => ({
      ...prev,
      [subject]: marks
    }));
  };

  const handleUploadMarks = () => {
    Alert.alert(
      'Upload Marks',
      'Choose how you want to upload your marks:',
      [
        { text: 'Take Photo', onPress: () => setHasUploadedMarks(true) },
        { text: 'Upload File', onPress: () => setHasUploadedMarks(true) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleContinue = async () => {
    if (!lastExamPercentage.trim()) {
      return;
    }

    const percentage = parseFloat(lastExamPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
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
              Academic History
            </Text>
            <Text className="text-body-lg text-white/90 font-inter text-center">
              Help us understand your academic background
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-6 -mt-4">
          <View className="card-lg">
            {/* Last Exam Percentage */}
            <View className="mb-6">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                What was your last exam percentage? 📊
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  value={lastExamPercentage}
                  onChangeText={setLastExamPercentage}
                  placeholder="85"
                  keyboardType="numeric"
                  className="input-field flex-1 mr-3"
                />
                <Text className="text-body-lg text-text-secondary font-inter">%</Text>
              </View>
            </View>

            {/* Marks History Upload */}
            <View className="mb-6">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                Upload your marks history (Optional) 📄
              </Text>
              
              <TouchableOpacity
                onPress={handleUploadMarks}
                className={`p-6 border-2 border-dashed rounded-xl items-center ${
                  hasUploadedMarks 
                    ? 'border-success-300 bg-success-50' 
                    : 'border-border-light bg-gray-50'
                }`}
              >
                {hasUploadedMarks ? (
                  <>
                    <Ionicons name="checkmark-circle" size={48} color="#10B981" />
                    <Text className="text-success-600 font-inter font-medium text-body-lg mt-2">
                      Marks uploaded successfully!
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="cloud-upload" size={48} color="#6B7280" />
                    <Text className="text-text-secondary font-inter font-medium text-body-lg mt-2">
                      Tap to upload marks sheet
                    </Text>
                    <Text className="text-text-secondary font-inter text-body-sm mt-1">
                      Photo or PDF file
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Subject-wise Marks Input */}
            <View className="mb-8">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                Enter recent marks by subject (Optional) 📝
              </Text>
              
              <View className="space-y-4">
                {SUBJECTS.slice(0, 6).map((subject) => (
                  <View key={subject.value} className="flex-row items-center">
                    <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: subject.color + '20' }}>
                      <Text className="text-lg">{subject.icon}</Text>
                    </View>
                    <Text className="text-body-lg text-text-primary font-inter flex-1">
                      {subject.label}
                    </Text>
                    <TextInput
                      value={marksHistory[subject.value] || ''}
                      onChangeText={(marks) => handleMarksChange(subject.value, marks)}
                      placeholder="85"
                      keyboardType="numeric"
                      className="w-20 h-10 border border-border-light rounded-lg text-center text-body-md font-inter"
                    />
                    <Text className="text-body-sm text-text-secondary font-inter ml-2">/100</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={!lastExamPercentage.trim()}
              className={`btn-primary mb-4 ${
                !lastExamPercentage.trim() ? 'opacity-50' : ''
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
            <View className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
