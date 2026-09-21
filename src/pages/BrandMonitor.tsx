import { useState } from 'react'
import { Eye, Bell, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, Clock, ChevronDown, ChevronUp, Target, BarChart3, Zap, Shield, Quote, Crosshair } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts'

const monitorData = [
  { platform: 'DeepSeek', recommendRate: 72, mentionCount: 4800, trend: 'up', color: '#0EA5E9', icon: 'DS', status: 'excellent' },
  { platform: '文心一言', recommendRate: 65, mentionCount: 3200, trend: 'up', color: '#6366F1', icon: 'WY', status: 'good' },
  { platform: 'ChatGPT', recommendRate: 58, mentionCount: 2100, trend: 'up', color: '#10B981', icon: 'CG', status: 'good' },
  { platform: '通义千问', recommendRate: 58, mentionCount: 2100, trend: 'down', color: '#2DD4BF', icon: 'TY', status: 'warning' },
  { platform: 'Perplexity', recommendRate: 52, mentionCount: 1800, trend: 'up', color: '#8B5CF6', icon: 'PP', status: 'good' },
  { platform: 'Gemini', recommendRate: 48, mentionCount: 1500, trend: 'up', color: '#F59E0B', icon: 'GM', status: 'normal' },
  { platform: '豆包', recommendRate: 45, mentionCount: 1500, trend: 'up', color: '#EC4899', icon: 'DB', status: 'normal' },
  { platform: 'Kimi', recommendRate: 38, mentionCount: 1200, trend: 'stable', color: '#14B8A6', icon: 'KM', status: 'normal' },
]

