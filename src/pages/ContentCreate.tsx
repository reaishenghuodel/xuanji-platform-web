import { useState } from 'react'
import {
  PenTool, Wand2, Copy, RefreshCw, Image, FileText, Video, CheckCircle, Sparkles,
  Scissors, Lightbulb, Mic, Target, Zap, Brain, Calendar, BarChart3, Shield, Globe,
  Clock, TrendingUp, Eye, ThumbsUp, Share2, Download, Hash, Play, Layers, AlertTriangle
} from 'lucide-react'

const tools = [
  { id: 'create', label: 'AI图文创作', icon: PenTool, desc: '一站式内容生成' },
  { id: 'rewrite', label: 'AI改写', icon: RefreshCw, desc: '智能改写润色' },
  { id: 'extract', label: '提取卖点', icon: Scissors, desc: '自动提取核心卖点' },
  { id: 'topic', label: '智能选题', icon: Lightbulb, desc: 'AI推荐热门选题' },
  { id: 'live', label: '直播复盘', icon: Mic, desc: '直播数据分析' },
  { id: 'schedule', label: '内容排期', icon: Calendar, desc: '智能排期与分发' },
  { id: 'check', label: 'GEO检测', icon: Shield, desc: '内容GEO优化检查' },
]

const platforms = [
  { id: 'douyin', name: '抖音', icon: Video, color: '#1C1C1C' },
  { id: 'xiaohongshu', name: '小红书', icon: Image, color: '#FF2442' },
  { id: 'wechat', name: '微信', icon: FileText, color: '#07C160' },
  { id: 'bilibili', name: 'B站', icon: Video, color: '#00A1D6' },
  { id: 'zhihu', name: '知乎', icon: Brain, color: '#0084FF' },
  { id: 'weibo', name: '微博', icon: Globe, color: '#E6162D' },
]

const templates = [
  { id: 1, name: '产品种草', desc: '突出产品卖点，引发用户购买欲望', tags: ['电商', '种草'], platform: 'xiaohongshu' },
  { id: 2, name: '品牌故事', desc: '讲述品牌起源和价值观，建立情感连接', tags: ['品牌', '故事'], platform: 'wechat' },
  { id: 3, name: '教程攻略', desc: '实用教程，解决用户痛点', tags: ['教程', '干货'], platform: 'bilibili' },
  { id: 4, name: '热点借势', desc: '结合热点话题，提升品牌曝光', tags: ['热点', '营销'], platform: 'douyin' },
  { id: 5, name: '用户证言', desc: '真实用户反馈，增强信任感', tags: ['口碑', '信任'], platform: 'xiaohongshu' },
  { id: 6, name: '对比评测', desc: '客观对比，突出品牌优势', tags: ['评测', '对比'], platform: 'bilibili' },
  { id: 7, name: 'GEO优化指南', desc: 'GEO优化方法论，提升AI推荐率', tags: ['GEO', '优化'], platform: 'zhihu' },
  { id: 8, name: 'AI行业洞察', desc: 'AI行业趋势分析与品牌建议', tags: ['AI', '趋势'], platform: 'weibo' },
]

