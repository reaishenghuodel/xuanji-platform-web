import { useState } from 'react'
import {
  Users, TrendingUp, Filter, Heart, MessageCircle, Share2, Video, Image,
  Search, Download, Bookmark, BarChart3, Target, Zap, AlertTriangle, PenTool,
  Brain, Shield, Star, Eye, Layers, Calendar, Lightbulb
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts'

const tabs = [
  { id: 'creators', label: '达人库', icon: Users, count: '12,500' },
  { id: 'video', label: '视频选题', icon: Video, count: '6,800' },
  { id: 'image', label: '图文选题', icon: Image, count: '5,200' },
  { id: 'viral', label: '低粉爆款', icon: TrendingUp, count: '2,100' },
  { id: 'competitor', label: '找竞品', icon: Target, count: '5,600' },
  { id: 'analysis', label: 'AI分析', icon: Brain, count: '实时' },
]

const creators = [
  { name: '科技达人小王', platform: '抖音', fans: '2.5M', engagement: '8.2%', category: '科技', content: '专注AI科技评测', tags: ['AI', '科技'], avgLikes: '45K', cooperationRate: '5%', price: '8K', matchScore: 92, aiInsight: '内容与品牌GEO定位高度契合', trend: 'up' },
  { name: '品牌营销笔记', platform: '小红书', fans: '1.8M', engagement: '6.5%', category: '营销', content: '品牌策略深度分析', tags: ['品牌', '营销'], avgLikes: '32K', cooperationRate: '8%', price: '12K', matchScore: 88, aiInsight: '受众精准，转化率高', trend: 'up' },
  { name: 'GEO研究者', platform: 'B站', fans: '890K', engagement: '12.1%', category: '研究', content: 'GEO优化实战分享', tags: ['GEO', 'AI'], avgLikes: '28K', cooperationRate: '3%', price: '5K', matchScore: 95, aiInsight: 'GEO领域权威达人，推荐首选', trend: 'up' },
  { name: '内容运营官', platform: '微信', fans: '3.2M', engagement: '4.8%', category: '运营', content: '内容运营方法论', tags: ['运营', '内容'], avgLikes: '65K', cooperationRate: '10%', price: '20K', matchScore: 78, aiInsight: '粉丝基数大，适合品牌曝光', trend: 'stable' },
  { name: '数字营销先锋', platform: '抖音', fans: '1.5M', engagement: '7.3%', category: '营销', content: '数字营销趋势解读', tags: ['数字', '营销'], avgLikes: '38K', cooperationRate: '6%', price: '10K', matchScore: 85, aiInsight: '内容节奏快，适合热点营销', trend: 'up' },
  { name: 'AI应用实验室', platform: '小红书', fans: '760K', engagement: '9.1%', category: '科技', content: 'AI工具应用测评', tags: ['AI', '工具'], avgLikes: '22K', cooperationRate: '4%', price: '6K', matchScore: 90, aiInsight: 'AI工具测评内容与品牌调性一致', trend: 'up' },
]

const videoTopics = [
  { title: '我用 GEO 让品牌推荐率提升了 300%', platform: '抖音', heat: '128W', duration: '3:45', trend: '+234%', type: '教程', format: '口播' },
  { title: 'AI 大模型推荐逻辑揭秘', platform: '抖音', heat: '95W', duration: '5:20', trend: '+156%', type: '深度', format: '科普' },
  { title: '一个操作让 AI 每次推荐你的品牌', platform: 'B站', heat: '82W', duration: '8:15', trend: '+189%', type: '教程', format: '演示' },
  { title: '2026 年 GEO 优化最新趋势', platform: '抖音', heat: '76W', duration: '2:30', trend: '+112%', type: '热点', format: '快讯' },
  { title: '品牌如何在 DeepSeek 中排名第一', platform: 'B站', heat: '68W', duration: '12:00', trend: '+89%', type: '深度', format: '长视频' },
  { title: 'GEO 优化零基础入门指南', platform: '抖音', heat: '62W', duration: '6:30', trend: '+145%', type: '教程', format: '口播' },
]

const imageTopics = [
  { title: 'GEO 优化 vs SEO 优化：一张图看懂区别', platform: '小红书', heat: '85W', likes: '32K', trend: '+123%', type: '科普', layout: '图文对比' },
  { title: '品牌 AI 监测工具测评榜单', platform: '小红书', heat: '72W', likes: '28K', trend: '+98%', type: '评测', layout: '榜单' },
  { title: '2026 品牌营销日历（可保存）', platform: '小红书', heat: '65W', likes: '45K', trend: '+67%', type: '工具', layout: '信息图' },
  { title: 'AI 推荐算法逻辑图解', platform: '微信', heat: '58W', likes: '22K', trend: '+89%', type: '科普', layout: '长图' },
  { title: '从 SEO 到 GEO 的进化路线图', platform: '小红书', heat: '52W', likes: '18K', trend: '+78%', type: '趋势', layout: '时间线' },
  { title: 'GEO 优化检查清单（收藏版）', platform: '小红书', heat: '48W', likes: '35K', trend: '+56%', type: '工具', layout: '清单' },
]

const viralContent = [
  { title: '我用 GEO 让品牌推荐率提升了 300%', author: '品牌运营小李', fans: '8.5K', likes: '128K', shares: '45K', comments: '12K', platform: '抖音', reason: '数据震撼 + 方法可复制' },
  { title: '一个操作让 AI 每次推荐你的品牌', author: '营销专家老张', fans: '12K', likes: '95K', shares: '38K', comments: '8K', platform: '小红书', reason: '标题党 + 实用技巧' },
  { title: 'GEO 优化零基础入门指南', author: 'AI 研究员', fans: '5.2K', likes: '82K', shares: '28K', comments: '15K', platform: 'B站', reason: '教程详细 + 痛点解决' },
  { title: '品牌 AI 监测工具大比拼', author: '数码测评师', fans: '15K', likes: '76K', shares: '22K', comments: '6K', platform: '微信', reason: '测评对比 + 权威感' },
  { title: '如何让 DeepSeek 推荐你的品牌', author: 'GEO 达人', fans: '6.8K', likes: '68K', shares: '31K', comments: '9K', platform: '抖音', reason: '热点平台 + 具体方法' },
]

const competitors = [
  { name: '竞品A', platform: '抖音', fans: '5.2M', contentCount: '1,234', avgLikes: '52K', focus: 'AI营销', trend: 'up', lastUpdate: '2小时前' },
  { name: '竞品B', platform: '小红书', fans: '3.8M', contentCount: '856', avgLikes: '38K', focus: 'GEO优化', trend: 'up', lastUpdate: '5小时前' },
  { name: '竞品C', platform: 'B站', fans: '2.1M', contentCount: '456', avgLikes: '28K', focus: '科技评测', trend: 'stable', lastUpdate: '1天前' },
  { name: '竞品D', platform: '抖音', fans: '4.5M', contentCount: '1,567', avgLikes: '45K', focus: '品牌营销', trend: 'down', lastUpdate: '3小时前' },
]

const competitorAlerts = [
  { type: 'content', message: '竞品A 发布了新的 GEO 优化系列视频', time: '2小时前', priority: 'high' },
  { type: 'cooperation', message: '竞品B 与头部达人「科技小王」达成合作', time: '5小时前', priority: 'medium' },
  { type: 'keyword', message: '竞品C 开始布局「AI 大模型推荐」关键词', time: '1天前', priority: 'high' },
  { type: 'campaign', message: '竞品D 启动春节营销活动，预算预估 500W', time: '3小时前', priority: 'medium' },
]

// AI 分析数据
const trendAnalysisData = [
  { date: 'W1', creators: 120, content: 450, engagement: 8.2 },
  { date: 'W2', creators: 135, content: 520, engagement: 8.5 },
  { date: 'W3', creators: 148, content: 580, engagement: 8.8 },
  { date: 'W4', creators: 156, content: 620, engagement: 9.1 },
]

const contentTypeData = [
  { name: '教程', value: 35, color: '#0EA5E9' },
  { name: '测评', value: 25, color: '#2DD4BF' },
  { name: '热点', value: 20, color: '#6366F1' },
  { name: '品牌', value: 12, color: '#F59E0B' },
  { name: '其他', value: 8, color: '#EC4899' },
]

const aiInsights = [
  { type: 'opportunity', title: 'GEO 教程内容缺口', detail: '当前平台 GEO 教程类内容占比仅 15%，建议加大投入', impact: '高' },
  { type: 'trend', title: 'AI 评测内容增长', detail: 'AI 工具评测类内容近 30 天增长 45%，建议跟进', impact: '中' },
  { type: 'warning', title: '竞品内容密度提升', detail: '竞品A 近 7 天内容发布频率提升 40%', impact: '高' },
  { type: 'suggestion', title: '达人矩阵优化', detail: '建议增加腰部达人合作比例，降低头部依赖', impact: '中' },
]

function MaterialLibrary() {
  const [activeTab, setActiveTab] = useState('creators')
  const [searchQuery, setSearchQuery] = useState('')
  const [creatorFilter, setCreatorFilter] = useState('all')

  const filteredCreators = creators.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchFilter = creatorFilter === 'all' || c.platform === creatorFilter
    return matchSearch && matchFilter
  })

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="p-4 rounded-xl text-left transition-all duration-200 card-hover"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                border: `2px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5" style={{
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                }} />
                <span className="text-sm font-medium" style={{
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                }}>
                  {tab.label}
                </span>
              </div>
              <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {tab.count}
              </div>
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <input
              type="text"
              placeholder={`在 ${activeTabData.label} 中搜索...`}
              className="input-field pl-9 pr-4 py-2 w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-1 text-sm">
              <Filter className="w-4 h-4" />
              筛选
            </button>
            <button className="btn-secondary flex items-center gap-1 text-sm">
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
        </div>
      </div>

      {/* Creators Tab */}
      {activeTab === 'creators' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {['all', '抖音', '小红书', 'B站', '微信'].map(filter => (
              <button
                key={filter}
                onClick={() => setCreatorFilter(filter)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  backgroundColor: creatorFilter === filter ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                  color: creatorFilter === filter ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  border: `1px solid ${creatorFilter === filter ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                }}
              >
                {filter === 'all' ? '全部' : filter}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCreators.map((creator, index) => (
              <div key={index} className="card card-hover p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>{creator.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{creator.platform} · {creator.category}</div>
                  </div>
                </div>
                <div className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{creator.content}</div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>粉丝</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{creator.fans}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>互动率</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{creator.engagement}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>平均赞</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{creator.avgLikes}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>报价</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--color-secondary)' }}>{creator.price}</div>
                  </div>
                </div>
                {/* AI Match Score */}
                <div className="p-2 rounded-lg mb-3" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>AI 匹配度</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{creator.matchScore}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${creator.matchScore}%`, backgroundColor: 'var(--color-accent)' }} />
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{creator.aiInsight}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {creator.tags.map(tag => (
                      <span key={tag} className="tag tag-primary text-xs">{tag}</span>
                    ))}
                  </div>
                  <button className="text-xs flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                    <Bookmark className="w-3 h-3" />
                    收藏
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Topics Tab */}
      {activeTab === 'video' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>视频选题库</h3>
            <div className="flex items-center gap-2">
              <span className="badge badge-blue">实时更新</span>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>数据来源：抖音/B站</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">选题标题</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">热度</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">时长</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">类型</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {videoTopics.map((item, index) => (
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
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.title}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>格式：{item.format}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="tag tag-primary text-xs">{item.platform}</span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.heat}</td>
                    <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.duration}</td>
                    <td className="py-3 px-4">
                      <span className="tag tag-secondary text-xs">{item.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-status-green)' }}>{item.trend}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                        <PenTool className="w-3 h-3" />
                        创作
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Image Topics Tab */}
      {activeTab === 'image' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>图文选题库</h3>
            <div className="flex items-center gap-2">
              <span className="badge badge-green">高互动</span>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>数据来源：小红书/微信</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">选题标题</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">热度</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">点赞</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">类型</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">布局</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {imageTopics.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="py-3 px-4">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: index < 3 ? 'var(--color-accent-50)' : 'var(--color-bg-surface-light)',
                          color: index < 3 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        }}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="tag tag-primary text-xs">{item.platform}</span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.heat}</td>
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{item.likes}</td>
                    <td className="py-3 px-4">
                      <span className="tag tag-secondary text-xs">{item.type}</span>
                    </td>
                    <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.layout}</td>
                    <td className="py-3 px-4">
                      <button className="text-sm flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                        <PenTool className="w-3 h-3" />
                        创作
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Low-Fan Viral Tab */}
      {activeTab === 'viral' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>低粉爆款榜单</h3>
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{'粉丝 < 20K，点赞 > 50K'}</span>
          </div>
          <div className="space-y-3">
            {viralContent.map((item, index) => (
              <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent)' }}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.title}</div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>{item.author}</span>
                      <span>{item.platform}</span>
                      <span>{item.fans} 粉丝</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" style={{ color: 'var(--color-status-red)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" style={{ color: 'var(--color-primary)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.shares}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" style={{ color: 'var(--color-secondary)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.comments}</span>
                      </div>
                    </div>
                    <div className="mt-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                      <span className="text-xs" style={{ color: 'var(--color-primary)' }}>
                        <Zap className="w-3 h-3 inline mr-1" />
                        爆款原因：{item.reason}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Monitor Tab */}
      {activeTab === 'competitor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>竞品监控</h3>
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4" />
                  添加竞品
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="table-header">
                      <th className="text-left py-3 px-4 text-sm font-semibold">竞品</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">粉丝</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">内容数</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">平均赞</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">赛道</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">更新</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((item, index) => (
                      <tr key={index} className="table-row">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="tag tag-primary text-xs">{item.platform}</span>
                        </td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.fans}</td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.contentCount}</td>
                        <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{item.avgLikes}</td>
                        <td className="py-3 px-4">
                          <span className="tag tag-secondary text-xs">{item.focus}</span>
                        </td>
                        <td className="py-3 px-4">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                          ) : item.trend === 'down' ? (
                            <TrendingUp className="w-4 h-4 rotate-180" style={{ color: 'var(--color-status-red)' }} />
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>稳定</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-status-red)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>竞品动态</h3>
              </div>
              <div className="space-y-3">
                {competitorAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${alert.priority === 'high' ? 'badge-red' : 'badge-yellow'} text-xs`}>
                        {alert.priority === 'high' ? '重要' : '一般'}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{alert.time}</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{alert.message}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>AI 分析</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  竞品A 近7天发布频率提升 40%，建议加强内容产出节奏。竞品B 开始布局「AI 大模型推荐」关键词，需关注。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>合作达人</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>156</div>
              <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ +12 本月</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>内容产出</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>620</div>
              <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ +8.5% 本月</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>平均互动</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>9.1%</div>
              <div className="text-xs" style={{ color: 'var(--color-status-green)' }}>↑ +0.3% 本月</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>匹配度均值</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#F59E0B' }}>88.2</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>/100</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>内容趋势分析</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trendAnalysisData}>
                  <defs>
                    <linearGradient id="colorCreators" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
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
                  <Area type="monotone" dataKey="creators" name="合作达人" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorCreators)" strokeWidth={2} />
                  <Area type="monotone" dataKey="content" name="内容产出" stroke="#2DD4BF" strokeWidth={2} fillOpacity={0} />
                  <Legend fontSize={11} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>内容类型分布</h3>
              </div>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {contentTypeData.map((entry, index) => (
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
                  {contentTypeData.map((item, i) => (
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
              <Brain className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 智能洞察</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight, i) => (
                <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'opportunity' ? (
                      <Zap className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    ) : insight.type === 'trend' ? (
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                    ) : insight.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-status-yellow)' }} />
                    ) : (
                      <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                    )}
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{insight.title}</span>
                    <span className={`badge ${insight.impact === '高' ? 'badge-red' : 'badge-yellow'} text-xs`}>{insight.impact}影响</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{insight.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>达人合作日历</h3>
              </div>
              <div className="space-y-2">
                {[
                  { date: '06-28', creator: '科技达人小王', content: 'GEO工具测评', status: 'confirmed' },
                  { date: '06-30', creator: '品牌营销笔记', content: '品牌策略分析', status: 'pending' },
                  { date: '07-02', creator: 'GEO研究者', content: '优化实战教程', status: 'confirmed' },
                  { date: '07-05', creator: 'AI应用实验室', content: 'AI工具测评', status: 'draft' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="w-16 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.date}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.creator}</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.content}</div>
                    </div>
                    <span className={`badge ${
                      item.status === 'confirmed' ? 'badge-green' :
                      item.status === 'pending' ? 'badge-yellow' : 'badge-blue'
                    } text-xs`}>
                      {item.status === 'confirmed' ? '已确认' : item.status === 'pending' ? '待确认' : '草稿'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>素材质量评分</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: '视频素材', score: 88, count: 128 },
                  { name: '图文素材', score: 92, count: 256 },
                  { name: '直播切片', score: 76, count: 64 },
                  { name: '用户UGC', score: 85, count: 312 },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: item.score >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.score}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.count} 个</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                      <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.score >= 85 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }} />
                    </div>
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

export default MaterialLibrary
