import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    // Navigate to onboarding
    router.push('/(onboarding)/welcome');
  };

  const handleLogin = () => {
    // Navigate to login
    router.push('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="gradient-primary px-6 pt-16 pb-12">
          <View className="items-center">
            {/* Logo */}
            <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center mb-6 shadow-card-lg">
              <Text className="text-3xl">🎓</Text>
            </View>
            
            {/* App Name */}
            <Text className="text-h1 text-white font-fredoka text-center mb-2">
              Create Account
            </Text>
            <Text className="text-body-lg text-white/90 font-inter text-center">
              Join thousands of students learning with EduAI
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-6 -mt-6">
          <View className="card-lg">
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Full Name
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Enter your full name"
                className="input-field"
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Email Address
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="input-field"
              />
            </View>

            {/* Phone Input */}
            <View className="mb-4">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Phone Number
              </Text>
              <TextInput
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="input-field"
              />
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Password
              </Text>
              <TextInput
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="Create a password"
                secureTextEntry
                className="input-field"
              />
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Confirm Password
              </Text>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                placeholder="Confirm your password"
                secureTextEntry
                className="input-field"
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              className="btn-primary mb-4"
            >
              <Text className="text-center text-white font-inter font-semibold text-body-lg">
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-border-light" />
              <Text className="mx-4 text-body-md text-text-secondary font-inter">or</Text>
              <View className="flex-1 h-px bg-border-light" />
            </View>

            {/* Login Link */}
            <View className="items-center">
              <Text className="text-body-md text-text-secondary font-inter">
                Already have an account?{' '}
                <TouchableOpacity onPress={handleLogin}>
                  <Text className="text-primary-500 font-inter font-semibold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>

          {/* Terms */}
          <View className="mt-8 px-4">
            <Text className="text-center text-body-sm text-text-secondary font-inter leading-5">
              By creating an account, you agree to our{' '}
              <Text className="text-primary-500 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary-500 font-medium">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}