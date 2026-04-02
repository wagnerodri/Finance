import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserStore } from '../store'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof schema>

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })
  const login = useUserStore((s) => s.login)
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  // Se já está autenticado, redireciona direto
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [])

  function onSubmit(data: LoginForm) {
    const ok = login(data.email, data.password)
    if (!ok) {
      alert('Usuário ou senha inválidos!')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="bg-white/95 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-100 relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="flex flex-col items-center mb-6">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2 text-indigo-700"><rect width="24" height="24" rx="12" fill="currentColor" opacity=".1"/><path d="M7 12h10M7 12l3.5-3.5M7 12l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 tracking-tight">Acesso Seguro</h2>
          <span className="text-xs text-gray-400 mt-1">Entre com sua conta para acessar o painel</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">E-mail</label>
            <input {...register('email')} autoFocus autoComplete="username" placeholder="Digite seu e-mail" className={`input input-bordered w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50`} />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Senha</label>
            <input {...register('password')} type="password" autoComplete="current-password" placeholder="Digite sua senha" className={`input input-bordered w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50`} />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 focus:ring-2 focus:ring-indigo-400">
            {isSubmitting && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 text-sm">Não tem conta? <Link to="/register" className="text-indigo-600 underline font-medium">Cadastre-se</Link></span>
        </div>
      </div>
    </div>
  )
}
