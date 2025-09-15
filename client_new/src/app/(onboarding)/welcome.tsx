import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function welcome() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 28, color: '#111827', textAlign: 'center' }}>Welcome to EduSkg</Text>
        <Text style={{ color: '#6B7280', marginTop: 8, textAlign: 'center' }}>Let’s personalize your learning experience.</Text>

        <TouchableOpacity onPress={() => router.push('/(onboarding)/basic-info')} style={{ marginTop: 24, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 20 }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}