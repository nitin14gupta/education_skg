import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(true);

  const handleLogin = async () => {
    if (!emailOrPhone.trim()) {
      showToast({
        type: 'error',
        title: 'Required Field',
        message: 'Please enter your email or phone number',
      });
      return;
    }

    try {
      await login(emailOrPhone.trim(), password);
      router.push('/(auth)/otp');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: 'Please check your credentials and try again',
      });
    }
  };

  const handleSSOLogin = (provider: 'google' | 'apple') => {
    showToast({
      type: 'info',
      title: 'Coming Soon',
      message: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be available soon`,
    });
  };

  const toggleInputMode = () => {
    setIsEmailMode(!isEmailMode);
    setEmailOrPhone('');
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
              Welcome to EduAI
            </Text>
            <Text className="text-body-lg text-white/90 font-inter text-center">
              Your personalized learning journey starts here
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-6 -mt-6">
          <View className="card-lg">
            {/* Input Mode Toggle */}
            <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
              <TouchableOpacity
                onPress={() => setIsEmailMode(true)}
                className={`flex-1 py-3 rounded-lg ${isEmailMode ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`text-center font-inter font-medium ${isEmailMode ? 'text-primary-500' : 'text-gray-600'}`}>
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEmailMode(false)}
                className={`flex-1 py-3 rounded-lg ${!isEmailMode ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`text-center font-inter font-medium ${!isEmailMode ? 'text-primary-500' : 'text-gray-600'}`}>
                  Phone
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email/Phone Input */}
            <View className="mb-4">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                {isEmailMode ? 'Email Address' : 'Phone Number'}
              </Text>
              <View className="relative">
                <TextInput
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  placeholder={isEmailMode ? 'Enter your email' : 'Enter your phone number'}
                  keyboardType={isEmailMode ? 'email-address' : 'phone-pad'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="input-field pr-12"
                />
                <TouchableOpacity
                  onPress={toggleInputMode}
                  className="absolute right-3 top-3"
                >
                  <Ionicons 
                    name={isEmailMode ? 'call-outline' : 'mail-outline'} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Input (Optional for OTP flow) */}
            <View className="mb-6">
              <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                Password (Optional)
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!isPasswordVisible}
                  className="input-field pr-12"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons 
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`btn-primary mb-6 ${isLoading ? 'opacity-50' : ''}`}
            >
              <Text className="text-center text-white font-inter font-semibold text-body-lg">
                {isLoading ? 'Sending OTP...' : 'Continue'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-border-light" />
              <Text className="mx-4 text-body-md text-text-secondary font-inter">or</Text>
              <View className="flex-1 h-px bg-border-light" />
            </View>

            {/* SSO Buttons */}
            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => handleSSOLogin('google')}
                className="flex-row items-center justify-center py-4 border border-border-light rounded-xl bg-white"
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text className="ml-3 text-body-lg font-inter font-medium text-text-primary">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSSOLogin('apple')}
                className="flex-row items-center justify-center py-4 border border-border-light rounded-xl bg-black"
              >
                <Ionicons name="logo-apple" size={20} color="white" />
                <Text className="ml-3 text-body-lg font-inter font-medium text-white">
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Legal Links */}
          <View className="mt-8 px-4">
            <Text className="text-center text-body-sm text-text-secondary font-inter leading-5">
              By continuing, you agree to our{' '}
              <Text className="text-primary-500 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary-500 font-medium">Privacy Policy</Text>
            </Text>
            
            {/* Guardian Notice */}
            <View className="mt-4 p-4 bg-warning-50 border border-warning-200 rounded-xl">
              <Text className="text-center text-body-sm text-warning-800 font-inter">
                <Text className="font-semibold">Guardian Notice:</Text> Users under 16 require parental consent to create an account.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
