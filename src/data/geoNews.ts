export interface GeoNewsItem {
  id: number
  title: string
  summary: string
  content: string
  source?: string
  date: string
  tags: string[]
}

export const geoNews: GeoNewsItem[] = [

  {
    id: 1,
    title: 'GEO行业进入快速洗牌+高速爆发叠加期，AI APP月活突破4.4亿',
    summary: '亦莘咨询发布GEO行业研究报告，315曝光"投毒式GEO"后行业迎来规范化转折，信通院发布权威评测标准。',
    content: `亦莘咨询发布《GEO行业现状与趋势研究报告》，全面梳理行业发展格局。

核心数据：
- AI APP月活用户突破4.4亿，豆包单季增加1亿用户
- 2026年315晚会曝光"投毒式GEO"后行业迎来重大转折
- 中国信通院发布GEO服务可信基本要求标准（YD/T3980-2026）
- 蓝色光标、科大讯飞、三六零等上市公司纷纷布局GEO

行业判断：GEO已从"要不要做"转变为"选哪家做"，合规经营将成为差异化竞争壁垒。头部GEO服务商格局初步形成，但尚未固化，效果可量化是客户选择服务商的首要标准。`,
    source: '亦莘咨询',
    date: '2026-07-20',
    tags: ['GEO', '行业报告', 'AI搜索', '规范化', '市场格局'],
  },
  {
    id: 2,
    title: '五大AI搜索平台引用机制深度对比：GEO必须差异化适配',
    summary: 'Perplexity/ChatGPT/DeepSeek/Kimi/文心一言技术路线分化，使用Schema.org标记的页面引用率平均提升47%。',
    content: `2026年AI搜索生态呈现多极分化格局，五大平台各有独特的引用机制和内容偏好：

Perplexity：实时检索+权威引用，月活突破1.2亿，偏好结构化对比内容和可验证数据
ChatGPT：对话式深挖，周活突破9亿，偏好权威性高、逻辑严密的深度内容
DeepSeek：深度推理链+实时检索，擅长处理对比型复杂查询
Kimi：200万token上下文窗口，偏好完整长文档和白皮书
文心一言：百度生态闭环，中文商业查询市场份额28%

关键发现：
- 使用Schema.org标记的页面在所有平台上的引用率平均提升47%
- 72小时内发布的内容享有明显时效性加权
- 能独立回答用户问题全部要义的语义完整性内容引用概率最高

企业应"分兵布阵"而非"选边站"，针对每个平台的引用偏好制定差异化内容策略。`,
    source: '互联在线',
    date: '2026-07-19',
    tags: ['GEO', 'AI搜索', '多平台策略', 'Schema.org', '引用机制'],
  },
  {
    id: 3,
    title: 'GEO从论文到工程：火山引擎解析完整算法体系，AutoGEO可见度提升超50%',
    summary: '火山引擎开发者社区系统拆解GEO技术栈，涵盖普林斯顿9种方法和CMU AutoGEO自动化方案。',
    content: `火山引擎开发者社区发布GEO完整技术栈解析。

核心发现：
- 普林斯顿大学GEO论文定义9种优化方法，Cite Sources提升可见度42.6%
- CMU AutoGEO（ICLR 2026）自动化方案比最强baseline提升50.99%
- 跨引擎规则迁移有效，Gemini规则在GPT/Claude上重叠率78-84%
- 低排名网站受益最大，排名第5的网站可见度提升115%

GEO已从学术概念进入工程落地阶段。`,
    source: '火山引擎开发者社区',
    date: '2026-07-19',
    tags: ['GEO', '算法', 'AutoGEO', '技术前沿'],
  },
  {
    id: 4,
    title: '品牌多平台AI可见性成必修课：ChatGPT周活9亿、Perplexity年营收增335%',
    summary: 'AI搜索平台用户规模爆发，品牌需制定差异化GEO策略覆盖多平台。',
    content: `2026年AI搜索平台呈现爆发式增长。

关键数据：
- ChatGPT周活突破9亿，较2025年增长125%
- Perplexity月活超1亿，年营收增长335%
- DeepSeek全球热搜榜首
- 豆包月活近6000万

差异化GEO策略：Perplexity偏好实时性内容，ChatGPT偏好权威深度内容，Gemini依赖Schema标记，DeepSeek偏好中文专业内容。`,
    source: '加搜TideFlow',
    date: '2026-07-19',
    tags: ['AI搜索', '品牌可见性', 'GEO策略'],
  },
  {
    id: 5,
    title: '2026企业AI Agent规模化元年：79%企业已部署，MCP协议成行业标准',
    summary: '全球79%组织已启动Agent部署，市场规模达187亿美元。',
    content: `2026年被公认为AI Agent规模化落地元年。

核心数据：
- 全球79%组织已启动AI Agent部署
- 市场规模飙升至187亿美元
- MCP协议成为Agent生态行业标准
- 任务成功率从68%提升至89%

五大落地场景：软件研发自动化、智能客服、金融风控、数据治理、营销洞察。`,
    source: 'QubitTool',
    date: '2026-07-19',
    tags: ['AI Agent', '企业应用', 'MCP协议'],
  },
]
