import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Transfer from '../src/pages/Transfer'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}))
vi.mock('../src/store', () => ({
  useUserStore: () => ({
    transfer: vi.fn(),
    balance: 1000,
  }),
}))

describe('Transfer page', () => {
  it('valida campos obrigatórios e saldo', async () => {
    render(<Transfer />)
    fireEvent.click(screen.getByText('Transferir'))
    expect(await screen.findByText('Nome obrigatório')).toBeDefined()
    expect(await screen.findByText('Valor mínimo R$1')).toBeDefined()
  })

  it('exibe erro de saldo insuficiente', async () => {
    render(<Transfer />)
    fireEvent.change(screen.getByPlaceholderText('Destinatário'), { target: { value: 'João' } })
    fireEvent.change(screen.getByPlaceholderText('Valor'), { target: { value: '2000' } })
    fireEvent.click(screen.getByText('Transferir'))
    await waitFor(() => {
      expect(screen.getByText('Saldo insuficiente para esta transferência.')).toBeDefined()
    })
  })
})
