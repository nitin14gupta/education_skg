import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function OTPScreen() {
  const router = useRouter();
  const { verifyOTP, resendOTP, isLoading, otpError } = useAuth();
  const { showToast } = useToast();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const otpCodeToVerify = otpCode || otp.join('');
    
    if (otpCodeToVerify.length !== 6) {
      showToast({
        type: 'error',
        title: 'Invalid OTP',
        message: 'Please enter all 6 digits',
      });
      return;
    }

    try {
      await verifyOTP(otpCodeToVerify);
      showToast({
        type: 'success',
        title: 'Verification Successful!',
        message: 'Welcome to EduAI',
      });
      router.replace('/(onboarding)/welcome');
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP();
      setResendTimer(30);
      setCanResend(false);
      showToast({
        type: 'success',
        title: 'OTP Sent',
        message: 'A new OTP has been sent to your number',
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Resend Failed',
        message: 'Please try again later',
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="gradient-primary px-6 pt-16 pb-12">
        <View className="items-center">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0 top-16 p-2"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Icon */}
          <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="shield-checkmark" size={32} color="white" />
          </View>
          
          <Text className="text-h1 text-white font-fredoka text-center mb-2">
            Verify Your Number
          </Text>
          <Text className="text-body-lg text-white/90 font-inter text-center px-4">
            We've sent a 6-digit code to your phone number
          </Text>
        </View>
      </View>

      {/* Form Container */}
      <View className="px-6 -mt-6 flex-1">
        <View className="card-lg flex-1">
          {/* OTP Input Fields */}
          <View className="mb-8">
            <Text className="text-body-md font-inter font-medium text-text-primary mb-6 text-center">
              Enter the verification code
            </Text>
            
            <View className="flex-row justify-center space-x-3">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  className="w-12 h-14 border-2 border-border-light rounded-xl text-center text-h2 font-space text-text-primary focus:border-primary-500"
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Error Message */}
            {otpError && (
              <View className="mt-4 p-3 bg-error-50 border border-error-200 rounded-xl">
                <Text className="text-center text-error-600 font-inter text-body-sm">
                  {otpError}
                </Text>
              </View>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={() => handleVerifyOTP()}
            disabled={isLoading || otp.some(digit => !digit)}
            className={`btn-primary mb-6 ${isLoading || otp.some(digit => !digit) ? 'opacity-50' : ''}`}
          >
            <Text className="text-center text-white font-inter font-semibold text-body-lg">
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
          </TouchableOpacity>

          {/* Resend Section */}
          <View className="items-center">
            {canResend ? (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text className="text-primary-500 font-inter font-medium text-body-lg">
                  Resend OTP
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="items-center">
                <Text className="text-text-secondary font-inter text-body-md">
                  Resend code in {resendTimer}s
                </Text>
                <Text className="text-text-secondary font-inter text-body-sm mt-1">
                  Didn't receive the code? Check your SMS
                </Text>
              </View>
            )}
          </View>

          {/* Help Section */}
          <View className="mt-8 p-4 bg-gray-50 rounded-xl">
            <Text className="text-center text-text-secondary font-inter text-body-sm leading-5">
              Having trouble?{' '}
              <Text className="text-primary-500 font-medium">Contact Support</Text>
              {' '}or try{' '}
              <Text className="text-primary-500 font-medium">voice call</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
