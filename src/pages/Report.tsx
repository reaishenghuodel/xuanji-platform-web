import { useState } from 'react'
import { FileBarChart, Download, Share2, CheckCircle, AlertTriangle, TrendingUp, Calendar, Target, Wand2, Clock, ChevronDown, ChevronUp, Search, Eye, Copy, Shield, Quote, BarChart3, Zap, Layers, Globe, FileText, Image } from 'lucide-react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Area, Line, PieChart, Pie, Cell, ComposedChart
} from 'recharts'

const radarData = [
  { subject: '推荐率', A: 68, B: 52, fullMark: 100 },
  { subject: '提及率', A: 85, B: 60, fullMark: 100 },
  { subject: '正面占比', A: 78, B: 65, fullMark: 100 },
  { subject: '覆盖率', A: 92, B: 70, fullMark: 100 },
  { subject: '活跃度', A: 75, B: 55, fullMark: 100 },
  { subject: '信任度', A: 80, B: 58, fullMark: 100 },
]

const barData = [
  { name: 'DeepSeek', brand: 72, competitor: 58 },
  { name: '文心一言', brand: 65, competitor: 52 },
  { name: 'ChatGPT', brand: 62, competitor: 55 },
  { name: '通义千问', brand: 58, competitor: 48 },
  { name: '豆包', brand: 45, competitor: 38 },
  { name: 'Kimi', brand: 38, competitor: 32 },
  { name: 'Perplexity', brand: 55, competitor: 42 },
  { name: 'Gemini', brand: 48, competitor: 40 },
]

const trendData = [
  { month: '1月', brand: 52, industry: 48, citation: 420 },
  { month: '2月', brand: 55, industry: 49, citation: 480 },
  { month: '3月', brand: 58, industry: 50, citation: 550 },
  { month: '4月', brand: 62, industry: 51, citation: 620 },
  { month: '5月', brand: 65, industry: 52, citation: 710 },
  { month: '6月', brand: 68, industry: 53, citation: 824 },
]

const reportTemplates = [
  { id: 'monthly', name: '月度诊断报告', desc: '全面分析品牌月度AI表现', icon: Calendar, color: '#0EA5E9' },
  { id: 'competitor', name: '竞品对比分析', desc: '深度对比竞品AI策略差异', icon: TrendingUp, color: '#2DD4BF' },
  { id: 'crisis', name: '危机预警报告', desc: '及时发现并预警品牌风险', icon: AlertTriangle, color: '#F59E0B' },
  { id: 'strategy', name: 'GEO策略评估', desc: '评估优化策略执行效果', icon: Target, color: '#6366F1' },
  { id: 'keyword', name: '关键词优化报告', desc: '分析关键词表现与优化建议', icon: Wand2, color: '#EC4899' },
  { id: 'citation', name: '引用监测报告', desc: '追踪品牌在各平台被引用情况', icon: Quote, color: '#10B981' },
]

const reports = [
  {
    id: 1,
    title: '2026年6月品牌AI表现月度诊断报告',
    date: '2026-06-28',
    type: '月度报告',
    status: 'completed',
    score: 82,
    summary: '本月品牌 AI 推荐率提升 12.3%，在 DeepSeek 和文心一言平台表现优异。建议加强通义千问和豆包平台的内容布局。',
  },
  {
    id: 2,
    title: '竞品品牌AI策略对比分析报告',
    date: '2026-06-25',
    type: '竞品分析',
    status: 'completed',
    score: 78,
    summary: '竞品 A 在文心一言平台增长迅速，采用差异化标签策略。建议本品牌调整语义定义策略。',
  },
  {
    id: 3,
    title: 'GEO优化策略执行效果评估',
    date: '2026-06-20',
    type: '效果评估',
    status: 'completed',
    score: 85,
    summary: 'GEO 优化策略执行后，品牌 AI 场景覆盖率提升 23%，推荐率提升 18%。策略效果显著，建议继续执行。',
  },
  {
    id: 4,
    title: '品牌AI危机预警与应对建议',
    date: '2026-06-15',
    type: '危机预警',
    status: 'warning',
    score: 65,
    summary: '检测到品牌在某平台推荐率异常波动，建议立即检查内容策略并调整关键词布局。',
  },
  {
    id: 5,
    title: '2026年5月关键词优化效果报告',
    date: '2026-05-28',
    type: '关键词优化',
    status: 'completed',
    score: 88,
    summary: '关键词优化策略执行后，核心词排名提升 15%，长尾词覆盖率提升 28%，整体搜索可见度显著改善。',
  },
  {
    id: 6,
    title: 'AI引用监测月度报告',
    date: '2026-06-10',
    type: '引用监测',
    status: 'completed',
    score: 79,
    summary: '本月品牌在各 AI 平台被引用 824 次，准确率 97.2%。DeepSeek 和 Perplexity 平台引用量增长显著。',
  },
]