const platformDetails: Record<string, {
  keywords: { word: string; rank: number; trend: string }[];
  topQueries: { query: string; frequency: string }[];
  sentiment: { positive: number; neutral: number; negative: number };
  competitors: { name: string; rate: number }[];
  accuracy: number;
  citations: number;
}> = {
  DeepSeek: {
    keywords: [
      { word: '品牌核心词', rank: 1, trend: '+12%' },
      { word: '产品优势词', rank: 2, trend: '+8%' },
      { word: '行业专家词', rank: 3, trend: '+15%' },
    ],
    topQueries: [
      { query: '哪个品牌最好', frequency: '2.3K/天' },
      { query: '品牌推荐', frequency: '1.8K/天' },
      { query: '产品对比', frequency: '1.2K/天' },
    ],
    sentiment: { positive: 78, neutral: 15, negative: 7 },
    competitors: [
      { name: '竞品A', rate: 68 },
      { name: '竞品B', rate: 52 },
      { name: '竞品C', rate: 45 },
    ],
    accuracy: 88,
    citations: 856,
  },
  文心一言: {
    keywords: [
      { word: '品牌故事词', rank: 1, trend: '+10%' },
      { word: '用户评价词', rank: 2, trend: '+5%' },
      { word: '技术创新词', rank: 3, trend: '+18%' },
    ],
    topQueries: [
      { query: '品牌口碑如何', frequency: '1.9K/天' },
      { query: '产品评价', frequency: '1.5K/天' },
      { query: '品牌实力', frequency: '1.1K/天' },
    ],
    sentiment: { positive: 72, neutral: 20, negative: 8 },
    competitors: [
      { name: '竞品A', rate: 62 },
      { name: '竞品B', rate: 55 },
      { name: '竞品C', rate: 48 },
    ],
    accuracy: 85,
    citations: 642,
  },
  ChatGPT: {
    keywords: [
      { word: 'GEO优化词', rank: 1, trend: '+20%' },
      { word: 'AI营销词', rank: 2, trend: '+15%' },
      { word: '品牌监测词', rank: 3, trend: '+10%' },
    ],
    topQueries: [
      { query: 'best GEO tool', frequency: '1.5K/天' },
      { query: 'AI marketing platform', frequency: '1.2K/天' },
      { query: 'brand monitoring AI', frequency: '980/天' },
    ],
    sentiment: { positive: 75, neutral: 18, negative: 7 },
    competitors: [
      { name: 'Competitor A', rate: 55 },
      { name: 'Competitor B', rate: 48 },
      { name: 'Competitor C', rate: 42 },
    ],
    accuracy: 82,
    citations: 534,
  },
  通义千问: {
    keywords: [
      { word: '服务优势词', rank: 1, trend: '-3%' },
      { word: '价格词', rank: 2, trend: '+2%' },
      { word: '功能词', rank: 3, trend: '+5%' },
    ],
    topQueries: [
      { query: '服务怎么样', frequency: '1.2K/天' },
      { query: '价格对比', frequency: '980/天' },
      { query: '功能介绍', frequency: '850/天' },
    ],
    sentiment: { positive: 65, neutral: 22, negative: 13 },
    competitors: [
      { name: '竞品A', rate: 60 },
      { name: '竞品B', rate: 58 },
      { name: '竞品C', rate: 50 },
    ],
    accuracy: 78,
    citations: 423,
  },
  Perplexity: {
    keywords: [
      { word: '引用来源词', rank: 1, trend: '+18%' },
      { word: '数据准确性', rank: 2, trend: '+12%' },
      { word: '行业分析', rank: 3, trend: '+8%' },
    ],
    topQueries: [
      { query: 'GEO tool comparison', frequency: '890/天' },
      { query: 'AI brand monitoring', frequency: '760/天' },
      { query: 'content optimization', frequency: '650/天' },
    ],
    sentiment: { positive: 80, neutral: 15, negative: 5 },
    competitors: [
      { name: 'Competitor A', rate: 50 },
      { name: 'Competitor B', rate: 45 },
      { name: 'Competitor C', rate: 40 },
    ],
    accuracy: 90,
    citations: 287,
  },
  Gemini: {
    keywords: [
      { word: '技术能力', rank: 1, trend: '+10%' },
      { word: '产品功能', rank: 2, trend: '+6%' },
      { word: '用户体验', rank: 3, trend: '+4%' },
    ],
    topQueries: [
      { query: 'AI marketing solution', frequency: '720/天' },
      { query: 'brand optimization', frequency: '680/天' },
      { query: 'content strategy', frequency: '540/天' },
    ],
    sentiment: { positive: 70, neutral: 20, negative: 10 },
    competitors: [
      { name: 'Competitor A', rate: 52 },
      { name: 'Competitor B', rate: 46 },
      { name: 'Competitor C', rate: 40 },
    ],
    accuracy: 75,
    citations: 198,
  },
  豆包: {
    keywords: [
      { word: '品牌认知词', rank: 1, trend: '+8%' },
      { word: '使用体验词', rank: 2, trend: '+6%' },
      { word: '性价比词', rank: 3, trend: '+12%' },
    ],
    topQueries: [
      { query: '这个品牌怎么样', frequency: '980/天' },
      { query: '使用体验', frequency: '720/天' },
      { query: '性价比高吗', frequency: '650/天' },
    ],
    sentiment: { positive: 70, neutral: 18, negative: 12 },
    competitors: [
      { name: '竞品A', rate: 48 },
      { name: '竞品B', rate: 42 },
      { name: '竞品C', rate: 38 },
    ],
    accuracy: 72,
    citations: 156,
  },
  Kimi: {
    keywords: [
      { word: '品牌词', rank: 1, trend: '+5%' },
      { word: '产品词', rank: 2, trend: '+3%' },
      { word: '对比词', rank: 3, trend: '+7%' },
    ],
    topQueries: [
      { query: '推荐品牌', frequency: '850/天' },
      { query: '产品推荐', frequency: '680/天' },
      { query: '品牌对比', frequency: '520/天' },
    ],
    sentiment: { positive: 68, neutral: 20, negative: 12 },
    competitors: [
      { name: '竞品A', rate: 42 },
      { name: '竞品B', rate: 38 },
      { name: '竞品C', rate: 35 },
    ],
    accuracy: 80,
    citations: 98,
  },
}

const trendData = [
  { date: 'Day 1', brand: 52, competitor1: 48, competitor2: 45 },
  { date: 'Day 2', brand: 54, competitor1: 49, competitor2: 46 },
  { date: 'Day 3', brand: 56, competitor1: 50, competitor2: 44 },
  { date: 'Day 4', brand: 58, competitor1: 51, competitor2: 47 },
  { date: 'Day 5', brand: 62, competitor1: 50, competitor2: 48 },
  { date: 'Day 6', brand: 64, competitor1: 52, competitor2: 49 },
  { date: 'Day 7', brand: 68.5, competitor1: 53, competitor2: 50 },
]

const alerts = [
  { id: 1, type: 'warning', message: '通义千问推荐率下降 3.2%，建议检查内容策略', time: '10分钟前', platform: '通义千问' },
  { id: 2, type: 'success', message: 'DeepSeek 推荐率突破 70%，达到历史新高', time: '1小时前', platform: 'DeepSeek' },
  { id: 3, type: 'info', message: 'ChatGPT 新增引用来源 12 个', time: '1.5小时前', platform: 'ChatGPT' },
  { id: 4, type: 'warning', message: '豆包平台品牌提及量增速放缓', time: '3小时前', platform: '豆包' },
  { id: 5, type: 'success', message: 'Kimi 平台新增 3 个推荐场景', time: '4小时前', platform: 'Kimi' },
  { id: 6, type: 'info', message: 'Perplexity 准确性评分提升 5%', time: '5小时前', platform: 'Perplexity' },
]

const metrics = [
  { name: '推荐率', value: '68.5%', target: '70%', status: 'warning' },
  { name: '提及率', value: '85.2%', target: '80%', status: 'success' },
  { name: '正面占比', value: '78.3%', target: '75%', status: 'success' },
  { name: '覆盖率', value: '92.1%', target: '90%', status: 'success' },
  { name: '活跃度', value: '75.6%', target: '80%', status: 'warning' },
  { name: '信任度', value: '80.4%', target: '78%', status: 'success' },
]

const accuracyData = [
  { platform: 'DeepSeek', accuracy: 88, sentiment: 'positive', citations: 856 },
  { platform: '文心一言', accuracy: 85, sentiment: 'positive', citations: 642 },
  { platform: 'ChatGPT', accuracy: 82, sentiment: 'positive', citations: 534 },
  { platform: 'Perplexity', accuracy: 90, sentiment: 'positive', citations: 287 },
  { platform: 'Kimi', accuracy: 80, sentiment: 'positive', citations: 98 },
  { platform: 'Gemini', accuracy: 75, sentiment: 'neutral', citations: 198 },
  { platform: '豆包', accuracy: 72, sentiment: 'neutral', citations: 156 },
  { platform: '通义千问', accuracy: 78, sentiment: 'neutral', citations: 423 },
]

const shareOfVoiceData = [
  { name: '本品牌', value: 38.5, color: '#0EA5E9' },
  { name: '竞品A', value: 28.2, color: '#6366F1' },
  { name: '竞品B', value: 18.7, color: '#2DD4BF' },
  { name: '竞品C', value: 9.4, color: '#F59E0B' },
  { name: '其他', value: 5.2, color: '#94A3B8' },
]

const optimizationSuggestions = [
  { priority: 'high', platform: '通义千问', title: '推荐率下降需紧急处理', action: '增加正面内容投放', impact: '预计提升 5-8%' },
  { priority: 'medium', platform: 'Gemini', title: '准确性有提升空间', action: '优化结构化数据', impact: '预计提升 3-5%' },
  { priority: 'medium', platform: '豆包', title: '提及量增速放缓', action: '优化关键词布局', impact: '预计提升 3-5%' },
  { priority: 'medium', platform: 'Kimi', title: '新场景拓展机会', action: '增加场景化内容', impact: '预计覆盖 +15%' },
  { priority: 'low', platform: 'DeepSeek', title: '维持领先优势', action: '持续内容优化', impact: '预计稳定 70%+' },
]

