import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, Eye, Target, Zap, BarChart3, ArrowUpRight, ArrowDownRight, Activity, Bell, Wand2, PenTool, FileText, Clock, Quote, Shield,
  Sparkles, ArrowRight, X, Search
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line, Legend
} from 'recharts'
import { useAuth } from '../context/AuthContext'
import ConsultationWidget from '../components/ConsultationWidget'

const kpiData = [
  { title: 'AI 推荐率', value: '68.5%', change: '+12.3%', positive: true, icon: Target, color: 'var(--color-accent)' },
  { title: '品牌提及量', value: '12,847', change: '+34.2%', positive: true, icon: Eye, color: 'var(--color-primary)' },
  { title: '竞品覆盖数', value: '5+ 平台', change: '稳定', positive: true, icon: Activity, color: 'var(--color-secondary)' },
  { title: '运营效率', value: '提升 10x', change: '-60% 成本', positive: true, icon: Zap, color: 'var(--color-accent)' },
]

const trendData = [
  { date: '06-22', recommendRate: 52, mentionCount: 8200, competitorAvg: 48 },
  { date: '06-23', recommendRate: 54, mentionCount: 8500, competitorAvg: 49 },
  { date: '06-24', recommendRate: 56, mentionCount: 9100, competitorAvg: 50 },
  { date: '06-25', recommendRate: 58, mentionCount: 10200, competitorAvg: 51 },
  { date: '06-26', recommendRate: 62, mentionCount: 11000, competitorAvg: 50 },
  { date: '06-27', recommendRate: 64, mentionCount: 11800, competitorAvg: 52 },
  { date: '06-28', recommendRate: 68.5, mentionCount: 12847, competitorAvg: 53 },
]

const platformData = [
  { name: 'DeepSeek', value: 38, color: 'var(--color-primary)' },
  { name: '文心一言', value: 25, color: 'var(--color-secondary)' },
  { name: '通义千问', value: 18, color: 'var(--color-accent)' },
  { name: '豆包', value: 12, color: '#8B5CF6' },
  { name: 'Kimi', value: 7, color: '#F59E0B' },
]

const radarData = [
  { subject: '推荐率', A: 68, B: 52, fullMark: 100 },
  { subject: '提及率', A: 85, B: 60, fullMark: 100 },
  { subject: '正面占比', A: 78, B: 65, fullMark: 100 },
  { subject: '覆盖率', A: 92, B: 70, fullMark: 100 },
  { subject: '活跃度', A: 75, B: 55, fullMark: 100 },
  { subject: '信任度', A: 80, B: 58, fullMark: 100 },
]

const keywordData = [
  { keyword: '品牌核心词', volume: '850K', trend: '+23%', rank: 1 },
  { keyword: '产品场景词', volume: '620K', trend: '+18%', rank: 2 },
  { keyword: '行业通用词', volume: '410K', trend: '+12%', rank: 3 },
  { keyword: '竞品对比词', volume: '280K', trend: '+31%', rank: 4 },
  { keyword: '用户痛点词', volume: '190K', trend: '+45%', rank: 5 },
]

const recentActivities = [
  { action: 'DeepSeek 推荐率突破 70%', time: '10分钟前', type: 'success', icon: Target },
  { action: '新增 234 个关键词拓词', time: '30分钟前', type: 'info', icon: Wand2 },
  { action: 'AI 内容生成 12 篇', time: '1小时前', type: 'content', icon: PenTool },
  { action: '竞品 A 在文心一言提升 5%', time: '2小时前', type: 'warning', icon: Eye },
  { action: '月度诊断报告已生成', time: '3小时前', type: 'report', icon: FileText },
]

const quickActions = [
  { label: '生成诊断报告', icon: FileText, color: 'var(--color-primary)' },
  { label: 'AI 智能拓词', icon: Wand2, color: 'var(--color-accent)' },
  { label: '创建内容', icon: PenTool, color: 'var(--color-secondary)' },
  { label: '查看监测', icon: Eye, color: '#8B5CF6' },
]