const suggestions = [
  { priority: 'high', platform: '通义千问', title: '加强通义千问平台内容布局', detail: '当前推荐率 58%，低于目标 65%，建议增加该平台专属内容产出', impact: '预计提升 5-8%', timeline: '2周' },
  { priority: 'high', platform: '全平台', title: '优化品牌语义定义', detail: 'AI 对品牌的语义理解度有提升空间，建议植入更多差异化标签', impact: '预计提升 10-15%', timeline: '1个月' },
  { priority: 'medium', platform: '全平台', title: '拓展长尾关键词覆盖', detail: '当前长尾词覆盖率 72%，建议拓展至 85% 以上', impact: '预计提升 3-5%', timeline: '3周' },
  { priority: 'medium', platform: 'DeepSeek', title: '增加用户证言内容', detail: '用户证言类内容在 AI 推荐中表现优异，建议增加产出比例', impact: '预计提升 8-12%', timeline: '2周' },
  { priority: 'medium', platform: 'Perplexity', title: '加强引用来源建设', detail: 'Perplexity 对引用来源要求较高，建议完善权威信源', impact: '预计提升 5-8%', timeline: '1个月' },
  { priority: 'low', platform: '全平台', title: '定期更新品牌数据', detail: '建议每两周更新一次品牌核心数据，保持 AI 认知新鲜度', impact: '预计维持优势', timeline: '持续' },
]

// AI 健康度评分
const healthMetrics = [
  { name: '结构化数据', score: 85, target: 90, status: 'good' },
  { name: '语义一致性', score: 72, target: 85, status: 'warning' },
  { name: '权威信源', score: 90, target: 85, status: 'good' },
  { name: '多模态素材', score: 65, target: 80, status: 'warning' },
  { name: 'FAQ 覆盖', score: 88, target: 80, status: 'good' },
  { name: 'Schema 标记', score: 78, target: 85, status: 'warning' },
  { name: '引用准确性', score: 97, target: 95, status: 'good' },
  { name: '品牌一致性', score: 82, target: 85, status: 'good' },
]

// 引用来源分析
const citationSourceData = [
  { name: '自有官网', value: 35, color: '#0EA5E9' },
  { name: '权威媒体', value: 28, color: '#2DD4BF' },
  { name: '行业报告', value: 18, color: '#6366F1' },
  { name: '社交平台', value: 12, color: '#F59E0B' },
  { name: '第三方评测', value: 7, color: '#EC4899' },
]

const citationSourceDetails = [
  { source: '品牌官网', count: 289, accuracy: 96, trend: '+12%', type: '自有' },
  { source: '知乎专栏', count: 156, accuracy: 94, trend: '+8%', type: 'UGC' },
  { source: '36氪', count: 98, accuracy: 92, trend: '+15%', type: '媒体' },
  { source: '虎嗅', count: 87, accuracy: 91, trend: '+5%', type: '媒体' },
  { source: '行业白皮书', count: 76, accuracy: 98, trend: '+20%', type: '报告' },
  { source: '小红书笔记', count: 65, accuracy: 88, trend: '+18%', type: 'UGC' },
  { source: 'B站视频', count: 28, accuracy: 85, trend: '+25%', type: 'UGC' },
  { source: '微信公众号', count: 25, accuracy: 90, trend: '+3%', type: '自媒体' },
]

