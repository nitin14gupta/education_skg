import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useGame } from '../../context/GameContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { profile } = useUser();
  const { stats } = useGame();
  const { isDark, setTheme } = useTheme();
  
  const [notifications, setNotifications] = useState(true);
  const [dataUsage, setDataUsage] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      id: 'achievements',
      title: 'Achievements',
      icon: 'trophy',
      color: '#F59E0B',
      badge: stats?.achievements?.length || 0,
    },
    {
      id: 'progress',
      title: 'Learning Progress',
      icon: 'trending-up',
      color: '#10B981',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      color: '#6B7280',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle',
      color: '#3B82F6',
    },
    {
      id: 'about',
      title: 'About EduAI',
      icon: 'information-circle',
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="gradient-primary px-6 pt-16 pb-8">
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-card-lg">
            <Text className="text-3xl font-fredoka text-primary-500">
              {profile?.name?.charAt(0) || user?.name?.charAt(0) || 'S'}
            </Text>
          </View>
          
          <Text className="text-h1 text-white font-fredoka text-center mb-2">
            {profile?.name || user?.name || 'Student'}
          </Text>
          <Text className="text-body-lg text-white/90 font-inter text-center mb-4">
            {profile?.grade ? `Class ${profile.grade}` : 'Student'} • {profile?.board || 'CBSE'}
          </Text>
          
          {/* Level Badge */}
          <View className="flex-row items-center bg-white/20 rounded-full px-4 py-2">
            <Ionicons name="star" size={16} color="white" />
            <Text className="text-white font-inter font-semibold ml-2">
              Level {stats?.level?.level || 1} • {stats?.level?.title || 'Rookie Learner'}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-6 -mt-4 mb-6">
        <View className="flex-row space-x-4">
          <View className="flex-1 card items-center py-4">
            <Text className="text-h2 font-space font-bold text-text-primary">
              {stats?.totalXP || 0}
            </Text>
            <Text className="text-body-sm text-text-secondary font-inter">
              Total XP
            </Text>
          </View>
          <View className="flex-1 card items-center py-4">
            <Text className="text-h2 font-space font-bold text-text-primary">
              {stats?.streak?.current || 0}
            </Text>
            <Text className="text-body-sm text-text-secondary font-inter">
              Day Streak
            </Text>
          </View>
          <View className="flex-1 card items-center py-4">
            <Text className="text-h2 font-space font-bold text-text-primary">
              {stats?.badges?.length || 0}
            </Text>
            <Text className="text-body-sm text-text-secondary font-inter">
              Badges
            </Text>
          </View>
        </View>
      </View>

      {/* Profile Information */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Profile Information
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-body-lg text-text-secondary font-inter">
                School
              </Text>
              <Text className="text-body-lg text-text-primary font-inter">
                {profile?.school || 'Not specified'}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-body-lg text-text-secondary font-inter">
                Board
              </Text>
              <Text className="text-body-lg text-text-primary font-inter">
                {profile?.board || 'Not specified'}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-body-lg text-text-secondary font-inter">
                Last Exam %
              </Text>
              <Text className="text-body-lg text-text-primary font-inter">
                {profile?.lastExamPercentage || 0}%
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Settings
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-body-lg text-text-primary font-inter">
                  Dark Mode
                </Text>
                <Text className="text-body-sm text-text-secondary font-inter">
                  Switch to dark theme
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-body-lg text-text-primary font-inter">
                  Notifications
                </Text>
                <Text className="text-body-sm text-text-secondary font-inter">
                  Study reminders and updates
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-body-lg text-text-primary font-inter">
                Data Usage
                </Text>
                <Text className="text-body-sm text-text-secondary font-inter">
                  Allow data for personalized content
                </Text>
              </View>
              <Switch
                value={dataUsage}
                onValueChange={setDataUsage}
                trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                thumbColor={dataUsage ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-6 mb-6">
        <View className="card">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center py-4 border-b border-border-light last:border-b-0"
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: item.color + '20' }}
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              
              <View className="flex-1">
                <Text className="text-body-lg text-text-primary font-inter">
                  {item.title}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                {item.badge && item.badge > 0 && (
                  <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center mr-2">
                    <Text className="text-white text-xs font-inter font-bold">
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <View className="px-6 mb-8">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center py-4 bg-error-50 border border-error-200 rounded-xl"
        >
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text className="text-error-600 font-inter font-semibold ml-2">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
