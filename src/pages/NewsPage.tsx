import { useState } from 'react'
import { Newspaper, MessageCircle, Calendar, ChevronDown, ChevronUp, ExternalLink, Sparkles } from 'lucide-react'
import { wechatArticles } from '../data/wechatArticles'
import type { WechatArticle } from '../data/wechatArticles'
import { geoNewsItems } from '../data/geoNews'
import type { GeoNewsItem } from '../data/geoNews'

function WechatCard({ article }: { article: WechatArticle }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card hover:border-sky-500/40 transition-colors">
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 text-xs font-medium">
            <MessageCircle className="w-3 h-3" />
            公众号精选
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          {article.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)' }}>{tag}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{article.title}</h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{article.summary}</p>
        <div className="mt-3 flex items-center text-sky-400 text-sm font-medium">
          {expanded ? <><ChevronUp className="w-4 h-4 mr-1" />收起</> : <><ChevronDown className="w-4 h-4 mr-1" />阅读全文</>}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5">
          {article.cover && (
            <img src={article.cover} alt={article.title} className="w-full max-h-96 object-cover rounded-lg mb-5" loading="lazy" />
          )}
          <div
            className="text-sm leading-7 whitespace-pre-line"
            style={{ color: 'var(--color-text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
            {article.wechatUrl ? (
              <a
                href={article.wechatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                阅读公众号原文
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)' }}>
                <MessageCircle className="w-4 h-4" />
                本文首发于微信公众号【盛世天宜AI研究院】，搜索关注阅读更多内容
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function GeoNewsCard({ item }: { item: GeoNewsItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card hover:border-indigo-500/40 transition-colors">
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            GEO讯息
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.source}</span>
        </div>
        <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{item.summary}</p>
        <div className="mt-3 flex items-center text-indigo-400 text-sm font-medium">
          {expanded ? <><ChevronUp className="w-4 h-4 mr-1" />收起</> : <><ChevronDown className="w-4 h-4 mr-1" />查看详情</>}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5">
          <div
            className="text-sm leading-7 whitespace-pre-line"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {item.content}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags?.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--color-bg-surface-light)', color: 'var(--color-text-secondary)' }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* 顶部导航 */}
      <header className="border-b" style={{ borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-sky-400" />
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>璇玑智科 · 资讯中心</span>
          </a>
          <a href="#/" className="text-sm hover:text-sky-400 transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
            返回首页
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>资讯中心</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            GEO 行业动态与「盛世天宜AI研究院」公众号深度原创文章
          </p>
        </div>

        {/* 公众号精选 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <MessageCircle className="w-5 h-5 text-sky-400" />
            公众号精选
          </h2>
          <div className="space-y-4">
            {wechatArticles.length === 0 ? (
              <div className="card p-8 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                文章同步中，敬请期待
              </div>
            ) : (
              wechatArticles.map(article => <WechatCard key={article.id} article={article} />)
            )}
          </div>
        </section>

        {/* GEO行业资讯 */}
        <section>
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Sparkles className="w-5 h-5 text-indigo-400" />
            GEO 行业讯息
          </h2>
          <div className="space-y-4">
            {geoNewsItems.slice(0, 20).map(item => <GeoNewsCard key={item.id} item={item} />)}
          </div>
        </section>
      </main>

      <footer className="border-t py-8" style={{ borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          © {new Date().getFullYear()} 璇玑智科 · 内容由「盛世天宜AI研究院」公众号自动同步
        </div>
      </footer>
    </div>
  )
}
