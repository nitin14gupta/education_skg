import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const STORY_CARDS = [
  {
    id: 1,
    type: 'concept',
    title: 'Understanding Photosynthesis',
    author: 'Dr. Sarah Johnson',
    duration: '2 min',
    thumbnail: '🌱',
    likes: 1240,
    saves: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    type: 'quiz',
    title: 'Quick Math Challenge',
    author: 'EduAI',
    duration: '1 min',
    thumbnail: '🧮',
    likes: 856,
    saves: 45,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    type: 'teacher',
    title: 'Study Tips from Your Teacher',
    author: 'Mr. David Chen',
    duration: '3 min',
    thumbnail: '👨‍🏫',
    likes: 2100,
    saves: 156,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 4,
    type: 'study',
    title: 'Physics Lab Experiment',
    author: 'Lab Assistant',
    duration: '4 min',
    thumbnail: '⚗️',
    likes: 678,
    saves: 23,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 5,
    type: 'concept',
    title: 'English Grammar Made Easy',
    author: 'Ms. Emily Wilson',
    duration: '2.5 min',
    thumbnail: '📝',
    likes: 1890,
    saves: 134,
    isLiked: true,
    isSaved: true,
  },
];

export default function StoriesScreen() {
  const [stories, setStories] = useState(STORY_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (id: number) => {
    setStories(prev => prev.map(story => 
      story.id === id 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
  };

  const handleSave = (id: number) => {
    setStories(prev => prev.map(story => 
      story.id === id 
        ? { 
            ...story, 
            isSaved: !story.isSaved,
            saves: story.isSaved ? story.saves - 1 : story.saves + 1
          }
        : story
    ));
  };

  const handleShare = (id: number) => {
    // Handle share functionality
    console.log('Share story:', id);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return '#4F46E5';
      case 'quiz': return '#10B981';
      case 'teacher': return '#F59E0B';
      case 'study': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return 'bulb';
      case 'quiz': return 'help-circle';
      case 'teacher': return 'person';
      case 'study': return 'book';
      default: return 'play';
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-12 left-0 right-0 z-10 px-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-fredoka text-h2">
            Stories
          </Text>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Story Cards */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        snapToInterval={height * 0.8}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / (height * 0.8));
          setCurrentIndex(index);
        }}
      >
        {stories.map((story, index) => (
          <View 
            key={story.id} 
            className="flex-1 justify-center px-6"
            style={{ height: height * 0.8 }}
          >
            {/* Story Card */}
            <View className="bg-white rounded-3xl overflow-hidden shadow-card-lg">
              {/* Header */}
              <View className="p-6 border-b border-border-light">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: getTypeColor(story.type) + '20' }}
                    >
                      <Ionicons 
                        name={getTypeIcon(story.type)} 
                        size={20} 
                        color={getTypeColor(story.type)} 
                      />
                    </View>
                    <View>
                      <Text className="text-body-sm text-text-secondary font-inter">
                        {story.author}
                      </Text>
                      <Text className="text-body-sm text-text-secondary font-inter">
                        {story.duration}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-body-sm text-text-secondary font-inter">
                      {story.type.charAt(0).toUpperCase() + story.type.slice(1)}
                    </Text>
                  </View>
                </View>

                <Text className="text-h2 font-inter font-semibold text-text-primary mb-2">
                  {story.title}
                </Text>
              </View>

              {/* Content Area */}
              <View className="flex-1 p-6 items-center justify-center">
                <Text className="text-8xl mb-6">{story.thumbnail}</Text>
                <Text className="text-body-lg text-text-secondary font-inter text-center leading-6">
                  {story.type === 'concept' && 'Learn this concept through interactive visualizations and examples.'}
                  {story.type === 'quiz' && 'Test your knowledge with this quick quiz challenge!'}
                  {story.type === 'teacher' && 'Get valuable tips and insights from experienced educators.'}
                  {story.type === 'study' && 'Follow along with this hands-on study session.'}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="p-6 border-t border-border-light">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-6">
                    <TouchableOpacity 
                      onPress={() => handleLike(story.id)}
                      className="flex-row items-center"
                    >
                      <Ionicons 
                        name={story.isLiked ? "heart" : "heart-outline"} 
                        size={24} 
                        color={story.isLiked ? "#EF4444" : "#6B7280"} 
                      />
                      <Text className="text-body-sm text-text-secondary font-inter ml-1">
                        {story.likes}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleSave(story.id)}
                      className="flex-row items-center"
                    >
                      <Ionicons 
                        name={story.isSaved ? "bookmark" : "bookmark-outline"} 
                        size={24} 
                        color={story.isSaved ? "#4F46E5" : "#6B7280"} 
                      />
                      <Text className="text-body-sm text-text-secondary font-inter ml-1">
                        {story.saves}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleShare(story.id)}
                      className="flex-row items-center"
                    >
                      <Ionicons name="share-outline" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity className="bg-primary-500 px-6 py-3 rounded-xl">
                    <Text className="text-white font-inter font-semibold">
                      {story.type === 'quiz' ? 'Start Quiz' : 'Watch Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Indicator */}
      <View className="absolute bottom-8 left-0 right-0">
        <View className="flex-row justify-center space-x-2">
          {stories.map((_, index) => (
            <View 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