const generatedContent = [
  {
    title: '【AI 时代】品牌营销新玩法：GEO 引擎优化全攻略',
    content: '在 AI 大模型时代，品牌如何被看见？GEO（Generative Engine Optimization）成为新赛道。通过优化品牌内容在 AI 模型中的"被理解度"和"被推荐度"，让你的品牌在每个 AI 对话中脱颖而出。本文将从实战角度，教你掌握 GEO 优化的核心方法论...',
    platform: '小红书',
    words: 486,
    score: 92,
    tags: ['GEO', '品牌营销'],
    geoCheck: { status: 'pass', score: 88, issues: 2 },
  },
  {
    title: '别再只会做 SEO 了！2026 年必学的 GEO 优化技巧',
    content: 'SEO 已经成为过去式，GEO 才是未来。当你的用户在问 AI "哪个品牌最好"时，你的品牌是否被推荐？本文从实战角度，教你如何让品牌在 AI 推荐中占据 C 位。从语义优化到信任证据链，全方位解析 GEO 优化策略...',
    platform: '抖音',
    words: 652,
    score: 88,
    tags: ['GEO', 'AI营销'],
    geoCheck: { status: 'pass', score: 85, issues: 3 },
  },
  {
    title: '深度解析：品牌如何在 DeepSeek 中获得更高推荐率',
    content: 'DeepSeek 作为目前最活跃的 AI 大模型之一，日活用户已突破 2 亿。品牌如何在这个平台上获得更高的推荐率？本文从内容优化、语义理解、场景覆盖三个维度深入分析，并结合真实案例，给出可落地的优化方案...',
    platform: '微信',
    words: 820,
    score: 95,
    tags: ['DeepSeek', '品牌优化'],
    geoCheck: { status: 'pass', score: 91, issues: 1 },
  },
]

const rewriteStyles = [
  { id: 'professional', name: '专业正式', desc: '适合商务场景' },
  { id: 'casual', name: '轻松活泼', desc: '适合社交媒体' },
  { id: 'story', name: '故事叙述', desc: '增强情感共鸣' },
  { id: 'short', name: '简洁精炼', desc: '适合短视频文案' },
  { id: 'long', name: '深度长文', desc: '适合公众号/知乎' },
  { id: 'geo', name: 'GEO优化', desc: '优化AI可读性' },
]

const hotTopics = [
  { topic: 'AI 大模型推荐品牌', heat: '982K', trend: '+234%', category: '科技' },
  { topic: 'GEO 优化实战案例', heat: '756K', trend: '+156%', category: '营销' },
  { topic: '品牌数字化转型攻略', heat: '623K', trend: '+89%', category: '商业' },
  { topic: 'AI 内容创作工具测评', heat: '534K', trend: '+112%', category: '工具' },
  { topic: '私域流量运营技巧', heat: '445K', trend: '+67%', category: '运营' },
  { topic: 'KOL 种草文案模板', heat: '398K', trend: '+45%', category: '内容' },
]

const liveReplayData = [
  {
    title: '品牌 GEO 优化实战分享',
    date: '2026-01-15',
    duration: '2小时15分',
    viewers: '12.5K',
    likes: '3.2K',
    comments: '856',
    shares: '1.1K',
    highlights: ['GEO 优化核心方法论', 'DeepSeek 推荐率提升技巧', 'AI 内容创作实战'],
    keyMoments: [
      { time: '00:15:30', label: '核心方法论讲解', engagement: 95 },
      { time: '00:45:20', label: '案例拆解', engagement: 88 },
      { time: '01:20:10', label: '互动问答', engagement: 92 },
      { time: '01:50:00', label: '总结与福利', engagement: 96 },
    ],
  },
  {
    title: 'AI 时代品牌营销新趋势',
    date: '2026-01-08',
    duration: '1小时45分',
    viewers: '8.7K',
    likes: '2.1K',
    comments: '623',
    shares: '890',
    highlights: ['2026 营销趋势预测', 'AI 获客实战技巧', '内容创作效率提升'],
    keyMoments: [
      { time: '00:10:00', label: '趋势分析', engagement: 90 },
      { time: '00:35:00', label: '实战演示', engagement: 85 },
      { time: '01:10:00', label: '工具推荐', engagement: 88 },
    ],
  },
]

// 内容排期数据
const scheduleData = [
  { date: '06-28', platform: '小红书', topic: 'GEO优化指南', status: 'published', engagement: '8.5K' },
  { date: '06-29', platform: '抖音', topic: 'AI营销新趋势', status: 'scheduled', engagement: '-' },
  { date: '06-30', platform: '微信', topic: '品牌故事系列', status: 'draft', engagement: '-' },
  { date: '07-01', platform: 'B站', topic: 'DeepSeek优化实战', status: 'scheduled', engagement: '-' },
  { date: '07-02', platform: '知乎', topic: 'GEO vs SEO 对比', status: 'draft', engagement: '-' },
  { date: '07-03', platform: '微博', topic: 'AI行业热点', status: 'scheduled', engagement: '-' },
]

