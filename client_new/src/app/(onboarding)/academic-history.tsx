import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function academicHistory() {
  const router = useRouter()
  const [percentage, setPercentage] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <View style={{ height: 4, backgroundColor: '#E5E7EB' }}>
        <View style={{ width: '40%', height: 4, backgroundColor: '#4F46E5' }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 24, color: '#111827' }}>Academic History</Text>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>Upload your marks and last exam performance</Text>

        <View style={{ marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' }}>
          <Text style={{ color: '#111827', marginBottom: 8 }}>Last exam percentage</Text>
          <TextInput
            placeholder="e.g. 82%"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={percentage}
            onChangeText={setPercentage}
            style={{ backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
          />
          <View style={{ marginTop: 12, height: 8, backgroundColor: '#E5E7EB', borderRadius: 9999 }}>
            <View style={{ width: `${Math.min(parseInt(percentage || '0') || 0, 100)}%`, height: 8, backgroundColor: '#10B981', borderRadius: 9999 }} />
          </View>
        </View>

        <View style={{ marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#6B7280' }}>Upload marks (photo or CSV)</Text>
          <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#EEF2FF', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}>
            <Text style={{ color: '#4F46E5', fontWeight: '600' }}>Choose file</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(onboarding)/background-assessment')} style={{ marginTop: 20, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}