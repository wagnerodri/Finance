import axios from 'axios'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const api = axios.create({
  baseURL: 'https://mockapi.io/api/v1', // Exemplo, pode ser alterado
})

export interface Balance {
  amount: number
}

export function useBalance() {
  // Simula uma requisição de saldo
  return useQuery<Balance>(['balance'], async () => {
    // Aqui poderia ser: const { data } = await api.get('/balance')
    await new Promise(r => setTimeout(r, 500))
    return { amount: 5000 }
  })
}

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
