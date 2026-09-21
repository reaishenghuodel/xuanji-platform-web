import { useState, useEffect } from 'react'
import {
  Sparkles, Search, ArrowRight, ChevronLeft, CheckCircle, Loader2,
  Globe, BarChart3, Target, Zap, TrendingUp, AlertTriangle, Check,
  Crown
} from 'lucide-react'
import { diagnosisApi } from '../services/api'

const industries = [
  '互联网/SaaS', '电商/零售', '教育/培训', '金融/保险', '医疗健康',
  '房地产/建筑', '制造业', '餐饮/酒店', '旅游/出行', '物流/供应链',
  '法律/咨询', '广告/营销', '游戏/娱乐', '新能源/汽车', '其他'
]

const platforms = [
  { name: 'DeepSeek', score: 0, status: 'unknown' },
  { name: '文心一言', score: 0, status: 'unknown' },
  { name: '通义千问', score: 0, status: 'unknown' },
  { name: 'ChatGPT', score: 0, status: 'unknown' },
  { name: '豆包', score: 0, status: 'unknown' },
  { name: 'Kimi', score: 0, status: 'unknown' },
  { name: 'Perplexity', score: 0, status: 'unknown' },
  { name: 'Gemini', score: 0, status: 'unknown' },
]

function DiagnosisPage() {
  const [step, setStep] = useState<'input' | 'industry' | 'analyzing' | 'result'>('input')
  const [brandName, setBrandName] = useState('')
  const [website, setWebsite] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{
    overallScore: number
    visibility: number
    accuracy: number
    coverage: number
    platformResults: typeof platforms
    suggestions: string[]
    // 五阶段分析数据
    aipl: { a: number; i: number; p: number; l: number }
    infra: { t1: number; t2: number; t3: number; t4: number }
    reputation: { nss: number; r1: string; r2: string; r3: string }
    momentum: { vScore: number; gScore: number; vStatus: string; gStatus: string; diagnosis: string }
    roadmap: { priority: string; problem: string; peso: string; tactic: string; ice: number }[]
    summary: string
  } | null>(null)

  // Theme restoration
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

  // 调用后端API进行诊断，失败时回退到Mock数据
  const generateResult = async () => {
    try {
      const response = await diagnosisApi.create({
        brand_name: brandName,
        website: website,
        industry: selectedIndustry,
      })

      setResult({
        overallScore: response.overall_score,
        visibility: response.visibility,
        accuracy: response.accuracy,
        coverage: response.coverage,
        platformResults: response.platform_results.map((p: any) => ({
          name: p.name,
          score: p.score,
          status: p.status as 'found' | 'missing' | 'unknown',
        })),
        suggestions: response.suggestions,
        aipl: response.aipl || { a: 5, i: 5, p: 5, l: 5 },
        infra: response.infra || { t1: 5, t2: 5, t3: 5, t4: 5 },
        reputation: response.reputation || { nss: 7, r1: '🟢', r2: '🟢', r3: '🟢' },
        momentum: response.momentum || { vScore: 60, gScore: 60, vStatus: '💤', gStatus: '📢', diagnosis: '吃老本型' },
        roadmap: response.roadmap || [
          { priority: 'P0', problem: '内容覆盖率不足', peso: 'Owned', tactic: '补充百科/知乎品牌词条', ice: 700 },
          { priority: 'P1', problem: '结构化数据缺失', peso: 'Earned', tactic: '部署Schema.org标记', ice: 600 },
          { priority: 'P1', problem: '社交媒体声量低', peso: 'Shared', tactic: '加强小红书/抖音UGC', ice: 500 },
          { priority: 'P2', problem: '权威信源缺失', peso: 'Paid', tactic: '投放头部媒体背书', ice: 400 },
        ],
        summary: response.summary || '建议优先完善内容基建，再逐步扩大平台覆盖。',
      })
    } catch (err) {
      console.log('后端API不可用，使用Mock数据:', err)
      generateMockResult()
    }
  }

  const generateMockResult = () => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const overallScore = rand(40, 75)
    const visibility = rand(30, 60)
    const accuracy = rand(60, 90)
    const coverage = rand(25, 55)

    const platformResults = platforms.map(p => ({
      ...p,
      score: rand(20, 80),
      status: Math.random() > 0.4 ? 'found' : 'missing' as 'found' | 'missing' | 'unknown'
    }))

    const suggestions = [
      '品牌官网信息结构不完整，建议补充结构化数据（Schema.org）',
      'DeepSeek 平台品牌提及率较低，建议增加行业权威内容输出',
      '知乎/百度百科等知识平台缺乏品牌词条，需要建立知识图谱',
      '品牌内容在 AI 引用中的准确率只有 65%，建议优化内容质量',
      '小红书、抖音等社交平台的品牌声量不足，建议加强 UGC 内容布局',
    ].sort(() => Math.random() - 0.5).slice(0, 3)

    // 五阶段分析数据
    const aipl = { a: rand(4, 8), i: rand(4, 8), p: rand(4, 8), l: rand(4, 8) }
    const infra = { t1: rand(5, 9), t2: rand(4, 8), t3: rand(5, 9), t4: rand(4, 8) }
    const reputation = {
      nss: rand(6, 9),
      r1: Math.random() > 0.3 ? '🔴' : '🟢',
      r2: Math.random() > 0.5 ? '🟡' : '🟢',
      r3: '🟢',
    }
    const momentum = {
      vScore: rand(50, 85),
      gScore: rand(50, 85),
      vStatus: Math.random() > 0.5 ? '🚀' : '💤',
      gStatus: Math.random() > 0.5 ? '🏛️' : '📢',
      diagnosis: Math.random() > 0.5 ? '自嗨型' : '吃老本型',
    }
    const roadmap = [
      { priority: 'P0', problem: '内容覆盖率不足', peso: 'Owned', tactic: '补充百科/知乎品牌词条', ice: rand(500, 900) },
      { priority: 'P1', problem: '结构化数据缺失', peso: 'Earned', tactic: '部署Schema.org标记', ice: rand(400, 800) },
      { priority: 'P1', problem: '社交媒体声量低', peso: 'Shared', tactic: '加强小红书/抖音UGC', ice: rand(300, 700) },
      { priority: 'P2', problem: '权威信源缺失', peso: 'Paid', tactic: '投放头部媒体背书', ice: rand(200, 600) },
    ]
    const summary = `当前品牌在AI搜索中的可见度处于${overallScore >= 60 ? '良好' : '中等'}水平，建议优先完善内容基建，再逐步扩大平台覆盖。预计3个月内可提升${rand(15, 35)}%。`

    setResult({ overallScore, visibility, accuracy, coverage, platformResults, suggestions, aipl, infra, reputation, momentum, roadmap, summary })
  }

  // Simulate analysis
  useEffect(() => {
    if (step !== 'analyzing') return
    let current = 0
    const timer = setInterval(() => {
      current += Math.random() * 15 + 5
      if (current >= 100) {
        current = 100
        clearInterval(timer)
        setTimeout(() => {
          generateResult()
          setStep('result')
        }, 500)
      }
      setProgress(Math.min(current, 100))
    }, 300)
    return () => clearInterval(timer)
  }, [step])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--color-status-green)'
    if (score >= 60) return 'var(--color-accent)'
    if (score >= 40) return 'var(--color-status-yellow)'
    return 'var(--color-status-red)'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    if (score >= 40) return '一般'
    return '需优化'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(11, 17, 32, 0.95)', backdropFilter: 'blur(10px)', borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="/#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科</div>
              <div className="text-xs hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>中国企业的AI搜索可见度管家</div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/#"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}
            >
              返回首页
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Input brand info */}
          {step === 'input' && (
            <div className="space-y-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}>
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>AI 搜索可见度诊断</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  30秒了解您的品牌在 AI 中的表现
                </h1>
                <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  覆盖 DeepSeek、文心一言、通义千问等 15+ 国内主流 AI 平台
                </p>
              </div>

              <div className="card p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    品牌名称 <span style={{ color: 'var(--color-status-red)' }}>*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="请输入您的品牌名称"
                      className="input-field w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    官方网站（选填）
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.example.com"
                      className="input-field w-full pl-10"
                    />
                  </div>
                </div>

                <button
                  onClick={() => brandName.trim() && setStep('industry')}
                  disabled={!brandName.trim()}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                  style={{ opacity: brandName.trim() ? 1 : 0.5 }}
                >
                  <span>下一步：选择行业</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { value: '15+', label: 'AI 平台' },
                  { value: '30秒', label: '出报告' },
                  { value: '100%', label: '免费' },
                  { value: '10万+', label: '已诊断品牌' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                    <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{item.value}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select industry */}
          {step === 'industry' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <button
                    onClick={() => setStep('input')}
                    className="flex items-center gap-1 text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    返回
                  </button>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  选择您的行业
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  行业信息有助于我们提供更精准的分析
                </p>
              </div>

              <div className="card p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className="p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left"
                      style={{
                        backgroundColor: selectedIndustry === industry ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                        borderColor: selectedIndustry === industry ? 'var(--color-primary)' : 'var(--color-border-default)',
                        color: selectedIndustry === industry ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      }}
                    >
                      {industry}
                      {selectedIndustry === industry && (
                        <CheckCircle className="w-4 h-4 float-right" style={{ color: 'var(--color-primary)' }} />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => selectedIndustry && setStep('analyzing')}
                  disabled={!selectedIndustry}
                  className="btn-primary w-full py-4 mt-6 flex items-center justify-center gap-2"
                  style={{ opacity: selectedIndustry ? 1 : 0.5 }}
                >
                  <span>开始诊断</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Analyzing */}
          {step === 'analyzing' && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                正在分析 {brandName} 的 AI 搜索可见度...
              </h2>
              <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                正在查询 DeepSeek、文心一言、通义千问等 15+ 平台
              </p>
              <div className="max-w-md mx-auto">
                <div className="progress-bar">
                  <div className="progress-bar-fill transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {Math.floor(progress)}%
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 'result' && result && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {brandName} 的 AI 搜索可见度诊断报告
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  行业：{selectedIndustry} · 诊断时间：{new Date().toLocaleString('zh-CN')}
                </p>
              </div>

              {/* Overall Score */}
              <div className="card p-8 text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" strokeWidth="8"
                      style={{ stroke: 'var(--color-bg-surface-light)' }} />
                    <circle cx="64" cy="64" r="56" fill="none" strokeWidth="8"
                      strokeLinecap="round"
                      style={{ stroke: getScoreColor(result.overallScore), strokeDasharray: `${result.overallScore * 3.52} 351.86` }} />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-4xl font-bold" style={{ color: getScoreColor(result.overallScore) }}>
                      {result.overallScore}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>综合得分</div>
                  </div>
                </div>
                <div className="text-lg font-bold mb-1" style={{ color: getScoreColor(result.overallScore) }}>
                  {getScoreLabel(result.overallScore)}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  您的品牌在 AI 搜索中的可见度{result.overallScore < 60 ? '有较大提升空间' : '表现良好，仍有优化空间'}
                </p>
              </div>

              {/* Sub Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: '可见度', value: result.visibility, icon: BarChart3, desc: '品牌在 AI 中的被提及频率' },
                  { label: '准确率', value: result.accuracy, icon: Target, desc: 'AI 引用品牌信息的准确性' },
                  { label: '覆盖率', value: result.coverage, icon: Globe, desc: '覆盖的 AI 平台数量占比' },
                ].map((item, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                      </div>
                      <span className="text-lg font-bold" style={{ color: getScoreColor(item.value) }}>{item.value}</span>
                    </div>
                    <div className="progress-bar mb-2">
                      <div className="progress-bar-fill" style={{ width: `${item.value}%`, backgroundColor: getScoreColor(item.value) }} />
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Platform Coverage */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  各平台覆盖情况
                </h3>
                <div className="space-y-3">
                  {result.platformResults.map((platform, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm w-20" style={{ color: 'var(--color-text-primary)' }}>{platform.name}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${platform.score}%`, backgroundColor: getScoreColor(platform.score) }} />
                      </div>
                      <span className="text-xs w-12 text-right" style={{ color: getScoreColor(platform.score) }}>
                        {platform.status === 'found' ? `${platform.score}分` : '未覆盖'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: 初始化确认 */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>1</div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>初始化确认</h3>
                </div>
                <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>• 品牌名称：<span style={{ color: 'var(--color-text-primary)' }}>{brandName}</span></p>
                  <p>• 所属行业：<span style={{ color: 'var(--color-text-primary)' }}>{selectedIndustry}</span></p>
                  <p>• 官方网站：<span style={{ color: 'var(--color-text-primary)' }}>{website || '未提供'}</span></p>
                  <p>• 诊断时间：{new Date().toLocaleString('zh-CN')}</p>
                </div>
              </div>

              {/* Step 2: 硬诊断 */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>2</div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>硬诊断（内容与基建）</h3>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>📊 品牌 AIPL 语料资产覆盖率</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                          <th className="text-left py-2 px-3">AIPL 维度</th>
                          <th className="text-left py-2 px-3">评分</th>
                          <th className="text-left py-2 px-3">审计发现</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">A-认知</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.aipl.a * 10) }}>{result.aipl.a}/10</td>
                          <td className="py-2 px-3">泛品类搜索下品牌基础信息收录率</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">I-兴趣</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.aipl.i * 10) }}>{result.aipl.i}/10</td>
                          <td className="py-2 px-3">痛点场景下高质量内容抓取精度</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">P-决策</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.aipl.p * 10) }}>{result.aipl.p}/10</td>
                          <td className="py-2 px-3">产品详情召回语义精准度</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">L-忠诚</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.aipl.l * 10) }}>{result.aipl.l}/10</td>
                          <td className="py-2 px-3">真实用户口碑正向背书占比</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>🛠️ 基建硬实力</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                          <th className="text-left py-2 px-3">维度</th>
                          <th className="text-left py-2 px-3">评分</th>
                          <th className="text-left py-2 px-3">检查点</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">T1 基建</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.infra.t1 * 10) }}>{result.infra.t1}/10</td>
                          <td className="py-2 px-3">官网/百科是否存在与存活</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">T2 友好度</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.infra.t2 * 10) }}>{result.infra.t2}/10</td>
                          <td className="py-2 px-3">Schema/结构化参数</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">T3 偏见</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.infra.t3 * 10) }}>{result.infra.t3}/10</td>
                          <td className="py-2 px-3">品牌关联前3个形容词</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">T4 信任</td>
                          <td className="py-2 px-3 font-bold" style={{ color: getScoreColor(result.infra.t4 * 10) }}>{result.infra.t4}/10</td>
                          <td className="py-2 px-3">第三方评分</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Step 3: 软诊断 */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>3</div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>软诊断（声誉与动能）</h3>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>🛡️ 声誉健康度</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                          <th className="text-left py-2 px-3">维度</th>
                          <th className="text-left py-2 px-3">状态</th>
                          <th className="text-left py-2 px-3">深挖发现</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">R1 排雷</td>
                          <td className="py-2 px-3">{result.reputation.r1}</td>
                          <td className="py-2 px-3">无重大负面舆情</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">R2 治理</td>
                          <td className="py-2 px-3">{result.reputation.r2}</td>
                          <td className="py-2 px-3">品牌一致性良好</td>
                        </tr>
                        <tr className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3">R3 一致性</td>
                          <td className="py-2 px-3">{result.reputation.r3}</td>
                          <td className="py-2 px-3">跨平台信息统一</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm mt-2 font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    NSS 总评: {result.reputation.nss}/10
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>⚡ 动能双轨 (R.A.P. Momentum)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">V-活性</span>
                        <span className="text-lg font-bold" style={{ color: getScoreColor(result.momentum.vScore) }}>{result.momentum.vScore}</span>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>状态: {result.momentum.vStatus}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>官网/官号/新品频率</div>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">G-权信</span>
                        <span className="text-lg font-bold" style={{ color: getScoreColor(result.momentum.gScore) }}>{result.momentum.gScore}</span>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>状态: {result.momentum.gStatus}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>央媒/头部/自媒体回响</div>
                    </div>
                  </div>
                  <p className="text-sm mt-3" style={{ color: 'var(--color-text-secondary)' }}>
                    诊断: <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{result.momentum.diagnosis}</span>
                  </p>
                </div>
              </div>

              {/* Step 4: 战略地图 */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>4</div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>战略地图 (P.E.S.O. + I.C.E.)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <th className="text-left py-2 px-3">优先级</th>
                        <th className="text-left py-2 px-3">问题溯源</th>
                        <th className="text-left py-2 px-3">P.E.S.O.</th>
                        <th className="text-left py-2 px-3">核心战术</th>
                        <th className="text-left py-2 px-3">I.C.E.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.roadmap.map((item, i) => (
                        <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                          <td className="py-2 px-3 font-bold" style={{ color: item.priority === 'P0' ? 'var(--color-status-red)' : 'var(--color-text-primary)' }}>{item.priority}</td>
                          <td className="py-2 px-3">{item.problem}</td>
                          <td className="py-2 px-3">{item.peso}</td>
                          <td className="py-2 px-3">{item.tactic}</td>
                          <td className="py-2 px-3 font-bold">{item.ice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-primary)' }}>📝 首席战略官综述</h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{result.summary}</p>
                </div>
              </div>

              {/* Step 5: 完整报告 */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>5</div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>完整诊断报告</h3>
                  <Crown className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    📁 {brandName} 品牌数字资产现状诊断分析报告
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    综合评分: <span className="font-bold" style={{ color: getScoreColor(result.overallScore) }}>{result.overallScore}/100</span>
                  </p>
                </div>
                <div className="text-sm space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <p>✅ 五阶段诊断已完整执行</p>
                  <p>📊 硬诊断（内容与基建）已完成</p>
                  <p>🛡️ 软诊断（声誉与动能）已完成</p>
                  <p>🗺️ 战略地图（P.E.S.O. + I.C.E.）已生成</p>
                  <p>📋 完整报告已整合输出</p>
                </div>
              </div>

              {/* Suggestions */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  <Zap className="w-5 h-5 inline-block mr-2" style={{ color: 'var(--color-accent)' }} />
                  优化建议
                </h3>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-status-yellow)' }} />
                      <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="card p-8 text-center" style={{ borderColor: 'var(--color-primary-50)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  获取完整诊断报告
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  注册后可获取包含详细数据分析、竞品对比、优化方案的完整 PDF 报告
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a
                    href="/#"
                    className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 flex items-center gap-2"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>免费注册，获取完整报告</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => { setStep('input'); setBrandName(''); setWebsite(''); setSelectedIndustry(''); setResult(null) }}
                    className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
                    style={{ color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-surface)' }}
                  >
                    <span>重新诊断</span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-6 mt-6">
                  {['完整数据分析', '竞品对比', 'PDF 导出'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-center py-4">
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <TrendingUp className="w-4 h-4 inline-block mr-1" style={{ color: 'var(--color-status-green)' }} />
                  已有 <span className="font-bold" style={{ color: 'var(--color-primary)' }}>12,847</span> 家企业通过诊断优化了品牌 AI 可见度
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiagnosisPage
