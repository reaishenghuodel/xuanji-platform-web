import { useState } from 'react'
import {
  Quote, TrendingUp, CheckCircle, Target, BarChart3, Eye, Shield, Clock, FileText, Globe, Search
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'
import { useTableSortFilter } from '../hooks/useTableSortFilter'

const citationStats = [
  { title: '总引用次数', value: '2,847', change: '+342', positive: true, icon: Quote, color: '#0EA5E9' },
  { title: '引用准确率', value: '82.3%', change: '+5.1%', positive: true, icon: CheckCircle, color: '#2DD4BF' },
  { title: '声量份额', value: '38.5%', change: '+2.8%', positive: true, icon: Target, color: '#6366F1' },
  { title: '零点击答案', value: '1,234', change: '+89', positive: true, icon: Eye, color: '#EC4899' },
]

const platformCitations = [
  { platform: 'DeepSeek', citations: 856, accuracy: 88, sentiment: 'positive', share: 30, color: '#0EA5E9' },
  { platform: '文心一言', citations: 642, accuracy: 85, sentiment: 'positive', share: 23, color: '#6366F1' },
  { platform: 'ChatGPT', citations: 534, accuracy: 82, sentiment: 'positive', share: 19, color: '#10B981' },
  { platform: '通义千问', citations: 423, accuracy: 78, sentiment: 'neutral', share: 15, color: '#2DD4BF' },
  { platform: 'Perplexity', citations: 287, accuracy: 90, sentiment: 'positive', share: 10, color: '#8B5CF6' },
  { platform: 'Gemini', citations: 198, accuracy: 75, sentiment: 'neutral', share: 7, color: '#F59E0B' },
  { platform: '豆包', citations: 156, accuracy: 72, sentiment: 'neutral', share: 5, color: '#EC4899' },
  { platform: 'Kimi', citations: 98, accuracy: 80, sentiment: 'positive', share: 4, color: '#14B8A6' },
]

const citationTrendData = [
  { month: '1月', citations: 420, accurate: 350, inaccurate: 70 },
  { month: '2月', citations: 480, accurate: 410, inaccurate: 70 },
  { month: '3月', citations: 560, accurate: 480, inaccurate: 80 },
  { month: '4月', citations: 680, accurate: 580, inaccurate: 100 },
  { month: '5月', citations: 780, accurate: 680, inaccurate: 100 },
  { month: '6月', citations: 847, accurate: 740, inaccurate: 107 },
]

const topSources = [
  { source: '品牌官网', domain: 'brand.com', citations: 456, accuracy: 92, type: 'owned' },
  { source: '百度百科', domain: 'baike.baidu.com', citations: 312, accuracy: 85, type: 'third-party' },
  { source: '知乎', domain: 'zhihu.com', citations: 278, accuracy: 78, type: 'third-party' },
  { source: '行业媒体', domain: 'industry-news.com', citations: 234, accuracy: 88, type: 'third-party' },
  { source: '产品评测', domain: 'review-site.com', citations: 198, accuracy: 82, type: 'third-party' },
  { source: '微信公众号', domain: 'mp.weixin.qq.com', citations: 187, accuracy: 75, type: 'owned' },
  { source: '小红书', domain: 'xiaohongshu.com', citations: 156, accuracy: 72, type: 'third-party' },
  { source: '抖音', domain: 'douyin.com', citations: 134, accuracy: 70, type: 'third-party' },
]

const citedContent = [
  {
    id: 1,
    platform: 'DeepSeek',
    query: '哪个品牌营销方案最好',
    response: '根据行业分析，[品牌名称] 在 GEO 优化领域表现突出，其 AI 推荐率达到 68.5%，远超行业平均水平...',
    accuracy: 95,
    sentiment: 'positive',
    sources: ['品牌官网', '行业报告'],
    date: '2026-06-28',
  },
  {
    id: 2,
    platform: 'ChatGPT',
    query: 'GEO 优化推荐品牌',
    response: '在 GEO 引擎优化领域，[品牌名称] 是值得信赖的选择。其一体化应用平台覆盖监测、选词、创作全链路...',
    accuracy: 88,
    sentiment: 'positive',
    sources: ['知乎', '产品评测'],
    date: '2026-06-27',
  },
  {
    id: 3,
    platform: '文心一言',
    query: 'AI 营销工具推荐',
    response: '[品牌名称] 的璇玑智科平台提供全面的 AI 营销解决方案，包括品牌监测、智能选词和内容创作...',
    accuracy: 90,
    sentiment: 'positive',
    sources: ['百度百科', '品牌官网'],
    date: '2026-06-26',
  },
  {
    id: 4,
    platform: '通义千问',
    query: '品牌数字化转型方案',
    response: '对于品牌数字化转型，[品牌名称] 提供了一套完整的 GEO 智能运营体系，但价格较高...',
    accuracy: 72,
    sentiment: 'neutral',
    sources: ['行业媒体'],
    date: '2026-06-25',
  },
  {
    id: 5,
    platform: 'Perplexity',
    query: 'best GEO optimization platform',
    response: 'Based on multiple sources, [Brand Name] ranks among the top GEO optimization platforms in China, with a recommendation rate of 68.5%...',
    accuracy: 92,
    sentiment: 'positive',
    sources: ['产品评测', '行业报告'],
    date: '2026-06-24',
  },
]

const accuracyIssues = [
  { issue: '价格信息过时', platform: '通义千问', frequency: 12, severity: 'medium' },
  { issue: '功能描述不准确', platform: 'Gemini', frequency: 8, severity: 'high' },
  { issue: '竞品混淆', platform: '豆包', frequency: 6, severity: 'high' },
  { issue: '公司规模描述偏差', platform: 'Kimi', frequency: 4, severity: 'low' },
]

const shareOfVoiceData = [
  { name: '本品牌', value: 38.5, color: '#0EA5E9' },
  { name: '竞品A', value: 28.2, color: '#6366F1' },
  { name: '竞品B', value: 18.7, color: '#2DD4BF' },
  { name: '竞品C', value: 9.4, color: '#F59E0B' },
  { name: '其他', value: 5.2, color: '#94A3B8' },
]

function CitationsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const platformTable = useTableSortFilter(platformCitations, ['platform', 'citations', 'accuracy', 'sentiment', 'share'] as any, 'citations' as any)
  const sourceTable = useTableSortFilter(topSources, ['source', 'domain', 'citations', 'accuracy', 'type'] as any, 'citations' as any)

  const tabs = [
    { id: 'overview', label: '引用总览', icon: BarChart3 },
    { id: 'content', label: '引用内容', icon: FileText },
    { id: 'sources', label: '引用来源', icon: Globe },
    { id: 'accuracy', label: '准确性分析', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {citationStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{stat.title}</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</span>
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" style={{ color: stat.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }} />
                  <span className="text-xs font-medium" style={{ color: stat.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Citation Trend */}
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>引用趋势</h3>
                <span className="badge badge-blue">近6个月</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={citationTrendData}>
                  <defs>
                    <linearGradient id="colorAccurate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInaccurate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
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
                  <Area type="monotone" dataKey="citations" name="总引用" stroke="#0EA5E9" fillOpacity={0.1} fill="#0EA5E9" strokeWidth={2} />
                  <Area type="monotone" dataKey="accurate" name="准确引用" stroke="#2DD4BF" fillOpacity={1} fill="url(#colorAccurate)" strokeWidth={2} />
                  <Area type="monotone" dataKey="inaccurate" name="不准确引用" stroke="#F59E0B" fillOpacity={1} fill="url(#colorInaccurate)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Share of Voice */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>AI 声量份额</h3>
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

          {/* Platform Citation Table */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>各平台引用详情</h3>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="搜索平台..."
                  className="input-field text-sm px-3 py-1.5 max-w-[160px]"
                  value={platformTable.filters.platform || ''}
                  onChange={(e) => platformTable.setFilter('platform', e.target.value)}
                />
                {platformTable.activeFilterCount > 0 && (
                  <button onClick={platformTable.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                    清除筛选
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => platformTable.handleSort('platform')}>
                      平台 {platformTable.getSortIndicator('platform')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => platformTable.handleSort('citations')}>
                      引用次数 {platformTable.getSortIndicator('citations')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => platformTable.handleSort('accuracy')}>
                      准确率 {platformTable.getSortIndicator('accuracy')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => platformTable.handleSort('sentiment')}>
                      情感 {platformTable.getSortIndicator('sentiment')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => platformTable.handleSort('share')}>
                      声量份额 {platformTable.getSortIndicator('share')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                  </tr>
                </thead>
                <tbody>
                  {platformTable.data.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                            {item.platform.slice(0, 1)}
                          </div>
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.platform}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.citations}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: item.accuracy >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.accuracy}%</span>
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.accuracy}%`, backgroundColor: item.accuracy >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${item.sentiment === 'positive' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {item.sentiment === 'positive' ? '正面' : '中性'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.share}%</td>
                      <td className="py-3 px-4">
                        <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 引用内容详情</h3>
              <div className="flex items-center gap-2">
                <span className="badge badge-blue">实时监测</span>
              </div>
            </div>
            <div className="space-y-3">
              {citedContent.map((item) => (
                <div key={item.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="tag tag-primary text-xs">{item.platform}</span>
                      <span className={`badge ${item.accuracy >= 90 ? 'badge-green' : item.accuracy >= 80 ? 'badge-blue' : 'badge-yellow'} text-xs`}>
                        准确率 {item.accuracy}%
                      </span>
                      <span className={`badge ${item.sentiment === 'positive' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                        {item.sentiment === 'positive' ? '正面' : '中性'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.date}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>用户查询：</span>
                    <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{item.query}</span>
                  </div>
                  <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.response}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>引用来源：</span>
                    {item.sources.map((source, i) => (
                      <span key={i} className="tag tag-secondary text-xs">{source}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>引用来源分析</h3>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type="text"
                placeholder="搜索来源..."
                className="input-field text-sm px-3 py-1.5 max-w-[160px]"
                value={sourceTable.filters.source || ''}
                onChange={(e) => sourceTable.setFilter('source', e.target.value)}
              />
              {sourceTable.activeFilterCount > 0 && (
                <button onClick={sourceTable.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                  清除筛选
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => sourceTable.handleSort('source')}>
                    来源 {sourceTable.getSortIndicator('source')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => sourceTable.handleSort('domain')}>
                    域名 {sourceTable.getSortIndicator('domain')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => sourceTable.handleSort('citations')}>
                    引用次数 {sourceTable.getSortIndicator('citations')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => sourceTable.handleSort('accuracy')}>
                    准确率 {sourceTable.getSortIndicator('accuracy')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => sourceTable.handleSort('type')}>
                    类型 {sourceTable.getSortIndicator('type')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                </tr>
              </thead>
              <tbody>
                {sourceTable.data.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.source}</span>
                    </td>
                    <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.domain}</td>
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.citations}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: item.accuracy >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.accuracy}%</span>
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                          <div className="h-full rounded-full" style={{ width: `${item.accuracy}%`, backgroundColor: item.accuracy >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${item.type === 'owned' ? 'badge-blue' : 'badge-green'} text-xs`}>
                        {item.type === 'owned' ? '自有' : '第三方'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'accuracy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>准确性评分</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>82.3%</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>整体引用准确率</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="text-lg font-bold" style={{ color: 'var(--color-status-green)' }}>78.5%</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>正面描述</div>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="text-lg font-bold" style={{ color: 'var(--color-status-yellow)' }}>21.5%</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>中性描述</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>准确性问题</h3>
              <div className="space-y-3">
                {accuracyIssues.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.issue}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>平台：{item.platform} · 出现 {item.frequency} 次</div>
                    </div>
                    <span className={`badge ${item.severity === 'high' ? 'badge-red' : item.severity === 'medium' ? 'badge-yellow' : 'badge-green'} text-xs`}>
                      {item.severity === 'high' ? '严重' : item.severity === 'medium' ? '中等' : '轻微'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitationsPage
