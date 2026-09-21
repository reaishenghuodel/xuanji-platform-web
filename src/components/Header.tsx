import { useState, useRef, useEffect } from 'react'
import { Bell, Search, User, Menu, ChevronDown, LogOut, Settings, Shield, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

interface HeaderProps {
  pageTitle: string
  onMenuToggle?: () => void
}

const notifications = [
  { id: 1, title: '品牌推荐率下降', desc: 'DeepSeek 推荐率从 68% 降至 58%', time: '10分钟前', type: 'warning', read: false },
  { id: 2, title: '引用数异常波动', desc: '日引用数环比下降 35%', time: '35分钟前', type: 'danger', read: false },
  { id: 3, title: '新功能上线', desc: 'GEO策略规划模块已正式发布', time: '2小时前', type: 'info', read: true },
  { id: 4, title: '周报已生成', desc: '本周品牌监测报告已就绪', time: '昨天', type: 'success', read: true },
]

function Header({ pageTitle, onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    addToast('已成功退出登录', 'success')
  }

  return (
    <header
      className="flex items-center justify-between h-16 px-4 md:px-6 border-b flex-shrink-0"
      style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg transition-all"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg md:text-xl font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            placeholder="全局搜索..."
            className="input-field pl-9 pr-4 py-2 text-sm w-40 md:w-64"
          />
        </div>

        <div className="relative" ref={notifRef}>
          <button
            className="relative p-2 rounded-lg transition-all duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: 'var(--color-status-red)' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-xl border shadow-2xl z-50 overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: 'var(--color-border-default)' }}>
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>通知中心</span>
                <button className="text-xs" style={{ color: 'var(--color-primary)' }}>全部已读</button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 border-b cursor-pointer transition-all"
                    style={{ borderColor: 'var(--color-border-default)', backgroundColor: n.read ? 'transparent' : 'var(--color-primary-50)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = n.read ? 'transparent' : 'var(--color-primary-50)'}>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{
                          backgroundColor: n.type === 'danger' ? 'var(--color-status-red)' :
                            n.type === 'warning' ? 'var(--color-status-yellow)' :
                              n.type === 'success' ? 'var(--color-accent)' : 'var(--color-primary)'
                        }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{n.title}</div>
                        <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>{n.desc}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{n.time}</div>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--color-primary)' }} />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                <button className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>查看全部通知</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            className="flex items-center gap-2 p-1.5 rounded-lg transition-all duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium leading-tight" style={{ color: 'var(--color-text-primary)' }}>{user?.name || '用户'}</div>
              <div className="text-xs leading-tight" style={{ color: 'var(--color-text-secondary)' }}>{user?.email || ''}</div>
            </div>
            <ChevronDown className="w-4 h-4 hidden md:block" />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-12 w-56 rounded-xl border shadow-2xl z-50 overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
                <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{user?.name || '用户'}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{user?.email || ''}</div>
              </div>
              <div className="py-1">
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-all"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}>
                  <Settings className="w-4 h-4" />
                  账号设置
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-all"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}>
                  <Shield className="w-4 h-4" />
                  安全中心
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-all"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}>
                  <Mail className="w-4 h-4" />
                  消息通知
                </button>
              </div>
              <div className="border-t py-1" style={{ borderColor: 'var(--color-border-default)' }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-all"
                  style={{ color: 'var(--color-status-red)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-status-red-50)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut className="w-4 h-4" />
                  退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