const scenarioData = [
  { name: '产品咨询', coverage: 92, color: '#0EA5E9' },
  { name: '品牌对比', coverage: 78, color: '#2DD4BF' },
  { name: '行业推荐', coverage: 85, color: '#6366F1' },
  { name: '使用教程', coverage: 65, color: '#F59E0B' },
  { name: '问题解决', coverage: 72, color: '#EC4899' },
  { name: '价格询问', coverage: 58, color: '#8B5CF6' },
]

// New: AI Share of Voice
const shareOfVoiceData = [
  { name: '本品牌', value: 38.5, color: '#0EA5E9' },
  { name: '竞品A', value: 28.2, color: '#6366F1' },
  { name: '竞品B', value: 18.7, color: '#2DD4BF' },
  { name: '竞品C', value: 9.4, color: '#F59E0B' },
  { name: '其他', value: 5.2, color: '#94A3B8' },
]

// New: Citation Trend
const citationTrendData = [
  { date: '06-22', accurate: 620, inaccurate: 45, target: 700 },
  { date: '06-23', accurate: 645, inaccurate: 38, target: 720 },
  { date: '06-24', accurate: 680, inaccurate: 42, target: 740 },
  { date: '06-25', accurate: 710, inaccurate: 35, target: 760 },
  { date: '06-26', accurate: 750, inaccurate: 30, target: 780 },
  { date: '06-27', accurate: 780, inaccurate: 28, target: 800 },
  { date: '06-28', accurate: 824, inaccurate: 24, target: 820 },
]

// New: Content Readiness Score
const readinessMetrics = [
  { name: '结构化数据', score: 85, status: 'good' },
  { name: '语义一致性', score: 72, status: 'warning' },
  { name: '权威信源', score: 90, status: 'good' },
  { name: '多模态素材', score: 65, status: 'warning' },
  { name: 'FAQ 覆盖', score: 88, status: 'good' },
  { name: 'Schema 标记', score: 78, status: 'good' },
]

