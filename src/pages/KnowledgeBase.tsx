import { useState } from 'react'
import {
  BookOpen, Search, Plus, Filter, FileText, Tag, CheckCircle, Clock,
  Globe, Database, Link2, BarChart3, TrendingUp, ChevronDown,
  ChevronUp, Edit3, Trash2, Download, Upload, Sparkles, Layers, Shield, Brain
} from 'lucide-react'
import {
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, AreaChart, Area, Line
} from 'recharts'
import { useTableSortFilter } from '../hooks/useTableSortFilter'

const kbKPI = [
  { title: '知识库总量', value: '1,247', change: '+12%', icon: Database, color: 'var(--color-primary)' },
  { title: 'AI引用率', value: '68.5%', change: '+5.2%', icon: Brain, color: 'var(--color-accent)' },
  { title: '知识准确率', value: '97.2%', change: '+0.8%', icon: Shield, color: 'var(--color-status-green)' },
  { title: '覆盖平台', value: '6/8', change: '+1', icon: Globe, color: 'var(--color-secondary)' },
]

const knowledgeCategories = [
  { id: 'faq', label: 'FAQ 管理', icon: BookOpen },
  { id: 'schema', label: 'Schema 标记', icon: Tag },
  { id: 'sources', label: '权威信源', icon: Link2 },
  { id: 'documents', label: '品牌文档', icon: FileText },
  { id: 'graph', label: '知识图谱', icon: Layers },
]

const faqList = [
  { id: 1, question: '什么是GEO引擎优化？', answer: 'GEO（生成式引擎优化）是通过优化品牌内容，使其在AI大模型（如DeepSeek、ChatGPT）的推荐中获得更高曝光和更精准引用的策略。', category: '基础概念', status: 'published', aiCited: true, platforms: ['DeepSeek', '文心一言'], accuracy: 98, views: 1247 },
  { id: 2, question: 'GEO和SEO有什么区别？', answer: 'SEO针对传统搜索引擎优化网页排名；GEO针对AI大模型优化语义理解和推荐，更注重知识准确性和权威性。', category: '基础概念', status: 'published', aiCited: true, platforms: ['ChatGPT', 'Perplexity'], accuracy: 96, views: 892 },
  { id: 3, question: '如何提升品牌在DeepSeek的推荐率？', answer: '通过建立权威知识库、优化Schema标记、获取行业引用、产出高质量语义内容等方式提升品牌可见性。', category: '策略方法', status: 'published', aiCited: true, platforms: ['DeepSeek', 'Kimi'], accuracy: 95, views: 1563 },
  { id: 4, question: '品牌AI监测包括哪些平台？', answer: '覆盖DeepSeek、文心一言、ChatGPT、Perplexity、通义千问、豆包、Kimi、Gemini等主流AI平台。', category: '平台覆盖', status: 'published', aiCited: true, platforms: ['DeepSeek', '通义'], accuracy: 97, views: 678 },
  { id: 5, question: 'GROI指标如何计算？', answer: 'GROI =（AI推荐带来的转化价值 - GEO投入成本）/ GEO投入成本 × 100%。', category: '数据指标', status: 'draft', aiCited: false, platforms: [], accuracy: 92, views: 0 },
  { id: 6, question: 'Schema标记对GEO有什么作用？', answer: 'Schema标记帮助AI大模型结构化理解品牌信息，提升知识抽取准确率和引用概率。', category: '技术实现', status: 'published', aiCited: true, platforms: ['Perplexity', 'Gemini'], accuracy: 94, views: 445 },
  { id: 7, question: '如何建立品牌知识库？', answer: '系统梳理品牌FAQ、产品文档、行业报告，进行Schema结构化标记，持续更新维护。', category: '策略方法', status: 'published', aiCited: false, platforms: [], accuracy: 90, views: 321 },
  { id: 8, question: 'AI引用监测的更新频率是？', answer: '每日自动扫描更新，关键指标实时刷新，支持自定义监测频率。', category: '平台覆盖', status: 'published', aiCited: true, platforms: ['DeepSeek', 'ChatGPT'], accuracy: 99, views: 567 },
]

const schemaItems = [
  { id: 1, type: 'Organization', entity: '璇玑智科', properties: 'name, url, logo, description, founder', status: 'active', coverage: 'DeepSeek/Perplexity', lastUpdate: '2025-07-01' },
  { id: 2, type: 'Product', entity: 'GEO智能运营平台', properties: 'name, brand, description, aggregateRating', status: 'active', coverage: 'ChatGPT/Gemini', lastUpdate: '2025-07-03' },
  { id: 3, type: 'FAQPage', entity: 'GEO常见问题', properties: 'mainEntity, acceptedAnswer', status: 'active', coverage: 'DeepSeek/文心', lastUpdate: '2025-07-05' },
  { id: 4, type: 'HowTo', entity: 'GEO优化步骤', properties: 'name, step, tool', status: 'pending', coverage: 'Perplexity', lastUpdate: '2025-06-28' },
  { id: 5, type: 'Article', entity: 'GEO行业白皮书', properties: 'headline, author, datePublished', status: 'active', coverage: 'DeepSeek/ChatGPT', lastUpdate: '2025-07-06' },
  { id: 6, type: 'Review', entity: 'GEO工具评测', properties: 'itemReviewed, reviewRating, author', status: 'pending', coverage: 'Gemini', lastUpdate: '2025-06-30' },
]

