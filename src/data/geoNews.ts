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
    id: 2,
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
    id: 3,
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
