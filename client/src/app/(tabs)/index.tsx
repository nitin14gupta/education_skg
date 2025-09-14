import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../../context/AuthContext';
// import { useUser } from '../../context/UserContext';
// import { useGame } from '../../context/GameContext';

export default function HomeScreen() {
  // const { user } = useAuth();
  // const { profile } = useUser();
  // const { stats } = useGame();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('today');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const todayTasks = [
    { id: 1, subject: 'Mathematics', type: 'video', title: 'Algebra Basics', duration: '15 min', xp: 50, completed: false },
    { id: 2, subject: 'Science', type: 'quiz', title: 'Physics Quiz', duration: '10 min', xp: 30, completed: true },
    { id: 3, subject: 'English', type: 'notes', title: 'Grammar Review', duration: '20 min', xp: 40, completed: false },
  ];

  const learningObjectives = [
    'Master quadratic equations',
    'Understand photosynthesis process',
    'Improve essay writing skills',
  ];

  const performanceInsights = {
    positive: ['Consistent daily study', 'High quiz accuracy', 'Active participation'],
    negative: ['Math problem solving', 'Time management', 'Focus during videos'],
  };

  const recommendations = [
    { id: 1, subject: 'Mathematics', title: 'Advanced Algebra', difficulty: 'Medium', thumbnail: '📐' },
    { id: 2, subject: 'Science', title: 'Chemistry Lab', difficulty: 'Hard', thumbnail: '🧪' },
    { id: 3, subject: 'English', title: 'Creative Writing', difficulty: 'Easy', thumbnail: '✍️' },
  ];

  return (
    <ScrollView 
      className="flex-1 bg-background"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      {/* H1: Top Bar */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border-light">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-primary-500 rounded-full items-center justify-center mr-3">
            <Text className="text-white font-inter font-semibold text-body-lg">
              {'S'}
            </Text>
          </View>
          <View>
            <Text className="text-body-lg font-inter font-semibold text-text-primary">
              Welcome back!
            </Text>
            <Text className="text-body-sm text-text-secondary">
              {'Student'}
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity className="relative">
            <Ionicons name="notifications" size={24} color="#6B7280" />
            <View className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-inter font-bold">3</Text>
            </View>
          </TouchableOpacity>
          
          <View className="px-3 py-1 bg-gold rounded-full">
            <Text className="text-white text-body-sm font-inter font-semibold">
              Rank  1
            </Text>
          </View>
        </View>
      </View>

      {/* H2: Date Picker */}
      <View className="px-6 py-4">
        <View className="flex-row space-x-3">
          {['yesterday', 'today', 'tomorrow'].map((date) => (
            <TouchableOpacity
              key={date}
              onPress={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-xl ${
                selectedDate === date 
                  ? 'bg-primary-500' 
                  : 'bg-gray-100'
              }`}
            >
              <Text className={`font-inter font-medium capitalize ${
                selectedDate === date 
                  ? 'text-white' 
                  : 'text-text-primary'
              }`}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* H3: Today's Plan Card */}
      <View className="px-6 mb-6">
        <View className="card-lg">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-h2 font-inter font-semibold text-text-primary">
              Today's Plan
            </Text>
            <Text className="text-body-sm text-text-secondary font-inter">
              1/3 completed
            </Text>
          </View>
          
          <View className="space-y-3">
            {todayTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                className={`flex-row items-center p-3 rounded-xl ${
                  task.completed ? 'bg-success-50' : 'bg-gray-50'
                }`}
              >
                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
                  task.completed ? 'bg-success-500' : 'bg-gray-300'
                }`}>
                  {task.completed && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                
                <View className="flex-1">
                  <Text className="text-body-lg font-inter font-medium text-text-primary">
                    {task.title}
                  </Text>
                  <Text className="text-body-sm text-text-secondary">
                    {task.subject} • {task.duration} • {task.xp} XP
                  </Text>
                </View>
                
                <View className="items-end">
                  <Text className="text-body-sm text-text-secondary">
                    {task.type}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* H4: Learning Objectives */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Today's Learning Objectives
          </Text>
          <View className="space-y-3">
            {learningObjectives.map((objective, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                <Text className="text-body-lg text-text-primary font-inter flex-1">
                  {objective}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* H5: Performance Insight */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Performance Insight
          </Text>
          
          <View className="space-y-4">
            <View className="p-4 bg-success-50 rounded-xl">
              <Text className="text-success-800 font-inter font-semibold mb-2">
                ✅ What's helping you:
              </Text>
              {performanceInsights.positive.map((item, index) => (
                <Text key={index} className="text-success-700 text-body-sm font-inter">
                  • {item}
                </Text>
              ))}
            </View>
            
            <View className="p-4 bg-error-50 rounded-xl">
              <Text className="text-error-800 font-inter font-semibold mb-2">
                ⚠️ Areas to improve:
              </Text>
              {performanceInsights.negative.map((item, index) => (
                <Text key={index} className="text-error-700 text-body-sm font-inter">
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* H6: Learning Pattern */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Your Learning Style
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="items-center">
              <Text className="text-3xl mb-2">👁️</Text>
              <Text className="text-body-sm text-text-secondary font-inter">Visual</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl mb-2">👂</Text>
              <Text className="text-body-sm text-text-secondary font-inter">Auditory</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl mb-2">✋</Text>
              <Text className="text-body-sm text-text-secondary font-inter">Kinesthetic</Text>
            </View>
          </View>
          <Text className="text-body-sm text-text-secondary font-inter text-center mt-4">
            We've detected you learn best through visual content. Try more diagrams and charts!
          </Text>
        </View>
      </View>

      {/* H7: Top Lessons */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Recommended for You
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-4">
              {recommendations.map((item) => (
                <TouchableOpacity key={item.id} className="w-48 p-4 bg-gray-50 rounded-xl">
                  <Text className="text-4xl mb-2">{item.thumbnail}</Text>
                  <Text className="text-body-lg font-inter font-semibold text-text-primary mb-1">
                    {item.title}
                  </Text>
                  <Text className="text-body-sm text-text-secondary font-inter mb-2">
                    {item.subject}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-body-sm text-text-secondary">
                      {item.difficulty}
                    </Text>
                    <Ionicons name="play-circle" size={20} color="#4F46E5" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* H8: Score Analysis */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Recent Performance
          </Text>
          <View className="h-32 bg-gray-100 rounded-xl items-center justify-center">
            <Text className="text-text-secondary font-inter">📊 Performance Chart</Text>
            <Text className="text-body-sm text-text-secondary font-inter mt-1">
              Tap to view detailed analysis
            </Text>
          </View>
        </View>
      </View>

      {/* H9: Gamification */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Your Progress
          </Text>
          <View className="flex-row items-center justify-between mb-4">
            <View className="items-center">
              <Text className="text-2xl">🔥</Text>
              <Text className="text-h2 font-space font-bold text-text-primary">
              0
              </Text>
              <Text className="text-body-sm text-text-secondary">Day Streak</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl">🏆</Text>
              <Text className="text-h2 font-space font-bold text-text-primary">
                  0
              </Text>
              <Text className="text-body-sm text-text-secondary">Badges</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl">⭐</Text>
              <Text className="text-h2 font-space font-bold text-text-primary">
               1
              </Text>
              <Text className="text-body-sm text-text-secondary">Level</Text>
            </View>
          </View>
          
          <View className="bg-gray-200 rounded-full h-2">
            <View 
              className="bg-primary-500 rounded-full h-2"
            />
          </View>
          <Text className="text-body-sm text-text-secondary font-inter text-center mt-2">
             XP to next level
          </Text>
        </View>
      </View>

      {/* H10: Daily Reflection */}
      <View className="px-6 mb-6">
        <View className="card">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            Daily Reflection
          </Text>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-body-lg text-text-primary font-inter">
              How are you feeling today?
            </Text>
            <View className="flex-row space-x-2">
              {['😊', '😐', '😔', '😴'].map((emoji) => (
                <TouchableOpacity key={emoji} className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                  <Text className="text-xl">{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity className="flex-row items-center justify-center p-4 bg-primary-50 rounded-xl">
            <Ionicons name="leaf" size={20} color="#4F46E5" />
            <Text className="text-primary-600 font-inter font-medium ml-2">
              Take a 2-minute breathing break
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
