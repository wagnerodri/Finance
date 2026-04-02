import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id: string
  to: string
  amount: number
  date: string
}

interface User {
  name: string
  email: string
  password: string
}

interface UserState {
  isAuthenticated: boolean
  user: User | null
  users: User[]
  balance: number
  transactions: Transaction[]
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: () => void
  transfer: (to: string, amount: number) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      users: [],
      balance: 5000,
      transactions: [],
      login: (email, password) => {
        const found = get().users.find(u => u.email === email && u.password === password)
        if (found) {
          set({ isAuthenticated: true, user: found })
          return true
        }
        set({ isAuthenticated: false, user: null })
        return false
      },
      signup: (name, email, password) => {
        const exists = get().users.some(u => u.email === email)
        if (exists) return false
        const newUser = { name, email, password }
        set(state => ({ users: [...state.users, newUser] }))
        return true
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      transfer: (to, amount) => {
        set(state => ({
          balance: state.balance - amount,
          transactions: [
            { id: Math.random().toString(36).slice(2), to, amount, date: new Date().toLocaleString() },
            ...state.transactions,
          ],
        }))
      },
    }),
    {
      name: 'bank-user-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        users: state.users,
        balance: state.balance,
        transactions: state.transactions,
      }),
    }
  )
)