function BrandMonitor() {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>('DeepSeek')
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const timeRanges = [
    { id: '24h', label: '24小时' },
    { id: '7d', label: '7天' },
    { id: '30d', label: '30天' },
    { id: '90d', label: '90天' },
  ]

  return (
    <div className="space-y-6">
      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monitorData.map((item, index) => (
          <div
            key={index}
            className="card card-hover cursor-pointer"
            onClick={() => setExpandedPlatform(expandedPlatform === item.platform ? null : item.platform)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{item.platform}</span>
              </div>
              {item.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
              ) : item.trend === 'down' ? (
                <TrendingDown className="w-4 h-4" style={{ color: 'var(--color-status-red)' }} />
              ) : (
                <Clock className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              )}
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {item.recommendRate}%
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              提及量 {item.mentionCount.toLocaleString()}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`badge text-xs ${
                item.status === 'excellent' ? 'badge-green' :
                item.status === 'good' ? 'badge-blue' :
                item.status === 'warning' ? 'badge-yellow' : 'badge-green'
              }`}>
                {item.status === 'excellent' ? '优秀' : item.status === 'good' ? '良好' : item.status === 'warning' ? '需关注' : '正常'}
              </span>
              {expandedPlatform === item.platform ? (
                <ChevronUp className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              ) : (
                <ChevronDown className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Platform Detail */}
      {expandedPlatform && platformDetails[expandedPlatform] && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${monitorData.find(m => m.platform === expandedPlatform)?.color}20`, color: monitorData.find(m => m.platform === expandedPlatform)?.color }}>
                {monitorData.find(m => m.platform === expandedPlatform)?.icon}
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{expandedPlatform} 详情</h3>
            </div>
            <div className="flex items-center gap-2">
              {timeRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id)}
                  className="px-3 py-1 rounded-lg text-xs transition-all"
                  style={{
                    backgroundColor: selectedTimeRange === range.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                    color: selectedTimeRange === range.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    border: `1px solid ${selectedTimeRange === range.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Keywords */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>关键词排名</span>
              </div>
              <div className="space-y-2">
                {platformDetails[expandedPlatform].keywords.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: i === 0 ? 'var(--color-accent-50)' : 'var(--color-bg-surface-light)', color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                        {kw.rank}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{kw.word}</span>
                    </div>
                    <span className="text-xs" style={{ color: kw.trend.startsWith('+') ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>{kw.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Queries */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>热门查询</span>
              </div>
              <div className="space-y-2">
                {platformDetails[expandedPlatform].topQueries.map((q, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{q.query}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{q.frequency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>情感分布</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>正面</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-status-green)' }}>{platformDetails[expandedPlatform].sentiment.positive}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${platformDetails[expandedPlatform].sentiment.positive}%`, backgroundColor: 'var(--color-status-green)' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>中性</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{platformDetails[expandedPlatform].sentiment.neutral}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${platformDetails[expandedPlatform].sentiment.neutral}%`, backgroundColor: 'var(--color-text-secondary)' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>负面</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-status-red)' }}>{platformDetails[expandedPlatform].sentiment.negative}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${platformDetails[expandedPlatform].sentiment.negative}%`, backgroundColor: 'var(--color-status-red)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Accuracy & Citations */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>引用与准确性</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{platformDetails[expandedPlatform].accuracy}%</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>引用准确率</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{platformDetails[expandedPlatform].citations}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>被引用次数</div>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Comparison */}
          <div className="mt-4">
            <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>竞品对比</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {platformDetails[expandedPlatform].competitors.map((comp, i) => (
                <div key={i} className="p-3 rounded-lg flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{comp.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                      <div className="h-full rounded-full" style={{ width: `${comp.rate}%`, backgroundColor: comp.rate > 50 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{comp.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>推荐率趋势对比</h3>
            <div className="flex items-center gap-2">
              <span className="badge badge-blue">近7天</span>
              <span className="badge badge-green">实时</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
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
              <Line type="monotone" dataKey="brand" name="本品牌" stroke="var(--color-accent)" strokeWidth={2} dot={{ fill: 'var(--color-accent)' }} />
              <Line type="monotone" dataKey="competitor1" name="竞品 A" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-primary)' }} />
              <Line type="monotone" dataKey="competitor2" name="竞品 B" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="3 3" dot={{ fill: 'var(--color-secondary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" style={{ color: 'var(--color-status-yellow)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>实时预警</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="flex items-start gap-2">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-status-yellow)' }} />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-status-green)' }} />
                  ) : (
                    <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{alert.platform}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{alert.message}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{alert.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy & Share of Voice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>各平台准确性评分</h3>
          </div>
          <div className="space-y-3">
            {accuracyData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm w-20" style={{ color: 'var(--color-text-secondary)' }}>{item.platform}</span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.accuracy}%`, backgroundColor: item.accuracy >= 85 ? 'var(--color-accent)' : item.accuracy >= 75 ? 'var(--color-primary)' : 'var(--color-status-yellow)' }} />
                </div>
                <span className="text-sm font-medium w-10 text-right" style={{ color: 'var(--color-text-primary)' }}>{item.accuracy}%</span>
                <span className="text-xs w-14 text-right" style={{ color: 'var(--color-text-secondary)' }}>{item.citations}次</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Crosshair className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 声量份额</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={shareOfVoiceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
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
          <div className="flex flex-wrap gap-2 mt-2">
            {shareOfVoiceData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>核心指标详情</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{metric.name}</span>
                <span className={`badge ${metric.status === 'success' ? 'badge-green' : 'badge-yellow'}`}>
                  {metric.status === 'success' ? '达标' : '需关注'}
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{metric.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>目标: {metric.target}</div>
              <div className="progress-bar mt-2">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: metric.value,
                    backgroundColor: metric.status === 'success' ? 'var(--color-status-green)' : 'var(--color-status-yellow)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 优化建议</h3>
        </div>
        <div className="space-y-3">
          {optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: suggestion.priority === 'high' ? 'var(--color-status-red-50)' :
                    suggestion.priority === 'medium' ? 'var(--color-status-yellow-50)' : 'var(--color-primary-50)',
                }}>
                <Target className="w-4 h-4" style={{
                  color: suggestion.priority === 'high' ? 'var(--color-status-red)' :
                    suggestion.priority === 'medium' ? 'var(--color-status-yellow)' : 'var(--color-primary)',
                }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{suggestion.title}</span>
                  <span className={`badge text-xs ${
                    suggestion.priority === 'high' ? 'badge-red' :
                    suggestion.priority === 'medium' ? 'badge-yellow' : 'badge-green'
                  }`}>
                    {suggestion.priority === 'high' ? '紧急' : suggestion.priority === 'medium' ? '建议' : '优化'}
                  </span>
                  <span className="tag tag-primary text-xs">{suggestion.platform}</span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>建议: {suggestion.action}</span>
                  <span style={{ color: 'var(--color-accent)' }}>影响: {suggestion.impact}</span>
                </div>
              </div>
              <button className="btn-primary text-xs flex items-center gap-1 flex-shrink-0">
                <Zap className="w-3 h-3" />
                执行
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Bar Chart */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>各平台表现对比</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monitorData} layout="vertical">
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
            <Bar dataKey="recommendRate" name="推荐率(%)" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="mentionCount" name="提及量(÷100)" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BrandMonitor
