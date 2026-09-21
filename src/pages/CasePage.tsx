import { useState } from 'react'
import { Briefcase, CheckCircle, ArrowRight, TrendingUp, Shield, Sparkles, Target, BarChart3, Star, Zap } from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'

const categories = ['全部', 'B2B', '新消费', '本地服务', '金融', '教育']

const cases = [
  {
    id: 1,
    title: '垄断 AI 首推荐席位',
    subtitle: '确立"细分领域专家"绝对权威',
    industry: '移民服务',
    category: 'B2B',
    metric: '推荐率 TOP1',
    beforeRate: 12,
    afterRate: 78,
    timeline: [
      { month: 'M1', rate: 12 },
      { month: 'M2', rate: 28 },
      { month: 'M3', rate: 45 },
      { month: 'M4', rate: 62 },
      { month: 'M5', rate: 72 },
      { month: 'M6', rate: 78 },
    ],
    challenge: '某美国杰出人才移民服务商，面对高客单价、长决策周期的行业特性，高净值客户已习惯先用 AI 做背景调查。品牌急需解决的痛点是：在激烈的同质化竞争中，如何不被 AI 淹没，而是被算法判定为"最安全、最权威"的推荐选项。',
    strategy: '逆向工程 AI 信任链。我们不堆砌无效信息，而是针对 AI 评测逻辑，系统投喂行业资质、法律背书等高权重内容，构建逻辑严密的"信任证据链"，强制修正 AI 认知，使其在回答中主动为品牌背书。',
    result: '成功卡位核心意图的首要推荐位，在 AI 关键决策入口建立了压倒性的信任优势，直接缩短了高净值客户的犹豫期。',
    tags: ['B2B', '高客单价', '信任构建'],
    color: '#0EA5E9',
  },
  {
    id: 2,
    title: '锁定 60%+ 推荐率',
    subtitle: '打造 AI 眼中的"培育钻爱马仕"',
    industry: '新奢品牌',
    category: '新消费',
    metric: '60%+ 推荐率',
    beforeRate: 25,
    afterRate: 64,
    timeline: [
      { month: 'M1', rate: 25 },
      { month: 'M2', rate: 35 },
      { month: 'M3', rate: 48 },
      { month: 'M4', rate: 58 },
      { month: 'M5', rate: 62 },
      { month: 'M6', rate: 64 },
    ],
    challenge: '某新奢培育钻石品牌，身处极度饱和的红海市场，面临竞品海量同质化内容的"围剿"。品牌的核心诉求是：在 AI 有限的推荐窗口中突围，避免被算法折叠或遗忘，建立"设计型品牌"的独特识别度。',
    strategy: '抢占语义定义权。放弃传统的流量思维，转而植入"培育钻爱马仕"、"首个出海品牌"等差异化标签，训练 AI 识别其独特价值，在逻辑层面与普通竞品彻底切割，实现"以质换量"。',
    result: 'AI 大模型推荐率长期稳定在 60% 以上，构筑了极高的竞争壁垒，成功将每一次 AI 对话都转化为品牌独占的展示窗口。',
    tags: ['新奢品牌', '差异化', '红海突围'],
    color: '#2DD4BF',
  },
  {
    id: 3,
    title: '捕获顶级决策者',
    subtitle: '由 AI "背书"促成千万级大单',
    industry: '管理咨询',
    category: 'B2B',
    metric: '千万级大单',
    beforeRate: 18,
    afterRate: 72,
    timeline: [
      { month: 'M1', rate: 18 },
      { month: 'M2', rate: 32 },
      { month: 'M3', rate: 50 },
      { month: 'M4', rate: 62 },
      { month: 'M5', rate: 68 },
      { month: 'M6', rate: 72 },
    ],
    challenge: '某国内知名管理咨询公司，传统搜索广告年投百万却失效（咨询量下滑 30%）。面对企业核心决策者（董事长/高管）转向用 AI 进行深度竞品调研的趋势，品牌急需在这一"最高决策环节"建立专业影响力。',
    strategy: 'B2B 权威性重构。我们将重心从关键词排名转向"高价值方法论"投喂，向 AI 系统性论证其行业领导力，确保 AI 在回答复杂商业咨询问题时，能引用该机构的观点作为核心论据。',
    result: '收到客户反馈："董事长通过 DeepSeek 对比后最终拍板选了我们"。成功将 AI 的理性分析转化为高价值的商业信任，直接促成了商业合同落地。',
    tags: ['B2B', '决策层', '权威性'],
    color: '#6366F1',
  },
  {
    id: 4,
    title: '教育品牌 AI 认知重塑',
    subtitle: '从"无名机构"到"行业标杆"',
    industry: '在线教育',
    category: '教育',
    metric: '推荐率 +400%',
    beforeRate: 15,
    afterRate: 68,
    timeline: [
      { month: 'M1', rate: 15 },
      { month: 'M2', rate: 28 },
      { month: 'M3', rate: 42 },
      { month: 'M4', rate: 55 },
      { month: 'M5', rate: 62 },
      { month: 'M6', rate: 68 },
    ],
    challenge: '某在线教育品牌，在 AI 搜索中几乎被完全忽略。用户询问"最好的在线英语课程"时，AI 从不推荐该品牌。品牌急需建立 AI 认知，从"无名机构"变为"行业标杆"。',
    strategy: '系统性内容资产构建。围绕核心课程、师资力量、学员成果三大维度，构建结构化内容资产库，通过多平台持续输出，训练 AI 建立品牌与"优质在线教育"的强关联。',
    result: '6 个月内 AI 推荐率从 15% 提升至 68%，品牌自然咨询量增长 320%，获客成本降低 60%。',
    tags: ['教育', '内容资产', '认知重塑'],
    color: '#F59E0B',
  },
  {
    id: 5,
    title: '金融机构信任重建',
    subtitle: 'AI 时代的高端信任营销',
    industry: '财富管理',
    category: '金融',
    metric: '信任度 +350%',
    beforeRate: 20,
    afterRate: 75,
    timeline: [
      { month: 'M1', rate: 20 },
      { month: 'M2', rate: 35 },
      { month: 'M3', rate: 50 },
      { month: 'M4', rate: 62 },
      { month: 'M5', rate: 70 },
      { month: 'M6', rate: 75 },
    ],
    challenge: '某高端财富管理机构，面临客户对"AI 推荐"的高度依赖。高净值客户习惯通过 AI 进行机构背调和产品对比，品牌需要在 AI 认知中建立"专业、安全、值得信赖"的形象。',
    strategy: '多维度信任证据链。整合监管资质、行业奖项、客户案例、专家观点等多维度信任资产，构建 AI 可理解的"信任图谱"，确保在各类财富咨询场景中都被优先推荐。',
    result: 'AI 推荐率从 20% 跃升至 75%，高净值客户咨询转化率提升 180%，单客价值增长 45%。',
    tags: ['金融', '信任构建', '高净值'],
    color: '#EC4899',
  },
]

