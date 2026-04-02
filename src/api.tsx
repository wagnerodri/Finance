
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'



export interface Balance {
  amount: number
}

export function useBalance() {
  // Simula uma requisição de saldo
  return useQuery<Balance>({
    queryKey: ['balance'],
    queryFn: async () => {
      // Aqui poderia ser: const { data } = await api.get('/balance')
      await new Promise(r => setTimeout(r, 500))
      return { amount: 5000 }
    },
  })
}

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
