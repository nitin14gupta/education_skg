import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'

export default function register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 24 }}>
          <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 28, color: '#111827' }}>Create your account</Text>
          <Text style={{ marginTop: 6, color: '#6B7280' }}>Join and start your personalized learning journey</Text>
        </View>

        <View style={{ backgroundColor: 'white', marginHorizontal: 16, borderRadius: 12, padding: 16, shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 6 }}>
          <Text style={{ color: '#111827', marginBottom: 8 }}>Full name</Text>
          <TextInput
            placeholder="John Doe"
            placeholderTextColor="#9CA3AF"
            style={{ backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
            value={name}
            onChangeText={setName}
          />

          <Text style={{ color: '#111827', marginTop: 14, marginBottom: 8 }}>Email</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#9CA3AF"
            style={{ backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={{ color: '#111827', marginTop: 14, marginBottom: 8 }}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            style={{ backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => router.replace('/(onboarding)/welcome')} style={{ marginTop: 16, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 14, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Create account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{ color: '#6B7280' }}>
            Already have an account?{' '}
            <Text onPress={() => router.push('/(auth)/login')} style={{ color: '#4F46E5', fontWeight: '600' }}>Log in</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}