// GEO检测项目
const geoCheckItems = [
  { name: '结构化数据完整性', status: 'pass', score: 92, detail: 'Schema 标记完善，AI 可识别' },
  { name: '语义一致性', status: 'pass', score: 88, detail: '关键词与内容语义匹配度良好' },
  { name: '权威信源引用', status: 'warning', score: 72, detail: '缺少第三方权威数据引用' },
  { name: 'FAQ 覆盖度', status: 'pass', score: 85, detail: '已覆盖 17 个常见问答' },
  { name: '多模态素材', status: 'warning', score: 65, detail: '图片/视频素材不足，建议补充' },
  { name: '品牌一致性', status: 'pass', score: 90, detail: '品牌信息在各平台保持一致' },
  { name: '内容可读性', status: 'pass', score: 87, detail: 'Flesch 可读性评分 68' },
  { name: 'AI 引用优化', status: 'warning', score: 70, detail: '引用来源标注不够清晰' },
]

function ContentCreate() {
  const [activeTool, setActiveTool] = useState('create')
  const [selectedPlatform, setSelectedPlatform] = useState('douyin')
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [topic, setTopic] = useState('')
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [rewriteStyle, setRewriteStyle] = useState('professional')
  const [rewriteText, setRewriteText] = useState('')
  const [extractText, setExtractText] = useState('')
  const [extractedPoints, setExtractedPoints] = useState<string[]>([])
  const [selectedLive, setSelectedLive] = useState(0)
  const [geoCheckOpen, setGeoCheckOpen] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  const handleExtract = () => {
    if (extractText.length < 10) return
    setExtractedPoints([
      '核心卖点：AI 驱动的智能选词系统，覆盖 DSO/RSO/WSO/GEO 四大平台',
      '差异化优势：独家 GEO 引擎优化算法，提升品牌在 AI 大模型中的推荐率',
      '效率提升：AI 内容创作工具可将内容产出效率提升 300%',
      '数据支撑：服务 500+ 品牌，平均推荐率提升 45%',
      '场景覆盖：支持抖音、小红书、微信、B站、知乎、微博等全平台内容运营',
    ])
  }

  const handleReset = () => {
    setGenerated(false)
    setStep(1)
    setTopic('')
  }

  return (
    <div className="space-y-6">
      {/* Tool Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tools.map(tool => {
          const Icon = tool.icon
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: activeTool === tool.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                color: activeTool === tool.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeTool === tool.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">{tool.label}</div>
                <div className="text-xs opacity-70">{tool.desc}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* AI Creation Tool */}
      {activeTool === 'create' && (
        <div className="space-y-6">
          {!generated ? (
            <div className="space-y-6">
              {/* Step Indicator */}
              <div className="card">
                <div className="flex items-center justify-between">
                  {[
                    { num: 1, label: '选择平台' },
                    { num: 2, label: '输入主题' },
                    { num: 3, label: '选择模板' },
                    { num: 4, label: 'AI 生成' },
                  ].map((item, index) => (
                    <div key={item.num} className="flex items-center flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{
                            backgroundColor: step >= item.num ? 'var(--color-primary)' : 'var(--color-bg-surface-light)',
                            color: step >= item.num ? 'white' : 'var(--color-text-secondary)',
                            border: `2px solid ${step >= item.num ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                          }}>
                          {step > item.num ? <CheckCircle className="w-5 h-5" /> : item.num}
                        </div>
                        <span className="text-sm font-medium hidden md:block" style={{
                          color: step >= item.num ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        }}>
                          {item.label}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="flex-1 h-0.5 mx-2 md:mx-4" style={{
                          backgroundColor: step > item.num ? 'var(--color-primary)' : 'var(--color-border-default)',
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Platform & Template */}
                <div className="space-y-6 lg:col-span-1">
                  <div className="card">
                    <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>选择平台</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {platforms.map((platform) => {
                        const Icon = platform.icon
                        return (
                          <button
                            key={platform.id}
                            onClick={() => { setSelectedPlatform(platform.id); setStep(2) }}
                            className="p-3 rounded-lg text-center transition-all duration-200"
                            style={{
                              backgroundColor: selectedPlatform === platform.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                              border: `2px solid ${selectedPlatform === platform.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                            }}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-1" style={{
                              color: selectedPlatform === platform.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            }} />
                            <div className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{platform.name}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>选择模板</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => { setSelectedTemplate(template.id); setStep(4) }}
                          className="w-full p-3 rounded-lg text-left transition-all duration-200"
                          style={{
                            backgroundColor: selectedTemplate === template.id ? 'var(--color-accent-50)' : 'var(--color-bg-surface-light)',
                            border: `1px solid ${selectedTemplate === template.id ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{template.name}</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{template.platform}</span>
                          </div>
                          <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{template.desc}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {template.tags.map(tag => (
                              <span key={tag} className="tag tag-secondary text-xs">{tag}</span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel - Topic & Generate */}
                <div className="space-y-6 lg:col-span-2">
                  <div className="card">
                    <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>输入内容主题</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="输入主题，如：品牌GEO优化策略、AI时代品牌营销..."
                        className="input-field w-full py-3 px-4 text-sm"
                        value={topic}
                        onChange={(e) => { setTopic(e.target.value); if (e.target.value) setStep(3) }}
                      />
                      {topic && (
                        <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setTopic('')}>
                          <RefreshCw className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['品牌营销', 'GEO优化', 'AI获客', '内容策略', '竞品分析', '行业趋势'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => { setTopic(tag); setStep(3) }}
                          className="tag tag-secondary text-sm px-3 py-1"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>AI 创作设置</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>内容风格</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>专业严谨</option>
                          <option>轻松活泼</option>
                          <option>故事叙述</option>
                          <option>简洁有力</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>字数要求</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>500字以内</option>
                          <option>500-1000字</option>
                          <option>1000-2000字</option>
                          <option>2000字以上</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>关键词密度</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>自然融入</option>
                          <option>适度优化</option>
                          <option>强优化</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>GEO优化</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>标准模式</option>
                          <option>增强模式</option>
                          <option>极致优化</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>目标平台</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>单平台</option>
                          <option>多平台适配</option>
                          <option>全平台分发</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs block mb-2" style={{ color: 'var(--color-text-secondary)' }}>AI引用</label>
                        <select className="input-field text-sm w-full py-2">
                          <option>自动添加</option>
                          <option>手动选择</option>
                          <option>不添加</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-primary)' }}>
                          AI 将根据「{topic || '未输入主题'}」+「{templates.find(t => t.id === selectedTemplate)?.name || '未选择模板'}」+「{platforms.find(p => p.id === selectedPlatform)?.name || '未选择平台'}」生成 {templates.find(t => t.id === selectedTemplate)?.platform || '多平台'} 内容，并自动进行 GEO 优化
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleGenerate}
                      disabled={!topic || isGenerating}
                      className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
                      style={{ opacity: !topic || isGenerating ? 0.5 : 1 }}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>AI 生成中...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5" />
                          <span>AI 生成内容</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  AI 生成结果
                  <span className="ml-2 text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>
                    共 {generatedContent.length} 篇内容
                  </span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => setGeoCheckOpen(!geoCheckOpen)}
                  >
                    <Shield className="w-4 h-4" />
                    {geoCheckOpen ? '关闭检测' : 'GEO检测'}
                  </button>
                  <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    重新生成
                  </button>
                </div>
              </div>

              {/* GEO Check Panel */}
              {geoCheckOpen && (
                <div className="card" style={{ borderColor: 'var(--color-accent)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 优化检测结果</h3>
                    <span className="badge badge-green">综合评分 82</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {geoCheckItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.status === 'pass' ? 'var(--color-status-green-50)' : 'var(--color-status-yellow-50)' }}>
                          {item.status === 'pass' ? (
                            <CheckCircle className="w-3.5 h-3.5" style={{ color: 'var(--color-status-green)' }} />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'var(--color-status-yellow)' }} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                            <span className="text-sm font-bold" style={{ color: item.score >= 80 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.score}</span>
                          </div>
                          <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {generatedContent.map((item, index) => (
                <div key={index} className="card card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="tag tag-primary text-xs">{item.platform}</span>
                      <span className="badge badge-green text-xs">AI 评分 {item.score}</span>
                      <span className={`badge text-xs ${item.geoCheck.score >= 85 ? 'badge-green' : 'badge-yellow'}`}>
                        GEO {item.geoCheck.score}
                      </span>
                      {item.tags.map(tag => (
                        <span key={tag} className="tag tag-secondary text-xs">{tag}</span>
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.words} 字</span>
                  </div>
                  <h4 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.content}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button className="btn-primary flex items-center gap-1 text-sm">
                      <Copy className="w-4 h-4" />
                      复制内容
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-sm">
                      <RefreshCw className="w-4 h-4" />
                      智能改写
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-sm">
                      <Wand2 className="w-4 h-4" />
                      继续扩写
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-sm">
                      <Download className="w-4 h-4" />
                      导出
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-sm">
                      <Shield className="w-4 h-4" />
                      GEO优化
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Rewrite Tool */}
      {activeTool === 'rewrite' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>原始内容</h3>
            </div>
            <textarea
              className="input-field w-full h-64 p-4 text-sm resize-none"
              placeholder="粘贴需要改写的内容..."
              value={rewriteText}
              onChange={(e) => setRewriteText(e.target.value)}
              defaultValue="在 AI 大模型时代，品牌营销正在经历一场深刻的变革。传统的 SEO 优化已经无法满足品牌在 AI 对话场景中的曝光需求。GEO（Generative Engine Optimization）应运而生，通过优化品牌内容在 AI 模型中的语义理解和推荐概率，帮助品牌在 AI 时代获得持续的竞争优势。"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>改写风格：</span>
              {rewriteStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setRewriteStyle(style.id)}
                  className="px-3 py-1 rounded-lg text-xs transition-all"
                  style={{
                    backgroundColor: rewriteStyle === style.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                    color: rewriteStyle === style.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    border: `1px solid ${rewriteStyle === style.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                  }}
                >
                  {style.name}
                </button>
              ))}
            </div>
            <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              AI 智能改写
            </button>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>改写结果</h3>
            </div>
            <div className="h-64 p-4 rounded-lg text-sm leading-relaxed overflow-y-auto" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)' }}>
              <p className="mb-3">AI 正在改写你的内容...</p>
              <p className="mb-3">【{rewriteStyles.find(s => s.id === rewriteStyle)?.name || '专业正式'}风格】</p>
              <p>"当 AI 大模型成为用户获取信息的主要入口，品牌营销的游戏规则已经被彻底改写。曾经风光无限的 SEO 优化，在 AI 对话场景中显得力不从心。GEO 优化——这场专为 AI 时代打造的营销革命，正通过深度优化品牌内容的语义表达，让品牌在每一个 AI 推荐中占据核心位置。"</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>92%</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>语义保留度</div>
              </div>
              <div className="flex-1 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>+35%</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>可读性提升</div>
              </div>
              <div className="flex-1 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>A+</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>内容质量</div>
              </div>
              <div className="flex-1 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="text-lg font-bold" style={{ color: '#8B5CF6' }}>88</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>GEO评分</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extract Selling Points */}
      {activeTool === 'extract' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>输入内容</h3>
            </div>
            <textarea
              className="input-field w-full h-64 p-4 text-sm resize-none"
              placeholder="粘贴产品描述、品牌介绍或营销文案..."
              value={extractText}
              onChange={(e) => setExtractText(e.target.value)}
              defaultValue="璇玑智科人工智能一体化应用平台，是业内领先的 GEO 智能运营解决方案。平台覆盖品牌AI监测、智能选词、AI内容创作、达人素材库等全链路功能，服务超过500家知名品牌。通过独家的 GEO 引擎优化算法，平均帮助品牌提升 AI 推荐率45%以上。支持抖音、小红书、微信、B站、知乎、微博等全平台内容运营，AI 内容创作效率提升300%。"
            />
            <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2" onClick={handleExtract}>
              <Zap className="w-4 h-4" />
              AI 提取卖点
            </button>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>提取结果</h3>
            </div>
            {extractedPoints.length > 0 ? (
              <div className="space-y-3">
                {extractedPoints.map((point, index) => (
                  <div key={index} className="p-3 rounded-lg flex items-start gap-3" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent)' }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{point}</p>
                    </div>
                    <button className="text-xs" style={{ color: 'var(--color-primary)' }}>复制</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center" style={{ color: 'var(--color-text-secondary)' }}>
                <div className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">点击「AI 提取卖点」开始分析</p>
                </div>
              </div>
            )}
            {extractedPoints.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>AI 建议</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    建议将核心卖点「AI 驱动的智能选词系统」作为标题关键词，「平均推荐率提升45%」作为数据背书，在内容中优先展示。
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>GEO 优化建议</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    卖点提取后，建议为每个卖点补充对应的 FAQ 问答和结构化数据，增强 AI 引用概率。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Smart Topic Selection */}
      {activeTool === 'topic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>今日热榜</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-green)' }}>98</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>个热门话题</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>总曝光量</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>4.2M</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>近7天累计</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>平均互动率</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>7.8%</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>高于行业均值</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>热门话题推荐</h3>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>基于 AI 实时分析</span>
                </div>
              </div>
              <div className="space-y-3">
                {hotTopics.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: index < 3 ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                        color: index < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.topic}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>热度 {item.heat}</span>
                        <span className="text-xs" style={{ color: 'var(--color-status-green)' }}>增长 {item.trend}</span>
                        <span className="tag tag-primary text-xs">{item.category}</span>
                      </div>
                    </div>
                    <button className="btn-primary text-sm flex items-center gap-1">
                      <PenTool className="w-3 h-3" />
                      创作
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="card">
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>选题偏好</h3>
                <div className="space-y-2">
                  {['科技', '营销', '商业', '工具', '运营', '内容'].map(cat => (
                    <div key={cat} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{cat}</span>
                      <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${Math.random() * 60 + 40}%`,
                          backgroundColor: 'var(--color-primary)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>AI 选题建议</h3>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>智能推荐</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    基于您的品牌定位，建议重点关注「GEO 优化」和「AI 获客」相关话题。当前「AI 大模型推荐品牌」热度激增，是绝佳的内容切入点。
                  </p>
                </div>
                <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>GEO 选题</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    建议围绕「品牌AI监测」「GEO vs SEO 对比」等选题创作，可有效提升品牌在 AI 平台的引用率。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Replay Analysis */}
      {activeTool === 'live' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>直播场次</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>24</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>本月累计</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>总观看</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>156.8K</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>人次</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>平均互动</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-green)' }}>8.2%</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>高于行业均值</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>内容复用</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>42</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇二次创作</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-1">
              <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>直播列表</h3>
              <div className="space-y-3">
                {liveReplayData.map((live, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLive(index)}
                    className="w-full p-3 rounded-lg text-left transition-all"
                    style={{
                      backgroundColor: selectedLive === index ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                      border: `1px solid ${selectedLive === index ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                    }}
                  >
                    <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{live.title}</div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Clock className="w-3 h-3" />
                      {live.duration}
                      <Eye className="w-3 h-3 ml-1" />
                      {live.viewers}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {liveReplayData[selectedLive].title}
                </h3>
                <span className="badge badge-blue">{liveReplayData[selectedLive].date}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{liveReplayData[selectedLive].viewers}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>观看人数</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{liveReplayData[selectedLive].likes}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>点赞</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>{liveReplayData[selectedLive].comments}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>评论</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-status-green)' }}>{liveReplayData[selectedLive].shares}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>分享</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>高光时刻</h4>
                <div className="space-y-2">
                  {liveReplayData[selectedLive].keyMoments.map((moment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                        <Play className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{moment.label}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{moment.time}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                          <div className="h-full rounded-full" style={{ width: `${moment.engagement}%`, backgroundColor: 'var(--color-accent)' }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{moment.engagement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>内容亮点</h4>
                <div className="flex flex-wrap gap-2">
                  {liveReplayData[selectedLive].highlights.map((highlight, index) => (
                    <span key={index} className="tag tag-primary text-sm">{highlight}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <Scissors className="w-4 h-4" />
                  生成切片内容
                </button>
                <button className="btn-secondary flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  导出脚本
                </button>
                <button className="btn-secondary flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  GEO优化切片
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Schedule */}
      {activeTool === 'schedule' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>本周排期</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>12</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇内容</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>已发布</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-green)' }}>5</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>待发布</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>4</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>草稿</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>3</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇</div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>内容排期日历</h3>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                AI 智能排期
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">日期</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">平台</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">主题</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">状态</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">互动</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.date}</td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{item.platform}</span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.topic}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.status === 'published' ? 'badge-green' :
                          item.status === 'scheduled' ? 'badge-blue' : 'badge-yellow'
                        } text-xs`}>
                          {item.status === 'published' ? '已发布' : item.status === 'scheduled' ? '已排期' : '草稿'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.engagement}</td>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>平台分发策略</h3>
              </div>
              <div className="space-y-3">
                {platforms.slice(0, 4).map((platform, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm w-16" style={{ color: 'var(--color-text-secondary)' }}>{platform.name}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 40 + 50)}%`, backgroundColor: platform.color }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{Math.floor(Math.random() * 5 + 2)} 篇/周</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 排期建议</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-primary)' }}>最佳发布时间</div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>小红书建议周二/周四 19:00-21:00，抖音建议周五 20:00-22:00</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>内容频率建议</div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>当前每周 12 篇，建议增加至 15 篇，重点加强 GEO 优化内容占比</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary-50)' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-secondary)' }}>热点借势</div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>下周「AI 大会」期间，建议增加 3 篇相关内容，抢占热点流量</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GEO Check */}
      {activeTool === 'check' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>检测内容</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>86</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇已检测</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>通过</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-green)' }}>62</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-status-yellow)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>需优化</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-status-yellow)' }}>24</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>篇</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>平均评分</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>82</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>/100</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 检测项目</h3>
              </div>
              <div className="space-y-3">
                {geoCheckItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.status === 'pass' ? 'var(--color-status-green-50)' : 'var(--color-status-yellow-50)' }}>
                      {item.status === 'pass' ? (
                        <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                      ) : (
                        <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-status-yellow)' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                        <span className="text-sm font-bold" style={{ color: item.score >= 80 ? 'var(--color-accent)' : 'var(--color-status-yellow)' }}>{item.score}</span>
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>AI 检测输入</h3>
                </div>
                <textarea
                  className="input-field w-full h-32 p-3 text-sm resize-none"
                  placeholder="粘贴内容，AI 将自动检测 GEO 优化情况..."
                  defaultValue="璇玑智科是领先的 GEO 智能运营平台，帮助品牌在 AI 大模型中获得更高推荐率。"
                />
                <button className="btn-primary w-full mt-3 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  开始 GEO 检测
                </button>
              </div>

              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>优化建议</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-accent)' }}>结构化数据</div>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>建议添加 Schema 标记，增强 AI 对内容的理解</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-primary)' }}>FAQ 覆盖</div>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>当前仅覆盖 17 个问答，建议扩展至 30 个以上</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary-50)' }}>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-secondary)' }}>多模态素材</div>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>建议为每篇内容配 3-5 张高质量图片或 1 个视频</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCreate
