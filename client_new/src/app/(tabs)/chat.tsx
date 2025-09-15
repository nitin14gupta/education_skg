import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function chat() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View style={{ alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 10, marginBottom: 10 }}>
          <Text style={{ color: '#111827' }}>Hi! How can I help you study today?</Text>
        </View>
        <View style={{ alignSelf: 'flex-end', backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 12, padding: 10 }}>
          <Text style={{ color: '#111827' }}>Explain photosynthesis in simple terms.</Text>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TextInput placeholder="Type a message" placeholderTextColor="#9CA3AF" style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 9999, paddingHorizontal: 14, paddingVertical: 10, color: '#111827' }} />
        <TouchableOpacity style={{ backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 9999 }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}