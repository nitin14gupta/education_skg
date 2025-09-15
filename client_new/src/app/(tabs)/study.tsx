import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function study() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 20, color: '#111827' }}>Study Desk</Text>
        <View style={{ marginTop: 12, flexDirection: 'row', gap: 10 }}>
          {['Math', 'Science', 'English', 'SST'].map((s, i) => (
            <TouchableOpacity key={i} style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E5E7EB' }}>
              <Text style={{ color: '#111827', fontWeight: '700' }}>{s}</Text>
              <Text style={{ color: '#6B7280' }}>12 topics</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}