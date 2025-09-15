import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="basic-info" />
      <Stack.Screen name="academic-history" />
      <Stack.Screen name="background-assessment" />
      <Stack.Screen name="contacts-permissions" />
      <Stack.Screen name="diagnostic-preference" />
    </Stack>
  );
}
