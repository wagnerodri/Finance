import AppRouter from './AppRouter'
import { AppProviders } from './api.tsx'

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
