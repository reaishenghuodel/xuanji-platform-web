import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const pageTitleMap: Record<string, string> = {
  '/dashboard': '数据概览',
  '/strategy': 'GEO策略规划',
  '/monitor': '品牌AI监测',
  '/citations': 'AI引用监测',
  '/prompts': '提示覆盖分析',
  '/keywords': '智能选词',
  '/content': 'AI内容创作',
  '/materials': '达人素材库',
  '/knowledge': 'AI知识库',
  '/reports': 'GEO诊断报告',
  '/ranking': '团队数据大盘',
  '/cases': 'GEO案例',
  '/alerts': '告警中心',
  '/settings': '系统设置',
}

function applyStoredTheme() {
  const stored = localStorage.getItem('xuanji_theme')
  if (!stored) return
  const themeMap: Record<string, Record<string, string>> = {
    dark: {
      'bg-primary': '#0B1120', 'bg-surface': '#1E293B', 'bg-surface-light': '#0F172A',
      'bg-card': '#1E293B', 'border-default': '#334155',
      'text-primary': '#F1F5F9', 'text-secondary': '#94A3B8',
    },
    light: {
      'bg-primary': '#F8FAFC', 'bg-surface': '#FFFFFF', 'bg-surface-light': '#F1F5F9',
      'bg-card': '#FFFFFF', 'border-default': '#E2E8F0',
      'text-primary': '#0F172A', 'text-secondary': '#64748B',
    },
    purple: {
      'bg-primary': '#1E1B4B', 'bg-surface': '#312E81', 'bg-surface-light': '#2E2A5F',
      'bg-card': '#312E81', 'border-default': '#4338CA',
      'text-primary': '#F1F5F9', 'text-secondary': '#C4B5FD',
    },
  }
  const theme = themeMap[stored]
  if (theme) {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    })
  }
}

function AppLayout() {
  const location = useLocation()
  const pageTitle = pageTitleMap[location.pathname] || '璇玑智科'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    applyStoredTheme()
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          pageTitle={pageTitle}
          onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
