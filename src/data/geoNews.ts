// GEO行业资讯数据文件 - 由定时任务自动更新
// 每天凌晨自动搜索GEO行业最新动态并追加

export interface GeoNewsItem {
  id: number
  title: string
  summary: string
  content: string
  source: string
  date: string
  tags: string[]
}

// GEO行业资讯列表（按日期倒序，最新的在前面）
export const geoNewsItems: GeoNewsItem[] = [
  {
    id: 1,
    title: '2026年AI搜索GEO优化平台选型指南发布，行业进入精细化运营阶段',
    summary: '凤凰网发布2026年GEO优化平台选型指南，指出全球超65%消费者决策前优先用AI工具获取建议，传统搜索引擎使用量同比下降25%，GEO已成为品牌数字营销的必选项。',
    content: `凤凰网于2026年发布AI搜索GEO优化平台选型指南，深度解析行业现状。

核心数据：
1. 全球超65%消费者决策前优先使用AI工具获取建议
2. 传统搜索引擎使用量同比下降25%
3. GEO服务商技术路线分为Schema标记派、语义优化派和全链路派三大阵营
4. 企业GEO投入平均占数字营销预算的18%，较去年增长8个百分点

选型建议：
- 中小企业优先选择SaaS化GEO平台，降低技术门槛
- 大型企业建议构建自研+外包混合GEO体系
- 跨境品牌需重点关注多语言GEO能力
- 数据可量化是选型核心标准，需支持AI引用率、品牌提及率等指标追踪`,
    source: '凤凰网',
    date: '2026-09-22',
    tags: ['GEO', 'AI搜索', '平台选型', '数字营销'],
  },
  {
    id: 2,
    title: '出海品牌GEO需求激增，ChatGPT与DeepSeek成品牌曝光新阵地',
    summary: '界面新闻报道，越来越多出海品牌和全球化企业开始寻找专业GEO服务商，系统性提升品牌在ChatGPT、DeepSeek、Perplexity等AI平台的曝光频次和引用质量。',
    content: `据界面新闻2026年6月报道，品牌GEO服务市场正在快速增长。

市场趋势：
1. 出海品牌GEO需求同比增长300%，成为数字营销新增长极
2. ChatGPT、DeepSeek、Perplexity三大平台占据品牌AI搜索85%以上份额
3. 品牌在AI平台的"被提及率"正成为新的营销KPI
4. GEO服务商竞争格局初步形成，头部效应显现

企业行动：
- 快消、3C、汽车等行业率先布局GEO
- 品牌开始建立AI搜索舆情监测体系
- 内容结构化和知识图谱建设成为GEO基础设施
- 多平台一致性管理成为品牌GEO新挑战`,
    source: '界面新闻',
    date: '2026-09-22',
    tags: ['GEO', '品牌出海', 'ChatGPT', 'DeepSeek', 'Perplexity'],
  },
  {
    id: 3,
    title: 'Gartner预测：2026年底40%企业应用将嵌入AI智能体',
    summary: 'Gartner预测到2026年底全球40%的企业应用将嵌入AI智能体，AI正从"辅助工具"向"数字员工"演进，国内AI Agent市场上半年营收约205亿元。',
    content: `据凤凰网科技2026年6月报道，Gartner发布最新预测，AI智能体正在加速企业级落地。

核心数据：
1. 到2026年底，全球40%的企业应用将嵌入AI智能体
2. 国内AI Agent市场上半年营收约205亿元，同比增速达107%
3. 客服、文档生成、采购、风控、财务审批是主要落地场景
4. 字节跳动、阿里巴巴、腾讯领跑国内AI Agent市场

行业趋势：
- AI正从"辅助工具"向"数字员工"全面演进
- 多智能体协作系统正在取代单点AI方案
- 企业AI Agent平台投入较2025年增长150%
- 供应链管理成为AI Agent落地的标杆领域`,
    source: '凤凰网科技',
    date: '2026-09-22',
    tags: ['AI智能体', 'Gartner', '企业应用', '数字员工'],
  },
]