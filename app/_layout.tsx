import { AuthProvider } from '@/context/auth_context'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="transactions"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
