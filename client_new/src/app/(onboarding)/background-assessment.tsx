import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function backgroundAssessment() {
  const router = useRouter()
  const [economy, setEconomy] = useState<string | null>(null)
  const [assets, setAssets] = useState<string[]>([])
  const [environment, setEnvironment] = useState<string | null>(null)
  const [internet, setInternet] = useState<string | null>(null)

  const toggleAsset = (a: string) => {
    setAssets(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <View style={{ height: 4, backgroundColor: '#E5E7EB' }}>
        <View style={{ width: '60%', height: 4, backgroundColor: '#4F46E5' }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 24, color: '#111827' }}>Background Assessment</Text>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>Tell us a bit about your study environment</Text>

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Economic background</Text>
        {['Lower', 'Middle', 'Upper'].map(e => (
          <TouchableOpacity key={e} onPress={() => setEconomy(e)} style={{ backgroundColor: economy === e ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: economy === e ? '#4F46E5' : '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: '#111827' }}>{e}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Assets</Text>
        {['Bike', 'Car', 'Fridge', 'AC'].map(a => (
          <TouchableOpacity key={a} onPress={() => toggleAsset(a)} style={{ backgroundColor: assets.includes(a) ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: assets.includes(a) ? '#4F46E5' : '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: '#111827' }}>{a}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Study environment</Text>
        {['Quiet', 'Noisy'].map(s => (
          <TouchableOpacity key={s} onPress={() => setEnvironment(s)} style={{ backgroundColor: environment === s ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: environment === s ? '#4F46E5' : '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: '#111827' }}>{s}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ marginTop: 16, marginBottom: 8, color: '#111827' }}>Internet quality</Text>
        {['Poor', 'Average', 'Good'].map(q => (
          <TouchableOpacity key={q} onPress={() => setInternet(q)} style={{ backgroundColor: internet === q ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: internet === q ? '#4F46E5' : '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: '#111827' }}>{q}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => router.push('/(onboarding)/contacts-permissions')} style={{ marginTop: 20, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}