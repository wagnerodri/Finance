import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../src/pages/Login'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}))
vi.mock('../src/store', () => ({
  useUserStore: () => ({ login: vi.fn() }),
}))

describe('Login page', () => {
  it('valida campos obrigatórios', async () => {
    render(<Login />)
    fireEvent.click(screen.getByText('Entrar'))
    expect(await screen.findByText('E-mail inválido')).toBeDefined()
    expect(await screen.findByText('Mínimo 6 caracteres')).toBeDefined()
  })
})
