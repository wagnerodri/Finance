import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransferSuccessDialog } from '../components/TransferSuccessDialog'
import { useUserStore } from '../store'

const schema = z.object({
  to: z.string().min(3, 'Nome obrigatório'),
  amount: z.string().min(1, 'Valor mínimo R$1'),
})

type TransferForm = z.infer<typeof schema>

export default function Transfer() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TransferForm>({
    resolver: zodResolver(schema),
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const transfer = useUserStore((s) => s.transfer)
  const balance = useUserStore((s) => s.balance)
  const navigate = useNavigate()

  function onSubmit(data: TransferForm) {
    setError(null)
    const amount = Number(data.amount.toString().replace(',', '.'))
    if (isNaN(amount) || amount < 1) {
      setError('Valor mínimo R$1')
      return
    }
    if (amount > balance) {
      setError('Saldo insuficiente para esta transferência.')
      return
    }
    transfer(data.to, amount)
    setDialogOpen(true)
    setTimeout(() => {
      setDialogOpen(false)
      navigate('/dashboard')
    }, 1500)
    reset()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/90 p-8 rounded-2xl shadow-md w-80 space-y-4 border border-gray-200 transition-transform duration-500 hover:scale-[1.01]">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Transferência</h2>
        <div className="mb-2">
          <span className="text-xs text-gray-500">Saldo disponível: <span className="font-mono font-bold text-indigo-700">R$ {balance.toLocaleString('pt-BR', {minimumFractionDigits:2})}</span></span>
        </div>
        <div>
          <input {...register('to')} placeholder="Destinatário" className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          {errors.to && <span className="text-red-500 text-xs">{errors.to.message}</span>}
        </div>
        <div>
          <input
            {...register('amount', {
              setValueAs: v => v === '' ? '' : v,
            })}
            type="number"
            inputMode="decimal"
            step="any"
            placeholder="Valor"
            className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            autoComplete="off"
          />
          {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
        </div>
        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 focus:ring-2 focus:ring-indigo-400">
          {isSubmitting && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
          Transferir
        </button>
      </form>
      <TransferSuccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
