import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function diagnosticPreference() {
  const router = useRouter()
  const [choice, setChoice] = useState<string | null>(null)

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <View style={{ height: 4, backgroundColor: '#E5E7EB' }}>
        <View style={{ width: '100%', height: 4, backgroundColor: '#4F46E5' }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 24, color: '#111827' }}>Diagnostic Preference</Text>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>Choose how you want to start</Text>

        {[
          { key: 'quick', title: '10-min Quick', desc: 'Get a fast snapshot and quick wins.' },
          { key: 'full', title: '30-min Full', desc: 'Deep analysis for detailed plan.' },
        ].map(opt => (
          <TouchableOpacity key={opt.key} onPress={() => setChoice(opt.key)} style={{ backgroundColor: choice === opt.key ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: choice === opt.key ? '#4F46E5' : '#E5E7EB', padding: 16, borderRadius: 12, marginTop: 12 }}>
            <Text style={{ color: '#111827', fontWeight: '600' }}>{opt.title}</Text>
            <Text style={{ color: '#6B7280', marginTop: 4 }}>{opt.desc}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={{ marginTop: 20, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center', opacity: choice ? 1 : 0.6 }} disabled={!choice}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Finish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}