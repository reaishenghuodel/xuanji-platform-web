import { useState, useEffect } from 'react'
import {
  Sparkles, Eye, BarChart3, Zap, Globe, Users, FileBarChart, ArrowRight,
  CheckCircle, Shield, TrendingUp, Target, ChevronRight, X,
  MessageSquare, PenTool, Quote, Menu, Crown
} from 'lucide-react'
import LoginModal from '../components/LoginModal'

function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
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
  }, [])

  const features = [
    {
      icon: Eye,
      title: 'AI 智能监测',
      desc: '实时监测品牌在 DeepSeek、文心一言等主流 AI 模型中的表现，全方位掌握品牌曝光情况',
      color: 'var(--color-primary)',
    },
    {
      icon: BarChart3,
      title: '数据可视化',
      desc: '直观的图表展示品牌最新推荐数、推荐率、推荐趋势变化等关键指标，让数据一目了然',
      color: 'var(--color-accent)',
    },
    {
      icon: Zap,
      title: '效率拓展',
      desc: '优选问题批量产出，帮助提升品牌拓词&关键问题的效率，提高 AI 模型中的场景覆盖率',
      color: 'var(--color-secondary)',
    },
    {
      icon: Globe,
      title: '多平台覆盖',
      desc: '支持 8+ 主流 AI 平台监测，覆盖 DeepSeek/ChatGPT/Perplexity/文心/通义/豆包/Kimi/Gemini',
      color: 'var(--color-primary)',
    },
    {
      icon: Users,
      title: '团队协作',
      desc: '支持多人协作管理，权限分级控制，让团队高效协同完成品牌优化工作',
      color: 'var(--color-accent)',
    },
    {
      icon: FileBarChart,
      title: '诊断报告',
      desc: '生成专业的品牌诊断报告，深度分析品牌表现，提供可落地的优化策略',
      color: 'var(--color-secondary)',
    },
    {
      icon: PenTool,
      title: 'AI 内容创作',
      desc: 'AI 图文创作、智能改写、卖点提取、智能选题、直播复盘，一站搞定内容生产',
      color: 'var(--color-primary)',
    },
    {
      icon: MessageSquare,
      title: '达人素材库',
      desc: 'AI 匹配度评分、内容趋势分析、智能洞察，助力精准达人合作与内容策略',
      color: 'var(--color-accent)',
    },
    {
      icon: Quote,
      title: '引用监测',
      desc: '追踪品牌在各 AI 平台的被引用情况，分析引用来源、准确性，维护品牌声誉',
      color: 'var(--color-secondary)',
    },
  ]

  const cases = [
    {
      title: '垄断 AI 首推荐席位',
      subtitle: '确立"细分领域专家"绝对权威',
      result: '成功卡位核心意图的首要推荐位，在 AI 关键决策入口建立压倒性信任优势',
      strategy: '逆向工程 AI 信任链，针对 AI 评测逻辑系统投喂行业资质、法律背书等高权重内容',
      industry: '移民服务',
      metric: '推荐率 TOP1',
      color: 'var(--color-primary)',
    },
    {
      title: '锁定 60%+ 推荐率',
      subtitle: '打造 AI 眼中的"培育钻爱马仕"',
      result: 'AI 大模型推荐率长期稳定在 60% 以上，构筑极高竞争壁垒',
      strategy: '抢占语义定义权，植入差异化标签，训练 AI 识别独特价值',
      industry: '新奢品牌',
      metric: '60%+ 推荐率',
      color: 'var(--color-accent)',
    },
    {
      title: '捕获顶级决策者',
      subtitle: '由 AI "背书"促成千万级大单',
      result: '董事长通过 DeepSeek 对比后最终拍板选择，成功促成商业合同落地',
      strategy: 'B2B 权威性重构，向 AI 系统性论证行业领导力',
      industry: '管理咨询',
      metric: '千万级大单',
      color: 'var(--color-secondary)',
    },
  ]

  const stats = [
    { value: '15+', label: '主流 AI 平台', desc: '覆盖 DeepSeek、文心一言、通义千问、豆包、Kimi 等' },
    { value: '10亿+', label: '日监测数据', desc: '7×24 小时实时追踪品牌 AI 表现' },
    { value: '300%', label: '平均提及率提升', desc: '持续优化品牌 AI 数字资产' },
    { value: '60%', label: '运营成本降低', desc: 'AI 自动化替代重复性运营工作' },
  ]

  const comparisonRows = [
    { feature: 'AI 平台覆盖', xuanji: '8+（国内最全）', mxspark: '5-6', otterly: '10+', peec: '5', profound: '8+' },
    { feature: '品牌监测', xuanji: '✅', mxspark: '✅', otterly: '✅', peec: '✅', profound: '✅' },
    { feature: '引用追踪', xuanji: '✅', mxspark: '✅', otterly: '✅', peec: '❌', profound: '✅' },
    { feature: '内容生成', xuanji: '✅', mxspark: '❌', otterly: '❌', peec: '✅', profound: '❌' },
    { feature: '智能选词', xuanji: '✅ DSO/RSO/WSO/GEO', mxspark: '❌', otterly: '❌', peec: '✅', profound: '❌' },
    { feature: '达人素材', xuanji: '✅', mxspark: '❌', otterly: '❌', peec: '❌', profound: '❌' },
    { feature: 'GROI 量化', xuanji: '✅', mxspark: '❌', otterly: '❌', peec: '❌', profound: '❌' },
    { feature: '白标报告', xuanji: '✅', mxspark: '❌', otterly: '✅', peec: '❌', profound: '✅' },
    { feature: 'API 开放', xuanji: '✅', mxspark: '✅', otterly: '✅', peec: '❌', profound: '✅' },
    { feature: '本土化', xuanji: '✅ DeepSeek/文心/通义', mxspark: '✅', otterly: '❌', peec: '❌', profound: '❌' },
    { feature: '价格区间', xuanji: '¥0-299/月', mxspark: '$99-299', otterly: '$0-349', peec: '$49-299', profound: '$500+' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(11, 17, 32, 0.95)', backdropFilter: 'blur(10px)', borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</div>
              <div className="text-xs hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>中国企业的AI搜索可见度管家</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>核心功能</a>
            <a href="#dashboard" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>AI 全景看板</a>
            <a href="#diagnosis" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>免费诊断</a>
            <a href="#cases" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>成功案例</a>
            <a href="#comparison" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>竞品对比</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => { setLoginMode('login'); setLoginOpen(true) }}
              className="hidden sm:inline-flex px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'; e.currentTarget.style.boxShadow = '0 0 12px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
            >
              登录
            </button>
            <button
              onClick={() => { setLoginMode('register'); setLoginOpen(true) }}
              className="px-4 md:px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200"
              style={{ backgroundColor: 'var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 12px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span className="hidden md:inline">免费试用</span>
              <span className="md:hidden">试用</span>
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-lg transition-all"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-50)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'rgba(11, 17, 32, 0.98)' }}>
            <div className="px-4 py-3 space-y-2">
              {[
                { href: '#features', label: '核心功能' },
                { href: '#dashboard', label: 'AI 全景看板' },
                { href: '#diagnosis', label: '免费诊断' },
                { href: '#cases', label: '成功案例' },
                { href: '#comparison', label: '竞品对比' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileNavOpen(false); setLoginMode('login'); setLoginOpen(true) }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors sm:hidden"
                style={{ color: 'var(--color-primary)' }}
              >
                登录
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>国内首家 AI 搜索可见度诊断平台</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            中国企业的 <span style={{ color: 'var(--color-primary)' }}>AI 搜索可见度</span> 管家
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            覆盖 DeepSeek、文心一言、通义千问、豆包、Kimi 等 15+ 国内主流 AI 平台，<br className="hidden md:block" />
            实时监测品牌 AI 表现，30秒出诊断报告
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => window.location.href = '/#/diagnosis'}
              className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 flex items-center gap-2"
              style={{ backgroundColor: 'var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 20px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>免费诊断</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setLoginMode('register'); setLoginOpen(true) }}
              className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}
            >
              <span>免费试用</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}
            >
              <span>查看案例</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{stat.value}</div>
                <div className="text-sm font-medium mt-1" style={{ color: 'var(--color-text-primary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>核心功能</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              一体化 GEO 智能运营，从监测到优化，从数据到执行
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border transition-all duration-300 card-hover"
                  style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌 AI 全景看板</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              一个面板，掌握品牌在 AI 世界中的全部表现
            </p>
          </div>
          <div className="rounded-2xl border p-8" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'AI 推荐率', value: '68.5%', change: '+12.3%', icon: Target, color: 'var(--color-accent)' },
                { label: '品牌提及量', value: '12,847', change: '+34.2%', icon: TrendingUp, color: 'var(--color-primary)' },
                { label: '竞品覆盖', value: '8+ 平台', change: '实时', icon: Globe, color: 'var(--color-secondary)' },
                { label: '运营效率', value: '提升 10x', change: '-60% 成本', icon: Zap, color: 'var(--color-accent)' },
              ].map((kpi, i) => {
                const Icon = kpi.icon
                return (
                  <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{kpi.label}</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-status-green)' }}>{kpi.change}</div>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <h4 className="text-sm font-medium mb-4" style={{ color: 'var(--color-text-secondary)' }}>推荐率趋势</h4>
                <div className="h-48 flex items-end gap-2">
                  {[52, 54, 56, 58, 62, 64, 68.5].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md transition-all duration-500" style={{
                        height: `${v * 3}px`,
                        backgroundColor: i === 6 ? 'var(--color-accent)' : 'var(--color-primary-50)',
                      }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>D{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <h4 className="text-sm font-medium mb-4" style={{ color: 'var(--color-text-secondary)' }}>平台分布</h4>
                <div className="space-y-3">
                  {[
                    { name: 'DeepSeek', value: 38, color: 'var(--color-primary)' },
                    { name: '文心一言', value: 25, color: 'var(--color-secondary)' },
                    { name: '通义千问', value: 18, color: 'var(--color-accent)' },
                    { name: '豆包', value: 12, color: '#8B5CF6' },
                    { name: 'Kimi', value: 7, color: '#F59E0B' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs w-16" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>成功案例</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              GEO 优化实战，帮助品牌在 AI 时代赢得竞争
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className="rounded-xl border overflow-hidden transition-all duration-300 card-hover"
                style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
              >
                <div className="h-2" style={{ backgroundColor: caseItem.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="tag text-xs" style={{ backgroundColor: `${caseItem.color}20`, color: caseItem.color }}>
                      {caseItem.industry}
                    </span>
                    <span className="tag text-xs tag-accent" style={{ backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent)' }}>
                      {caseItem.metric}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{caseItem.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: caseItem.color }}>{caseItem.subtitle}</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{caseItem.result}</p>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>GEO 策略</div>
                    <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{caseItem.strategy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>数据规模</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              强大的数据能力，支撑精准的品牌 AI 运营
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, value: '15+', label: '主流 AI 平台', desc: 'DeepSeek、文心一言、通义千问、豆包、Kimi 等' },
              { icon: BarChart3, value: '10亿+', label: '日监测数据', desc: '7×24 小时实时追踪品牌 AI 表现' },
              { icon: Target, value: '300%', label: '平均提及率提升', desc: '持续优化品牌 AI 数字资产' },
              { icon: Zap, value: '60%', label: '运营成本降低', desc: 'AI 自动化替代重复性运营工作' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="p-6 rounded-xl border text-center" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>{stat.value}</div>
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{stat.label}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{stat.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>为什么选择璇玑智科</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              国内最完整的 GEO 全链路平台，深度本土化优势
            </p>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>功能维度</th>
                    <th className="text-center py-4 px-4 text-sm font-bold" style={{ color: 'var(--color-accent)' }}>璇玑智科</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>MXSpark</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Otterly.AI</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Peec AI</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Profound</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                      <td className="py-4 px-6 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{row.feature}</td>
                      <td className="py-4 px-4 text-center text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{row.xuanji}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.mxspark}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.otterly}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.peec}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.profound}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-primary-50)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}>
            <Crown className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>璇玑会员</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            加入璇玑会员，解锁全部 <span style={{ color: 'var(--color-primary)' }}>GEO 智能运营</span> 能力
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            定制化服务方案，专属会员顾问，助力品牌在 AI 时代赢得竞争
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => { setLoginMode('register'); setLoginOpen(true) }}
              className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 flex items-center gap-2"
              style={{ backgroundColor: 'var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 20px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>立即加入会员</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}
            >
              <span>查看客户案例</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            {['专属会员顾问', '定制化方案', '全功能解锁'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Crown className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Diagnosis */}
      <section id="diagnosis" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-primary-50)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            30秒获取您的 <span style={{ color: 'var(--color-primary)' }}>AI 搜索可见度</span> 诊断报告
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            覆盖 DeepSeek、文心一言、通义千问、豆包、Kimi 等 15+ 国内主流 AI 平台，<br className="hidden md:block" />
            实时了解您的品牌在 AI 搜索中的真实表现与优化空间
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => { setLoginMode('register'); setLoginOpen(true) }}
              className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 flex items-center gap-2"
              style={{ backgroundColor: 'var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 20px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>立即免费诊断</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}
            >
              <span>查看客户案例</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            {['无需信用卡', '30秒出报告', '覆盖15+平台'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-primary-50)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            开启您的 <span style={{ color: 'var(--color-primary)' }}>GEO 智能运营</span> 之旅
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            立即注册，免费体验璇玑智科一体化 GEO 智能运营平台
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => { setLoginMode('register'); setLoginOpen(true) }}
              className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 flex items-center gap-2"
              style={{ backgroundColor: 'var(--color-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284C7'; e.currentTarget.style.boxShadow = '0 0 20px var(--color-primary-50)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>免费试用</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            {['无需信用卡', '7 天免费体验', '随时取消'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>GEO 智能运营平台</div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                国内领先的 GEO 智能运营 SaaS 平台，帮助品牌在 AI 时代赢得竞争。
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>产品</h4>
              <div className="space-y-2">
                {['品牌监测', '智能选词', '内容创作', '达人素材', '诊断报告'].map(item => (
                  <a key={item} href="#" className="block text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>资源</h4>
              <div className="space-y-2">
                {['GEO 案例', '帮助中心', 'API 文档', '博客', '更新日志'].map(item => (
                  <a key={item} href="#" className="block text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>联系我们</h4>
              <div className="space-y-2">
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>商务合作：business@xuanjizhike.com</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>技术支持：support@xuanjizhike.com</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex items-center justify-between" style={{ borderColor: 'var(--color-border-default)' }}>
            <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              © 2026 璇玑智科人工智能一体化应用平台. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              {['隐私政策', '服务条款', 'Cookie 设置'].map(item => (
                <a key={item} href="#" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} defaultMode={loginMode} />
    </div>
  )
}

export default LandingPage
