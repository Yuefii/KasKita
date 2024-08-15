import React, { createContext, useState, useContext, ReactNode } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username: string, password: string) => {
    const validUsername = process.env.EXPO_PUBLIC_USERNAME
    const validPassword = process.env.EXPO_PUBLIC_PASSWORD

    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true)
    } else {
      alert('Invalid username or password')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
