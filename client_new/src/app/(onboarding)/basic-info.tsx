import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function basicInfo() {
  const router = useRouter()
  const [grade, setGrade] = useState<number | null>(null)
  const [board, setBoard] = useState<string | null>(null)
  const [school, setSchool] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      {/* Step progress */}
      <View style={{ height: 4, backgroundColor: '#E5E7EB' }}>
        <View style={{ width: '20%', height: 4, backgroundColor: '#4F46E5' }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 24, color: '#111827' }}>Basic Info</Text>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>Help us set up your profile</Text>

        {/* Grade selector */}
        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Select your grade</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {Array.from({ length: 10 }, (_, i) => i + 3).map(g => (
            <TouchableOpacity key={g} onPress={() => setGrade(g)} style={{ width: '18%', aspectRatio: 1, backgroundColor: grade === g ? '#4F46E5' : '#FFFFFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB' }}>
              <Text style={{ color: grade === g ? 'white' : '#111827', fontWeight: '600' }}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Board selection */}
        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Board</Text>
        {['CBSE', 'ICSE', 'State'].map(b => (
          <TouchableOpacity key={b} onPress={() => setBoard(b)} style={{ backgroundColor: board === b ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: board === b ? '#4F46E5' : '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: '#111827' }}>{b}</Text>
          </TouchableOpacity>
        ))}

        {/* School name */}
        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>School name</Text>
        <TextInput
          placeholder="Type your school"
          placeholderTextColor="#9CA3AF"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
          value={school}
          onChangeText={setSchool}
        />

        <TouchableOpacity onPress={() => router.push('/(onboarding)/academic-history')} style={{ marginTop: 20, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}