import { useState, useEffect } from 'react'
import { User, Bell, Shield, Palette, Globe, Save, CheckCircle, Users, Key, Database, Clock, Zap, Mail, MessageSquare } from 'lucide-react'

const themes = {
  dark: {
    'bg-primary': '#0B1120',
    'bg-surface': '#1E293B',
    'bg-surface-light': '#0F172A',
    'bg-card': '#1E293B',
    'border-default': '#334155',
    'text-primary': '#F1F5F9',
    'text-secondary': '#94A3B8',
  },
  light: {
    'bg-primary': '#F8FAFC',
    'bg-surface': '#FFFFFF',
    'bg-surface-light': '#F1F5F9',
    'bg-card': '#FFFFFF',
    'border-default': '#E2E8F0',
    'text-primary': '#0F172A',
    'text-secondary': '#64748B',
  },
  purple: {
    'bg-primary': '#1E1B4B',
    'bg-surface': '#312E81',
    'bg-surface-light': '#2E2A5F',
    'bg-card': '#312E81',
    'border-default': '#4338CA',
    'text-primary': '#F1F5F9',
    'text-secondary': '#C4B5FD',
  },
}

function applyTheme(themeKey: keyof typeof themes) {
  const theme = themes[themeKey]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value)
  })
}

function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light' | 'purple'>(() => {
    const stored = localStorage.getItem('xuanji_theme')
    return (stored as 'dark' | 'light' | 'purple') || 'dark'
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'purple') => {
    setTheme(newTheme)
    localStorage.setItem('xuanji_theme', newTheme)
  }

  const [notificationSettings, setNotificationSettings] = useState({
    brandAlert: true,
    competitorMonitor: true,
    dailyReport: false,
    aiContentDone: true,
    keywordChange: false,
    emailNotify: true,
    smsNotify: false,
    webhookNotify: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const sections = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'team', label: '团队管理', icon: Users },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'appearance', label: '外观主题', icon: Palette },
    { id: 'platform', label: '平台管理', icon: Globe },
    { id: 'api', label: 'API 配置', icon: Key },
  ]

  const teamMembers = [
    { name: '张小明', role: '管理员', email: 'zhang@xuanji.ai', status: 'online', lastActive: '刚刚' },
    { name: '李小红', role: '内容运营', email: 'li@xuanji.ai', status: 'online', lastActive: '5分钟前' },
    { name: '王小强', role: '数据分析师', email: 'wang@xuanji.ai', status: 'offline', lastActive: '2小时前' },
    { name: '赵小芳', role: '达人运营', email: 'zhao@xuanji.ai', status: 'online', lastActive: '10分钟前' },
  ]

  const apiEndpoints = [
    { name: 'DeepSeek API', status: 'connected', key: '*** (demo)', rate: '1,200/天' },
    { name: '文心一言 API', status: 'connected', key: 'ak-***9c4d', rate: '800/天' },
    { name: '通义千问 API', status: 'connected', key: 'tk-***3e8f', rate: '600/天' },
    { name: '豆包 API', status: 'warning', key: 'dk-***1b5a', rate: '200/天' },
    { name: 'Kimi API', status: 'connected', key: 'kk-***6d7e', rate: '500/天' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Nav */}
      <div className="card lg:col-span-1 h-fit">
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-200"
                style={{
                  backgroundColor: activeSection === section.id ? 'var(--color-primary-50)' : 'transparent',
                  color: activeSection === section.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  borderLeft: activeSection === section.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="card lg:col-span-3">
        {activeSection === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>个人资料</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>管理员</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>admin@xuanji.ai</div>
                <span className="tag tag-primary text-xs mt-1">超级管理员</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>用户名</label>
                <input type="text" defaultValue="admin" className="input-field w-full" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>邮箱</label>
                <input type="email" defaultValue="admin@xuanji.ai" className="input-field w-full" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>手机号</label>
                <input type="tel" defaultValue="138****8888" className="input-field w-full" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>公司名称</label>
                <input type="text" defaultValue="璇玑智科" className="input-field w-full" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>职位</label>
                <input type="text" defaultValue="GEO 运营总监" className="input-field w-full" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-text-secondary)' }}>部门</label>
                <input type="text" defaultValue="数字营销部" className="input-field w-full" />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>团队管理</h3>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                邀请成员
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">成员</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">角色</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">邮箱</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">最后活跃</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                            <User className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{member.role}</span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{member.email}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${member.status === 'online' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {member.status === 'online' ? '在线' : '离线'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{member.lastActive}</td>
                      <td className="py-3 px-4">
                        <button className="text-sm" style={{ color: 'var(--color-primary)' }}>编辑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>团队配额</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>成员数</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>4 / 10</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: 'var(--color-primary)' }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>品牌监测数</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>12 / 20</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: 'var(--color-accent)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>通知设置</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>系统通知</div>
                {[
                  { key: 'brandAlert' as const, label: '品牌推荐率异常预警', desc: '当推荐率波动超过 5% 时发送通知' },
                  { key: 'competitorMonitor' as const, label: '竞品动态监控', desc: '竞品推荐率变化时发送通知' },
                  { key: 'dailyReport' as const, label: '每日数据报告', desc: '每天早 9 点发送品牌数据简报' },
                  { key: 'aiContentDone' as const, label: 'AI 内容生成完成', desc: 'AI 内容生成完成后通知' },
                  { key: 'keywordChange' as const, label: '关键词排名变化', desc: '关键词排名升降时通知' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.label}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className="w-11 h-6 rounded-full transition-all duration-200 relative"
                      style={{ backgroundColor: notificationSettings[item.key] ? 'var(--color-primary)' : 'var(--color-border-default)' }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200"
                        style={{ left: notificationSettings[item.key] ? '24px' : '4px' }} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>通知渠道</div>
                {[
                  { key: 'emailNotify' as const, label: '邮件通知', desc: '通过邮件接收重要通知', icon: Mail },
                  { key: 'smsNotify' as const, label: '短信通知', desc: '通过短信接收紧急预警', icon: MessageSquare },
                  { key: 'webhookNotify' as const, label: 'Webhook 推送', desc: '推送到企业微信/钉钉/飞书', icon: Database },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.key} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.label}</div>
                          <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className="w-11 h-6 rounded-full transition-all duration-200 relative"
                        style={{ backgroundColor: notificationSettings[item.key] ? 'var(--color-primary)' : 'var(--color-border-default)' }}
                      >
                        <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200"
                          style={{ left: notificationSettings[item.key] ? '24px' : '4px' }} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>安全设置</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>修改密码</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="password" placeholder="当前密码" className="input-field" />
                  <input type="password" placeholder="新密码" className="input-field" />
                  <input type="password" placeholder="确认新密码" className="input-field" />
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>两步验证</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>启用两步验证，增强账户安全性</div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className="w-11 h-6 rounded-full transition-all duration-200 relative"
                    style={{ backgroundColor: twoFactorEnabled ? 'var(--color-primary)' : 'var(--color-border-default)' }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200"
                      style={{ left: twoFactorEnabled ? '24px' : '4px' }} />
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>登录设备管理</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-status-green)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Windows Chrome · 北京 IP</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>当前设备</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-text-secondary)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Mac Safari · 上海 IP</span>
                    </div>
                    <button className="text-xs" style={{ color: 'var(--color-status-red)' }}>下线</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>外观主题</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'dark' as const, name: '深空科技', bg: '#0B1120', desc: '深色科技风' },
                { key: 'light' as const, name: '极昼白', bg: '#F8FAFC', desc: '浅色明亮风' },
                { key: 'purple' as const, name: '极光紫', bg: '#1E1B4B', desc: '紫色神秘风' },
              ].map(t => (
                <div
                  key={t.key}
                  onClick={() => handleThemeChange(t.key)}
                  className="p-4 rounded-xl border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: theme === t.key ? 'var(--color-primary)' : 'var(--color-border-default)',
                    backgroundColor: 'var(--color-bg-surface-light)',
                  }}
                >
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{t.name}</div>
                  <div className="h-16 rounded-lg mb-2" style={{ backgroundColor: t.bg }} />
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {theme === t.key ? '当前使用' : t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'platform' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>平台管理</h3>
            <div className="space-y-3">
              {[
                { name: 'DeepSeek', status: 'connected', desc: '已接入，数据同步正常', lastSync: '2分钟前' },
                { name: '文心一言', status: 'connected', desc: '已接入，数据同步正常', lastSync: '5分钟前' },
                { name: '通义千问', status: 'connected', desc: '已接入，数据同步正常', lastSync: '3分钟前' },
                { name: '豆包', status: 'connected', desc: '已接入，数据同步正常', lastSync: '10分钟前' },
                { name: 'Kimi', status: 'connected', desc: '已接入，数据同步正常', lastSync: '1分钟前' },
                { name: '抖音', status: 'pending', desc: '待接入，需配置 API Key', lastSync: '-' },
                { name: '小红书', status: 'pending', desc: '待接入，需配置 API Key', lastSync: '-' },
                { name: '微信', status: 'pending', desc: '待接入，需配置 API Key', lastSync: '-' },
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: platform.status === 'connected' ? 'var(--color-primary-50)' : 'var(--color-bg-surface)', color: platform.status === 'connected' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                      {platform.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{platform.name}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{platform.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{platform.lastSync}</span>
                    <span className={`badge ${platform.status === 'connected' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                      {platform.status === 'connected' ? '已接入' : '待接入'}
                    </span>
                    <button className="btn-secondary text-xs">
                      {platform.status === 'connected' ? '配置' : '接入'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'api' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>API 配置</h3>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Key className="w-4 h-4" />
                添加 API Key
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">API Key</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">日调用量</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((api, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{api.name}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${api.status === 'connected' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {api.status === 'connected' ? '正常' : '限速'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{api.key}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{api.rate}</td>
                      <td className="py-3 px-4">
                        <button className="text-sm mr-3" style={{ color: 'var(--color-primary)' }}>编辑</button>
                        <button className="text-sm" style={{ color: 'var(--color-status-red)' }}>删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>API 使用统计</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>3,300</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>今日调用</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>98.2%</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>成功率</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>245ms</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>平均响应</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border-default)' }}>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>已保存</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>保存设置</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
