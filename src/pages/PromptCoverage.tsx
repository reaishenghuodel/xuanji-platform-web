import { useState } from 'react'
import {
  Target, Search, TrendingUp, CheckCircle, AlertTriangle, Zap, BarChart3, Layers, Hash, Sparkles, Lightbulb
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts'

const coverageStats = [
  { title: '提示覆盖度', value: '68.5%', change: '+8.3%', positive: true, icon: Target, color: '#0EA5E9' },
  { title: '目标查询数', value: '1,245', change: '+156', positive: true, icon: Search, color: '#2DD4BF' },
  { title: '覆盖查询数', value: '852', change: '+89', positive: true, icon: CheckCircle, color: '#6366F1' },
  { title: '提示缺口', value: '393', change: '-67', positive: true, icon: AlertTriangle, color: '#F59E0B' },
]

const queryCategories = [
  { category: '信息型', covered: 342, total: 450, percentage: 76, trend: '+12%' },
  { category: '交易型', covered: 234, total: 320, percentage: 73, trend: '+8%' },
  { category: '导航型', covered: 156, total: 245, percentage: 64, trend: '+5%' },
  { category: '对比型', covered: 89, total: 156, percentage: 57, trend: '-2%' },
  { category: '品牌型', covered: 67, total: 98, percentage: 68, trend: '+15%' },
  { category: '场景型', covered: 45, total: 89, percentage: 51, trend: '+3%' },
]

const coverageTrendData = [
  { month: '1月', coverage: 52, target: 60 },
  { month: '2月', coverage: 55, target: 62 },
  { month: '3月', coverage: 58, target: 64 },
  { month: '4月', coverage: 62, target: 66 },
  { month: '5月', coverage: 65, target: 68 },
  { month: '6月', coverage: 68.5, target: 70 },
]

const promptGaps = [
  { query: 'AI营销工具对比', competitor: '竞品A', gap: '高', opportunity: '制作详细对比评测内容', impact: '高' },
  { query: 'GEO优化价格', competitor: '竞品B', gap: '中', opportunity: '发布透明定价方案', impact: '高' },
  { query: '品牌AI监测怎么做', competitor: '竞品A', gap: '高', opportunity: '制作教程攻略内容', impact: '中' },
  { query: 'AI内容创作推荐', competitor: '竞品C', gap: '中', opportunity: '强化内容案例展示', impact: '中' },
  { query: '智能选词工具', competitor: '竞品B', gap: '低', opportunity: '优化功能介绍页面', impact: '低' },
  { query: 'GEO vs SEO区别', competitor: '竞品A', gap: '高', opportunity: '制作专业科普内容', impact: '中' },
]

const queryFanOutData = [
  { query: '品牌营销', fanOut: 12, brands: ['本品牌', '竞品A', '竞品B'] },
  { query: 'AI获客', fanOut: 8, brands: ['竞品A', '本品牌', '竞品C'] },
  { query: '内容策略', fanOut: 6, brands: ['本品牌', '竞品B'] },
  { query: '数字化转型', fanOut: 15, brands: ['竞品A', '竞品B', '竞品C', '本品牌'] },
  { query: '私域流量', fanOut: 10, brands: ['竞品B', '本品牌', '竞品A'] },
  { query: '种草文案', fanOut: 7, brands: ['本品牌', '竞品C'] },
]

const hotPrompts = [
  { prompt: '哪个品牌的GEO工具最好', heat: '982', trend: '+234%', category: '品牌对比' },
  { prompt: 'AI营销平台推荐', heat: '856', trend: '+156%', category: '产品推荐' },
  { prompt: 'GEO优化怎么做', heat: '723', trend: '+89%', category: '教程攻略' },
  { prompt: '品牌AI监测工具', heat: '645', trend: '+67%', category: '工具搜索' },
  { prompt: 'AI内容创作平台', heat: '534', trend: '+112%', category: '产品推荐' },
  { prompt: '智能选词工具哪个好', heat: '445', trend: '+45%', category: '工具对比' },
]

function PromptCoverage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tabs = [
    { id: 'overview', label: '覆盖总览', icon: BarChart3 },
    { id: 'gaps', label: '提示缺口', icon: AlertTriangle },
    { id: 'fanout', label: '查询发散', icon: Layers },
    { id: 'hotprompts', label: '热门提示', icon: Hash },
  ]

  const filteredGaps = selectedCategory === 'all' ? promptGaps : promptGaps.filter(g => g.impact === selectedCategory)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coverageStats.map((stat, index) => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Coverage Trend */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>提示覆盖度趋势</h3>
                <span className="badge badge-blue">近6个月</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={coverageTrendData}>
                  <defs>
                    <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                  <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--color-text-secondary)" fontSize={12} domain={[40, 80]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="coverage" name="实际覆盖度" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorCoverage)" strokeWidth={2} />
                  <Area type="monotone" dataKey="target" name="目标覆盖度" stroke="#2DD4BF" fillOpacity={0} strokeDasharray="5 5" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Query Categories */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>查询类型覆盖</h3>
              <div className="space-y-3">
                {queryCategories.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.covered}/{item.total}</span>
                        <span className="text-xs font-medium" style={{ color: item.percentage >= 70 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.percentage}%</span>
                        <span className="text-xs" style={{ color: item.trend.startsWith('+') ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>{item.trend}</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.percentage >= 70 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gaps' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>提示缺口分析</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>筛选：</span>
                {['all', '高', '中', '低'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedCategory(filter)}
                    className="px-3 py-1 rounded-lg text-xs transition-all"
                    style={{
                      backgroundColor: selectedCategory === filter ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                      color: selectedCategory === filter ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      border: `1px solid ${selectedCategory === filter ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                    }}
                  >
                    {filter === 'all' ? '全部' : filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredGaps.map((item, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.query}</span>
                        <span className={`badge ${item.gap === '高' ? 'badge-red' : item.gap === '中' ? 'badge-yellow' : 'badge-green'} text-xs`}>
                          缺口{item.gap}
                        </span>
                        <span className="tag tag-primary text-xs">{item.competitor}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        <span>机会：{item.opportunity}</span>
                        <span style={{ color: 'var(--color-accent)' }}>影响：{item.impact}</span>
                      </div>
                    </div>
                    <button className="btn-primary text-xs flex items-center gap-1 flex-shrink-0">
                      <Zap className="w-3 h-3" />
                      创建内容
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fanout' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>查询发散分析</h3>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>用户查询如何发散到品牌相关</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">种子查询</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">发散数量</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">涉及品牌</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">机会</th>
                  </tr>
                </thead>
                <tbody>
                  {queryFanOutData.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.query}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>{item.fanOut} 个相关问题</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.brands.map((brand, i) => (
                            <span key={i} className={`tag ${brand === '本品牌' ? 'tag-primary' : 'tag-secondary'} text-xs`}>{brand}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <Lightbulb className="w-3 h-3" />
                          查看建议
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

      {activeTab === 'hotprompts' && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>热门用户提示</h3>
              <span className="badge badge-green">实时更新</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">用户提示</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">热度</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">分类</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {hotPrompts.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: index < 3 ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                            color: index < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          }}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.prompt}</span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.heat}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                          <span className="text-sm" style={{ color: 'var(--color-status-green)' }}>{item.trend}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <Sparkles className="w-3 h-3" />
                          创建内容
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
    </div>
  )
}

export default PromptCoverage
