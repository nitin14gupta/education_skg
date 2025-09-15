import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function contactsPermissions() {
  const router = useRouter()
  const [teacher, setTeacher] = useState('')
  const [parentProfession, setParentProfession] = useState('')
  const [parentEducation, setParentEducation] = useState('')
  const [consent, setConsent] = useState(false)

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <View style={{ height: 4, backgroundColor: '#E5E7EB' }}>
        <View style={{ width: '80%', height: 4, backgroundColor: '#4F46E5' }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 24, color: '#111827' }}>Contacts & Permissions</Text>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>Provide teacher and parental info with consent</Text>

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Class teacher</Text>
        <TextInput
          placeholder="Teacher name"
          placeholderTextColor="#9CA3AF"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
          value={teacher}
          onChangeText={setTeacher}
        />

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Parent profession</Text>
        <TextInput
          placeholder="e.g. Engineer"
          placeholderTextColor="#9CA3AF"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
          value={parentProfession}
          onChangeText={setParentProfession}
        />

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Parent education</Text>
        <TextInput
          placeholder="e.g. Graduate"
          placeholderTextColor="#9CA3AF"
          style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
          value={parentEducation}
          onChangeText={setParentEducation}
        />

        <TouchableOpacity onPress={() => setConsent(!consent)} style={{ marginTop: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: consent ? '#4F46E5' : '#9CA3AF', backgroundColor: consent ? '#4F46E5' : 'transparent' }} />
          <Text style={{ color: '#111827', flex: 1 }}>I agree to share the above details for personalization.</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(onboarding)/diagnostic-preference')} style={{ marginTop: 20, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center', opacity: consent ? 1 : 0.6 }} disabled={!consent}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}