const authoritySources = [
  { id: 1, name: '维基百科', domain: 'wikipedia.org', type: '百科', authority: 95, citations: 324, status: 'active', added: '2025-01-15' },
  { id: 2, name: '知乎', domain: 'zhihu.com', type: '问答', authority: 88, citations: 287, status: 'active', added: '2025-02-01' },
  { id: 3, name: '36氪', domain: '36kr.com', type: '媒体', authority: 85, citations: 156, status: 'active', added: '2025-02-20' },
  { id: 4, name: '虎嗅', domain: 'huxiu.com', type: '媒体', authority: 82, citations: 98, status: 'active', added: '2025-03-10' },
  { id: 5, name: 'GitHub', domain: 'github.com', type: '技术', authority: 90, citations: 201, status: 'active', added: '2025-01-28' },
  { id: 6, name: 'CSDN', domain: 'csdn.net', type: '技术', authority: 75, citations: 67, status: 'pending', added: '2025-04-05' },
  { id: 7, name: '钛媒体', domain: 'tmtpost.com', type: '媒体', authority: 80, citations: 45, status: 'active', added: '2025-03-22' },
  { id: 8, name: 'InfoQ', domain: 'infoq.cn', type: '技术', authority: 83, citations: 78, status: 'active', added: '2025-02-15' },
]

const brandDocuments = [
  { id: 1, name: '璇玑智科品牌手册', type: 'PDF', size: '12.5 MB', pages: 45, status: 'published', aiReady: true, lastUpdate: '2025-07-01' },
  { id: 2, name: 'GEO产品白皮书', type: 'PDF', size: '8.3 MB', pages: 32, status: 'published', aiReady: true, lastUpdate: '2025-07-03' },
  { id: 3, name: '行业解决方案合集', type: 'PDF', size: '15.2 MB', pages: 68, status: 'published', aiReady: true, lastUpdate: '2025-06-28' },
  { id: 4, name: '客户案例集', type: 'PDF', size: '6.8 MB', pages: 24, status: 'published', aiReady: false, lastUpdate: '2025-06-20' },
  { id: 5, name: '技术架构文档', type: 'DOCX', size: '4.2 MB', pages: 56, status: 'draft', aiReady: false, lastUpdate: '2025-07-05' },
  { id: 6, name: 'API接口文档', type: 'PDF', size: '3.1 MB', pages: 18, status: 'published', aiReady: true, lastUpdate: '2025-07-06' },
]

const knowledgeGraphData = [
  { name: '1月', entities: 120, relations: 85, queries: 340 },
  { name: '2月', entities: 145, relations: 102, queries: 420 },
  { name: '3月', entities: 168, relations: 125, queries: 510 },
  { name: '4月', entities: 190, relations: 148, queries: 620 },
  { name: '5月', entities: 215, relations: 172, queries: 750 },
  { name: '6月', entities: 240, relations: 198, queries: 890 },
  { name: '7月', entities: 268, relations: 225, queries: 1040 },
]

const platformCiteData = [
  { name: 'DeepSeek', value: 35, color: '#0EA5E9' },
  { name: '文心一言', value: 20, color: '#6366F1' },
  { name: 'ChatGPT', value: 18, color: '#10B981' },
  { name: 'Perplexity', value: 12, color: '#8B5CF6' },
  { name: '通义千问', value: 8, color: '#2DD4BF' },
  { name: '其他', value: 7, color: '#94A3B8' },
]

const categoryStats = [
  { name: '基础概念', count: 45, cited: 38, accuracy: 96 },
  { name: '策略方法', count: 32, cited: 28, accuracy: 94 },
  { name: '平台覆盖', count: 28, cited: 22, accuracy: 97 },
  { name: '数据指标', count: 18, cited: 14, accuracy: 93 },
  { name: '技术实现', count: 15, cited: 12, accuracy: 95 },
  { name: '案例分析', count: 12, cited: 10, accuracy: 92 },
]

