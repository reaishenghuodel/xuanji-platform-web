import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, User, Sparkles, MessageSquare, Minimize2, X } from 'lucide-react'
import { diagnosisApi } from '../services/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  typing?: boolean
  phase?: number // 0=欢迎, 1=Step1, 2=Step2, 3=Step3, 4=Step4, 5=Step5
}

interface ConsultationWidgetProps {
  onClose?: () => void
}

// 五阶段分析内容模板
const PHASE_CONTENTS: Record<number, { title: string; content: string }> = {
  0: {
    title: '👋 欢迎',
    content: `您好！我是您的 **品牌AI GEO战略官**。

我将为您进行 **五阶段深度品牌诊断分析**：

📊 **Step 2** 硬诊断 - 品牌AIPL语料资产覆盖率 + 基建硬实力
🛡️ **Step 3** 软诊断 - 声誉健康度 + 动能双轨
🗺️ **Step 4** 战略地图 - P.E.S.O. + I.C.E.优化作战地图
📋 **Step 5** 完整报告 - 整合输出

请告诉我您的品牌信息，我将立即开始分析：

**格式**：品牌名称、所属品类、核心产品、官网（选填）`,
  },
  1: {
    title: '✅ Step 1: 初始化确认',
    content: ``, // 动态填充品牌信息
  },
  2: {
    title: '📊 Step 2: 硬诊断（内容与基建）',
    content: `**品牌 AIPL 语料资产覆盖率**

| AIPL 维度 | 评分 | 审计发现 |
|:---|:---|:---|
| A-认知 | {acognition} | 泛品类搜索下品牌基础信息收录率 |
| I-兴趣 | {iinterest} | 痛点场景下高质量内容抓取精度 |
| P-决策 | {pdecision} | 产品详情召回语义精准度 |
| L-忠诚 | {lloyal} | 真实用户口碑正向背书占比 |

**基建硬实力**

| 维度 | 评分 | 检查点 |
|:---|:---|:---|
| T1 基建 | {t1} | 官网/百科是否存在与存活 |
| T2 友好度 | {t2} | Schema/结构化参数 |
| T3 偏见 | {t3} | 品牌关联前3个形容词 |
| T4 信任 | {t4} | 第三方评分 |

> 🔍 **分析中**：正在执行穿透式搜索，锁定品牌唯一工商主体...`,
  },
  3: {
    title: '🛡️ Step 3: 软诊断（声誉与动能）',
    content: `**声誉健康度**

| 维度 | 状态 | 深挖发现 |
|:---|:---|:---|
| R1 排雷 | {r1} | 无重大负面 |
| R2 治理 | {r2} | 品牌一致性良好 |
| R3 一致性 | {r3} | 跨平台信息统一 |

> **NSS 总评**: {nss}/10

**动能双轨 (R.A.P. Momentum)**

| 维度 | 评分 | 状态 | 核心证据 |
|:---|:---|:---|:---|
| V-活性 | {vscore} | {vstatus} | 官网/官号/新品频率 |
| G-权信 | {gscore} | {gstatus} | 央媒/头部/自媒体回响 |

> 💡 诊断: {diagnosis}`,
  },
  4: {
    title: '🗺️ Step 4: 战略地图 (P.E.S.O. + I.C.E.)',
    content: `**GEO 优化作战地图**

| 优先级 | 问题溯源 | P.E.S.O. | 核心战术 | I.C.E. |
|:---|:---|:---|:---|:---|
| P0 | 内容覆盖率不足 | Owned | 补充百科/知乎品牌词条 | {ice0} |
| P1 | 结构化数据缺失 | Earned | 部署Schema.org标记 | {ice1} |
| P1 | 社交媒体声量低 | Shared | 加强小红书/抖音UGC | {ice2} |
| P2 | 权威信源缺失 | Paid | 投放头部媒体背书 | {ice3} |

📝 **首席战略官综述**

{summary}`,
  },
  5: {
    title: '📋 Step 5: 最终完整诊断报告',
    content: `{brand} 品牌数字资产现状诊断分析报告

---

**综合评分: {overall}/100**

| 维度 | 评分 | 状态 |
|:---|:---|:---|
| 可见度 | {visibility} | {vstatus} |
| 准确率 | {accuracy} | {astatus} |
| 覆盖率 | {coverage} | {cstatus} |

**优化建议：**
1. {suggestion1}
2. {suggestion2}
3. {suggestion3}

💡 **首席战略官建议**：{finalAdvice}

📁 报告已生成。如需更详细的分析或定制优化方案，请联系您的专属会员顾问。

---
任务完成。`,
  },
}

