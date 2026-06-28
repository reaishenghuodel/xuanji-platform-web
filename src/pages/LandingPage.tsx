import { useState, useEffect, useRef } from 'react'
import {
  Sparkles, Eye, BarChart3, Zap, Globe, Users, FileBarChart, ArrowRight,
  CheckCircle, Shield, TrendingUp, Target, ChevronRight, X,
  MessageSquare, PenTool, Quote, Menu, Crown, Search, Bell, Settings,
  Home, PieChart, FileText, Layers, Lightbulb, Send, Star,
  ArrowUpRight, Play, ChevronDown
} from 'lucide-react'
import LoginModal from '../components/LoginModal'

/* ─── Intersection Observer hook for scroll-triggered animations ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', id, style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal-section ${className}`} id={id} style={style}>
      {children}
    </div>
  )
}

/* ─── Rotating text hook ─── */
function useRotatingText(items: string[], intervalMs = 2500) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % items.length), intervalMs)
    return () => clearInterval(timer)
  }, [items.length, intervalMs])
  return items[index]
}

/* ─── Animated counter hook ─── */
function useAnimatedCounter(target: number, durationMs = 2000) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / durationMs, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, durationMs])

  return { value, ref }
}

/* ─── KPI card sub-component ─── */
function KpiCard({ kpi }: { kpi: { label: string; target: number; suffix: string; color: string; change: string; icon: typeof Target } }) {
  const counter = useAnimatedCounter(kpi.target, 2000)
  const Icon = kpi.icon
  return (
    <div ref={counter.ref} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.color + '20' }}>
          <Icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
        </div>
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{kpi.label}</span>
      </div>
      <div className="text-2xl font-bold" style={{ color: kpi.color }}>
        {counter.value.toLocaleString()}{kpi.suffix}
      </div>
      <div className="text-xs mt-1 flex items-center gap-1" style={{ color: '#22C55E' }}>
        <TrendingUp className="w-3 h-3" />
        {kpi.change}
      </div>
    </div>
  )
}

