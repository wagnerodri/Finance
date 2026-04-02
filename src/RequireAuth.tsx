import { useUserStore } from './store'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}
