import React from 'react'
import { useAuth } from '@/context/auth_context'
import { Redirect } from 'expo-router'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />
  }

  return <>{children}</>
}

export default PrivateRoute
