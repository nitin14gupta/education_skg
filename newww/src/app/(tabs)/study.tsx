import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '🔢', color: '#EF4444', progress: 75 },
  { id: 'science', name: 'Science', icon: '🔬', color: '#10B981', progress: 60 },
  { id: 'english', name: 'English', icon: '📚', color: '#3B82F6', progress: 85 },
  { id: 'social', name: 'Social Studies', icon: '🌍', color: '#8B5CF6', progress: 45 },
  { id: 'hindi', name: 'Hindi', icon: '🇮🇳', color: '#F59E0B', progress: 70 },
  { id: 'physics', name: 'Physics', icon: '⚛️', color: '#06B6D4', progress: 55 },
];

const TOPICS_FOR_TODAY = [
  { id: 1, subject: 'Mathematics', title: 'Quadratic Equations', difficulty: 'Medium', duration: '20 min', xp: 50 },
  { id: 2, subject: 'Science', title: 'Photosynthesis', difficulty: 'Easy', duration: '15 min', xp: 30 },
  { id: 3, subject: 'English', title: 'Essay Writing', difficulty: 'Hard', duration: '25 min', xp: 60 },
];

export default function StudyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-border-light">
        <Text className="text-h1 font-fredoka text-text-primary mb-2">
          Study Desk 📚
        </Text>
        <Text className="text-body-lg text-text-secondary font-inter">
          Continue your learning journey
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="flex-row items-center bg-white rounded-xl border border-border-light px-4 py-3">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search subjects, topics, or concepts..."
            className="flex-1 ml-3 text-body-lg font-inter"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      {/* Topic for Today */}
      <View className="px-6 mb-6">
        <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
          Topic for Today 🎯
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            {TOPICS_FOR_TODAY.map((topic) => (
              <TouchableOpacity key={topic.id} className="w-64 p-4 bg-white rounded-xl shadow-card">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-body-lg font-inter font-semibold text-text-primary">
                    {topic.title}
                  </Text>
                  <View className={`px-2 py-1 rounded-lg ${
                    topic.difficulty === 'Easy' ? 'bg-success-100' :
                    topic.difficulty === 'Medium' ? 'bg-warning-100' : 'bg-error-100'
                  }`}>
                    <Text className={`text-body-sm font-inter font-medium ${
                      topic.difficulty === 'Easy' ? 'text-success-700' :
                      topic.difficulty === 'Medium' ? 'text-warning-700' : 'text-error-700'
                    }`}>
                      {topic.difficulty}
                    </Text>
                  </View>
                </View>
                <Text className="text-body-md text-text-secondary font-inter mb-2">
                  {topic.subject}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-body-sm text-text-secondary">
                    {topic.duration} • {topic.xp} XP
                  </Text>
                  <Ionicons name="play-circle" size={24} color="#4F46E5" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Subjects Grid */}
      <View className="px-6 mb-6">
        <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
          Subjects 📖
        </Text>
        <View className="flex-row flex-wrap gap-4">
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              onPress={() => setSelectedSubject(subject.id)}
              className={`w-[48%] p-4 rounded-xl border-2 ${
                selectedSubject === subject.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-border-light bg-white'
              }`}
            >
              <View className="items-center mb-3">
                <Text className="text-4xl mb-2">{subject.icon}</Text>
                <Text className={`text-body-lg font-inter font-semibold text-center ${
                  selectedSubject === subject.id ? 'text-primary-600' : 'text-text-primary'
                }`}>
                  {subject.name}
                </Text>
              </View>
              
              <View className="mb-2">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-body-sm text-text-secondary font-inter">
                    Progress
                  </Text>
                  <Text className="text-body-sm font-inter font-medium text-text-primary">
                    {subject.progress}%
                  </Text>
                </View>
                <View className="bg-gray-200 rounded-full h-2">
                  <View 
                    className="rounded-full h-2"
                    style={{ 
                      width: `${subject.progress}%`,
                      backgroundColor: subject.color
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content Tabs */}
      {selectedSubject && (
        <View className="px-6 mb-6">
          <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
            {SUBJECTS.find(s => s.id === selectedSubject)?.name} Content
          </Text>
          
          <View className="flex-row space-x-2 mb-4">
            {['Videos', 'Notes', 'Practice', 'Tests'].map((tab) => (
              <TouchableOpacity
                key={tab}
                className="px-4 py-2 bg-primary-500 rounded-lg"
              >
                <Text className="text-white font-inter font-medium">
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="space-y-3">
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} className="p-4 bg-white rounded-xl shadow-card">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-body-lg font-inter font-semibold text-text-primary mb-1">
                      Chapter {item}: Introduction
                    </Text>
                    <Text className="text-body-sm text-text-secondary font-inter mb-2">
                      Learn the fundamentals of this topic
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="play-circle" size={16} color="#4F46E5" />
                      <Text className="text-body-sm text-text-secondary font-inter ml-1">
                        15 min • 25 XP
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
          Quick Actions ⚡
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-1 p-4 bg-success-500 rounded-xl items-center">
            <Ionicons name="flash" size={24} color="white" />
            <Text className="text-white font-inter font-semibold mt-2">
              Quick Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 bg-warning-500 rounded-xl items-center">
            <Ionicons name="book" size={24} color="white" />
            <Text className="text-white font-inter font-semibold mt-2">
              Study Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 bg-primary-500 rounded-xl items-center">
            <Ionicons name="help-circle" size={24} color="white" />
            <Text className="text-white font-inter font-semibold mt-2">
              Ask AI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
