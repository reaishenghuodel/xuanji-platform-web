import { useState } from 'react'
import {
  Target, Map, Calendar, Users, CheckCircle,
  TrendingUp, Shield, Zap, Globe, PenTool, BarChart3,
  ChevronDown, ChevronUp, ArrowRight, Flag
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, AreaChart, Area, Line
} from 'recharts'

const strategyKPI = [
  { title: '目标完成度', value: '72%', target: '85%', status: 'warning', icon: Target, color: 'var(--color-accent)' },
  { title: '关键词覆盖率', value: '68.2%', target: '80%', status: 'warning', icon: Shield, color: 'var(--color-primary)' },
  { title: '内容产出', value: '45/60', target: '60篇/季度', status: 'good', icon: PenTool, color: 'var(--color-secondary)' },
  { title: '渠道分布', value: '6/8', target: '8个平台', status: 'good', icon: Globe, color: 'var(--color-accent)' },
]

const strategicMapSteps = [
  {
    id: 'goal',
    title: '战略目标',
    desc: 'Q3 提升 DeepSeek 推荐率至 75%',
    status: 'active',
    icon: Flag,
    color: 'var(--color-accent)',
    subItems: ['提升品牌权威性', '优化语义一致性', '扩大引用来源']
  },
  {
    id: 'keywords',
    title: '关键词规划',
    desc: '布局 200+ 核心关键词',
    status: 'active',
    icon: Target,
    color: 'var(--color-primary)',
    subItems: ['核心词 50个', '长尾词 120个', '品牌词 30个']
  },
  {
    id: 'content',
    title: '内容规划',
    desc: '产出 60 篇 GEO 优化内容',
    status: 'in_progress',
    icon: PenTool,
    color: 'var(--color-secondary)',
    subItems: ['教程类 20篇', '评测类 15篇', '案例类 15篇', '热点类 10篇']
  },
  {
    id: 'channel',
    title: '渠道分发',
    desc: '覆盖 8 大 AI 平台',
    status: 'pending',
    icon: Globe,
    color: '#8B5CF6',
    subItems: ['DeepSeek', '文心一言', 'ChatGPT', 'Perplexity', '通义', '豆包', 'Kimi', 'Gemini']
  },
  {
    id: 'effect',
    title: '效果追踪',
    desc: '实时监测 ROI 与 GROI',
    status: 'pending',
    icon: BarChart3,
    color: 'var(--color-accent)',
    subItems: ['推荐率追踪', '引用监测', '声量分析', '竞品对比']
  },
]

const goals = [
  {
    id: 1,
    title: 'Q3 提升 DeepSeek 推荐率至 75%',
    quarter: 'Q3 2026',
    progress: 68,
    status: 'in_progress',
    owner: '张经理',
    priority: 'high',
    metrics: [
      { name: '推荐率', current: 68.5, target: 75, unit: '%' },
      { name: '引用数', current: 824, target: 1000, unit: '次' },
      { name: '准确率', current: 97.2, target: 98, unit: '%' },
    ]
  },
  {
    id: 2,
    title: '拓展 GEO 长尾词覆盖至 200+',
    quarter: 'Q3 2026',
    progress: 72,
    status: 'in_progress',
    owner: '李专员',
    priority: 'high',
    metrics: [
      { name: '已覆盖', current: 145, target: 200, unit: '个' },
      { name: 'GEO就绪', current: 108, target: 160, unit: '个' },
    ]
  },
  {
    id: 3,
    title: '增加 Perplexity 平台引用来源',
    quarter: 'Q3 2026',
    progress: 45,
    status: 'in_progress',
    owner: '王分析师',
    priority: 'medium',
    metrics: [
      { name: '引用数', current: 287, target: 500, unit: '次' },
      { name: '来源数', current: 5, target: 10, unit: '个' },
    ]
  },
  {
    id: 4,
    title: '建立品牌知识库（FAQ 50+）',
    quarter: 'Q4 2026',
    progress: 30,
    status: 'pending',
    owner: '赵编辑',
    priority: 'medium',
    metrics: [
      { name: 'FAQ数', current: 17, target: 50, unit: '个' },
      { name: '覆盖率', current: 34, target: 100, unit: '%' },
    ]
  },
]

