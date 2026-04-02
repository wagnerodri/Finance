import { useUserStore } from '../store'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Dashboard() {
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()
  const balance = useUserStore((s) => s.balance)
  const transactions = useUserStore((s) => s.transactions)
  const user = useUserStore((s) => s.user)
  const [showBalance, setShowBalance] = useState(false)
  function handleLogout() {
    logout()
    navigate('/')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white/95 shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-gray-100 transition-transform duration-500 hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-1">Olá, {user?.name ?? user?.email.split('@')[0]}</h2>
            <button
              className="mt-2 px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs font-semibold flex items-center gap-1 transition"
              title={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
              onClick={() => setShowBalance((v) => !v)}
            >
              {showBalance ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M6.343 6.343A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.642 1.67-1.09 2.418" /></svg>
              )}
              {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
            </button>
            <p className="text-gray-500 text-sm mt-2">Bem-vindo ao seu painel bancário</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-indigo-400 text-white hover:from-pink-500 hover:to-indigo-500 font-semibold transition-all duration-300 shadow-md active:scale-95 focus:ring-2 focus:ring-indigo-400">Sair</button>
        </div>
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow text-white flex flex-col items-center">
            <span className="uppercase text-xs tracking-widest mb-1">Saldo disponível</span>
            <span className="text-3xl font-mono font-bold select-none">
              {showBalance ? `R$ ${balance.toLocaleString('pt-BR', {minimumFractionDigits:2})}` : '••••••••'}
            </span>
          </div>
          <a href="/transfer" className="flex-1 btn btn-primary text-lg py-6 rounded-2xl shadow font-semibold flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500">Transferir</a>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3 text-indigo-600">Extrato de Transações</h3>
          <div className="bg-gray-50 rounded-xl shadow-inner p-4 max-h-80 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-xs uppercase">
                  <th className="py-2">Destinatário</th>
                  <th className="py-2">Valor</th>
                  <th className="py-2">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 && (
                  <tr><td colSpan={3} className="text-center text-gray-400 py-6">Nenhuma transação ainda.</td></tr>
                )}
                {transactions.map(tx => {
                  // Data/hora formatada
                  const [date, time] = tx.date.split(', ')
                  return (
                    <tr key={tx.id} className="border-b last:border-b-0">
                      <td className="py-2 font-medium">{tx.to}</td>
                      <td className="py-2 font-mono text-green-700">R$ {tx.amount.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
                      <td className="py-2 text-xs text-gray-500">
                        <span className="block">{date}</span>
                        <span className="block">{time}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
