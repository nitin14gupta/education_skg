import React, { useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function index() {
  const dates = useMemo(() => {
    const today = new Date()
    return [-2, -1, 0, 1, 2, 3, 4].map(offset => {
      const d = new Date(today)
      d.setDate(today.getDate() + offset)
      return d
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      {/* H1: Top Bar */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#4F46E5', fontWeight: '700' }}>A</Text>
          </View>
          <Text style={{ fontFamily: 'FredokaOne_400Regular', fontSize: 18, color: '#111827' }}>EduSkg</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ position: 'relative' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#4F46E5' }}>🔔</Text>
            </View>
            <View style={{ position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', borderRadius: 9999, paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={{ color: 'white', fontSize: 10 }}>3</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#FEF3C7', borderRadius: 9999, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#F59E0B' }}>
            <Text style={{ color: '#92400E', fontWeight: '700' }}>Gold · Rank #12</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {/* H2: Date Picker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ gap: 8 }}>
          {dates.map((d, idx) => {
            const isToday = new Date().toDateString() === d.toDateString()
            return (
              <TouchableOpacity key={idx} style={{ backgroundColor: isToday ? '#EEF2FF' : '#FFFFFF', borderWidth: 1, borderColor: isToday ? '#4F46E5' : '#E5E7EB', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center' }}>
                <Text style={{ color: '#6B7280', fontSize: 12 }}>{d.toLocaleString('en-US', { weekday: 'short' })}</Text>
                <Text style={{ color: '#111827', fontWeight: '700' }}>{d.getDate()}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* H3: Today's Plan Card */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#111827', fontWeight: '700' }}>Today's Plan</Text>
            <Text style={{ color: '#10B981', fontWeight: '700' }}>62%</Text>
          </View>
          <View style={{ marginTop: 8, height: 8, backgroundColor: '#E5E7EB', borderRadius: 9999 }}>
            <View style={{ width: '62%', height: 8, backgroundColor: '#10B981', borderRadius: 9999 }} />
          </View>
          {[
            { subject: 'Math', type: 'Practice', time: '20m', xp: '+20XP', color: '#4F46E5' },
            { subject: 'Science', type: 'Video', time: '15m', xp: '+15XP', color: '#06B6D4' },
            { subject: 'English', type: 'Quiz', time: '10m', xp: '+12XP', color: '#F59E0B' },
          ].map((t, i) => (
            <View key={i} style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: t.color, opacity: 0.15 }} />
                <View>
                  <Text style={{ color: '#111827', fontWeight: '600' }}>{t.subject}</Text>
                  <Text style={{ color: '#6B7280', fontSize: 12 }}>{t.type} · {t.time}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ color: '#10B981', fontWeight: '700' }}>{t.xp}</Text>
                <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#D1D5DB' }} />
              </View>
            </View>
          ))}
        </View>

        {/* H4: Learning Objectives */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
          <Text style={{ color: '#111827', fontWeight: '700', marginBottom: 8 }}>Learning Objectives</Text>
          {[
            { name: 'Fractions basics', progress: 0.5 },
            { name: 'Photosynthesis', progress: 0.3 },
            { name: 'Grammar: Tenses', progress: 0.8 },
          ].map((o, i) => (
            <View key={i} style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#111827' }}>{o.name}</Text>
                <Text style={{ color: '#6B7280' }}>{Math.round(o.progress * 100)}%</Text>
              </View>
              <View style={{ marginTop: 6, height: 6, backgroundColor: '#E5E7EB', borderRadius: 9999 }}>
                <View style={{ width: `${o.progress * 100}%`, height: 6, backgroundColor: '#4F46E5', borderRadius: 9999 }} />
              </View>
            </View>
          ))}
        </View>

        {/* H5: Performance Insight */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#A7F3D0', borderRadius: 12, padding: 12, marginBottom: 8 }}>
            <Text style={{ color: '#065F46', fontWeight: '700' }}>+EV</Text>
            <Text style={{ color: '#065F46' }}>Morning study improved retention by 12%.</Text>
          </View>
          <View style={{ backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 12 }}>
            <Text style={{ color: '#991B1B', fontWeight: '700' }}>-EV</Text>
            <Text style={{ color: '#991B1B' }}>Late-night sessions reduced accuracy by 7%.</Text>
          </View>
        </View>

        {/* H6: Learning Pattern */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
          <Text style={{ color: '#111827', fontWeight: '700', marginBottom: 8 }}>Learning Pattern</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['Visual', 'Auditory', 'Kinesthetic'].map((m, i) => (
              <View key={i} style={{ flex: 1, backgroundColor: '#F3F4F6', padding: 12, borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ color: '#111827', fontWeight: '600' }}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* H7: Recommendations */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ gap: 12 }}>
          {[1, 2, 3].map(i => (
            <View key={i} style={{ width: 220, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' }}>
              <View style={{ height: 90, backgroundColor: '#E5E7EB', borderRadius: 12 }} />
              <Text style={{ marginTop: 10, color: '#111827', fontWeight: '700' }}>Recommended Topic {i}</Text>
              <Text style={{ color: '#6B7280' }}>Medium · 15m</Text>
              <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#4F46E5', paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Start</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* H8: Score Analysis */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
          <Text style={{ color: '#111827', fontWeight: '700', marginBottom: 8 }}>Score Analysis</Text>
          <View style={{ height: 120, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#6B7280' }}>Interactive chart placeholder</Text>
          </View>
        </View>

        {/* H9: Gamification */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#111827', fontWeight: '700' }}>Streak</Text>
            <Text style={{ color: '#F59E0B', fontWeight: '700' }}>🔥 7 days</Text>
          </View>
          <View style={{ marginTop: 8, height: 8, backgroundColor: '#FEF3C7', borderRadius: 9999 }}>
            <View style={{ width: '45%', height: 8, backgroundColor: '#F59E0B', borderRadius: 9999 }} />
          </View>
          <View style={{ marginTop: 12, flexDirection: 'row', gap: 8 }}>
            {['🏅', '🎯', '📈', '📚'].map((b, i) => (
              <View key={i} style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 10, paddingVertical: 18, alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* H10: Daily Reflection */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' }}>
          <Text style={{ color: '#111827', fontWeight: '700', marginBottom: 8 }}>Daily Reflection</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            {['😞', '😐', '🙂', '😄'].map((m, i) => (
              <TouchableOpacity key={i} style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 10, paddingVertical: 12, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={{ backgroundColor: '#7C3AED', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Start 60s Focus</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}