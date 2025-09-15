import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
          <Animated.View style={{ transform: [{ scale }], opacity }}>
            <View style={{ width: 112, height: 112, borderRadius: 56, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white' }} />
            </View>
          </Animated.View>
          <Animated.Text style={{
            marginTop: 20,
            color: 'white',
            fontSize: 28,
            fontFamily: 'FredokaOne_400Regular',
            opacity,
          }}>
            EduSkg
          </Animated.Text>
          <View style={{ marginTop: 24 }}>
            <ActivityIndicator color="#ffffff" size="small" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}