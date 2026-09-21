import { useState } from 'react'
import { X, Eye, EyeOff, Sparkles, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
}

function LoginModal({ isOpen, onClose, defaultMode = 'login' }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, register, loading } = useAuth()
  const { addToast } = useToast()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
        addToast('登录成功，欢迎回来！', 'success')
      } else {
        if (!form.agree) {
          setError('请同意用户协议')
          return
        }
        await register(form.name, form.email, form.password)
        addToast('注册成功，欢迎加入璇玑智科！', 'success')
      }
      onClose()
    } catch (err: any) {
      setError(err.message || '操作失败，请重试')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
      >
        {/* Header */}
        <div className="relative px-6 pt-8 pb-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg transition-all"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {mode === 'login' ? '欢迎回来' : '创建账号'}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {mode === 'login' ? '登录您的璇玑智科账号' : '注册开始使用 GEO 智能运营平台'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4">
          {/* Name field - register only */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>姓名</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="请输入您的姓名"
                  className="input-field pl-10 pr-4 py-2.5 w-full text-sm"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>邮箱</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="请输入邮箱地址"
                className="input-field pl-10 pr-4 py-2.5 w-full text-sm"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>密码</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder={mode === 'login' ? '请输入密码' : '设置登录密码'}
                className="input-field pl-10 pr-10 py-2.5 w-full text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-status-red-50)', color: 'var(--color-status-red)' }}>
              {error}
            </div>
          )}

          {/* Agree checkbox - register only */}
          {mode === 'register' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
                className="w-4 h-4 rounded accent-sky-500"
              />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                我已阅读并同意 <a href="#" style={{ color: 'var(--color-primary)' }}>用户协议</a> 和 <a href="#" style={{ color: 'var(--color-primary)' }}>隐私政策</a>
              </span>
            </label>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#0284C7' }}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'login' ? '登录' : '注册'}
          </button>

          {/* Switch mode */}
          <div className="text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {mode === 'login' ? (
              <>
                还没有账号？{' '}
                <button type="button" onClick={() => { setMode('register'); setError('') }} className="font-medium" style={{ color: 'var(--color-primary)' }}>
                  立即注册
                </button>
              </>
            ) : (
              <>
                已有账号？{' '}
                <button type="button" onClick={() => { setMode('login'); setError('') }} className="font-medium" style={{ color: 'var(--color-primary)' }}>
                  直接登录
                </button>
              </>
            )}
          </div>

          {/* Demo hint */}
          <div className="text-center pt-2 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              演示账号: <span className="font-mono" style={{ color: 'var(--color-primary)' }}>admin@xuanji.ai</span> / 密码: <span className="font-mono" style={{ color: 'var(--color-primary)' }}>123456</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
