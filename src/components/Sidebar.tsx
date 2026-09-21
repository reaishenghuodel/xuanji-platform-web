import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Eye, Wand2, PenTool, Users, FileBarChart, BarChart3, Briefcase, Settings, ChevronLeft, ChevronRight, Sparkles, Quote, Target, Map, BookOpen, Bell, X
} from 'lucide-react'

const navItems = [
  { path: '/app/dashboard', label: '首页看板', icon: LayoutDashboard },
  { path: '/app/strategy', label: 'GEO策略规划', icon: Map },
  { path: '/app/monitor', label: '品牌AI监测', icon: Eye },
  { path: '/app/citations', label: 'AI引用监测', icon: Quote },
  { path: '/app/prompts', label: '提示覆盖', icon: Target },
  { path: '/app/keywords', label: '智能选词', icon: Wand2 },
  { path: '/app/content', label: 'AI内容创作', icon: PenTool },
  { path: '/app/materials', label: '达人素材库', icon: Users },
  { path: '/app/knowledge', label: 'AI知识库', icon: BookOpen },
  { path: '/app/ranking', label: '团队数据大盘', icon: BarChart3 },
  { path: '/app/reports', label: '诊断报告', icon: FileBarChart },
  { path: '/app/cases', label: 'GEO案例', icon: Briefcase },
  { path: '/app/alerts', label: '告警中心', icon: Bell },
  { path: '/app/settings', label: '系统设置', icon: Settings },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onMobileClose}
        />
      )}

      <aside
        className="flex flex-col h-full transition-all duration-300 border-r fixed md:relative z-50"
        style={{
          width: collapsed ? 72 : 240,
          backgroundColor: 'var(--color-bg-surface)',
          borderColor: 'var(--color-border-default)',
          transform: mobileOpen !== undefined
            ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)')
            : undefined,
          left: mobileOpen !== undefined ? 0 : undefined,
          top: mobileOpen !== undefined ? 0 : undefined,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b flex-shrink-0 justify-between"
          style={{ borderColor: 'var(--color-border-default)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-base font-bold whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>
                  璇玑智科
                </div>
                <div className="text-xs whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                  GEO 智能运营平台
                </div>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          {mobileOpen !== undefined && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className="flex items-center gap-3 rounded-lg transition-all duration-200 mb-1"
                style={{
                  padding: collapsed ? '10px 12px' : '10px 16px',
                  backgroundColor: active ? 'var(--color-primary-50)' : 'transparent',
                  color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid var(--color-primary)' : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'
                    e.currentTarget.style.color = 'var(--color-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Collapse Button - desktop only */}
        <div className="px-3 pb-4 flex-shrink-0 hidden md:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full rounded-lg transition-all duration-200"
            style={{
              padding: collapsed ? '10px' : '10px 16px',
              backgroundColor: 'var(--color-bg-surface-light)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-default)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-2 text-sm font-medium">收起菜单</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