function Dashboard() {
  const { user, markOnboarded } = useAuth()
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(false)
  const [brandName, setBrandName] = useState('')

  useEffect(() => {
    if (user?.isFirstLogin) {
      setShowWelcome(true)
    }
  }, [user])

  const handleStartDiagnosis = () => {
    markOnboarded()
    setShowWelcome(false)
    navigate('/diagnosis')
  }

  const handleSkip = () => {
    markOnboarded()
    setShowWelcome(false)
  }

  const [showConsultation, setShowConsultation] = useState(false)

  return (
    <div className="space-y-6">
      {/* Welcome Modal for First Login */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="card max-w-lg w-full p-8 relative">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Sparkles className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                欢迎，{user?.name}！
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                让我们30秒了解您的品牌在 AI 搜索中的表现
              </p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>1</div>
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>输入品牌名称</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>2</div>
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>选择所属行业</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>3</div>
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>获取 AI 可见度诊断报告</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                品牌名称
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="请输入您的品牌名称"
                  className="input-field w-full pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && brandName.trim() && handleStartDiagnosis()}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStartDiagnosis}
                disabled={!brandName.trim()}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-primary)', opacity: brandName.trim() ? 1 : 0.5 }}
              >
                <span>开始诊断</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSkip}
                className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}
              >
                跳过
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            const ChangeIcon = kpi.positive ? ArrowUpRight : ArrowDownRight
            return (
              <div key={index} className="card card-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{kpi.title}</span>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</span>
                  <div className="flex items-center gap-1 mb-1">
                    <ChangeIcon className="w-3 h-3" style={{ color: kpi.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }} />
                    <span className="text-xs font-medium" style={{ color: kpi.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="card">
          <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>快速操作</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button key={index} className="flex items-center gap-3 w-full p-2 rounded-lg transition-all text-left"
                  style={{ backgroundColor: 'var(--color-bg-surface-light)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${action.color}15` }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-surface-light)' }}
                >
                  <Icon className="w-4 h-4" style={{ color: action.color }} />
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Charts Row 1: Trend + Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>品牌 AI 表现趋势</h3>
            <div className="flex items-center gap-2">
              <span className="badge badge-blue">近7天</span>
              <span className="badge badge-green">实时更新</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={trendData}>
              <defs>
                <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
              <YAxis yAxisId="left" stroke="var(--color-text-secondary)" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
              <Area yAxisId="left" type="monotone" dataKey="recommendRate" name="推荐率(%)" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorRec)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="mentionCount" name="提及量" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)' }} />
              <Line yAxisId="left" type="monotone" dataKey="competitorAvg" name="竞品平均" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-secondary)' }} />
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>平台分布</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {platformData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW: AI Share of Voice + Citation Trend + Content Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI Share of Voice */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 声量份额</h3>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={shareOfVoiceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {shareOfVoiceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {shareOfVoiceData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 p-2 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>本品牌声量份额 </span>
            <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>38.5%</span>
            <span className="text-xs" style={{ color: 'var(--color-status-green)' }}>  +3.2%</span>
          </div>
        </div>

        {/* Citation Trend */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 引用趋势</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={citationTrendData}>
              <defs>
                <linearGradient id="colorAccurate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={11} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
              <Area type="monotone" dataKey="accurate" name="准确引用" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorAccurate)" strokeWidth={2} />
              <Line type="monotone" dataKey="inaccurate" name="错误引用" stroke="var(--color-status-red)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-status-red)' }} />
              <Line type="monotone" dataKey="target" name="目标" stroke="var(--color-text-secondary)" strokeWidth={2} strokeDasharray="3 3" dot={{ fill: 'var(--color-text-secondary)' }} />
              <Legend fontSize={11} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>准确率: 97.2%</div>
            <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ 2.1%</div>
          </div>
        </div>

        {/* Content Readiness */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 内容准备度</h3>
          </div>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>79.7</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>综合评分</div>
          </div>
          <div className="space-y-2">
            {readinessMetrics.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs w-20" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.score}%`, backgroundColor: item.status === 'good' ? 'var(--color-accent)' : 'var(--color-status-yellow)' }} />
                </div>
                <span className="text-xs font-medium w-8 text-right" style={{ color: 'var(--color-text-primary)' }}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Radar + Keywords + Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌 vs 竞品综合对比</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border-default)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} stroke="var(--color-border-default)" />
              <Radar name="本品牌" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="竞品平均" dataKey="B" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>本品牌</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>竞品平均</span>
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>热门关键词 TOP 5</h3>
          <div className="space-y-3">
            {keywordData.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor: i < 3 ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                    color: i < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}>
                  {item.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{item.keyword}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>搜索量 {item.volume}</div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-status-green)' }}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>近期动态</h3>
            <Bell className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{activity.action}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{activity.time}</span>
                    </div>
                  </div>
                  <span className={`badge text-xs ${
                    activity.type === 'success' ? 'badge-green' :
                    activity.type === 'warning' ? 'badge-yellow' :
                    activity.type === 'info' ? 'badge-blue' : 'badge-green'
                  }`}>
                    {activity.type === 'success' ? '成功' :
                     activity.type === 'warning' ? '预警' :
                     activity.type === 'info' ? '信息' : '内容'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scenario Coverage + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>AI 场景覆盖详情</h3>
          <div className="space-y-3">
            {scenarioData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm w-20" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.coverage}%`, backgroundColor: item.color }} />
                </div>
                <span className="text-sm font-medium w-10 text-right" style={{ color: 'var(--color-text-primary)' }}>{item.coverage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderColor: 'var(--color-status-yellow)' }}>
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-status-yellow)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>运营洞察</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>本周推荐率</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>68.5%</div>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: '68.5%', backgroundColor: 'var(--color-accent)' }} />
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>竞品差距</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>+15.3%</div>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: '75%', backgroundColor: 'var(--color-primary)' }} />
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>AI 场景覆盖率</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>82.1%</div>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: '82.1%', backgroundColor: 'var(--color-secondary)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Widget Toggle Button */}
      {!showConsultation && (
        <button
          onClick={() => setShowConsultation(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">品牌GEO诊断</span>
        </button>
      )}

      {/* Consultation Widget */}
      {showConsultation && (
        <ConsultationWidget onClose={() => setShowConsultation(false)} />
      )}
    </div>
  )
}

export default Dashboard