// 改善进度追踪
const progressData = [
  { date: '06-01', action: '启动品牌语义优化', status: 'completed', impact: '+5%' },
  { date: '06-08', action: 'DeepSeek 内容矩阵建设', status: 'completed', impact: '+8%' },
  { date: '06-15', action: 'FAQ 问答库扩展', status: 'completed', impact: '+3%' },
  { date: '06-20', action: '权威信源投放', status: 'in_progress', impact: '+7%' },
  { date: '06-25', action: '多模态素材优化', status: 'pending', impact: '+4%' },
  { date: '06-30', action: 'Schema 标记完善', status: 'pending', impact: '+3%' },
]

// GROI 效果指标
const groiData = [
  { metric: 'AI 推荐率', current: 68.5, baseline: 52, target: 75, unit: '%' },
  { metric: '品牌提及量', current: 12847, baseline: 8200, target: 15000, unit: '次' },
  { metric: '引用准确率', current: 97.2, baseline: 94.5, target: 98, unit: '%' },
  { metric: '场景覆盖率', current: 82.1, baseline: 68, target: 90, unit: '%' },
  { metric: '声量份额', current: 38.5, baseline: 28, target: 45, unit: '%' },
  { metric: '内容准备度', current: 79.7, baseline: 65, target: 85, unit: '分' },
]

// 平台对比矩阵
const platformMatrix = [
  { platform: 'DeepSeek', recommend: 72, mention: 4800, accuracy: 88, citation: 856, sentiment: 78, status: 'excellent' },
  { platform: '文心一言', recommend: 65, mention: 3200, accuracy: 85, citation: 642, sentiment: 72, status: 'good' },
  { platform: 'ChatGPT', recommend: 58, mention: 2100, accuracy: 82, citation: 534, sentiment: 75, status: 'good' },
  { platform: 'Perplexity', recommend: 52, mention: 1800, accuracy: 90, citation: 287, sentiment: 80, status: 'good' },
  { platform: 'Gemini', recommend: 48, mention: 1500, accuracy: 75, citation: 198, sentiment: 70, status: 'normal' },
  { platform: '豆包', recommend: 45, mention: 1500, accuracy: 72, citation: 156, sentiment: 70, status: 'normal' },
  { platform: 'Kimi', recommend: 38, mention: 1200, accuracy: 80, citation: 98, sentiment: 68, status: 'normal' },
  { platform: '通义千问', recommend: 58, mention: 2100, accuracy: 78, citation: 423, sentiment: 65, status: 'warning' },
]