function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('faq')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState('')

  const faqSort = useTableSortFilter(faqList, ['question', 'category', 'status'], 'views')

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kbKPI.map((kpi, index) => {
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
                <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{kpi.change}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</div>
            </div>
          )
        })}
      </div>

      {/* Search & Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            <input
              type="text"
              placeholder="搜索知识库内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{ color: 'var(--color-text-primary)' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              筛选
            </button>
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              新增知识
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {knowledgeCategories.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeTab === cat.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeTab === cat.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeTab === cat.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* FAQ Management */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>FAQ 管理</h3>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>共 {faqSort.data.length} 条</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-green text-xs">已发布 {faqSort.data.filter(f => f.status === 'published').length}</span>
                <span className="badge badge-blue text-xs">AI引用 {faqSort.data.filter(f => f.aiCited).length}</span>
                <span className="badge badge-yellow text-xs">草稿 {faqSort.data.filter(f => f.status === 'draft').length}</span>
              </div>
            </div>
            {/* FAQ Search & Sort */}
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type="text"
                placeholder="搜索 FAQ..."
                value={faqSort.filters['question'] || ''}
                onChange={e => faqSort.setFilter('question', e.target.value)}
                className="input-field px-3 py-1.5 text-sm w-full max-w-xs"
              />
              {faqSort.activeFilterCount > 0 && (
                <button onClick={faqSort.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                  清除筛选
                </button>
              )}
            </div>
            <div className="space-y-3">
              {faqSort.data.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge ${faq.status === 'published' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {faq.status === 'published' ? '已发布' : '草稿'}
                        </span>
                        {faq.aiCited && (
                          <span className="badge badge-blue text-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI引用
                          </span>
                        )}
                        <span className="tag tag-primary text-xs">{faq.category}</span>
                      </div>
                      <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{faq.question}</div>
                      {expandedFaq === faq.id && (
                        <div className="mt-2 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-secondary)' }}>
                          {faq.answer}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>准确率: {faq.accuracy}%</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>浏览: {faq.views}</span>
                        {faq.platforms.length > 0 && (
                          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>平台: {faq.platforms.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <button
                        className="p-2 rounded-lg transition-all"
                        style={{ backgroundColor: 'var(--color-bg-surface)' }}
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button className="p-2 rounded-lg transition-all" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-primary)' }}>
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg transition-all" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-status-red)' }}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {faqSort.data.length === 0 && (
                <div className="text-center py-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  暂无匹配的 FAQ 记录
                </div>
              )}
            </div>
          </div>

          {/* Category Stats */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>FAQ 分类统计</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryStats.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{cat.name}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{cat.count} 条</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>AI引用</span>
                        <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{cat.cited}/{cat.count}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                        <div className="h-full rounded-full" style={{ width: `${(cat.cited / cat.count) * 100}%`, backgroundColor: 'var(--color-accent)' }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>准确率</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--color-status-green)' }}>{cat.accuracy}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schema Markup */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>Schema 结构化标记</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                新增标记
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">类型</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">实体</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">属性</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">覆盖平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">最后更新</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {schemaItems.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.type}</span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.entity}</td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.properties}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${item.status === 'active' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {item.status === 'active' ? '已生效' : '待审核'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.coverage}</td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.lastUpdate}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded" style={{ color: 'var(--color-primary)' }}><Edit3 className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded" style={{ color: 'var(--color-status-red)' }}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Authority Sources */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>权威信源管理</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                新增信源
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {authoritySources.map((source) => (
                <div key={source.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{source.name}</span>
                    <span className={`badge ${source.status === 'active' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                      {source.status === 'active' ? '已接入' : '待审核'}
                    </span>
                  </div>
                  <div className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{source.domain}</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>权威度</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{source.authority}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${source.authority}%`, backgroundColor: source.authority >= 90 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>引用数</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{source.citations}</span>
                  </div>
                  <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>添加: {source.added}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Brand Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>品牌文档库</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary flex items-center gap-2 text-sm">
                  <Upload className="w-4 h-4" />
                  上传文档
                </button>
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  新建文档
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">文档名称</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">类型</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">大小</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">页数</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">AI就绪</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {brandDocuments.map((doc) => (
                    <tr key={doc.id} className="table-row">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="tag tag-secondary text-xs">{doc.type}</span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{doc.size}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{doc.pages} 页</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${doc.status === 'published' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {doc.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {doc.aiReady ? (
                          <span className="badge badge-green text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            已就绪
                          </span>
                        ) : (
                          <span className="badge badge-yellow text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            处理中
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded" style={{ color: 'var(--color-primary)' }}><Edit3 className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded" style={{ color: 'var(--color-text-secondary)' }}><Download className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded" style={{ color: 'var(--color-status-red)' }}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Graph */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>知识图谱增长</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={knowledgeGraphData}>
                  <defs>
                    <linearGradient id="colorEntities" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                  <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} />
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
                  <Area type="monotone" dataKey="entities" name="实体数" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorEntities)" strokeWidth={2} />
                  <Line type="monotone" dataKey="relations" name="关系数" stroke="var(--color-accent)" strokeWidth={2} dot={{ fill: 'var(--color-accent)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI查询引用分布</h3>
              </div>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={platformCiteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {platformCiteData.map((entry, index) => (
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
                  {platformCiteData.map((item, i) => (
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
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>知识图谱概览</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>268</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>知识实体</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>+12% 本月</div>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>225</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>关系连接</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>+15% 本月</div>
              </div>
              <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-secondary)' }}>1,040</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>月度查询</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>+18% 本月</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeBase
