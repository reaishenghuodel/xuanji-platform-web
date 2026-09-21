import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'member' | 'viewer'
  isFirstLogin?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  markOnboarded: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: Record<string, User> = {
  'admin@xuanji.ai': {
    id: '1',
    name: '管理员',
    email: 'admin@xuanji.ai',
    role: 'admin',
  },
  'demo@xuanji.ai': {
    id: '2',
    name: '演示用户',
    email: 'demo@xuanji.ai',
    role: 'member',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('xuanji_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS[email.toLowerCase()]
    if (!found || password !== '123456') {
      setLoading(false)
      throw new Error('邮箱或密码错误')
    }
    setUser(found)
    localStorage.setItem('xuanji_user', JSON.stringify(found))
    setLoading(false)
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      name,
      email: email.toLowerCase(),
      role: 'member',
      isFirstLogin: true,
    }
    setUser(newUser)
    localStorage.setItem('xuanji_user', JSON.stringify(newUser))
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('xuanji_user')
  }, [])

  const markOnboarded = useCallback(() => {
    setUser(prev => {
      if (!prev) return null
      const updated = { ...prev, isFirstLogin: false }
      localStorage.setItem('xuanji_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading,
      markOnboarded,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
