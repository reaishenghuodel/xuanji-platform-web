import { useState } from 'react'
import {
  Search, Wand2, Filter, TrendingUp, TrendingDown, Copy, Download, Sparkles,
  ChevronDown, Hash, ShoppingBag, BarChart3, Lightbulb, Brain, Tag, Eye,
  Zap, Target, BookOpen, Flame, Layers, Bookmark, PieChart as PieChartIcon, Crosshair,
  Globe, Share2
} from 'lucide-react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area
} from 'recharts'
import { useTableSortFilter } from '../hooks/useTableSortFilter'

const platforms = [
  { id: 'dso', label: 'DSO', fullLabel: '抖·搜索优化', count: '1.2M', icon: Zap, color: '#F59E0B' },
  { id: 'rso', label: 'RSO', fullLabel: '红·搜索优化', count: '890K', icon: Target, color: '#EC4899' },
  { id: 'wso', label: 'WSO', fullLabel: '微·搜索优化', count: '650K', icon: MessageSquare, color: '#22C55E' },
  { id: 'geo', label: 'GEO', fullLabel: 'GEO 词库', count: '2.3M', icon: Brain, color: '#0EA5E9' },
]

function MessageSquare(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const subTabsMap: Record<string, { id: string; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[]> = {
  dso: [
    { id: 'dropdown', label: '下拉词库', icon: ChevronDown },
    { id: 'industry', label: '行业词大盘', icon: BarChart3 },
    { id: 'ecommerce', label: '电商词库', icon: ShoppingBag },
    { id: 'topic', label: '话题榜', icon: Flame },
    { id: 'brand', label: '品牌词', icon: Tag },
  ],
  rso: [
    { id: 'dropdown', label: '下拉词库', icon: ChevronDown },
    { id: 'industry', label: '行业词大盘', icon: BarChart3 },
    { id: 'ecommerce', label: '电商词库', icon: ShoppingBag },
    { id: 'topic', label: '话题榜', icon: Flame },
  ],
  wso: [
    { id: 'dropdown', label: '下拉词库', icon: ChevronDown },
    { id: 'industry', label: '行业词大盘', icon: BarChart3 },
    { id: 'topic', label: '话题榜', icon: Flame },
  ],
  geo: [
    { id: 'core', label: '核心词库', icon: Target },
    { id: 'longtail', label: '长尾词库', icon: Layers },
    { id: 'brand', label: '品牌词', icon: Tag },
    { id: 'competitor', label: '竞品词', icon: Eye },
    { id: 'intent', label: '意图词', icon: Crosshair },
  ],
}

const keywordsData: Record<string, Array<{ word: string; volume: string; competition: string; trend: string; type: string; score: number; cvr?: string; intent?: string; geoScore?: number; platforms?: string }>> = {
  dso: [
    { word: '品牌营销方案', volume: '850K', competition: '中', trend: '+23%', type: '核心词', score: 92, cvr: '3.2%', intent: '信息型', geoScore: 78, platforms: 'DeepSeek/豆包' },
    { word: 'AI 获客技巧', volume: '620K', competition: '低', trend: '+45%', type: '热点词', score: 88, cvr: '4.1%', intent: '信息型', geoScore: 85, platforms: 'DeepSeek/文心' },
    { word: '品牌数字化转型', volume: '410K', competition: '高', trend: '+12%', type: '长尾词', score: 85, cvr: '2.8%', intent: '交易型', geoScore: 72, platforms: '通义/豆包' },
    { word: 'AI 大模型推荐', volume: '380K', competition: '中', trend: '+67%', type: '热点词', score: 95, cvr: '5.6%', intent: '信息型', geoScore: 92, platforms: 'DeepSeek/ChatGPT' },
    { word: '品牌 SEO 优化', volume: '320K', competition: '高', trend: '-5%', type: '核心词', score: 78, cvr: '2.1%', intent: '交易型', geoScore: 65, platforms: '全平台' },
    { word: '内容营销策略', volume: '280K', competition: '中', trend: '+18%', type: '长尾词', score: 82, cvr: '3.5%', intent: '信息型', geoScore: 80, platforms: '文心/Kimi' },
    { word: 'GEO 引擎优化', volume: '250K', competition: '低', trend: '+89%', type: '热点词', score: 91, cvr: '6.2%', intent: '信息型', geoScore: 94, platforms: 'DeepSeek/Perplexity' },
    { word: '品牌 AI 监测', volume: '190K', competition: '低', trend: '+56%', type: '长尾词', score: 86, cvr: '4.8%', intent: '导航型', geoScore: 88, platforms: 'ChatGPT/文心' },
  ],
  rso: [
    { word: '小红书品牌营销', volume: '520K', competition: '中', trend: '+34%', type: '核心词', score: 90, cvr: '4.5%', intent: '信息型', geoScore: 82, platforms: 'DeepSeek/豆包' },
    { word: '种草文案怎么写', volume: '480K', competition: '低', trend: '+28%', type: '长尾词', score: 87, cvr: '5.2%', intent: '信息型', geoScore: 86, platforms: 'Kimi/文心' },
    { word: 'AI 内容创作工具', volume: '360K', competition: '中', trend: '+72%', type: '热点词', score: 93, cvr: '6.8%', intent: '交易型', geoScore: 90, platforms: 'DeepSeek/通义' },
    { word: '品牌KOL合作', volume: '290K', competition: '高', trend: '+15%', type: '核心词', score: 84, cvr: '3.1%', intent: '交易型', geoScore: 76, platforms: '豆包/文心' },
    { word: '小红书运营技巧', volume: '250K', competition: '中', trend: '+19%', type: '长尾词', score: 81, cvr: '4.2%', intent: '信息型', geoScore: 83, platforms: 'DeepSeek/通义' },
    { word: 'GEO 优化案例', volume: '180K', competition: '低', trend: '+95%', type: '热点词', score: 89, cvr: '7.1%', intent: '信息型', geoScore: 91, platforms: 'Perplexity/ChatGPT' },
  ],
  wso: [
    { word: '微信公众号运营', volume: '420K', competition: '高', trend: '+8%', type: '核心词', score: 83, cvr: '2.5%', intent: '信息型', geoScore: 75, platforms: '文心/豆包' },
    { word: 'AI 智能写作', volume: '380K', competition: '中', trend: '+52%', type: '热点词', score: 91, cvr: '5.4%', intent: '交易型', geoScore: 89, platforms: 'DeepSeek/通义' },
    { word: '品牌私域流量', volume: '310K', competition: '中', trend: '+22%', type: '核心词', score: 86, cvr: '3.8%', intent: '交易型', geoScore: 80, platforms: 'Kimi/文心' },
    { word: '微信SEO技巧', volume: '220K', competition: '低', trend: '+41%', type: '长尾词', score: 88, cvr: '4.6%', intent: '信息型', geoScore: 85, platforms: 'DeepSeek/豆包' },
    { word: 'GEO 内容优化', volume: '170K', competition: '低', trend: '+78%', type: '热点词', score: 90, cvr: '6.5%', intent: '信息型', geoScore: 93, platforms: 'Perplexity/ChatGPT' },
  ],
  geo: [
    { word: 'GEO 引擎优化', volume: '250K', competition: '低', trend: '+89%', type: '核心词', score: 96, cvr: '6.2%', intent: '信息型', geoScore: 95, platforms: 'DeepSeek/Perplexity' },
    { word: 'AI 推荐品牌', volume: '180K', competition: '中', trend: '+67%', type: '核心词', score: 93, cvr: '5.8%', intent: '交易型', geoScore: 91, platforms: 'ChatGPT/DeepSeek' },
    { word: '生成式引擎优化', volume: '120K', competition: '低', trend: '+112%', type: '长尾词', score: 94, cvr: '7.3%', intent: '信息型', geoScore: 92, platforms: 'Perplexity/Gemini' },
    { word: '品牌 AI 可见性', volume: '95K', competition: '低', trend: '+45%', type: '长尾词', score: 89, cvr: '4.9%', intent: '信息型', geoScore: 87, platforms: 'DeepSeek/文心' },
    { word: '大模型品牌推荐', volume: '80K', competition: '中', trend: '+56%', type: '核心词', score: 91, cvr: '5.1%', intent: '交易型', geoScore: 90, platforms: 'ChatGPT/DeepSeek' },
    { word: 'AI 搜索优化', volume: '70K', competition: '低', trend: '+98%', type: '热点词', score: 92, cvr: '6.7%', intent: '信息型', geoScore: 94, platforms: 'Perplexity/Gemini' },
  ],
}

const dropdownWords = [
  { word: '品牌营销方案怎么做', volume: '45K', difficulty: '低', relation: '强', geoScore: 88 },
  { word: '品牌营销方案策划', volume: '38K', difficulty: '中', relation: '强', geoScore: 85 },
  { word: '品牌营销方案案例', volume: '32K', difficulty: '低', relation: '中', geoScore: 82 },
  { word: '品牌营销方案模板', volume: '28K', difficulty: '低', relation: '强', geoScore: 86 },
  { word: '品牌营销方案报价', volume: '22K', difficulty: '中', relation: '弱', geoScore: 75 },
  { word: '品牌营销方案 PPT', volume: '18K', difficulty: '低', relation: '中', geoScore: 80 },
  { word: '品牌营销方案范文', volume: '15K', difficulty: '低', relation: '弱', geoScore: 78 },
  { word: '品牌营销方案流程', volume: '12K', difficulty: '低', relation: '中', geoScore: 84 },
  { word: '品牌营销方案2025', volume: '10K', difficulty: '低', relation: '弱', geoScore: 77 },
  { word: '品牌营销方案预算', volume: '8K', difficulty: '中', relation: '弱', geoScore: 76 },
]

const topicRankings = [
  { topic: '#AI营销新趋势', heat: '982K', growth: '+234%', posts: '12.3万', engagement: '8.5%' },
  { topic: '#品牌数字化转型', heat: '756K', growth: '+156%', posts: '9.8万', engagement: '7.2%' },
  { topic: '#GEO引擎优化', heat: '623K', growth: '+445%', posts: '6.5万', engagement: '9.1%' },
  { topic: '#AI内容创作', heat: '534K', growth: '+189%', posts: '8.2万', engagement: '6.8%' },
  { topic: '#私域流量运营', heat: '445K', growth: '+67%', posts: '15.1万', engagement: '5.4%' },
  { topic: '#KOL种草', heat: '398K', growth: '+45%', posts: '11.7万', engagement: '7.9%' },
]

const mindMapData = {
  center: '品牌营销',
  branches: [
    { name: 'AI营销', children: ['AI获客', 'AI创作', 'AI监测', 'AI选词'] },
    { name: '内容策略', children: ['种草文案', '教程攻略', '品牌故事', '热点借势'] },
    { name: '渠道运营', children: ['抖音运营', '小红书', '微信生态', 'B站'] },
    { name: '数据优化', children: ['GEO优化', 'SEO优化', '数据分析', '竞品监测'] },
  ],
}

// 意图词分析数据
const intentData = [
  { name: '信息型', value: 45, color: '#0EA5E9' },
  { name: '交易型', value: 28, color: '#2DD4BF' },
  { name: '导航型', value: 15, color: '#6366F1' },
  { name: '对比型', value: 8, color: '#F59E0B' },
  { name: '咨询型', value: 4, color: '#EC4899' },
]

// 关键词价值矩阵数据
const keywordMatrix = [
  { x: 850, y: 50, z: 92, name: '品牌营销方案', size: 20 },
  { x: 620, y: 30, z: 88, name: 'AI获客技巧', size: 18 },
  { x: 410, y: 80, z: 85, name: '数字化转型', size: 16 },
  { x: 380, y: 55, z: 95, name: 'AI大模型推荐', size: 15 },
  { x: 320, y: 85, z: 78, name: 'SEO优化', size: 14 },
  { x: 280, y: 50, z: 82, name: '内容营销策略', size: 13 },
  { x: 250, y: 25, z: 91, name: 'GEO引擎优化', size: 12 },
  { x: 190, y: 20, z: 86, name: '品牌AI监测', size: 10 },
  { x: 520, y: 60, z: 90, name: '小红书营销', size: 17 },
  { x: 480, y: 35, z: 87, name: '种草文案', size: 16 },
]

// GEO覆盖趋势
const geoTrendData = [
  { month: '1月', deepseek: 45, wenxin: 38, tongyi: 32, doubao: 25, kimi: 18, target: 60 },
  { month: '2月', deepseek: 52, wenxin: 42, tongyi: 35, doubao: 28, kimi: 22, target: 60 },
  { month: '3月', deepseek: 58, wenxin: 48, tongyi: 40, doubao: 30, kimi: 25, target: 60 },
  { month: '4月', deepseek: 65, wenxin: 52, tongyi: 42, doubao: 35, kimi: 28, target: 60 },
  { month: '5月', deepseek: 70, wenxin: 58, tongyi: 48, doubao: 38, kimi: 32, target: 60 },
  { month: '6月', deepseek: 78, wenxin: 62, tongyi: 52, doubao: 42, kimi: 35, target: 60 },
]

function KeywordTool() {
  const [activePlatform, setActivePlatform] = useState('dso')
  const [activeSubTab, setActiveSubTab] = useState('dropdown')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>('品牌营销方案')
  const [showMindMap, setShowMindMap] = useState(false)
  const [aiExpanded, setAiExpanded] = useState(false)
  const [showIntentChart, setShowIntentChart] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)

  const currentSubTabs = subTabsMap[activePlatform] || subTabsMap.dso
  const currentKeywords = keywordsData[activePlatform] || keywordsData.dso

  const filteredKeywords = currentKeywords.filter(k =>
    k.word.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const topicTable = useTableSortFilter(topicRankings, ['topic', 'heat', 'growth', 'posts', 'engagement'] as any, 'heat' as any)
  const dropdownTable = useTableSortFilter(dropdownWords, ['word', 'volume', 'difficulty', 'relation', 'geoScore'] as any, 'geoScore' as any)
  const mainTable = useTableSortFilter(filteredKeywords, ['word', 'volume', 'competition', 'trend', 'cvr', 'intent', 'geoScore', 'score'] as any, 'score' as any)

  const activePlatformData = platforms.find(p => p.id === activePlatform) || platforms[0]

  return (
    <div className="space-y-6">
      {/* Platform Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map(platform => {
          const Icon = platform.icon
          return (
            <button
              key={platform.id}
              onClick={() => {
                setActivePlatform(platform.id)
                setActiveSubTab(subTabsMap[platform.id]?.[0]?.id || 'dropdown')
              }}
              className="p-4 rounded-xl text-left transition-all duration-200 card-hover"
              style={{
                backgroundColor: activePlatform === platform.id ? `${platform.color}15` : 'var(--color-bg-surface)',
                border: `1px solid ${activePlatform === platform.id ? platform.color : 'var(--color-border-default)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: platform.color }} />
                <span className="text-xs font-bold" style={{ color: platform.color }}>{platform.label}</span>
              </div>
              <div className="text-sm font-medium" style={{
                color: activePlatform === platform.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              }}>
                {platform.fullLabel}
              </div>
              <div className="text-xl font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
                {platform.count}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>收录关键词</div>
            </button>
          )
        })}
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {currentSubTabs.map(subTab => {
          const Icon = subTab.icon
          return (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: activeSubTab === subTab.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeSubTab === subTab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeSubTab === subTab.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              {subTab.label}
            </button>
          )
        })}
      </div>

      {/* Search & AI Tools */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <input
              type="text"
              placeholder={`在 ${activePlatformData.fullLabel} 中搜索关键词...`}
              className="input-field pl-9 pr-4 py-3 w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
              onClick={() => setAiExpanded(!aiExpanded)}
            >
              <Wand2 className="w-4 h-4" />
              <span>AI 智能拓词</span>
            </button>
            <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span>筛选</span>
            </button>
            <button
              className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              onClick={() => setShowMindMap(!showMindMap)}
            >
              <Brain className="w-4 h-4" />
              <span>词脑图</span>
            </button>
            <button
              className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              onClick={() => setShowIntentChart(!showIntentChart)}
            >
              <PieChartIcon className="w-4 h-4" />
              <span>意图分析</span>
            </button>
            <button
              className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              onClick={() => setShowMatrix(!showMatrix)}
            >
              <BarChart3 className="w-4 h-4" />
              <span>价值矩阵</span>
            </button>
          </div>
        </div>

        {/* AI Expansion Panel */}
        {aiExpanded && (
          <div className="p-4 rounded-lg mb-4 space-y-3" style={{ backgroundColor: 'var(--color-primary-50)' }}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>AI 拓词助手</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="输入种子词，AI 将自动拓展长尾词、同义词、相关词..."
                className="input-field flex-1 text-sm"
                defaultValue="品牌营销"
              />
              <button className="btn-primary flex items-center gap-2">
                <Zap className="w-4 h-4" />
                开始拓词
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>快速拓词：</span>
              {['AI营销', '私域流量', '种草文案', '品牌转型', '内容创作'].map(tag => (
                <span key={tag} className="tag tag-primary text-xs cursor-pointer">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Word Mind Map */}
        {showMindMap && (
          <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>AI 词脑图</span>
              </div>
              <button className="text-xs" style={{ color: 'var(--color-primary)' }}>导出脑图</button>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-2xl h-64">
                {/* Center Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-bold text-sm"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                  {mindMapData.center}
                </div>
                {/* Branches */}
                {mindMapData.branches.map((branch, i) => {
                  const angle = (i * 90 - 135) * (Math.PI / 180)
                  const x2 = 50 + 35 * Math.cos(angle)
                  const y2 = 50 + 35 * Math.sin(angle)
                  return (
                    <div key={i}>
                      <div className="absolute px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          left: `${x2}%`,
                          top: `${y2}%`,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'var(--color-accent-50)',
                          color: 'var(--color-accent)',
                          border: '1px solid var(--color-accent)',
                        }}>
                        {branch.name}
                      </div>
                      {branch.children.map((child, j) => {
                        const childAngle = angle + (j - 1.5) * 0.3
                        const cx = x2 + 12 * Math.cos(childAngle)
                        const cy = y2 + 12 * Math.sin(childAngle)
                        return (
                          <div key={j} className="absolute px-2 py-1 rounded text-xs"
                            style={{
                              left: `${cx}%`,
                              top: `${cy}%`,
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: 'var(--color-bg-surface)',
                              color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border-default)',
                            }}>
                            {child}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Intent Chart */}
        {showIntentChart && (
          <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>搜索意图分布</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>基于 AI 语义分析</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={intentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {intentData.map((entry, index) => (
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
              <div className="space-y-2">
                {intentData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Keyword Value Matrix */}
        {showMatrix && (
          <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>关键词价值矩阵</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>X轴: 搜索量 | Y轴: 竞争度(低为佳) | 大小: 综合评分</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                <XAxis type="number" dataKey="x" name="搜索量" stroke="var(--color-text-secondary)" fontSize={12} />
                <YAxis type="number" dataKey="y" name="竞争度" stroke="var(--color-text-secondary)" fontSize={12} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                  }}
                  formatter={(value: any, name: any) => {
                    if (name === '竞争度') return [value, '竞争度']
                    if (name === '搜索量') return [value, '搜索量']
                    return [value, name]
                  }}
                  labelFormatter={(_label: any, payload: any) => {
                    return payload?.[0]?.payload?.name || ''
                  }}
                />
                <Scatter data={keywordMatrix} fill="var(--color-primary)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Main Content */}
        <div className="card lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {activeSubTab === 'dropdown' && '下拉词库'}
              {activeSubTab === 'industry' && '行业词大盘'}
              {activeSubTab === 'ecommerce' && '电商词库'}
              {activeSubTab === 'topic' && '话题榜'}
              {activeSubTab === 'brand' && '品牌词'}
              {activeSubTab === 'core' && '核心词库'}
              {activeSubTab === 'longtail' && '长尾词库'}
              {activeSubTab === 'competitor' && '竞品词'}
              {activeSubTab === 'intent' && '意图词库'}
              <span className="ml-2 text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>
                共 {activeSubTab === 'topic' ? topicTable.data.length : activeSubTab === 'dropdown' ? dropdownTable.data.length : mainTable.data.length} 条
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <button className="btn-secondary flex items-center gap-1 text-sm">
                <Download className="w-4 h-4" />
                导出
              </button>
              <button className="btn-secondary flex items-center gap-1 text-sm">
                <Copy className="w-4 h-4" />
                复制
              </button>
              <button className="btn-secondary flex items-center gap-1 text-sm">
                <Bookmark className="w-4 h-4" />
                收藏
              </button>
            </div>
          </div>

          {/* Intent Tab */}
          {activeSubTab === 'intent' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>意图词分布</h4>
                  <div className="space-y-2">
                    {intentData.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs w-12" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>高意图词 TOP 5</h4>
                  <div className="space-y-2">
                    {currentKeywords
                      .filter(k => k.intent === '交易型' || k.intent === '导航型')
                      .sort((a, b) => parseFloat(b.cvr?.replace('%', '') || '0') - parseFloat(a.cvr?.replace('%', '') || '0'))
                      .slice(0, 5)
                      .map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent)' }}>
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.word}</div>
                            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>转化 {item.cvr}</div>
                          </div>
                          <span className="tag tag-primary text-xs">{item.intent}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>意图词与场景覆盖</h4>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {['产品咨询', '品牌对比', '行业推荐', '使用教程', '价格询问'].map((scene, i) => (
                    <div key={i} className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                      <div className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{Math.floor(Math.random() * 40 + 60)}%</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{scene}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Topic Rankings Table */}
          {activeSubTab === 'topic' ? (
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="搜索话题..."
                  className="input-field text-sm px-3 py-1.5 flex-1 max-w-xs"
                  value={topicTable.filters.topic || ''}
                  onChange={(e) => topicTable.setFilter('topic', e.target.value)}
                />
                {topicTable.activeFilterCount > 0 && (
                  <button onClick={topicTable.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                    清除筛选
                  </button>
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => topicTable.handleSort('topic')}>
                      话题 {topicTable.getSortIndicator('topic')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => topicTable.handleSort('heat')}>
                      热度 {topicTable.getSortIndicator('heat')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => topicTable.handleSort('growth')}>
                      增长 {topicTable.getSortIndicator('growth')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => topicTable.handleSort('posts')}>
                      帖子数 {topicTable.getSortIndicator('posts')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => topicTable.handleSort('engagement')}>
                      互动率 {topicTable.getSortIndicator('engagement')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topicTable.data.map((item, index) => (
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
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.topic}</span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.heat}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                          <span className="text-sm" style={{ color: 'var(--color-status-green)' }}>{item.growth}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.posts}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{item.engagement}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeSubTab === 'dropdown' ? (
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="搜索下拉词..."
                  className="input-field text-sm px-3 py-1.5 flex-1 max-w-xs"
                  value={dropdownTable.filters.word || ''}
                  onChange={(e) => dropdownTable.setFilter('word', e.target.value)}
                />
                {dropdownTable.activeFilterCount > 0 && (
                  <button onClick={dropdownTable.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                    清除筛选
                  </button>
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => dropdownTable.handleSort('word')}>
                      下拉词 {dropdownTable.getSortIndicator('word')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => dropdownTable.handleSort('volume')}>
                      搜索量 {dropdownTable.getSortIndicator('volume')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => dropdownTable.handleSort('difficulty')}>
                      难度 {dropdownTable.getSortIndicator('difficulty')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => dropdownTable.handleSort('relation')}>
                      关联度 {dropdownTable.getSortIndicator('relation')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => dropdownTable.handleSort('geoScore')}>
                      GEO评分 {dropdownTable.getSortIndicator('geoScore')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {dropdownTable.data.map((item, index) => (
                    <tr
                      key={index}
                      className="table-row cursor-pointer"
                      onClick={() => setSelectedKeyword(item.word)}
                      style={{
                        backgroundColor: selectedKeyword === item.word ? 'var(--color-primary-50)' : 'transparent',
                      }}
                    >
                      <td className="py-3 px-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: index < 3 ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                            color: index < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          }}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.word}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.volume}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${item.difficulty === '低' ? 'badge-green' : 'badge-yellow'}`}>
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${item.relation === '强' ? 'badge-blue' : item.relation === '中' ? 'badge-yellow' : 'badge-green'}`}>
                          {item.relation}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.geoScore}</span>
                          <div className="w-10 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${item.geoScore}%`,
                              backgroundColor: item.geoScore >= 85 ? 'var(--color-accent)' : 'var(--color-primary)',
                            }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <Sparkles className="w-3 h-3" />
                          拓词
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeSubTab === 'intent' ? null : (
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="筛选关键词..."
                  className="input-field text-sm px-3 py-1.5 flex-1 max-w-xs"
                  value={mainTable.filters.word || ''}
                  onChange={(e) => mainTable.setFilter('word', e.target.value)}
                />
                {mainTable.activeFilterCount > 0 && (
                  <button onClick={mainTable.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                    清除筛选
                  </button>
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('word')}>
                      关键词 {mainTable.getSortIndicator('word')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('volume')}>
                      搜索量 {mainTable.getSortIndicator('volume')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('competition')}>
                      竞争度 {mainTable.getSortIndicator('competition')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('trend')}>
                      趋势 {mainTable.getSortIndicator('trend')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('cvr')}>
                      转化 {mainTable.getSortIndicator('cvr')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('intent')}>
                      意图 {mainTable.getSortIndicator('intent')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('geoScore')}>
                      GEO {mainTable.getSortIndicator('geoScore')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => mainTable.handleSort('score')}>
                      评分 {mainTable.getSortIndicator('score')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {mainTable.data.map((item, index) => (
                    <tr
                      key={index}
                      className="table-row cursor-pointer"
                      onClick={() => setSelectedKeyword(item.word)}
                      style={{
                        backgroundColor: selectedKeyword === item.word ? 'var(--color-primary-50)' : 'transparent',
                      }}
                    >
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.word}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.volume}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.competition === '低' ? 'badge-green' :
                          item.competition === '中' ? 'badge-yellow' : 'badge-red'
                        }`}>
                          {item.competition}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {item.trend.startsWith('+') ? (
                            <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                          ) : (
                            <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-status-red)' }} />
                          )}
                          <span className="text-sm" style={{
                            color: item.trend.startsWith('+') ? 'var(--color-status-green)' : 'var(--color-status-red)',
                          }}>
                            {item.trend}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{item.cvr}</td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.intent}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.geoScore || 0}</span>
                          <div className="w-8 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${item.geoScore || 0}%`,
                              backgroundColor: (item.geoScore || 0) >= 90 ? 'var(--color-accent)' : (item.geoScore || 0) >= 80 ? 'var(--color-primary)' : 'var(--color-status-yellow)',
                            }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.score}</span>
                          <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${item.score}%`,
                              backgroundColor: item.score >= 90 ? 'var(--color-accent)' : item.score >= 80 ? 'var(--color-primary)' : 'var(--color-status-yellow)',
                            }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <Sparkles className="w-3 h-3" />
                          拓词
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4 lg:col-span-2">
          {/* Expanded Keywords */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                拓词结果
                {selectedKeyword && (
                  <span className="ml-2 text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>
                    「{selectedKeyword}」
                  </span>
                )}
              </h3>
              <span className="badge badge-blue">AI 生成</span>
            </div>
            <div className="space-y-2">
              {dropdownWords.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{item.word}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>搜索量 {item.volume}</span>
                      <span className={`badge ${item.difficulty === '低' ? 'badge-green' : 'badge-yellow'}`}>
                        {item.difficulty}
                      </span>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>GEO {item.geoScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GEO Coverage Trend */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 平台覆盖趋势</h3>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={geoTrendData}>
                <defs>
                  <linearGradient id="colorDs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={11} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <Area type="monotone" dataKey="deepseek" name="DeepSeek" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorDs)" strokeWidth={2} />
                <Area type="monotone" dataKey="wenxin" name="文心一言" stroke="#6366F1" strokeWidth={2} fillOpacity={0} />
                <Area type="monotone" dataKey="tongyi" name="通义千问" stroke="#2DD4BF" strokeWidth={2} fillOpacity={0} />
                <Legend fontSize={11} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Suggestions */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 选词建议</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>优先布局</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  建议优先布局「低难度 + 高搜索量」关键词，如「AI 获客技巧」和「GEO 引擎优化」，可快速获取排名。
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>趋势预警</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  热点词「AI 大模型推荐」搜索量增长 +67%，建议立即布局相关内容。
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary-50)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-3 h-3" style={{ color: 'var(--color-secondary)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-secondary)' }}>GEO 机会</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  「GEO 引擎优化」在 DeepSeek 和 Perplexity 平台覆盖率最高，建议增加相关结构化内容。
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-status-yellow-50)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Share2 className="w-3 h-3" style={{ color: 'var(--color-status-yellow)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-status-yellow)' }}>意图优化</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  交易型意图词占比仅28%，建议增加「购买」「推荐」等交易导向关键词，提升转化效率。
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>词库统计</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>12,450</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>已收录</div>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>3,280</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>已优化</div>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-status-green)' }}>89%</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>覆盖率</div>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>+456</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>本周新增</div>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: '#8B5CF6' }}>72%</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>GEO就绪</div>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: '#F59E0B' }}>45%</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>交易意图</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordTool
