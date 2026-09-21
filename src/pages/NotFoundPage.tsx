import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-primary-50)' }}>
          <Sparkles className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
        </div>
        <h1 className="text-7xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>404</h1>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>页面走丢了</h2>
        <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          您访问的页面似乎不存在，或者已被移除。<br className="hidden md:block" />
          请检查链接是否正确，或返回首页继续探索。
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一页
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 16px var(--color-primary-50)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <Home className="w-4 h-4" />
            返回首页
          </button>
        </div>
        <div className="mt-10 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>快速导航</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '首页看板', path: '/app/dashboard' },
              { label: '品牌监测', path: '/app/monitor' },
              { label: '智能选词', path: '/app/keywords' },
              { label: '内容创作', path: '/app/content' },
              { label: '诊断报告', path: '/app/reports' },
              { label: '系统设置', path: '/app/settings' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-100)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
