import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RefreshCw, Download, TrendingUp, TrendingDown, Wifi, WifiOff,
  Search, ChevronDown, ChevronRight, BarChart3, Activity, Zap,
  FileText, Target, AlertTriangle, Settings, ArrowRight, ArrowUpRight,
  Eye, Calendar, Clock, Star, Gauge, Database, BookOpen
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts'
// ── Types ──────────────────────────────────────────────────────────────────────

type DateRange = '7d' | '30d' | '90d'
type KeywordSort = 'mentions' | 'rate' | 'trend'
type TrendMetric = 'rate' | 'mentions'

interface KeywordRow {
  keyword: string
  mentions: number
  rate: number
  trend: 'up' | 'down' | 'stable'
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const trendData = [
  { date: '06-01', rate: 62.1, mentions: 9200 },
  { date: '06-05', rate: 63.8, mentions: 10100 },
  { date: '06-09', rate: 65.2, mentions: 10800 },
  { date: '06-13', rate: 64.7, mentions: 10500 },
  { date: '06-17', rate: 66.3, mentions: 11200 },
  { date: '06-21', rate: 67.1, mentions: 11800 },
  { date: '06-25', rate: 67.8, mentions: 12300 },
  { date: '06-29', rate: 68.5, mentions: 12847 },
]

const platforms = [
  { name: 'DeepSeek', online: true, latency: 120 },
  { name: '文心一言', online: true, latency: 85 },
  { name: '通义千问', online: true, latency: 142 },
  { name: '豆包', online: true, latency: 98 },
  { name: 'Kimi', online: false, latency: 0 },
]

const keywords: KeywordRow[] = [
  { keyword: 'AI搜索优化', mentions: 3420, rate: 82.3, trend: 'up' },
  { keyword: 'GEO优化方案', mentions: 2876, rate: 76.8, trend: 'up' },
  { keyword: '智能内容生成', mentions: 2145, rate: 71.2, trend: 'up' },
  { keyword: '品牌AI监测', mentions: 1987, rate: 68.5, trend: 'stable' },
  { keyword: '结构化数据优化', mentions: 1654, rate: 63.1, trend: 'up' },
  { keyword: 'AI推荐引擎', mentions: 1432, rate: 58.7, trend: 'down' },
  { keyword: '语义搜索技术', mentions: 1210, rate: 54.3, trend: 'up' },
  { keyword: '内容质量评估', mentions: 987, rate: 49.6, trend: 'stable' },
]

const scenarioData = [
  { name: '产品介绍', value: 85 },
  { name: '技术方案', value: 72 },
  { name: '行业报告', value: 68 },
  { name: '使用教程', value: 61 },
  { name: '客户案例', value: 54 },
  { name: '品牌故事', value: 47 },
]

const contentCalendar = [
  { date: '06-30', title: 'GEO优化白皮书发布', status: '待发布' as const },
  { date: '07-02', title: 'AI搜索趋势分析', status: '草稿' as const },
  { date: '07-05', title: '产品功能更新说明', status: '待发布' as const },
  { date: '07-08', title: 'Q2品牌监测报告', status: '草稿' as const },
]

const activities = [
  { icon: Zap, text: 'AI内容生成完成：GEO优化指南', time: '5分钟前', color: 'var(--color-primary)' },
  { icon: Target, text: '品牌关键词排名更新', time: '12分钟前', color: 'var(--color-accent)' },
  { icon: AlertTriangle, text: '豆包平台监测异常告警', time: '28分钟前', color: 'var(--color-status-red)' },
  { icon: FileText, text: '诊断报告已生成', time: '1小时前', color: 'var(--color-secondary)' },
  { icon: Star, text: 'AI推荐率突破68%', time: '2小时前', color: 'var(--color-status-green)' },
  { icon: Database, text: '结构化数据同步完成', time: '3小时前', color: 'var(--color-primary)' },
]

const quickActions = [
  { icon: FileText, label: '生成诊断报告', path: '/diagnosis' },
  { icon: Target, label: 'AI智能拓词', path: '/keywords' },
  { icon: BookOpen, label: '创建AI内容', path: '/content' },
  { icon: Eye, label: '品牌监测', path: '/monitor' },
  { icon: AlertTriangle, label: '查看告警', path: '/alerts' },
  { icon: Settings, label: '系统设置', path: '/settings' },
]

// ── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: '已发布' | '待发布' | '草稿' }) {
  const colors: Record<string, { bg: string; text: string }> = {
    '已发布': { bg: 'rgba(16,185,129,0.15)', text: 'var(--color-status-green)' },
    '待发布': { bg: 'rgba(14,165,233,0.15)', text: 'var(--color-primary)' },
    '草稿': { bg: 'rgba(148,163,184,0.15)', text: 'var(--color-text-secondary)' },
  }
  const c = colors[status]
  return (
    <span
      style={{
        padding: '2px 10px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 500,
        background: c.bg,
        color: c.text,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 8,
        padding: '8px 12px',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', margin: 0 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color, fontSize: '0.875rem', margin: '4px 0 0' }}>
          {p.name === 'rate' ? '推荐率' : '提及量'}: {p.value}{p.name === 'rate' ? '%' : ''}
        </p>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()

  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const [trendMetric, setTrendMetric] = useState<TrendMetric>('rate')
  const [keywordSort, setKeywordSort] = useState<KeywordSort>('mentions')
  const [keywordFilter, setKeywordFilter] = useState('')

  const dateRanges: { key: DateRange; label: string }[] = [
    { key: '7d', label: '近7天' },
    { key: '30d', label: '近30天' },
    { key: '90d', label: '近90天' },
  ]

  const filteredKeywords = useMemo(() => {
    let list = keywords.filter((k) =>
      keywordFilter ? k.keyword.includes(keywordFilter) : true
    )
    if (keywordSort === 'mentions') list.sort((a, b) => b.mentions - a.mentions)
    else if (keywordSort === 'rate') list.sort((a, b) => b.rate - a.rate)
    else if (keywordSort === 'trend') {
      const order = { up: 3, stable: 2, down: 1 }
      list.sort((a, b) => order[b.trend] - order[a.trend])
    }
    return list
  }, [keywordSort, keywordFilter])

  const surfaceCard: React.CSSProperties = {
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 12,
    padding: 20,
  }

  return (
    <div className="fade-in-up" style={{ padding: 24, maxWidth: 1440, margin: '0 auto' }}>

      {/* ── 1. Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
          数据概览
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--color-bg-surface)', borderRadius: 8, border: '1px solid var(--color-border-default)', overflow: 'hidden' }}>
            {dateRanges.map((r) => (
              <button
                key={r.key}
                onClick={() => setDateRange(r.key)}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: dateRange === r.key ? 'var(--color-primary)' : 'transparent',
                  color: dateRange === r.key ? '#fff' : 'var(--color-text-secondary)',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: '0.8125rem', borderRadius: 8,
              border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface)',
              color: 'var(--color-text-primary)', cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} /> 刷新
          </button>
          <button
            className="btn-gradient"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', fontSize: '0.8125rem', borderRadius: 8,
              border: 'none', color: '#fff', cursor: 'pointer',
            }}
          >
            <Download size={14} /> 导出报告
          </button>
        </div>
      </div>

      {/* ── 2. KPI Cards ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'AI推荐率', value: '68.5%', change: '+12.3%', icon: Gauge, path: '/monitor', positive: true },
          { label: '品牌提及量', value: '12,847', change: '+34.2%', icon: Activity, path: '/monitor', positive: true },
          { label: '监测平台数', value: '8', change: '全部在线', icon: Wifi, path: '/settings', positive: true },
          { label: '内容产出', value: '156', change: '+28篇', icon: FileText, path: '/content', positive: true },
        ].map((kpi) => (
          <div
            key={kpi.label}
            onClick={() => navigate(kpi.path)}
            className="card"
            style={{
              ...surfaceCard,
              cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-default)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{kpi.label}</span>
              <kpi.icon size={20} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>
              {kpi.value}
            </div>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: kpi.positive ? 'var(--color-status-green)' : 'var(--color-status-red)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {kpi.positive ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* ── 3. Trend Chart + Platform Status ──────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Trend */}
        <div className="card" style={surfaceCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              趋势分析
            </h3>
            <div style={{ display: 'flex', gap: 6 }}>
              {([
                { key: 'rate' as TrendMetric, label: '推荐率' },
                { key: 'mentions' as TrendMetric, label: '提及量' },
              ]).map((m) => (
                <button
                  key={m.key}
                  onClick={() => setTrendMetric(m.key)}
                  style={{
                    padding: '4px 12px', fontSize: '0.75rem', borderRadius: 6,
                    border: '1px solid var(--color-border-default)',
                    background: trendMetric === m.key ? 'var(--color-primary)' : 'transparent',
                    color: trendMetric === m.key ? '#fff' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMentions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              {trendMetric === 'rate' ? (
                <Area type="monotone" dataKey="rate" name="rate" stroke="var(--color-primary)" fill="url(#gradRate)" strokeWidth={2} />
              ) : (
                <Area type="monotone" dataKey="mentions" name="mentions" stroke="var(--color-accent)" fill="url(#gradMentions)" strokeWidth={2} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Status */}
        <div className="card" style={surfaceCard}>
          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 16px' }}>
            平台状态
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {platforms.map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 8,
                  background: 'var(--color-bg-surface-light)',
                  border: '1px solid var(--color-border-default)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {p.online
                    ? <Wifi size={16} style={{ color: 'var(--color-status-green)' }} />
                    : <WifiOff size={16} style={{ color: 'var(--color-status-red)' }} />
                  }
                  <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                    {p.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: p.online ? 'var(--color-status-green)' : 'var(--color-status-red)',
                  }}>
                    {p.online ? '在线' : '离线'}
                  </span>
                  {p.online && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      {p.latency}ms
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Keyword Rankings + Scenario Coverage ───────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Keywords Table */}
        <div className="card" style={surfaceCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
            <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              关键词排名
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="搜索关键词\u2026"
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  style={{
                    padding: '5px 10px 5px 28px', fontSize: '0.8125rem', borderRadius: 6,
                    border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface-light)',
                    color: 'var(--color-text-primary)', outline: 'none', width: 140,
                  }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={keywordSort}
                  onChange={(e) => setKeywordSort(e.target.value as KeywordSort)}
                  style={{
                    padding: '5px 28px 5px 10px', fontSize: '0.8125rem', borderRadius: 6,
                    border: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface-light)',
                    color: 'var(--color-text-primary)', outline: 'none', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="mentions">按提及量</option>
                  <option value="rate">按推荐率</option>
                  <option value="trend">按趋势</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-secondary)' }} />
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                  {['关键词', '提及', '推荐率', '趋势'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 10px', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map((kw) => (
                  <tr
                    key={kw.keyword}
                    style={{ borderBottom: '1px solid var(--color-border-default)', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(14,165,233,0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '10px', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {kw.keyword}
                    </td>
                    <td style={{ padding: '10px', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {kw.mentions.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px', width: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--color-bg-surface-light)' }}>
                          <div style={{ width: `${kw.rate}%`, height: '100%', borderRadius: 3, background: 'var(--color-primary)' }} />
                        </div>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)', minWidth: 40, textAlign: 'right' }}>
                          {kw.rate}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {kw.trend === 'up'
                        ? <TrendingUp size={16} style={{ color: 'var(--color-status-green)' }} />
                        : kw.trend === 'down'
                          ? <TrendingDown size={16} style={{ color: 'var(--color-status-red)' }} />
                          : <span style={{ display: 'inline-block', width: 16, height: 2, background: 'var(--color-text-secondary)', borderRadius: 1 }} />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scenario Coverage + Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={surfaceCard}>
            <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 16px' }}>
              场景覆盖
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={scenarioData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                  {scenarioData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={surfaceCard}>
            <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 12px' }}>
              内容日历
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contentCalendar.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 10px', borderRadius: 8,
                    background: 'var(--color-bg-surface-light)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Calendar size={14} style={{ color: 'var(--color-text-secondary)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.date}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>{item.title}</span>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Activity + Quick Actions + Diagnosis ───────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Recent Activity */}
        <div className="card" style={surfaceCard}>
          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 16px' }}>
            最近动态
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activities.map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${act.color}20`, flexShrink: 0 }}>
                  <act.icon size={16} style={{ color: act.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {act.text}
                  </p>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> {act.time}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={surfaceCard}>
          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 16px' }}>
            快捷操作
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                onClick={() => navigate(qa.path)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 8,
                  background: 'var(--color-bg-surface-light)',
                  border: '1px solid var(--color-border-default)',
                  color: 'var(--color-text-primary)', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: 500,
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-default)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <qa.icon size={16} style={{ color: 'var(--color-primary)' }} />
                  {qa.label}
                </span>
                <ArrowRight size={16} style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            ))}
          </div>
        </div>

        {/* GEO Diagnosis */}
        <div
          className="card"
          style={{
            ...surfaceCard,
            background: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(99,102,241,0.12) 100%)',
            border: '1px solid rgba(14,165,233,0.3)',
          }}
        >
          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 600, margin: '0 0 20px' }}>
            GEO 诊断
          </h3>

          {/* Overall Score */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              79.7
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>综合评分</span>
          </div>

          {/* Sub-scores */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {[
              { label: '结构化数据', score: 85, color: 'var(--color-accent)' },
              { label: '内容质量', score: 72, color: 'var(--color-primary)' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: s.color }}>{s.score}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{ width: `${s.score}%`, height: '100%', borderRadius: 3, background: s.color }} />
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn-gradient"
            style={{
              width: '100%', padding: '10px 0', borderRadius: 8,
              border: 'none', color: '#fff', fontWeight: 600, fontSize: '0.875rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/diagnosis')}
          >
            开始完整诊断
          </button>
        </div>
      </div>
    </div>
  )
}

