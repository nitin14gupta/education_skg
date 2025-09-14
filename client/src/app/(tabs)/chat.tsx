import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CHAT_THREADS = [
  {
    id: 1,
    type: 'system',
    title: 'System Announcements',
    lastMessage: 'New features available in the latest update',
    time: '2 min ago',
    unread: 2,
    icon: 'megaphone',
    color: '#4F46E5',
  },
  {
    id: 2,
    type: 'teacher',
    title: 'Mr. David Chen',
    lastMessage: 'Great work on the math assignment!',
    time: '1 hour ago',
    unread: 0,
    icon: 'person',
    color: '#10B981',
  },
  {
    id: 3,
    type: 'parent',
    title: 'Mom & Dad',
    lastMessage: 'How was school today?',
    time: '3 hours ago',
    unread: 1,
    icon: 'people',
    color: '#F59E0B',
  },
  {
    id: 4,
    type: 'ai',
    title: 'AI Assistant',
    lastMessage: 'I can help you with any questions!',
    time: '1 day ago',
    unread: 0,
    icon: 'chatbubble-ellipses',
    color: '#8B5CF6',
  },
];

const MESSAGES = [
  {
    id: 1,
    text: 'Hello! How can I help you today?',
    sender: 'ai',
    time: '10:30 AM',
    isUser: false,
  },
  {
    id: 2,
    text: 'I need help with quadratic equations',
    sender: 'user',
    time: '10:31 AM',
    isUser: true,
  },
  {
    id: 3,
    text: 'I\'d be happy to help you with quadratic equations! Let me explain the basic concept first.',
    sender: 'ai',
    time: '10:32 AM',
    isUser: false,
  },
  {
    id: 4,
    text: 'A quadratic equation is a polynomial equation of degree 2. The general form is ax² + bx + c = 0, where a ≠ 0.',
    sender: 'ai',
    time: '10:33 AM',
    isUser: false,
  },
  {
    id: 5,
    text: 'Would you like me to show you how to solve a specific example?',
    sender: 'ai',
    time: '10:34 AM',
    isUser: false,
  },
];

export default function ChatScreen() {
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MESSAGES);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  if (selectedThread === null) {
    return (
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="px-6 py-4 bg-white border-b border-border-light">
          <Text className="text-h1 font-fredoka text-text-primary mb-2">
            Messages 💬
          </Text>
          <Text className="text-body-lg text-text-secondary font-inter">
            Stay connected with your learning community
          </Text>
        </View>

        {/* Chat Threads */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-4">
            {CHAT_THREADS.map((thread) => (
              <TouchableOpacity
                key={thread.id}
                onPress={() => setSelectedThread(thread.id)}
                className="flex-row items-center p-4 bg-white rounded-xl shadow-card mb-3"
              >
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: thread.color + '20' }}
                >
                  <Ionicons name={thread.icon as any} size={24} color={thread.color} />
                </View>
                
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-body-lg font-inter font-semibold text-text-primary">
                      {thread.title}
                    </Text>
                    <Text className="text-body-sm text-text-secondary font-inter">
                      {thread.time}
                    </Text>
                  </View>
                  <Text className="text-body-md text-text-secondary font-inter">
                    {thread.lastMessage}
                  </Text>
                </View>

                {thread.unread > 0 && (
                  <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center ml-2">
                    <Text className="text-white text-xs font-inter font-bold">
                      {thread.unread}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <View className="px-6 py-4">
            <Text className="text-h3 font-inter font-semibold text-text-primary mb-4">
              Quick Actions ⚡
            </Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="flex-1 p-4 bg-primary-500 rounded-xl items-center">
                <Ionicons name="chatbubble-ellipses" size={24} color="white" />
                <Text className="text-white font-inter font-semibold mt-2">
                  Ask AI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 p-4 bg-success-500 rounded-xl items-center">
                <Ionicons name="help-circle" size={24} color="white" />
                <Text className="text-white font-inter font-semibold mt-2">
                  Get Help
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const currentThread = CHAT_THREADS.find(t => t.id === selectedThread);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      {/* Chat Header */}
      <View className="px-6 py-4 bg-white border-b border-border-light">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => setSelectedThread(null)}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: currentThread?.color + '20' }}
          >
            <Ionicons name={currentThread?.icon as any} size={20} color={currentThread?.color} />
          </View>
          
          <View className="flex-1">
            <Text className="text-body-lg font-inter font-semibold text-text-primary">
              {currentThread?.title}
            </Text>
            <Text className="text-body-sm text-text-secondary font-inter">
              {currentThread?.type === 'ai' ? 'Always online' : 'Last seen recently'}
            </Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`mb-4 ${msg.isUser ? 'items-end' : 'items-start'}`}
          >
            <View 
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.isUser 
                  ? 'bg-primary-500' 
                  : 'bg-white shadow-card'
              }`}
            >
              <Text className={`text-body-lg font-inter ${
                msg.isUser ? 'text-white' : 'text-text-primary'
              }`}>
                {msg.text}
              </Text>
              <Text className={`text-body-sm font-inter mt-1 ${
                msg.isUser ? 'text-white/70' : 'text-text-secondary'
              }`}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View className="px-6 py-4 bg-white border-t border-border-light">
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity>
            <Ionicons name="add-circle" size={32} color="#4F46E5" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              className="flex-1 text-body-lg font-inter"
              placeholderTextColor="#6B7280"
              multiline
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="happy" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={handleSendMessage}
            disabled={!message.trim()}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={message.trim() ? 'white' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
