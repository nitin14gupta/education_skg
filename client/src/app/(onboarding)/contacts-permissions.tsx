import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { useUser } from '../../context/UserContext';
// import { useToast } from '../../context/ToastContext';

const PROFESSIONS = [
  'Teacher', 'Engineer', 'Doctor', 'Business Owner', 'Government Employee',
  'Private Employee', 'Farmer', 'Self Employed', 'Homemaker', 'Other'
];

const EDUCATION_LEVELS = [
  'Primary School', 'High School', 'Diploma', 'Bachelor\'s Degree',
  'Master\'s Degree', 'PhD', 'Other'
];

export default function ContactsPermissionsScreen() {
  const router = useRouter();
  // const { updateProfile, updateOnboardingStep } = useUser();
  // const { showToast } = useToast();
  
  const [classTeacher, setClassTeacher] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [parent, setParent] = useState({
    name: '',
    phone: '',
    profession: '',
    education: '',
  });
  const [permissions, setPermissions] = useState({
    dataUsage: false,
    messaging: false,
    notifications: true,
  });

  const handleContinue = async () => {
    if (!classTeacher.name.trim() || !classTeacher.phone.trim() || 
        !parent.name.trim() || !parent.phone.trim() || 
        !parent.profession || !parent.education) {
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
              Contacts & Permissions
            </Text>
            <Text className="text-body-lg text-white/90 font-inter text-center">
              Help us connect with your support network
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View className="px-6 -mt-4">
          <View className="card-lg">
            {/* Class Teacher Section */}
            <View className="mb-8">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                Class Teacher Information 👨‍🏫
              </Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Teacher's Name *
                  </Text>
                  <TextInput
                    value={classTeacher.name}
                    onChangeText={(text) => setClassTeacher(prev => ({ ...prev, name: text }))}
                    placeholder="Enter teacher's name"
                    className="input-field"
                    autoCapitalize="words"
                  />
                </View>

                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Phone Number *
                  </Text>
                  <TextInput
                    value={classTeacher.phone}
                    onChangeText={(text) => setClassTeacher(prev => ({ ...prev, phone: text }))}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    className="input-field"
                  />
                </View>

                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Email (Optional)
                  </Text>
                  <TextInput
                    value={classTeacher.email}
                    onChangeText={(text) => setClassTeacher(prev => ({ ...prev, email: text }))}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="input-field"
                  />
                </View>
              </View>
            </View>

            {/* Parent Information */}
            <View className="mb-8">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                Parent/Guardian Information 👨‍👩‍👧‍👦
              </Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Parent's Name *
                  </Text>
                  <TextInput
                    value={parent.name}
                    onChangeText={(text) => setParent(prev => ({ ...prev, name: text }))}
                    placeholder="Enter parent's name"
                    className="input-field"
                    autoCapitalize="words"
                  />
                </View>

                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Phone Number *
                  </Text>
                  <TextInput
                    value={parent.phone}
                    onChangeText={(text) => setParent(prev => ({ ...prev, phone: text }))}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    className="input-field"
                  />
                </View>

                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Profession *
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {PROFESSIONS.map((profession) => (
                      <TouchableOpacity
                        key={profession}
                        onPress={() => setParent(prev => ({ ...prev, profession }))}
                        className={`px-3 py-2 rounded-lg border ${
                          parent.profession === profession
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-border-light bg-white'
                        }`}
                      >
                        <Text className={`text-body-sm font-inter ${
                          parent.profession === profession
                            ? 'text-primary-600'
                            : 'text-text-primary'
                        }`}>
                          {profession}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-body-md font-inter font-medium text-text-primary mb-2">
                    Education Level *
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {EDUCATION_LEVELS.map((education) => (
                      <TouchableOpacity
                        key={education}
                        onPress={() => setParent(prev => ({ ...prev, education }))}
                        className={`px-3 py-2 rounded-lg border ${
                          parent.education === education
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-border-light bg-white'
                        }`}
                      >
                        <Text className={`text-body-sm font-inter ${
                          parent.education === education
                            ? 'text-primary-600'
                            : 'text-text-primary'
                        }`}>
                          {education}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Permissions Section */}
            <View className="mb-8">
              <Text className="text-h3 text-text-primary font-inter font-semibold mb-4">
                App Permissions 🔐
              </Text>
              
              <View className="space-y-4">
                <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <View className="flex-1">
                    <Text className="text-body-lg font-inter font-medium text-text-primary">
                      Push Notifications
                    </Text>
                    <Text className="text-body-sm text-text-secondary font-inter">
                      Get study reminders and updates
                    </Text>
                  </View>
                  <Switch
                    value={permissions.notifications}
                    onValueChange={(value) => setPermissions(prev => ({ ...prev, notifications: value }))}
                    trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                    thumbColor={permissions.notifications ? '#FFFFFF' : '#FFFFFF'}
                  />
                </View>

                <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <View className="flex-1">
                    <Text className="text-body-lg font-inter font-medium text-text-primary">
                      Data Usage
                    </Text>
                    <Text className="text-body-sm text-text-secondary font-inter">
                      Allow app to use data for personalized content
                    </Text>
                  </View>
                  <Switch
                    value={permissions.dataUsage}
                    onValueChange={(value) => setPermissions(prev => ({ ...prev, dataUsage: value }))}
                    trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                    thumbColor={permissions.dataUsage ? '#FFFFFF' : '#FFFFFF'}
                  />
                </View>

                <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <View className="flex-1">
                    <Text className="text-body-lg font-inter font-medium text-text-primary">
                      Messaging
                    </Text>
                    <Text className="text-body-sm text-text-secondary font-inter">
                      Allow teachers to send messages
                    </Text>
                  </View>
                  <Switch
                    value={permissions.messaging}
                    onValueChange={(value) => setPermissions(prev => ({ ...prev, messaging: value }))}
                    trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                    thumbColor={permissions.messaging ? '#FFFFFF' : '#FFFFFF'}
                  />
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={!classTeacher.name.trim() || !classTeacher.phone.trim() || 
                       !parent.name.trim() || !parent.phone.trim() || 
                       !parent.profession || !parent.education}
              className={`btn-primary mb-4 ${
                !classTeacher.name.trim() || !classTeacher.phone.trim() || 
                !parent.name.trim() || !parent.phone.trim() || 
                !parent.profession || !parent.education ? 'opacity-50' : ''
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
    </KeyboardAvoidingView>
  );
}