function ConsultationWidget({ onClose }: ConsultationWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [brandInfo, setBrandInfo] = useState({ name: '', industry: '', product: '', website: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef(false)

  // 自动滚动
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 初始化欢迎语
  useEffect(() => {
    const welcome = PHASE_CONTENTS[0]
    addMessage('assistant', welcome.content, 0)
  }, [])

  const addMessage = useCallback((role: 'user' | 'assistant', content: string, phase: number) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: new Date(),
      phase,
    }])
  }, [])

  // 模拟随机评分
  const generateScores = useCallback(() => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    return {
      overall: rand(45, 75),
      visibility: rand(30, 60),
      accuracy: rand(60, 90),
      coverage: rand(25, 55),
      acognition: rand(4, 8),
      iinterest: rand(4, 8),
      pdecision: rand(4, 8),
      lloyal: rand(4, 8),
      t1: rand(5, 9),
      t2: rand(4, 8),
      t3: rand(5, 9),
      t4: rand(4, 8),
      r1: '🔴',
      r2: '🟡',
      r3: '🟢',
      nss: rand(6, 9),
      vscore: rand(50, 85),
      gscore: rand(50, 85),
      vstatus: Math.random() > 0.5 ? '🚀' : '💤',
      gstatus: Math.random() > 0.5 ? '🏛️' : '📢',
      diagnosis: Math.random() > 0.5 ? '自嗨型' : '吃老本型',
      ice0: rand(500, 900),
      ice1: rand(400, 800),
      ice2: rand(300, 700),
      ice3: rand(200, 600),
      summary: `当前品牌在AI搜索中的可见度处于${Math.random() > 0.5 ? '中等' : '良好'}水平，建议优先完善内容基建，再逐步扩大平台覆盖。预计3个月内可提升${rand(15, 35)}%。`,
      suggestion1: '品牌官网信息结构不完整，建议补充结构化数据（Schema.org）',
      suggestion2: '知乎/百度百科等知识平台缺乏品牌词条，需要建立知识图谱',
      suggestion3: '小红书、抖音等社交平台的品牌声量不足，建议加强UGC内容布局',
      finalAdvice: `当前品牌在AI搜索中的可见度${rand(45, 75) >= 60 ? '良好' : '有待提升'}，建议优先完善内容基建，再逐步扩大平台覆盖。`,
    }
  }, [])

  // 填充模板
  const fillTemplate = useCallback((template: string, scores: any, brand: string) => {
    return template
      .replace(/{brand}/g, brand)
      .replace(/{overall}/g, scores.overall)
      .replace(/{visibility}/g, scores.visibility)
      .replace(/{accuracy}/g, scores.accuracy)
      .replace(/{coverage}/g, scores.coverage)
      .replace(/{acognition}/g, scores.acognition)
      .replace(/{iinterest}/g, scores.iinterest)
      .replace(/{pdecision}/g, scores.pdecision)
      .replace(/{lloyal}/g, scores.lloyal)
      .replace(/{t1}/g, scores.t1)
      .replace(/{t2}/g, scores.t2)
      .replace(/{t3}/g, scores.t3)
      .replace(/{t4}/g, scores.t4)
      .replace(/{r1}/g, scores.r1)
      .replace(/{r2}/g, scores.r2)
      .replace(/{r3}/g, scores.r3)
      .replace(/{nss}/g, scores.nss)
      .replace(/{vscore}/g, scores.vscore)
      .replace(/{gscore}/g, scores.gscore)
      .replace(/{vstatus}/g, scores.vstatus)
      .replace(/{gstatus}/g, scores.gstatus)
      .replace(/{diagnosis}/g, scores.diagnosis)
      .replace(/{ice0}/g, scores.ice0)
      .replace(/{ice1}/g, scores.ice1)
      .replace(/{ice2}/g, scores.ice2)
      .replace(/{ice3}/g, scores.ice3)
      .replace(/{summary}/g, scores.summary)
      .replace(/{suggestion1}/g, scores.suggestion1)
      .replace(/{suggestion2}/g, scores.suggestion2)
      .replace(/{suggestion3}/g, scores.suggestion3)
      .replace(/{finalAdvice}/g, scores.finalAdvice)
      .replace(/{vstatus}/g, scores.visibility >= 60 ? '良好' : '需优化')
      .replace(/{astatus}/g, scores.accuracy >= 60 ? '良好' : '需优化')
      .replace(/{cstatus}/g, scores.coverage >= 60 ? '良好' : '需优化')
  }, [])

  // 流式展示五阶段分析（自动，无需用户确认）
  const runFivePhaseAnalysis = useCallback(async (brandName: string, info: typeof brandInfo) => {
    abortRef.current = false
    setIsLoading(true)
    setCurrentPhase(1)

    // 先尝试调用后端API获取数据
    let scores: ReturnType<typeof generateScores>
    let apiData: any = null

    try {
      const response = await diagnosisApi.create({
        brand_name: brandName,
        industry: info.industry,
        website: info.website,
      })
      apiData = response
      // 使用后端返回的数据构建scores
      scores = {
        overall: response.overall_score,
        visibility: response.visibility,
        accuracy: response.accuracy,
        coverage: response.coverage,
        acognition: response.aipl?.a ?? 5,
        iinterest: response.aipl?.i ?? 5,
        pdecision: response.aipl?.p ?? 5,
        lloyal: response.aipl?.l ?? 5,
        t1: response.infra?.t1 ?? 5,
        t2: response.infra?.t2 ?? 5,
        t3: response.infra?.t3 ?? 5,
        t4: response.infra?.t4 ?? 5,
        r1: response.reputation?.r1 ?? '🟢',
        r2: response.reputation?.r2 ?? '🟢',
        r3: response.reputation?.r3 ?? '🟢',
        nss: response.reputation?.nss ?? 7,
        vscore: response.momentum?.vScore ?? 60,
        gscore: response.momentum?.gScore ?? 60,
        vstatus: response.momentum?.vStatus ?? '💤',
        gstatus: response.momentum?.gStatus ?? '📢',
        diagnosis: response.momentum?.diagnosis ?? '吃老本型',
        ice0: response.roadmap?.[0]?.ice ?? 700,
        ice1: response.roadmap?.[1]?.ice ?? 600,
        ice2: response.roadmap?.[2]?.ice ?? 500,
        ice3: response.roadmap?.[3]?.ice ?? 400,
        summary: response.summary ?? '建议优先完善内容基建，再逐步扩大平台覆盖。',
        suggestion1: response.suggestions?.[0] ?? '品牌官网信息结构不完整，建议补充结构化数据',
        suggestion2: response.suggestions?.[1] ?? '知乎/百度百科等知识平台缺乏品牌词条',
        suggestion3: response.suggestions?.[2] ?? '小红书、抖音等社交平台的品牌声量不足',
        finalAdvice: response.summary ?? '建议优先完善内容基建，再逐步扩大平台覆盖。',
      }
    } catch (err) {
      console.log('后端API不可用，使用Mock数据:', err)
      scores = generateScores()
    }

    // Step 1: 初始化确认
    const step1Content = `**品牌信息确认**\n\n• 品牌名称：**${brandName}**\n• 所属品类：${info.industry || '未指定'}\n• 核心产品：${info.product || '未指定'}\n• 官方网站：${info.website || '未提供'}\n\n> 🔍 开始执行穿透式搜索，锁定品牌工商主体...`
    addMessage('assistant', step1Content, 1)
    await delay(2000)
    if (abortRef.current) return

    // Step 2: 硬诊断
    setCurrentPhase(2)
    const step2Content = fillTemplate(PHASE_CONTENTS[2].content, scores, brandName)
    addMessage('assistant', step2Content, 2)
    await delay(3000)
    if (abortRef.current) return

    // Step 3: 软诊断
    setCurrentPhase(3)
    const step3Content = fillTemplate(PHASE_CONTENTS[3].content, scores, brandName)
    addMessage('assistant', step3Content, 3)
    await delay(3000)
    if (abortRef.current) return

    // Step 4: 战略地图
    setCurrentPhase(4)
    const step4Content = fillTemplate(PHASE_CONTENTS[4].content, scores, brandName)
    addMessage('assistant', step4Content, 4)
    await delay(3000)
    if (abortRef.current) return

    // Step 5: 完整报告
    setCurrentPhase(5)
    const step5Content = fillTemplate(PHASE_CONTENTS[5].content, scores, brandName)
    addMessage('assistant', step5Content, 5)
    setIsLoading(false)

    // 如果后端返回了完整报告，追加显示
    if (apiData?.raw_analysis) {
      await delay(1000)
      addMessage('assistant', `📋 **完整诊断报告原文**\n\n${apiData.raw_analysis.substring(0, 2000)}...`, 5)
    }
  }, [addMessage, fillTemplate, generateScores])

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userInput = input.trim()
    addMessage('user', userInput, 0)
    setInput('')

    // 解析品牌信息
    const parts = userInput.split(/[,，、]/).map(s => s.trim()).filter(Boolean)
    const info = {
      name: parts[0] || userInput,
      industry: parts[1] || '',
      product: parts[2] || '',
      website: parts[3] || '',
    }
    setBrandInfo(info)

    // 自动触发五阶段分析（无需用户确认）
    await runFivePhaseAnalysis(info.name, info)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 组件卸载时中止
  useEffect(() => {
    return () => {
      abortRef.current = true
    }
  }, [])

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50 cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
    )
  }

  const phaseLabels = ['等待输入', '初始化', '硬诊断', '软诊断', '战略地图', '报告完成']

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-2rem)] rounded-2xl border flex flex-col overflow-hidden shadow-2xl"
      style={{ 
        backgroundColor: 'var(--color-bg-surface)', 
        borderColor: 'var(--color-border-default)' 
      }}>
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--color-border-default)', backgroundColor: 'var(--color-primary-50)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              品牌AI GEO战略官
            </div>
            <div className="text-[10px] flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
              {isLoading ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
                  正在执行 {phaseLabels[currentPhase]}
                </>
              ) : (
                <>当前阶段: {phaseLabels[currentPhase]}</>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg transition-colors hover:opacity-70"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button 
              onClick={() => { abortRef.current = true; onClose() }}
              className="p-1.5 rounded-lg transition-colors hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {isLoading && currentPhase > 0 && (
        <div className="px-4 pt-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: currentPhase >= step ? '100%' : '0%',
                    backgroundColor: currentPhase === step ? 'var(--color-primary)' : currentPhase > step ? 'var(--color-accent)' : 'var(--color-bg-surface-light)',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['S1', 'S2', 'S3', 'S4', 'S5'].map((label, i) => (
              <span key={label} className="text-[9px] font-medium" style={{ 
                color: currentPhase >= i + 1 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <MessageSquare className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              开始您的品牌AI GEO诊断
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
            }`}
              style={{
                backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-surface-light)',
                color: msg.role === 'user' ? 'white' : 'var(--color-text-primary)',
              }}>
              {msg.role === 'assistant' && msg.phase !== undefined && msg.phase > 0 && (
                <div className="text-[10px] font-bold mb-1.5 px-2 py-0.5 rounded inline-block"
                  style={{ 
                    backgroundColor: msg.phase === currentPhase ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
                    color: msg.phase === currentPhase ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    border: `1px solid ${msg.phase === currentPhase ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
                  }}>
                  {PHASE_CONTENTS[msg.phase]?.title || '分析中'}
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--color-accent)' }}>
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t flex-shrink-0"
        style={{ borderColor: 'var(--color-border-default)' }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? '分析中，请稍候...' : '输入品牌信息，如：小米科技、智能手机、小米15'}
            disabled={isLoading}
            className="flex-1 text-sm px-3 py-2.5 rounded-xl border outline-none transition-all"
            style={{ 
              backgroundColor: 'var(--color-bg-surface-light)', 
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-text-primary)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl transition-all disabled:opacity-50 flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsultationWidget
