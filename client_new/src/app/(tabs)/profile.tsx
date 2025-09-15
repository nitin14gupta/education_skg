import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function profile() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 16 }}>
      <StatusBar style="dark" />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#4F46E5', fontWeight: '700', fontSize: 24 }}>A</Text>
        </View>
        <Text style={{ marginTop: 10, fontFamily: 'FredokaOne_400Regular', fontSize: 20, color: '#111827' }}>Aarav Gupta</Text>
        <Text style={{ color: '#6B7280' }}>Grade 8 · CBSE</Text>
      </View>

      <View style={{ marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 }}>
        {[
          'Account Settings',
          'Notifications',
          'Privacy',
          'Help & Support',
        ].map((item, i) => (
          <View key={i} style={{ paddingVertical: 12, borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: '#E5E7EB' }}>
            <Text style={{ color: '#111827' }}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={{ marginTop: 16, backgroundColor: '#EF4444', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}