const keywordPool = [
  { word: 'GEO 引擎优化', priority: 1, status: 'optimized', coverage: 95, platform: 'DeepSeek/Perplexity', intent: '信息型' },
  { word: 'AI 推荐品牌', priority: 1, status: 'optimized', coverage: 88, platform: 'ChatGPT/DeepSeek', intent: '交易型' },
  { word: '生成式引擎优化', priority: 2, status: 'in_progress', coverage: 72, platform: 'Perplexity/Gemini', intent: '信息型' },
  { word: '品牌 AI 可见性', priority: 2, status: 'in_progress', coverage: 65, platform: 'DeepSeek/文心', intent: '信息型' },
  { word: '大模型品牌推荐', priority: 1, status: 'optimized', coverage: 91, platform: 'ChatGPT/DeepSeek', intent: '交易型' },
  { word: 'AI 搜索优化', priority: 2, status: 'in_progress', coverage: 78, platform: 'Perplexity/Gemini', intent: '信息型' },
  { word: 'GEO 优化工具', priority: 3, status: 'planned', coverage: 45, platform: 'DeepSeek/文心', intent: '交易型' },
  { word: '品牌 AI 监测', priority: 2, status: 'in_progress', coverage: 82, platform: 'ChatGPT/文心', intent: '导航型' },
]

const contentCalendar = [
  { week: 'W1', platform: '小红书', topic: 'GEO vs SEO 对比', type: '科普', status: 'published', owner: '李专员' },
  { week: 'W1', platform: '抖音', topic: 'DeepSeek 推荐技巧', type: '教程', status: 'published', owner: '张经理' },
  { week: 'W2', platform: 'B站', topic: 'AI 大模型推荐逻辑', type: '深度', status: 'in_progress', owner: '王分析师' },
  { week: 'W2', platform: '知乎', topic: 'GEO 优化方法论', type: '专业', status: 'draft', owner: '赵编辑' },
  { week: 'W3', platform: '微信', topic: '品牌 AI 监测案例', type: '案例', status: 'scheduled', owner: '张经理' },
  { week: 'W3', platform: '微博', topic: 'AI 营销热点', type: '热点', status: 'scheduled', owner: '李专员' },
  { week: 'W4', platform: '小红书', topic: 'GEO 工具测评', type: '评测', status: 'draft', owner: '王分析师' },
  { week: 'W4', platform: '抖音', topic: 'AI 推荐算法揭秘', type: '科普', status: 'draft', owner: '赵编辑' },
]

const channelStrategy = [
  { platform: 'DeepSeek', focus: '权威性内容', frequency: '3篇/周', contentTypes: ['教程', '案例'], investment: 30, roi: '92%' },
  { platform: '文心一言', focus: '品牌故事', frequency: '2篇/周', contentTypes: ['品牌', '行业'], investment: 20, roi: '85%' },
  { platform: 'ChatGPT', focus: '国际化内容', frequency: '2篇/周', contentTypes: ['评测', '对比'], investment: 15, roi: '78%' },
  { platform: 'Perplexity', focus: '数据驱动', frequency: '2篇/周', contentTypes: ['报告', '数据'], investment: 15, roi: '88%' },
  { platform: '通义千问', focus: '电商转化', frequency: '1篇/周', contentTypes: ['种草', '转化'], investment: 10, roi: '72%' },
  { platform: '豆包', focus: '年轻化', frequency: '1篇/周', contentTypes: ['热点', '创意'], investment: 5, roi: '65%' },
  { platform: 'Kimi', focus: '长文深度', frequency: '1篇/周', contentTypes: ['长文', '指南'], investment: 5, roi: '70%' },
  { platform: 'Gemini', focus: '多语言', frequency: '1篇/周', contentTypes: ['翻译', '国际'], investment: 5, roi: '68%' },
]

