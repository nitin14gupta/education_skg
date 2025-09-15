import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function stories() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Short educational reels</Text>
        <TouchableOpacity style={{ marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 9999 }}>
          <Text style={{ color: '#111827', fontWeight: '700' }}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}