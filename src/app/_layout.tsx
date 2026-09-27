// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ title: 'Prototype Pokédex' }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}