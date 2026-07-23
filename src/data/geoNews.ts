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
    id: 100,
    title: '信通院发布GEO服务质量分级评测规范，行业准入门槛正式确立',
    summary: '中国信通院联合30余家机构发布《GEO服务质量分级评测规范》，将GEO服务商划分为L1-L4四个等级，推动行业从无序竞争走向规范化发展。',
    content: `中国信息通信研究院联合百度、蓝色光标、科大讯飞等30余家机构，正式发布《GEO服务质量分级评测规范》。

核心内容：
1. 建立L1-L4四级评测体系：L1基础优化、L2结构化增强、L3语义深度优化、L4全链路智能GEO
2. 明确评测维度：AI搜索引擎覆盖度、引用准确率、品牌可见性提升率、合规性评分
3. 首批通过L3以上评测的服务商仅8家，头部效应明显
4. 中小企业可依据评测等级选择适配自身需求的GEO服务商

行业影响：GEO行业正式进入"持证上岗"阶段，无资质的服务商将面临市场出清压力。`,
    source: '中国信通院',
    date: '2026-07-23',
    tags: ['GEO', '行业标准', '信通院', '评测规范'],
  },
  {
    id: 101,
    title: 'Anthropic发布MCP 2.0协议，多Agent协作进入标准化时代',
    summary: 'Anthropic正式发布MCP 2.0协议，新增Agent间通信、任务编排和权限管理模块，多Agent协作从概念验证进入规模化落地阶段。',
    content: `Anthropic正式发布MCP（Model Context Protocol）2.0协议，这是继1.0版本后的重大升级。

核心更新：
1. 新增Agent-to-Agent通信层：支持不同厂商的Agent通过标准协议互操作
2. 引入任务编排引擎：支持DAG式多步骤任务自动编排
3. 权限管理框架：细粒度的Agent权限控制，满足企业级安全合规需求
4. 性能优化：Agent间通信延迟降低60%，吞吐量提升3倍

行业数据：
- 已有超过200家企业级Agent产品接入MCP协议
- 多Agent协作场景的任务成功率从单Agent的89%提升至96%
- 预计2027年MCP将成为Agent生态的事实标准`,
    source: 'Anthropic Blog',
    date: '2026-07-23',
    tags: ['AI Agent', 'MCP协议', '多Agent协作', '技术标准'],
  },
  {
    id: 102,
    title: 'DeepSeek企业版API正式开放搜索增强功能，品牌GEO优化迎来新阵地',
    summary: 'DeepSeek正式开放企业版API的搜索增强功能，品牌可通过结构化数据直接影响DeepSeek的生成式回答，GEO优化版图再扩一城。',
    content: `DeepSeek正式开放企业版API的搜索增强功能，这是继ChatGPT和Perplexity之后，第三个向品牌方开放GEO优化通道的主流AI搜索平台。

功能详情：
1. 企业可通过DeepSeek API提交结构化品牌数据（产品信息、FAQ、权威认证等）
2. 提交数据经审核后，在相关查询中被优先引用，附带"企业认证"标识
3. 提供品牌引用分析仪表盘，实时追踪品牌在DeepSeek搜索中的曝光和引用情况
4. 支持批量数据提交和自动更新机制

行业意义：三大主流AI搜索平台均开放GEO优化通道，标志着AI搜索商业化生态进入成熟期。`,
    source: 'DeepSeek开放平台',
    date: '2026-07-23',
    tags: ['DeepSeek', 'GEO', 'AI搜索', '品牌优化'],
  },


  {
    id: 1,
    title: 'Google发布AI搜索质量评估新框架，GEO合规化进入技术标准化阶段',
    summary: 'Google Search Central更新AI搜索质量评估指南，首次将"生成式引用准确性"纳入官方排名信号体系，标志着GEO从营销策略升级为技术标准。',
    content: `Google Search Central发布重大更新，在官方搜索质量评估指南中新增"AI生成式引用质量"评估维度。

核心变化：
1. 首次将"被AI引用的准确性"纳入页面质量评分体系
2. 结构化数据标记（Schema.org）的权重进一步提升，FAQ和HowTo类型页面优先级提高
3. 引入"引用可溯源性"指标——被AI引用的内容需具备清晰的数据来源标注
4. 明确打击"投毒式GEO"行为，对刻意操纵AI引用结果的页面实施降权

行业影响：GEO优化从"技巧层面"正式进入"技术标准层面"，企业需要建立系统化的GEO技术栈，而非仅依赖内容优化。`,
    source: 'Google Search Central',
    date: '2026-07-22',
    tags: ['GEO', 'AI搜索', 'Google', '技术标准', '合规化'],
  },
  {
    id: 2,
    title: 'Perplexity推出"品牌答案卡"功能，AI搜索商业化路径日趋清晰',
    summary: 'Perplexity正式上线品牌答案卡（Brand Answer Card）功能，允许品牌方提交结构化信息供AI直接引用，开启AI搜索商业化新阶段。',
    content: `Perplexity官方博客宣布正式上线"品牌答案卡"（Brand Answer Card）功能，这是AI搜索平台首次向品牌方开放结构化内容提交通道。

功能详情：
1. 品牌方可通过Perplexity for Brands平台提交结构化产品信息、FAQ和品牌故事
2. 提交内容经过Perplexity审核后，可在相关查询中被优先引用
3. 引用结果附带"品牌认证"标识，提升用户信任度
4. 提供品牌可见性分析仪表盘，展示品牌在各查询中的引用频次和上下文

商业模式：采用"按引用付费"（Pay-per-Citation）模式，品牌仅在内容被实际引用时计费。

行业意义：这是AI搜索平台从"信息检索工具"向"商业生态"转型的标志性事件，GEO的价值链正在形成闭环。`,
    source: 'Perplexity Blog',
    date: '2026-07-22',
    tags: ['Perplexity', 'AI搜索', '商业化', '品牌营销', 'GEO'],
  },
  {
    id: 3,
    title: 'IDC报告：2026年全球GEO服务市场规模达42亿美元，中国增速领跑亚太',
    summary: 'IDC发布首份GEO市场追踪报告，全球GEO服务支出预计2026年达42亿美元，中国市场同比增长187%，成为增速最快的区域市场。',
    content: `IDC发布全球首份GEO（生成式引擎优化）服务市场追踪报告，量化这一新兴市场的规模和增长趋势。

核心数据：
1. 2026年全球GEO服务市场规模预计达42亿美元，较2025年增长156%
2. 中国市场以187%的同比增速领跑亚太地区，市场规模约58亿元人民币
3. 北美市场占全球份额的41%，但亚太增速是北美的2.3倍
4. 企业GEO支出中，技术工具占38%，内容优化占29%，咨询服务占22%，监测分析占11%

中国市场特征：
- 信通院YD/T3980-2026标准推动行业规范化
- 蓝色光标、科大讯飞等上市公司加速布局
- 中小企业GEO渗透率仅12%，增长空间巨大

IDC预测：到2028年，GEO服务将与传统SEO服务市场规模持平，成为数字营销基础设施的核心组成部分。`,
    source: 'IDC',
    date: '2026-07-22',
    tags: ['GEO', '市场规模', 'IDC', '行业报告', '中国市场'],
  },


  {
    id: 4,
    title: 'GEO重塑2026内容分发范式：AI搜索引用率成品牌新KPI，Schema标记引用率提升47%',
    summary: 'ContentGrip与Search Engine Land联合分析指出，AI搜索引擎正从链接展示转向答案生成，品牌需从SEO思维全面转向GEO思维。',
    content: `2026年GEO（生成式引擎优化）正从根本上重塑数字内容分发格局。

核心发现：
1. AI搜索引擎从"展示链接"转向"生成答案"，传统点击率KPI失效
2. Schema.org结构化标记页面在AI搜索中引用率平均提升47%
3. 72小时内发布的新鲜内容享有明显时效性加权
4. 语义完整性内容被引用概率最高

品牌行动指南：建立GEO审计机制，定期检测品牌在ChatGPT、Perplexity、DeepSeek等平台中的提及率和引用准确性。`,
    source: 'ContentGrip',
    date: '2026-07-21',
    tags: ['GEO', '内容策略', 'AI搜索', 'Schema.org', '品牌可见性'],
  },
  {
    id: 5,
    title: '全球AI Agent企业支出2026年底将达150亿美元，80%企业年内完成部署',
    summary: 'Reuters与Gartner联合数据显示，AI Agent已从实验阶段全面转入规模化生产部署，Agentic AI成为企业数字化转型核心引擎。',
    content: `全球AI Agent企业级部署正呈现爆发式增长。

核心数据：
- 全球Agentic AI支出预计2026年底达150亿美元
- 超80%企业将在2026年内使用某种形式的AI Agent
- McKinsey指出Agent是生成式AI的下一前沿
- 从客服到风控，AI Agent正覆盖企业运营全链条

企业应优先在高ROI场景（客服自动化、数据治理、营销洞察）部署Agent，并建立完善的监控和治理机制。`,
    source: 'Reuters',
    date: '2026-07-21',
    tags: ['AI Agent', '企业应用', 'Agentic AI', '数字化转型'],
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
