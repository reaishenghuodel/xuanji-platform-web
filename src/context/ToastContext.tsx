import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idCounter = useRef(0)

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${++idCounter.current}`
    setToasts(prev => [...prev, { id, message, type }])
    // Auto remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const ctx = useContext(ToastContext)
  if (!ctx) return null
  const { toasts, removeToast } = ctx

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const colorMap = {
          success: { bg: 'var(--color-accent)', icon: '✓' },
          error: { bg: 'var(--color-status-red)', icon: '✕' },
          warning: { bg: 'var(--color-status-yellow)', icon: '!' },
          info: { bg: 'var(--color-primary)', icon: 'i' },
        }
        const style = colorMap[toast.type]
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] max-w-md animate-in slide-in-from-right"
            style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: style.bg }}
            >
              {style.icon}
            </div>
            <span className="text-sm flex-1" style={{ color: 'var(--color-text-primary)' }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-xs font-bold flex-shrink-0"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
