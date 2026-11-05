// 公众号文章数据文件 - 由公众号机器人自动同步
// 每次公众号发文后自动将全文推送到这里（数组顶部追加，最新在前）

export interface WechatArticle {
  id: string
  title: string
  summary: string
  date: string
  cover?: string
  content: string
  wechatUrl?: string
  tags?: string[]
}

// 公众号文章列表（按时间倒序，最新的在前面）
export const wechatArticles: WechatArticle[] = [
]