function Report() {
  const [showGenerator, setShowGenerator] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [generating, setGenerating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  const handleGenerate = () => {
    if (!selectedTemplate) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setShowGenerator(false)
      setSelectedTemplate('')
    }, 2000)
  }

  const filteredReports = reports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = filterType === 'all' || r.type === filterType || (filterType === 'warning' && r.status === 'warning')
    return matchSearch && matchType
  })

  const tabs = [
    { id: 'overview', label: '综合概览', icon: BarChart3 },
    { id: 'health', label: 'AI健康度', icon: Shield },
    { id: 'citation', label: '引用分析', icon: Quote },
    { id: 'groi', label: '效果指标', icon: Target },
    { id: 'progress', label: '改善追踪', icon: TrendingUp },
    { id: 'whitelabel', label: '白标报告', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <FileBarChart className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>报告总数</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>24</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>已完成</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>18</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-status-yellow)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>需关注</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>4</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>本月新增</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>6</div>
            </div>
          </div>

          {/* Report Generator */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 报告生成器</h3>
              </div>
              <button
                onClick={() => setShowGenerator(!showGenerator)}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                {showGenerator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showGenerator ? '收起' : '生成新报告'}
              </button>
            </div>

            {showGenerator && (
              <div className="space-y-4">
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>选择报告模板，AI 将自动分析数据并生成专业诊断报告</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {reportTemplates.map((template) => {
                    const Icon = template.icon
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className="p-4 rounded-xl text-left transition-all border-2"
                        style={{
                          backgroundColor: selectedTemplate === template.id ? `${template.color}15` : 'var(--color-bg-surface-light)',
                          borderColor: selectedTemplate === template.id ? template.color : 'var(--color-border-default)',
                        }}
                      >
                        <Icon className="w-6 h-6 mb-2" style={{ color: template.color }} />
                        <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{template.name}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{template.desc}</div>
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs block mb-1" style={{ color: 'var(--color-text-secondary)' }}>报告时间范围</label>
                    <select className="input-field text-sm w-full py-2">
                      <option>最近7天</option>
                      <option>最近30天</option>
                      <option>最近90天</option>
                      <option>自定义</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs block mb-1" style={{ color: 'var(--color-text-secondary)' }}>对比对象</label>
                    <select className="input-field text-sm w-full py-2">
                      <option>行业平均</option>
                      <option>竞品 A</option>
                      <option>竞品 B</option>
                      <option>不对比</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleGenerate}
                      disabled={!selectedTemplate || generating}
                      className="btn-primary flex items-center gap-2"
                      style={{ opacity: !selectedTemplate || generating ? 0.5 : 1 }}
                    >
                      {generating ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>生成中...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          <span>AI 生成报告</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar Chart */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌综合表现雷达图</h3>
              <ResponsiveContainer width="100%" height={300}>
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
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart + Trend */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>各平台推荐率对比</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                  <XAxis type="number" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="brand" name="本品牌" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="competitor" name="竞品平均" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend over time */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌推荐率与引用趋势（近6个月）</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={trendData}>
                <defs>
                  <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} />
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
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="brand" name="本品牌(%)" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorBrand)" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="industry" name="行业平均" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-primary)' }} />
                <Line yAxisId="right" type="monotone" dataKey="citation" name="引用次数" stroke="var(--color-secondary)" strokeWidth={2} dot={{ fill: 'var(--color-secondary)' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Matrix */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>平台表现矩阵</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">推荐率</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">提及量</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">准确率</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">引用数</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">情感</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {platformMatrix.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.platform}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.recommend}%</span>
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.recommend}%`, backgroundColor: item.recommend >= 60 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.mention.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: item.accuracy >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.accuracy}%</span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.citation}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.sentiment}%</span>
                          <div className="w-10 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.sentiment}%`, backgroundColor: item.sentiment >= 75 ? 'var(--color-status-green)' : 'var(--color-status-yellow)' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.status === 'excellent' ? 'badge-green' :
                          item.status === 'good' ? 'badge-blue' :
                          item.status === 'warning' ? 'badge-yellow' : 'badge-green'
                        } text-xs`}>
                          {item.status === 'excellent' ? '优秀' : item.status === 'good' ? '良好' : item.status === 'warning' ? '需关注' : '正常'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 优化建议</h3>
            </div>
            <div className="space-y-3">
              {suggestions.map((item, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.title}</span>
                        <span className={`badge ${
                          item.priority === 'high' ? 'badge-red' :
                          item.priority === 'medium' ? 'badge-yellow' : 'badge-green'
                        } text-xs`}>
                          {item.priority === 'high' ? '高优先级' : item.priority === 'medium' ? '中优先级' : '低优先级'}
                        </span>
                        <span className="tag tag-primary text-xs">{item.platform}</span>
                        <span className="text-xs" style={{ color: 'var(--color-accent)' }}>影响: {item.impact}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>周期: {item.timeline}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reports List */}
          <div className="card">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>诊断报告列表</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="搜索报告..."
                    className="input-field pl-9 pr-4 py-2 text-sm w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="input-field text-sm py-2"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">全部类型</option>
                  <option value="月度报告">月度报告</option>
                  <option value="竞品分析">竞品分析</option>
                  <option value="效果评估">效果评估</option>
                  <option value="危机预警">危机预警</option>
                  <option value="关键词优化">关键词优化</option>
                  <option value="引用监测">引用监测</option>
                  <option value="warning">仅看预警</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{report.title}</span>
                        <span className={`badge ${
                          report.status === 'completed' ? 'badge-green' : 'badge-yellow'
                        } text-xs`}>
                          {report.status === 'completed' ? '已完成' : '需关注'}
                        </span>
                        <span className="tag tag-primary text-xs">{report.type}</span>
                      </div>
                      <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{report.date}</div>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{report.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{
                          color: report.score >= 80 ? 'var(--color-accent)' : report.score >= 70 ? 'var(--color-primary)' : 'var(--color-status-yellow)',
                        }}>
                          {report.score}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>综合评分</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <button className="btn-primary flex items-center gap-1 text-xs">
                      <Download className="w-3 h-3" />
                      下载 PDF
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-xs">
                      <Share2 className="w-3 h-3" />
                      分享
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-xs">
                      <Eye className="w-3 h-3" />
                      查看详情
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-xs">
                      <Copy className="w-3 h-3" />
                      复制链接
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Health Tab */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>AI健康度</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>82.4</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>/100</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>达标项</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-green)' }}>5</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>/8 项</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-status-yellow)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>需优化</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-yellow)' }}>3</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>项</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>较上月</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>+4.2</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>分</div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>AI 健康度评分详情</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthMetrics.map((item, i) => (
                <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                    <span className={`badge ${item.status === 'good' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                      {item.status === 'good' ? '达标' : '需优化'}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-xl font-bold" style={{ color: item.score >= item.target ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.score}</span>
                    <span className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>/ {item.target} 目标</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                      <div className="h-full rounded-full" style={{
                        width: `${Math.min((item.score / item.target) * 100, 100)}%`,
                        backgroundColor: item.score >= item.target ? 'var(--color-accent)' : 'var(--color-status-yellow)',
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Citation Tab */}
      {activeTab === 'citation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Quote className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>总引用数</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>824</div>
              <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ +12.3% 本月</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>引用准确率</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>97.2%</div>
              <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ +2.1% 本月</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>覆盖来源</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>8</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>个主要信源</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>引用来源分布</h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={citationSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {citationSourceData.map((entry, index) => (
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
                  {citationSourceData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>来源详情</h3>
              <div className="space-y-2">
                {citationSourceDetails.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.source}</span>
                        <span className="tag tag-primary text-xs">{item.type}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>引用 {item.count} 次</span>
                        <span className="text-xs" style={{ color: item.accuracy >= 90 ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>准确率 {item.accuracy}%</span>
                        <span className="text-xs" style={{ color: 'var(--color-status-green)' }}>趋势 {item.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GROI Tab */}
      {activeTab === 'groi' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>GROI 可量化效果指标</h3>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Generative Engine Optimization ROI</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groiData.map((item, i) => (
                <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>{item.metric}</div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.current}</span>
                    <span className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{item.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>基线: {item.baseline}</span>
                    <span className="text-xs" style={{ color: 'var(--color-primary)' }}>目标: {item.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                      <div className="h-full rounded-full" style={{
                        width: `${Math.min(((item.current - item.baseline) / (item.target - item.baseline)) * 100, 100)}%`,
                        backgroundColor: 'var(--color-accent)',
                      }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                      +{((item.current - item.baseline) / item.baseline * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>改善进度追踪</h3>
            </div>
            <div className="space-y-4">
              {progressData.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: item.status === 'completed' ? 'var(--color-status-green-50)' :
                        item.status === 'in_progress' ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                    }}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-status-green)' }} />
                    ) : item.status === 'in_progress' ? (
                      <Clock className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    ) : (
                      <Layers className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.action}</span>
                      <span className={`badge ${
                        item.status === 'completed' ? 'badge-green' :
                        item.status === 'in_progress' ? 'badge-blue' : 'badge-yellow'
                      } text-xs`}>
                        {item.status === 'completed' ? '已完成' : item.status === 'in_progress' ? '进行中' : '待开始'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.date}</span>
                      <span className="text-xs" style={{ color: 'var(--color-accent)' }}>预计影响: {item.impact}</span>
                    </div>
                  </div>
                  {item.status === 'in_progress' && (
                    <div className="w-24">
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                        <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: 'var(--color-primary)' }} />
                      </div>
                      <div className="text-xs text-center mt-1" style={{ color: 'var(--color-primary)' }}>60%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* White-label Tab */}
      {activeTab === 'whitelabel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>白标报告模板</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>6</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>个模板可用</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>已定制品牌</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>12</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>个客户</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>本月导出</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>48</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>份报告</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>白标报告预览</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                导出 PDF
              </button>
            </div>
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'white', borderColor: '#e5e7eb' }}>
              {/* Mock branded report preview */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: '#e5e7eb' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0EA5E9' }}>
                    <span className="text-white font-bold text-sm">客户</span>
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: '#1f2937' }}>客户品牌 Logo</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>AI 品牌表现诊断报告</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: '#6b7280' }}>报告日期</div>
                  <div className="text-sm font-medium" style={{ color: '#1f2937' }}>2026-06-28</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f3f4f6' }}>
                  <div className="text-2xl font-bold" style={{ color: '#0EA5E9' }}>68.5%</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>AI 推荐率</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f3f4f6' }}>
                  <div className="text-2xl font-bold" style={{ color: '#10B981' }}>12,847</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>品牌提及量</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f3f4f6' }}>
                  <div className="text-2xl font-bold" style={{ color: '#6366F1' }}>82.4</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>AI 健康度</div>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#f3f4f6' }}>
                <div className="text-xs font-medium mb-2" style={{ color: '#1f2937' }}>执行摘要</div>
                <p className="text-xs" style={{ color: '#6b7280' }}>本报告由 璇玑智科 提供技术支持，基于 8 大 AI 平台数据分析生成...</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs block mb-1" style={{ color: 'var(--color-text-secondary)' }}>报告标题</label>
                <input type="text" className="input-field text-sm w-full py-2" defaultValue="2026年6月品牌AI表现诊断报告" />
              </div>
              <div className="flex-1">
                <label className="text-xs block mb-1" style={{ color: 'var(--color-text-secondary)' }}>客户名称</label>
                <input type="text" className="input-field text-sm w-full py-2" defaultValue="客户品牌" />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--color-text-secondary)' }}>Logo</label>
                <button className="btn-secondary text-sm py-2">上传</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>白标模板库</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: '月度诊断报告', desc: '标准月度品牌AI表现分析', color: '#0EA5E9' },
                { name: '竞品对比分析', desc: '深度对比竞品GEO策略差异', color: '#2DD4BF' },
                { name: 'GEO策略评估', desc: '评估优化策略执行效果', color: '#6366F1' },
                { name: '危机预警报告', desc: '及时发现并预警品牌风险', color: '#F59E0B' },
                { name: '引用监测报告', desc: '追踪品牌被引用情况', color: '#10B981' },
                { name: '关键词优化报告', desc: '分析关键词表现与建议', color: '#EC4899' },
              ].map((template, i) => (
                <div key={i} className="p-4 rounded-xl border transition-all cursor-pointer" style={{ backgroundColor: 'var(--color-bg-surface-light)', borderColor: 'var(--color-border-default)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = template.color; e.currentTarget.style.backgroundColor = `${template.color}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-surface-light)'; }}
                >
                  <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: `${template.color}20` }}>
                    <FileText className="w-4 h-4" style={{ color: template.color }} />
                  </div>
                  <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{template.name}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{template.desc}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="btn-primary text-xs flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      导出
                    </button>
                    <button className="btn-secondary text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      预览
                    </button>
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

export default Report