const channelInvestData = [
  { name: 'DeepSeek', value: 30, color: '#0EA5E9' },
  { name: '文心一言', value: 20, color: '#6366F1' },
  { name: 'ChatGPT', value: 15, color: '#10B981' },
  { name: 'Perplexity', value: 15, color: '#8B5CF6' },
  { name: '通义千问', value: 10, color: '#2DD4BF' },
  { name: '其他', value: 10, color: '#94A3B8' },
]

const executionTasks = [
  { id: 1, title: 'DeepSeek 语义优化专项', assignee: '张经理', due: '07-15', progress: 65, status: 'in_progress', priority: 'high' },
  { id: 2, title: 'FAQ 知识库扩展至 30 条', assignee: '赵编辑', due: '07-20', progress: 40, status: 'in_progress', priority: 'medium' },
  { id: 3, title: 'Perplexity 权威信源投放', assignee: '王分析师', due: '07-25', progress: 20, status: 'in_progress', priority: 'high' },
  { id: 4, title: 'GEO 长尾词拓词 50 个', assignee: '李专员', due: '07-30', progress: 10, status: 'pending', priority: 'medium' },
  { id: 5, title: '竞品 A 监测策略分析', assignee: '王分析师', due: '08-05', progress: 0, status: 'pending', priority: 'low' },
  { id: 6, title: '品牌知识库 Schema 标记', assignee: '赵编辑', due: '08-10', progress: 0, status: 'pending', priority: 'medium' },
]

const quarterlyTrend = [
  { month: '4月', goalProgress: 25, keywordCoverage: 45, contentOutput: 12, channelCount: 4 },
  { month: '5月', goalProgress: 42, keywordCoverage: 55, contentOutput: 28, channelCount: 5 },
  { month: '6月', goalProgress: 58, keywordCoverage: 62, contentOutput: 38, channelCount: 6 },
  { month: '7月', goalProgress: 72, keywordCoverage: 68, contentOutput: 45, channelCount: 6 },
  { month: '8月(预)', goalProgress: 85, keywordCoverage: 75, contentOutput: 52, channelCount: 7 },
  { month: '9月(预)', goalProgress: 100, keywordCoverage: 82, contentOutput: 60, channelCount: 8 },
]