const commonStrategies = [
  {
    icon: Target,
    title: '语义定义权抢占',
    desc: '在 AI 认知中植入品牌的差异化标签，让 AI 在回答用户问题时，自动将品牌与核心场景关联',
  },
  {
    icon: Shield,
    title: '信任证据链构建',
    desc: '系统性地向 AI 投喂行业资质、权威背书、用户证言等高权重内容，构建不可辩驳的信任基础',
  },
  {
    icon: TrendingUp,
    title: '持续数据优化',
    desc: '通过实时监测品牌在各 AI 平台的表现，持续优化内容策略，确保推荐率稳步提升',
  },
  {
    icon: Zap,
    title: '多平台协同',
    desc: '覆盖 DeepSeek、文心一言、通义千问、豆包、Kimi 等主流 AI 平台，实现全平台品牌曝光',
  },
]

const stats = [
  { label: '服务品牌', value: '500+', icon: Briefcase },
  { label: '平均推荐率提升', value: '45%', icon: TrendingUp },
  { label: '覆盖平台', value: '15+', icon: Shield },
  { label: '客户满意度', value: '98%', icon: Star },
]

function CasePage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [expandedCase, setExpandedCase] = useState<number | null>(1)

  const filteredCases = activeCategory === '全部' ? cases : cases.filter(c => c.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
            <Briefcase className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 成功案例</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>真实客户案例，展示 GEO 优化带来的品牌增长</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Cards */}
      <div className="space-y-6">
        {filteredCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="rounded-xl border overflow-hidden transition-all duration-300 card-hover"
            style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}
          >
            <div className="h-1" style={{ backgroundColor: caseItem.color }} />
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {/* Top Info */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="tag text-xs" style={{ backgroundColor: `${caseItem.color}20`, color: caseItem.color }}>
                        {caseItem.industry}
                      </span>
                      <span className="tag text-xs" style={{ backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent)' }}>
                        {caseItem.metric}
                      </span>
                      {caseItem.tags.map(tag => (
                        <span key={tag} className="tag text-xs" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      {caseItem.title}
                    </h3>
                    <p className="text-base font-medium mb-4" style={{ color: caseItem.color }}>
                      {caseItem.subtitle}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>优化前</div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--color-text-secondary)' }}>{caseItem.beforeRate}%</div>
                      </div>
                      <div className="p-4 rounded-lg text-center" style={{ backgroundColor: `${caseItem.color}15` }}>
                        <div className="text-xs mb-1" style={{ color: caseItem.color }}>优化后</div>
                        <div className="text-2xl font-bold" style={{ color: caseItem.color }}>{caseItem.afterRate}%</div>
                      </div>
                      <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-accent)' }}>提升</div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>+{caseItem.afterRate - caseItem.beforeRate}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="w-full lg:w-80 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={caseItem.timeline}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                        <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} />
                        <YAxis stroke="var(--color-text-secondary)" fontSize={12} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--color-bg-surface)',
                            border: '1px solid var(--color-border-default)',
                            borderRadius: '8px',
                            color: 'var(--color-text-primary)',
                          }}
                        />
                        <Line type="monotone" dataKey="rate" name="推荐率(%)" stroke={caseItem.color} strokeWidth={3} dot={{ fill: caseItem.color, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Expandable Details */}
                <div>
                  <button
                    onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
                    className="flex items-center gap-2 text-sm font-medium mb-4"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <BarChart3 className="w-4 h-4" />
                    {expandedCase === caseItem.id ? '收起详情' : '查看完整案例'}
                  </button>

                  {expandedCase === caseItem.id && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-status-red)' }}>需求与挑战</div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{caseItem.challenge}</p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary)' }}>GEO 策略</div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{caseItem.strategy}</p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>核心成果</div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>{caseItem.result}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common Strategies */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>GEO 通用策略框架</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonStrategies.map((strategy, index) => {
            const Icon = strategy.icon
            return (
              <div key={index} className="p-6 rounded-xl border card-hover" style={{ backgroundColor: 'var(--color-bg-surface-light)', borderColor: 'var(--color-border-default)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h4 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{strategy.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{strategy.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="card text-center py-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          您的品牌也值得被 AI 看见
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          立即预约 GEO 策略咨询，获取专属品牌优化方案
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="btn-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            预约咨询
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            查看更多案例
          </button>
        </div>
      </div>
    </div>
  )
}

export default CasePage
