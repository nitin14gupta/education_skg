import { Stack } from "expo-router";
import '@/global.css'
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as useInter, Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts as useSpaceGrotesk, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import { useFonts as useFredoka, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

export default function RootLayout() {
  const [fredokaLoaded] = useFredoka({ FredokaOne_400Regular });
  const [interLoaded] = useInter({ Inter_400Regular });
  const [spaceGroteskLoaded] = useSpaceGrotesk({ SpaceGrotesk_400Regular });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fredokaLoaded && interLoaded && spaceGroteskLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fredokaLoaded, interLoaded, spaceGroteskLoaded]);

  if (!fredokaLoaded || !interLoaded || !spaceGroteskLoaded) return null;

  return ( 
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
  )
}
