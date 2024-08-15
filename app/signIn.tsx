// LoginScreen.tsx
import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useAuth } from '@/context/auth_context'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    login(username, password)
    if (
      username === process.env.EXPO_PUBLIC_USERNAME &&
      password === process.env.EXPO_PUBLIC_PASSWORD
    ) {
      router.push('/')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.button_text}>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderRadius: 24,
  },
  button: {
    backgroundColor: '#0ea5e9',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
})