function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const rotatingPlatform = useRotatingText(
    ['DeepSeek', '文心一言', '通义千问', '豆包', 'Kimi', 'ChatGPT', 'Perplexity', 'Gemini'],
    2200
  )

  /* ─── Theme logic ─── */
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
        document.documentElement.style.setProperty('--color-' + key, value)
      })
    }
  }, [])

  /* ─── Data ─── */
  const features = [
    { icon: Eye, title: 'AI 智能监测', desc: '实时监测品牌在 DeepSeek、文心一言等主流 AI 模型中的表现，全方位掌握品牌曝光情况', color: 'var(--color-primary)' },
    { icon: BarChart3, title: '数据可视化', desc: '直观的图表展示品牌最新推荐数、推荐率、推荐趋势变化等关键指标，让数据一目了然', color: 'var(--color-accent)' },
    { icon: Zap, title: '效率拓展', desc: '优选问题批量产出，帮助提升品牌拓词&关键问题的效率，提高 AI 模型中的场景覆盖率', color: 'var(--color-secondary)' },
    { icon: Globe, title: '多平台覆盖', desc: '支持 8+ 主流 AI 平台监测，覆盖 DeepSeek/ChatGPT/Perplexity/文心/通义/豆包/Kimi/Gemini', color: 'var(--color-primary)' },
    { icon: Users, title: '团队协作', desc: '支持多人协作管理，权限分级控制，让团队高效协同完成品牌优化工作', color: 'var(--color-accent)' },
    { icon: FileBarChart, title: '诊断报告', desc: '生成专业的品牌诊断报告，深度分析品牌表现，提供可落地的优化策略', color: 'var(--color-secondary)' },
    { icon: PenTool, title: 'AI 内容创作', desc: 'AI 图文创作、智能改写、卖点提取、智能选题、直播复盘，一站搞定内容生产', color: 'var(--color-primary)' },
    { icon: MessageSquare, title: '达人素材库', desc: 'AI 匹配度评分、内容趋势分析、智能洞察，助力精准达人合作与内容策略', color: 'var(--color-accent)' },
    { icon: Quote, title: '引用监测', desc: '追踪品牌在各 AI 平台的被引用情况，分析引用来源、准确性，维护品牌声誉', color: 'var(--color-secondary)' },
  ]

  const cases = [
    { title: '垄断 AI 首推荐席位', subtitle: '确立"细分领域专家"绝对权威', result: '成功卡位核心意图的首要推荐位，在 AI 关键决策入口建立压倒性信任优势', strategy: '逆向工程 AI 信任链，针对 AI 评测逻辑系统投喂行业资质、法律背书等高权重内容', industry: '移民服务', metric: '推荐率 TOP1', color: 'var(--color-primary)' },
    { title: '锁定 60%+ 推荐率', subtitle: '打造 AI 眼中的"培育钻爱马仕"', result: 'AI 大模型推荐率长期稳定在 60% 以上，构筑极高竞争壁垒', strategy: '抢占语义定义权，植入差异化标签，训练 AI 识别独特价值', industry: '新奢品牌', metric: '60%+ 推荐率', color: 'var(--color-accent)' },
    { title: '捕获顶级决策者', subtitle: '由 AI "背书"促成千万级大单', result: '董事长通过 DeepSeek 对比后最终拍板选择，成功促成商业合同落地', strategy: 'B2B 权威性重构，向 AI 系统性论证行业领导力', industry: '管理咨询', metric: '千万级大单', color: 'var(--color-secondary)' },
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

  const testimonials = [
    { quote: '璇玑智科帮助我们在 DeepSeek 上的推荐率从 12% 提升到 68%，直接带来了 3 倍的精准客户咨询量。', name: '张明远', title: '市场总监', company: '某新消费品牌', stars: 5 },
    { quote: '作为 B2B 企业，我们最看重的是 AI 搜索中的专业形象塑造。璇玑的诊断报告精准到位，策略建议可直接落地执行。', name: '李思涵', title: '品牌 VP', company: '某管理咨询公司', stars: 5 },
    { quote: '一站式解决了我们在多个 AI 平台上的品牌监测需求，团队效率提升了 10 倍，再也不用逐个平台手动检查了。', name: '王昊宇', title: '增长负责人', company: '某科技独角兽', stars: 5 },
  ]

  const howItWorksSteps = [
    { icon: Search, title: '输入品牌', desc: '输入您的品牌名称和行业关键词，系统自动配置监测方案', color: 'var(--color-primary)' },
    { icon: Lightbulb, title: 'AI 分析', desc: '多平台 AI 模型实时分析品牌表现，生成深度洞察报告', color: 'var(--color-accent)' },
    { icon: FileText, title: '获取报告', desc: '30 秒内生成可视化诊断报告，附带可执行的优化建议', color: 'var(--color-secondary)' },
  ]

  const navLinks = [
    { href: '#features', label: '核心功能' },
    { href: '#dashboard', label: 'AI 全景看板' },
    { href: '#how-it-works', label: '工作流程' },
    { href: '#diagnosis', label: '免费诊断' },
    { href: '#cases', label: '成功案例' },
    { href: '#comparison', label: '竞品对比' },
  ]

  const renderNavLinks = () => navLinks.map(item => (
    <a
      key={item.href}
      href={item.href}
      className="text-sm font-medium transition-colors"
      style={{ color: 'var(--color-text-secondary)' }}
      onMouseEnter={e => { (e.currentTarget.style.color = 'var(--color-primary)') }}
      onMouseLeave={e => { (e.currentTarget.style.color = 'var(--color-text-secondary)') }}
    >
      {item.label}
    </a>
  ))

  const renderMobileNavLinks = () => navLinks.map(item => (
    <a
      key={item.href}
      href={item.href}
      onClick={() => setMobileNavOpen(false)}
      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{ color: 'var(--color-text-secondary)' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent' }}
    >
      {item.label}
    </a>
  ))

  const sidebarItems = [
    { icon: Home, label: '工作台', active: true },
    { icon: Eye, label: '品牌监测' },
    { icon: BarChart3, label: '数据分析' },
    { icon: Target, label: '智能选词' },
    { icon: PenTool, label: '内容创作' },
    { icon: FileText, label: '诊断报告' },
  ]

  const fullSidebarItems = [
    ...sidebarItems.slice(0, 4),
    { icon: PenTool, label: '内容创作', active: false },
    { icon: MessageSquare, label: '达人素材', active: false },
    { icon: FileText, label: '诊断报告', active: false },
    { icon: Users, label: '团队管理', active: false },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* ─── Global CSS for animations and effects ─── */}
      <style>{`
        .reveal-section { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1); }
        .reveal-visible { opacity: 1 !important; transform: translateY(0) !important; }
        .gradient-text { background: linear-gradient(135deg, #0EA5E9, #2DD4BF, #6366F1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .aurora-bg { position: relative; overflow: hidden; }
        .aurora-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 50% at 20% 40%, rgba(14,165,233,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(45,212,191,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 50% 80%, rgba(99,102,241,0.08) 0%, transparent 60%); pointer-events: none; z-index: 0; }
        .aurora-bg > * { position: relative; z-index: 1; }
        .grid-pattern { position: relative; }
        .grid-pattern::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%); -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%); pointer-events: none; z-index: 0; }
        .glow-btn { position: relative; background: linear-gradient(135deg, #0EA5E9, #0284C7); box-shadow: 0 0 20px rgba(14,165,233,0.3), 0 4px 16px rgba(0,0,0,0.2); transition: all 0.3s ease; }
        .glow-btn:hover { box-shadow: 0 0 32px rgba(14,165,233,0.5), 0 8px 24px rgba(0,0,0,0.3); transform: translateY(-1px); }
        .glow-btn::after { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: linear-gradient(135deg, #0EA5E9, #2DD4BF); z-index: -1; opacity: 0; transition: opacity 0.3s; filter: blur(12px); }
        .glow-btn:hover::after { opacity: 0.5; }
        .feature-card { position: relative; background: var(--color-bg-surface); border: 1px solid var(--color-border-default); transition: all 0.4s ease; }
        .feature-card::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; background: linear-gradient(135deg, rgba(14,165,233,0.5), rgba(45,212,191,0.5), rgba(99,102,241,0.5)); z-index: -1; opacity: 0; transition: opacity 0.4s ease; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(14,165,233,0.15); border-color: transparent; }
        .feature-card:hover::before { opacity: 1; }
        .rotating-word { display: inline-block; animation: rotateWord 0.4s ease; }
        @keyframes rotateWord { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .typing-cursor::after { content: '|'; animation: blink 1s step-end infinite; color: var(--color-accent); font-weight: 300; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; } 50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; } }
        .particle { position: absolute; border-radius: 50%; pointer-events: none; animation: float linear infinite; }
        .gradient-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), var(--color-secondary), transparent); opacity: 0.3; }
        @keyframes dashMove { to { stroke-dashoffset: -20; } }
        .dashed-line { stroke-dasharray: 8 6; animation: dashMove 1.5s linear infinite; }
        .browser-frame { border-radius: 12px; overflow: hidden; box-shadow: 0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05); }
        @keyframes counterPulse { 0%, 100% { text-shadow: 0 0 8px rgba(45,212,191,0.3); } 50% { text-shadow: 0 0 20px rgba(45,212,191,0.6); } }
        .stat-glow { animation: counterPulse 3s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
      `}</style>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(11, 17, 32, 0.95)', backdropFilter: 'blur(12px)', borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</div>
              <div className="text-xs hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>中国企业的AI搜索可见度管家</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {renderNavLinks()}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => { setLoginMode('login'); setLoginOpen(true) }} className="hidden sm:inline-flex px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200" style={{ color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.1)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(14,165,233,0.2)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}>登录</button>
            <button onClick={() => { setLoginMode('register'); setLoginOpen(true) }} className="px-4 md:px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px rgba(14,165,233,0.4)' }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}><span className="hidden md:inline">免费试用</span><span className="md:hidden">试用</span></button>
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="md:hidden p-2 rounded-lg transition-all" style={{ color: 'var(--color-text-secondary)' }}>{mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'rgba(11, 17, 32, 0.98)' }}>
            <div className="px-4 py-3 space-y-2">
              {renderMobileNavLinks()}
              <button onClick={() => { setMobileNavOpen(false); setLoginMode('login'); setLoginOpen(true) }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors sm:hidden" style={{ color: 'var(--color-primary)' }}>登录</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="aurora-bg grid-pattern pt-32 pb-24 px-6 relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{ width: (4 + Math.random() * 6) + 'px', height: (4 + Math.random() * 6) + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', background: ['#0EA5E9', '#2DD4BF', '#6366F1'][i % 3], animationDuration: (4 + Math.random() * 6) + 's', animationDelay: Math.random() * 4 + 's', opacity: 0.3 }} />
        ))}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>国内首家 AI 搜索可见度诊断平台</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            中国企业的 <span className="gradient-text">AI 搜索可见度</span> 管家
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            覆盖 <span className="rotating-word typing-cursor" key={rotatingPlatform} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{rotatingPlatform}</span> 等 15+ 国内主流 AI 平台
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-text-secondary)', opacity: 0.8 }}>
            实时监测品牌 AI 表现，30 秒出诊断报告，一站式 GEO 智能运营
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <button onClick={() => { window.location.href = '/#/diagnosis' }} className="glow-btn px-8 py-4 rounded-xl text-base font-medium text-white flex items-center gap-2"><span>免费诊断</span><ArrowRight className="w-5 h-5" /></button>
            <button onClick={() => { setLoginMode('register'); setLoginOpen(true) }} className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2" style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.05)'; e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)'; e.currentTarget.style.transform = 'translateY(0)' }}><span>免费试用</span><ArrowUpRight className="w-5 h-5" /></button>
            <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-text-primary)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}><Play className="w-4 h-4" /><span>查看案例</span></button>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="browser-frame max-w-5xl mx-auto" style={{ border: '1px solid var(--color-border-default)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)' }}>
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} /></div>
              <div className="flex-1 mx-4"><div className="flex items-center gap-2 px-3 py-1 rounded-md text-xs" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}><Search className="w-3 h-3" /><span>app.xuanjizhike.com/dashboard</span></div></div>
              <div className="flex gap-2"><Bell className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} /><Settings className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} /></div>
            </div>
            <div className="flex" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="w-14 md:w-48 border-r py-3 px-2 hidden md:block" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}>
                {sidebarItems.map((item, i) => { const Icon = item.icon; return (<div key={i} className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs mb-1" style={{ backgroundColor: item.active ? 'rgba(14,165,233,0.15)' : 'transparent', color: item.active ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}><Icon className="w-4 h-4" /><span className="hidden lg:inline">{item.label}</span></div>) })}
              </div>
              <div className="flex-1 p-4 md:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[{ label: 'AI 推荐率', value: '68.5%', change: '+12.3%', color: '#2DD4BF' }, { label: '品牌提及量', value: '12,847', change: '+34.2%', color: '#0EA5E9' }, { label: '监测平台', value: '8+', change: '实时', color: '#6366F1' }, { label: '效率提升', value: '10x', change: '-60%成本', color: '#2DD4BF' }].map((kpi, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}><div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{kpi.label}</div><div className="text-lg md:text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div><div className="text-xs" style={{ color: '#22C55E' }}>{kpi.change}</div></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
                    <div className="flex items-center justify-between mb-3"><span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>推荐率趋势</span><span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>近 7 天</span></div>
                    <div className="flex items-end gap-1.5 h-32">{[42, 48, 45, 52, 58, 64, 68.5].map((v, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t transition-all" style={{ height: v * 1.8 + 'px', background: i === 6 ? 'linear-gradient(180deg, #2DD4BF, #0EA5E9)' : 'rgba(14,165,233,0.25)' }} /><span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>D{i + 1}</span></div>))}</div>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
                    <div className="flex items-center justify-between mb-3"><span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>平台表现</span></div>
                    <div className="space-y-2">{[{ platform: 'DeepSeek', rate: '72%', status: '↑' }, { platform: '文心一言', rate: '65%', status: '↑' }, { platform: '通义千问', rate: '58%', status: '→' }, { platform: '豆包', rate: '51%', status: '↑' }, { platform: 'Kimi', rate: '44%', status: '↓' }].map((row, i) => (<div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--color-border-default)' }}><span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{row.platform}</span><div className="flex items-center gap-2"><span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{row.rate}</span><span className="text-xs" style={{ color: row.status === '↑' ? '#22C55E' : row.status === '↓' ? '#EF4444' : 'var(--color-text-secondary)' }}>{row.status}</span></div></div>))}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[{ value: '15+', label: '主流 AI 平台' }, { value: '10亿+', label: '日监测数据' }, { value: '300%', label: '平均提及率提升' }, { value: '60%', label: '运营成本降低' }].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}><div className="text-2xl font-bold stat-glow" style={{ color: 'var(--color-accent)' }}>{stat.value}</div><div className="text-sm font-medium mt-1" style={{ color: 'var(--color-text-primary)' }}>{stat.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ═══ SOCIAL PROOF ═══ */}
      <RevealSection className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium mb-8" style={{ color: 'var(--color-text-secondary)' }}>已被 <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>500+</span> 品牌信赖</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['品牌 A', '品牌 B', '品牌 C', '品牌 D', '品牌 E', '品牌 F'].map((name, i) => (
              <div key={i} className="px-6 py-3 rounded-lg text-sm font-semibold tracking-wider transition-all" style={{ color: 'var(--color-text-secondary)', opacity: 0.5, border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.borderColor = 'var(--color-primary)' }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.borderColor = 'var(--color-border-default)' }}>{name}</div>
            ))}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ FEATURES ═══ */}
      <RevealSection id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}><Layers className="w-4 h-4" style={{ color: 'var(--color-primary)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>核心能力</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>一体化 <span className="gradient-text">GEO 智能运营</span></h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>从监测到优化，从数据到执行，全面覆盖品牌 AI 运营链路</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => { const Icon = feature.icon; return (
              <div key={index} className="feature-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, ' + feature.color + '30, ' + feature.color + '10)' }}><Icon className="w-6 h-6" style={{ color: feature.color }} /></div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{feature.desc}</p>
              </div>
            ) })}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ DASHBOARD PREVIEW ═══ */}
      <RevealSection id="dashboard" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)' }}><PieChart className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>数据看板</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌 AI <span className="gradient-text">全景看板</span></h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>一个面板，掌握品牌在 AI 世界中的全部表现</p>
          </div>
          <div className="browser-frame" style={{ border: '1px solid var(--color-border-default)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)' }}>
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} /><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} /></div>
              <div className="flex-1 mx-4"><div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: 'var(--color-bg-surface-light)', border: '1px solid var(--color-border-default)' }}><Search className="w-3.5 h-3.5" style={{ color: 'var(--color-text-secondary)' }} /><span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>app.xuanjizhike.com/dashboard/analytics</span></div></div>
            </div>
            <div className="flex" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="w-56 border-r py-4 px-3 hidden lg:block" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}>
                <div className="flex items-center gap-2 px-2 mb-6"><div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)' }}><Sparkles className="w-4 h-4 text-white" /></div><span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</span></div>
                {fullSidebarItems.map((item, i) => { const Icon = item.icon; return (<div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1" style={{ backgroundColor: item.active ? 'rgba(14,165,233,0.15)' : 'transparent', color: item.active ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: item.active ? 600 : 400 }}><Icon className="w-4 h-4" /><span>{item.label}</span></div>) })}
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6"><div><h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>数据概览</h3><p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>更新于 2 分钟前</p></div><div className="flex items-center gap-3"><div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}><span>最近 7 天</span><ChevronDown className="w-3 h-3" /></div></div></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[{ label: 'AI 推荐率', target: 68, suffix: '%', color: '#2DD4BF', change: '+12.3%', icon: Target }, { label: '品牌提及量', target: 12847, suffix: '', color: '#0EA5E9', change: '+34.2%', icon: TrendingUp }, { label: '监测平台', target: 8, suffix: '+', color: '#6366F1', change: '实时同步', icon: Globe }, { label: '效率提升', target: 10, suffix: 'x', color: '#2DD4BF', change: '-60% 成本', icon: Zap }].map((kpi, i) => (<KpiCard key={i} kpi={kpi} />))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
                    <div className="flex items-center justify-between mb-4"><span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>推荐率趋势</span><div className="flex gap-3">{['DeepSeek', '文心', '通义'].map((p, i) => (<span key={i} className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}><span className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#0EA5E9', '#6366F1', '#2DD4BF'][i] }} />{p}</span>))}</div></div>
                    <div className="flex items-end gap-2 h-40">{[42, 48, 45, 52, 58, 64, 68.5].map((v, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-md transition-all" style={{ height: v * 2.2 + 'px', background: i === 6 ? 'linear-gradient(180deg, #2DD4BF, #0EA5E9)' : 'rgba(14,165,233,0.3)' }} /><span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>D{i + 1}</span></div>))}</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
                    <div className="flex items-center justify-between mb-4"><span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>平台分布</span><span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>本月</span></div>
                    <div className="space-y-3">{[{ name: 'DeepSeek', value: 38, color: '#0EA5E9' }, { name: '文心一言', value: 25, color: '#6366F1' }, { name: '通义千问', value: 18, color: '#2DD4BF' }, { name: '豆包', value: 12, color: '#8B5CF6' }, { name: 'Kimi', value: 7, color: '#F59E0B' }].map((item, i) => (<div key={i} className="flex items-center gap-3"><span className="text-xs w-16" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span><div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}><div className="h-full rounded-full transition-all duration-1000" style={{ width: item.value + '%', backgroundColor: item.color }} /></div><span className="text-xs font-medium w-8 text-right" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span></div>))}</div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)' }}>
                  <table className="w-full"><thead><tr style={{ borderBottom: '1px solid var(--color-border-default)' }}><th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>平台</th><th className="text-center py-3 px-4 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>推荐率</th><th className="text-center py-3 px-4 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>提及量</th><th className="text-center py-3 px-4 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>趋势</th><th className="text-center py-3 px-4 text-xs font-medium hidden md:table-cell" style={{ color: 'var(--color-text-secondary)' }}>状态</th></tr></thead>
                    <tbody>{[{ platform: 'DeepSeek', rate: '72%', mentions: '4,821', trend: '↑ 15%', status: '优秀' }, { platform: '文心一言', rate: '65%', mentions: '3,247', trend: '↑ 8%', status: '良好' }, { platform: '通义千问', rate: '58%', mentions: '2,156', trend: '→ 0%', status: '稳定' }, { platform: '豆包', rate: '51%', mentions: '1,823', trend: '↑ 22%', status: '良好' }, { platform: 'Kimi', rate: '44%', mentions: '800', trend: '↓ 3%', status: '待优化' }].map((row, i) => (<tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}><td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{row.platform}</td><td className="py-3 px-4 text-center text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{row.rate}</td><td className="py-3 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.mentions}</td><td className="py-3 px-4 text-center text-sm" style={{ color: row.trend.includes('↑') ? '#22C55E' : row.trend.includes('↓') ? '#EF4444' : 'var(--color-text-secondary)' }}>{row.trend}</td><td className="py-3 px-4 text-center hidden md:table-cell"><span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: row.status === '优秀' ? 'rgba(34,197,94,0.15)' : row.status === '待优化' ? 'rgba(239,68,68,0.15)' : 'rgba(14,165,233,0.15)', color: row.status === '优秀' ? '#22C55E' : row.status === '待优化' ? '#EF4444' : 'var(--color-primary)' }}>{row.status}</span></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ HOW IT WORKS ═══ */}
      <RevealSection id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}><Zap className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-secondary)' }}>简单高效</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>三步开启 <span className="gradient-text">AI 品牌优化</span></h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>无需技术背景，30 秒获取专业诊断报告</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto relative">
            <svg className="absolute top-1/2 left-0 right-0 w-full h-4 hidden md:block" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none"><line x1="20%" y1="8" x2="45%" y2="8" stroke="var(--color-primary)" strokeWidth="2" className="dashed-line" opacity="0.4" /><line x1="55%" y1="8" x2="80%" y2="8" stroke="var(--color-accent)" strokeWidth="2" className="dashed-line" opacity="0.4" /></svg>
            {howItWorksSteps.map((step, i) => { const Icon = step.icon; return (
              <div key={i} className="flex-1 text-center relative z-10 max-w-xs">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative" style={{ background: 'linear-gradient(135deg, ' + step.color + '30, ' + step.color + '10)', border: '1px solid ' + step.color + '40' }}>
                  <Icon className="w-9 h-9" style={{ color: step.color }} />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: step.color }}>{i + 1}</div>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
                {i < howItWorksSteps.length - 1 && (<div className="flex justify-center my-6 md:hidden"><div className="w-0.5 h-8" style={{ background: 'linear-gradient(180deg, ' + step.color + ', ' + howItWorksSteps[i + 1].color + ')', opacity: 0.4 }} /></div>)}
              </div>
            ) })}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ CASES ═══ */}
      <RevealSection id="cases" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}><TrendingUp className="w-4 h-4" style={{ color: 'var(--color-primary)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>实战成果</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>成功案例</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>GEO 优化实战，帮助品牌在 AI 时代赢得竞争</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <div key={index} className="rounded-xl border overflow-hidden transition-all duration-300 card-hover" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                <div className="h-2" style={{ background: 'linear-gradient(90deg, ' + caseItem.color + ', transparent)' }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4"><span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: caseItem.color + '20', color: caseItem.color }}>{caseItem.industry}</span><span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(45,212,191,0.15)', color: 'var(--color-accent)' }}>{caseItem.metric}</span></div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{caseItem.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: caseItem.color }}>{caseItem.subtitle}</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{caseItem.result}</p>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}><div className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>GEO 策略</div><div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{caseItem.strategy}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ STATS ═══ */}
      <RevealSection id="stats" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>数据规模</h2><p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>强大的数据能力，支撑精准的品牌 AI 运营</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ icon: Shield, value: '15+', label: '主流 AI 平台', desc: 'DeepSeek、文心一言、通义千问、豆包、Kimi 等', color: 'var(--color-primary)' }, { icon: BarChart3, value: '10亿+', label: '日监测数据', desc: '7×24 小时实时追踪品牌 AI 表现', color: 'var(--color-accent)' }, { icon: Target, value: '300%', label: '平均提及率提升', desc: '持续优化品牌 AI 数字资产', color: 'var(--color-secondary)' }, { icon: Zap, value: '60%', label: '运营成本降低', desc: 'AI 自动化替代重复性运营工作', color: 'var(--color-primary)' }].map((stat, i) => { const Icon = stat.icon; return (
              <div key={i} className="p-6 rounded-xl border text-center transition-all duration-300 card-hover" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ' + stat.color + '30, ' + stat.color + '10)' }}><Icon className="w-7 h-7" style={{ color: stat.color }} /></div>
                <div className="text-3xl font-bold mb-2 stat-glow" style={{ color: 'var(--color-accent)' }}>{stat.value}</div>
                <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>{stat.label}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{stat.desc}</div>
              </div>
            ) })}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ TESTIMONIALS ═══ */}
      <RevealSection id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)' }}><MessageSquare className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>客户心声</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>客户 <span className="gradient-text">真实评价</span></h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>来自各行业品牌方的真实使用反馈</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-xl border transition-all duration-300 card-hover" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                <div className="flex gap-1 mb-4">{[...Array(t.stars)].map((_, j) => (<Star key={j} className="w-4 h-4 fill-current" style={{ color: '#F59E0B' }} />))}</div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)' }}>{t.name[0]}</div>
                  <div><div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{t.name}</div><div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t.title} · {t.company}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ COMPARISON ═══ */}
      <RevealSection id="comparison" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}><CheckCircle className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} /><span className="text-xs font-medium" style={{ color: 'var(--color-secondary)' }}>全面对比</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>为什么选择 <span className="gradient-text">璇玑智科</span></h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>国内最完整的 GEO 全链路平台，深度本土化优势</p>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead><tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}><th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>功能维度</th><th className="text-center py-4 px-4 text-sm font-bold" style={{ color: 'var(--color-accent)' }}>璇玑智科</th><th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>MXSpark</th><th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Otterly.AI</th><th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Peec AI</th><th className="text-center py-4 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Profound</th></tr></thead>
                <tbody>{comparisonRows.map((row, i) => (<tr key={i} className="border-t transition-colors" style={{ borderColor: 'var(--color-border-default)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.03)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}><td className="py-4 px-6 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{row.feature}</td><td className="py-4 px-4 text-center text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{row.xuanji}</td><td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.mxspark}</td><td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.otterly}</td><td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.peec}</td><td className="py-4 px-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{row.profound}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ MEMBERSHIP ═══ */}
      <RevealSection id="membership" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'rgba(14,165,233,0.3)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}><Crown className="w-4 h-4" style={{ color: 'var(--color-primary)' }} /><span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>璇玑会员</span></div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>加入璇玑会员，解锁全部 <span className="gradient-text">GEO 智能运营</span> 能力</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>定制化服务方案，专属会员顾问，助力品牌在 AI 时代赢得竞争</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => { setLoginMode('register'); setLoginOpen(true) }} className="glow-btn px-8 py-4 rounded-xl text-base font-medium text-white flex items-center gap-2"><span>立即加入会员</span><ArrowRight className="w-5 h-5" /></button>
            <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2" style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.05)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}><span>查看客户案例</span><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">{['专属会员顾问', '定制化方案', '全功能解锁'].map((item, i) => (<div key={i} className="flex items-center gap-2"><Crown className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span></div>))}</div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ FREE DIAGNOSIS ═══ */}
      <RevealSection id="diagnosis" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'rgba(45,212,191,0.3)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>30秒获取您的 <span className="gradient-text">AI 搜索可见度</span> 诊断报告</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>覆盖 DeepSeek、文心一言、通义千问、豆包、Kimi 等 15+ 国内主流 AI 平台，<br className="hidden md:block" />实时了解您的品牌在 AI 搜索中的真实表现与优化空间</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => { setLoginMode('register'); setLoginOpen(true) }} className="glow-btn px-8 py-4 rounded-xl text-base font-medium text-white flex items-center gap-2"><span>立即免费诊断</span><ArrowRight className="w-5 h-5" /></button>
            <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2" style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.05)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)' }}><span>查看客户案例</span><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">{['无需信用卡', '30秒出报告', '覆盖15+平台'].map((item, i) => (<div key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: '#22C55E' }} /><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span></div>))}</div>
        </div>
      </RevealSection>

      <div className="gradient-divider" />

      {/* ═══ BOTTOM CTA ═══ */}
      <RevealSection className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border p-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'rgba(14,165,233,0.3)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>开启您的 <span className="gradient-text">GEO 智能运营</span> 之旅</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>立即注册，免费体验璇玑智科一体化 GEO 智能运营平台</p>
          <div className="flex items-center justify-center gap-4"><button onClick={() => { setLoginMode('register'); setLoginOpen(true) }} className="glow-btn px-8 py-4 rounded-xl text-base font-medium text-white flex items-center gap-2"><span>免费试用</span><ArrowRight className="w-5 h-5" /></button></div>
          <div className="flex items-center justify-center gap-6 mt-8">{['无需信用卡', '7 天免费体验', '随时取消'].map((item, i) => (<div key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: '#22C55E' }} /><span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span></div>))}</div>
        </div>
      </RevealSection>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12 px-6" style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)' }}><Sparkles className="w-5 h-5 text-white" /></div><div><div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</div><div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>GEO 智能运营平台</div></div></div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>国内领先的 GEO 智能运营 SaaS 平台，帮助品牌在 AI 时代赢得竞争。</p>
              <div className="mb-2">
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>订阅最新动态</p>
                <div className="flex">
                  <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="您的邮箱地址" className="flex-1 px-3 py-2 rounded-l-lg text-sm outline-none" style={{ backgroundColor: 'var(--color-bg-surface-light)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-primary)', borderRight: 'none' }} />
                  <button className="px-3 py-2 rounded-r-lg text-white transition-all" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 12px rgba(14,165,233,0.4)' }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div><h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>产品</h4><div className="space-y-2">{['品牌监测', '智能选词', '内容创作', '达人素材', '诊断报告'].map(item => (<a key={item} href="#" className="block text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}>{item}</a>))}</div></div>
            <div><h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>资源</h4><div className="space-y-2">{['GEO 案例', '帮助中心', 'API 文档', '博客', '更新日志'].map(item => (<a key={item} href="#" className="block text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}>{item}</a>))}</div></div>
            <div><h4 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>联系我们</h4><div className="space-y-2"><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>商务合作：business@xuanjizhike.com</p><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>技术支持：support@xuanjizhike.com</p></div></div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-default)' }}>
            <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>© 2026 璇玑智科人工智能一体化应用平台. All rights reserved.</div>
            <div className="flex items-center gap-4">{['隐私政策', '服务条款', 'Cookie 设置'].map(item => (<a key={item} href="#" className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}>{item}</a>))}</div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} defaultMode={loginMode} />
    </div>
  )
}

export default LandingPage