function StrategyPage() {
  const [activeSection, setActiveSection] = useState('map')
  const [expandedGoal, setExpandedGoal] = useState<number | null>(1)
  const [expandedStep, setExpandedStep] = useState<string | null>('goal')

  const sections = [
    { id: 'map', label: '战略地图', icon: Map },
    { id: 'goals', label: '目标管理', icon: Target },
    { id: 'keywords', label: '关键词规划', icon: Shield },
    { id: 'content', label: '内容规划', icon: PenTool },
    { id: 'channel', label: '渠道策略', icon: Globe },
    { id: 'execution', label: '执行追踪', icon: CheckCircle },
  ]

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {sections.map(section => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeSection === section.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeSection === section.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeSection === section.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          )
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategyKPI.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{kpi.title}</span>
                </div>
                <span className={`badge ${kpi.status === 'good' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                  {kpi.status === 'good' ? '正常' : '需关注'}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</span>
                <span className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>/ {kpi.target}</span>
              </div>
              <div className="progress-bar mt-2">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: kpi.value.includes('%') ? kpi.value : `${parseInt(kpi.value) / parseInt(kpi.target) * 100}%`,
                    backgroundColor: kpi.status === 'good' ? 'var(--color-accent)' : 'var(--color-status-yellow)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Strategic Map */}
      {activeSection === 'map' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Map className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 战略地图</h3>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>目标 → 关键词 → 内容 → 渠道 → 效果</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {strategicMapSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="relative">
                    {index < strategicMapSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-8 -right-2 z-10 items-center">
                        <ArrowRight className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                      </div>
                    )}
                    <div
                      className="p-4 rounded-xl border cursor-pointer transition-all"
                      style={{
                        backgroundColor: expandedStep === step.id ? `${step.color}15` : 'var(--color-bg-surface-light)',
                        borderColor: expandedStep === step.id ? step.color : 'var(--color-border-default)',
                      }}
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${step.color}20` }}>
                          <Icon className="w-4 h-4" style={{ color: step.color }} />
                        </div>
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{step.title}</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
                      <span className={`badge text-xs ${
                        step.status === 'active' ? 'badge-green' :
                        step.status === 'in_progress' ? 'badge-blue' : 'badge-yellow'
                      }`}>
                        {step.status === 'active' ? '已完成' : step.status === 'in_progress' ? '进行中' : '待开始'}
                      </span>
                      {expandedStep === step.id && (
                        <div className="mt-3 space-y-1">
                          {step.subItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                              <CheckCircle className="w-3 h-3" style={{ color: step.color }} />
                              <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quarterly Trend */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>季度执行趋势</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={quarterlyTrend}>
                <defs>
                  <linearGradient id="colorGoal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="goalProgress" name="目标完成度" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorGoal)" strokeWidth={2} />
                <Line type="monotone" dataKey="keywordCoverage" name="关键词覆盖" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)' }} />
                <Line type="monotone" dataKey="contentOutput" name="内容产出" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-secondary)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Goals Management */}
      {activeSection === 'goals' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>战略目标管理</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                新增目标
              </button>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge ${goal.priority === 'high' ? 'badge-red' : 'badge-yellow'} text-xs`}>
                          {goal.priority === 'high' ? '高优先级' : '中优先级'}
                        </span>
                        <span className="tag tag-primary text-xs">{goal.quarter}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>负责人: {goal.owner}</span>
                      </div>
                      <div className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{goal.title}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${goal.progress}%`, backgroundColor: goal.progress >= 70 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                        </div>
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{goal.progress}%</span>
                      </div>
                    </div>
                    <button
                      className="ml-4 p-2 rounded-lg transition-all"
                      style={{ backgroundColor: 'var(--color-bg-surface)' }}
                      onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                    >
                      {expandedGoal === goal.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                  {expandedGoal === goal.id && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      {goal.metrics.map((metric, i) => (
                        <div key={i} className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{metric.name}</div>
                          <div className="text-lg font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
                            {metric.current}<span className="text-xs font-normal" style={{ color: 'var(--color-text-secondary)' }}> / {metric.target}{metric.unit}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%`, backgroundColor: 'var(--color-accent)' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keywords Planning */}
      {activeSection === 'keywords' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>目标关键词池</h3>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>共 {keywordPool.length} 个关键词</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-green text-xs">已优化 {keywordPool.filter(k => k.status === 'optimized').length}</span>
                <span className="badge badge-blue text-xs">进行中 {keywordPool.filter(k => k.status === 'in_progress').length}</span>
                <span className="badge badge-yellow text-xs">待规划 {keywordPool.filter(k => k.status === 'planned').length}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">优先级</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">关键词</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">覆盖率</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">覆盖平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">意图</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordPool.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: item.priority === 1 ? 'var(--color-accent-50)' : 'var(--color-bg-surface-light)', color: item.priority === 1 ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                          {item.priority}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.word}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.status === 'optimized' ? 'badge-green' :
                          item.status === 'in_progress' ? 'badge-blue' : 'badge-yellow'
                        } text-xs`}>
                          {item.status === 'optimized' ? '已优化' : item.status === 'in_progress' ? '进行中' : '待规划'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.coverage}%</span>
                          <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.coverage}%`, backgroundColor: item.coverage >= 80 ? 'var(--color-accent)' : item.coverage >= 50 ? 'var(--color-primary)' : 'var(--color-status-yellow)' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.platform}</td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.intent}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <Zap className="w-3 h-3" />
                          优化
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Calendar */}
      {activeSection === 'content' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>内容规划日历</h3>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Q3 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-green text-xs">已发布 {contentCalendar.filter(c => c.status === 'published').length}</span>
                <span className="badge badge-blue text-xs">进行中 {contentCalendar.filter(c => c.status === 'in_progress').length}</span>
                <span className="badge badge-yellow text-xs">草稿 {contentCalendar.filter(c => c.status === 'draft').length}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">周次</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">主题</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">类型</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">负责人</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {contentCalendar.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.week}</td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.platform}</span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.topic}</td>
                      <td className="py-3 px-4">
                        <span className="tag tag-secondary text-xs">{item.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.status === 'published' ? 'badge-green' :
                          item.status === 'in_progress' ? 'badge-blue' :
                          item.status === 'scheduled' ? 'badge-blue' : 'badge-yellow'
                        } text-xs`}>
                          {item.status === 'published' ? '已发布' : item.status === 'in_progress' ? '进行中' : item.status === 'scheduled' ? '已排期' : '草稿'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.owner}</td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <PenTool className="w-3 h-3" />
                          编辑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Channel Strategy */}
      {activeSection === 'channel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>渠道资源分配</h3>
              </div>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={channelInvestData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {channelInvestData.map((entry, index) => (
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
                  {channelInvestData.map((item, i) => (
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
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>渠道 ROI 对比</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={channelStrategy.slice(0, 6)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                  <XAxis type="number" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis dataKey="platform" type="category" stroke="var(--color-text-secondary)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Bar dataKey="roi" name="ROI" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>渠道策略矩阵</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {channelStrategy.map((channel, index) => (
                <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{channel.platform}</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>ROI {channel.roi}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>策略方向</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{channel.focus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>发布频率</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{channel.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>资源投入</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{channel.investment}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {channel.contentTypes.map(type => (
                        <span key={type} className="tag tag-secondary text-xs">{type}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Execution Tracking */}
      {activeSection === 'execution' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>执行追踪</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                新增任务
              </button>
            </div>
            <div className="space-y-3">
              {executionTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: task.priority === 'high' ? 'var(--color-status-red-50)' : 'var(--color-bg-surface)' }}>
                      <Flag className="w-5 h-5" style={{ color: task.priority === 'high' ? 'var(--color-status-red)' : 'var(--color-text-secondary)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{task.title}</span>
                          <span className={`badge ${task.priority === 'high' ? 'badge-red' : task.priority === 'medium' ? 'badge-yellow' : 'badge-green'} text-xs`}>
                            {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>截止: {task.due}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>负责人: {task.assignee}</span>
                        <span className={`badge ${task.status === 'in_progress' ? 'badge-blue' : 'badge-yellow'} text-xs`}>
                          {task.status === 'in_progress' ? '进行中' : '待开始'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${task.progress}%`, backgroundColor: task.progress >= 60 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                        </div>
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Workload */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>团队工作量</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: '张经理', tasks: 3, completed: 2, inProgress: 1, avatar: '张' },
                { name: '李专员', tasks: 2, completed: 1, inProgress: 1, avatar: '李' },
                { name: '王分析师', tasks: 3, completed: 1, inProgress: 2, avatar: '王' },
                { name: '赵编辑', tasks: 2, completed: 0, inProgress: 2, avatar: '赵' },
              ].map((member, i) => (
                <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
                    {member.avatar}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.name}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{member.tasks} 个任务</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xs" style={{ color: 'var(--color-status-green)' }}>{member.completed} 完成</span>
                    <span className="text-xs" style={{ color: 'var(--color-primary)' }}>{member.inProgress} 进行中</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StrategyPage
