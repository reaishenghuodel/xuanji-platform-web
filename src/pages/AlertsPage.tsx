import { useState } from 'react'
import {
  Bell, BellRing, AlertTriangle, CheckCircle, Clock, X, Settings,
  Mail, MessageSquare, Phone, Zap, BarChart3, Briefcase,
  Trash2, Edit3, Plus, Send, Search
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import { useTableSortFilter } from '../hooks/useTableSortFilter'

const alertKPI = [
  { title: '活跃告警', value: '3', status: 'warning', icon: BellRing, color: 'var(--color-status-yellow)' },
  { title: '今日触发', value: '8', status: 'normal', icon: Zap, color: 'var(--color-primary)' },
  { title: '处理中', value: '2', status: 'normal', icon: Clock, color: 'var(--color-secondary)' },
  { title: '已解决', value: '156', status: 'good', icon: CheckCircle, color: 'var(--color-accent)' },
]

const alertRules = [
  {
    id: 1,
    name: '品牌推荐率下降',
    condition: 'DeepSeek 推荐率 < 60%',
    severity: 'high',
    status: 'active',
    channels: ['飞书', '邮件'],
    lastTrigger: '10 分钟前',
    triggerCount: 12,
  },
  {
    id: 2,
    name: '引用数异常波动',
    condition: '日引用数环比下降 > 30%',
    severity: 'high',
    status: 'active',
    channels: ['飞书', '企微', '邮件'],
    lastTrigger: '35 分钟前',
    triggerCount: 8,
  },
  {
    id: 3,
    name: '竞品超越预警',
    condition: '竞品A 推荐率 > 我方品牌',
    severity: 'medium',
    status: 'active',
    channels: ['飞书'],
    lastTrigger: '2 小时前',
    triggerCount: 5,
  },
  {
    id: 4,
    name: '准确率下降',
    condition: 'AI引用准确率 < 90%',
    severity: 'medium',
    status: 'active',
    channels: ['邮件'],
    lastTrigger: '5 小时前',
    triggerCount: 3,
  },
  {
    id: 5,
    name: '关键词覆盖不足',
    condition: '核心关键词覆盖率 < 50%',
    severity: 'low',
    status: 'paused',
    channels: ['飞书'],
    lastTrigger: '1 天前',
    triggerCount: 2,
  },
  {
    id: 6,
    name: '内容产出滞后',
    condition: '周内容产出 < 目标 50%',
    severity: 'low',
    status: 'paused',
    channels: ['邮件'],
    lastTrigger: '3 天前',
    triggerCount: 1,
  },
]

const alertHistory = [
  { id: 1, rule: '品牌推荐率下降', severity: 'high', time: '10:23', date: '07-08', status: 'resolved', duration: '15分钟', detail: 'DeepSeek 推荐率从 68% 降至 58%' },
  { id: 2, rule: '引用数异常波动', severity: 'high', time: '09:45', date: '07-08', status: 'resolved', duration: '8分钟', detail: '日引用数从 324 降至 198' },
  { id: 3, rule: '竞品超越预警', severity: 'medium', time: '08:12', date: '07-08', status: 'pending', duration: '-', detail: '竞品A 推荐率 65% > 我方 62%' },
  { id: 4, rule: '准确率下降', severity: 'medium', time: '14:30', date: '07-07', status: 'resolved', duration: '22分钟', detail: 'AI引用准确率从 97% 降至 88%' },
  { id: 5, rule: '品牌推荐率下降', severity: 'high', time: '11:15', date: '07-07', status: 'resolved', duration: '12分钟', detail: 'Perplexity 推荐率从 72% 降至 59%' },
  { id: 6, rule: '关键词覆盖不足', severity: 'low', time: '16:00', date: '07-06', status: 'resolved', duration: '30分钟', detail: '核心关键词覆盖率 48% < 50%' },
  { id: 7, rule: '引用数异常波动', severity: 'high', time: '10:00', date: '07-06', status: 'resolved', duration: '5分钟', detail: '日引用数环比下降 35%' },
  { id: 8, rule: '竞品超越预警', severity: 'medium', time: '09:20', date: '07-05', status: 'resolved', duration: '18分钟', detail: '竞品B 声量超越我方' },
]

const notificationChannels = [
  { id: 'feishu', name: '飞书', icon: MessageSquare, status: 'connected', webhook: 'https://open.feishu.cn/...', recipients: '3人' },
  { id: 'wechat', name: '企业微信', icon: Briefcase, status: 'connected', webhook: 'https://qyapi.weixin.qq.com/...', recipients: '5人' },
  { id: 'email', name: '邮件', icon: Mail, status: 'connected', webhook: 'smtp://mail.company.com', recipients: '8人' },
  { id: 'sms', name: '短信', icon: Phone, status: 'disconnected', webhook: '-', recipients: '2人' },
]

const alertTrend = [
  { date: '07-02', triggered: 4, resolved: 4, pending: 0 },
  { date: '07-03', triggered: 6, resolved: 5, pending: 1 },
  { date: '07-04', triggered: 3, resolved: 4, pending: 0 },
  { date: '07-05', triggered: 8, resolved: 7, pending: 1 },
  { date: '07-06', triggered: 7, resolved: 6, pending: 1 },
  { date: '07-07', triggered: 5, resolved: 4, pending: 1 },
  { date: '07-08', triggered: 8, resolved: 5, pending: 3 },
]

const severityDistribution = [
  { name: '高危', value: 12, color: 'var(--color-status-red)' },
  { name: '中危', value: 8, color: 'var(--color-status-yellow)' },
  { name: '低危', value: 5, color: 'var(--color-primary)' },
]

function AlertsPage() {
  const [activeTab, setActiveTab] = useState('rules')

  const {
    data: filteredHistory,
    handleSort,
    getSortIndicator,
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
  } = useTableSortFilter(alertHistory, ['rule', 'severity', 'detail', 'status'])

  const tabs = [
    { id: 'rules', label: '告警规则', icon: Bell },
    { id: 'history', label: '告警历史', icon: Clock },
    { id: 'channels', label: '通知渠道', icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {alertKPI.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{kpi.title}</span>
                </div>
                <span className={`badge ${kpi.status === 'warning' ? 'badge-yellow' : kpi.status === 'good' ? 'badge-green' : 'badge-blue'} text-xs`}>
                  {kpi.status === 'warning' ? '需关注' : kpi.status === 'good' ? '正常' : '正常'}
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</div>
            </div>
          )
        })}
      </div>

      {/* Alert Trend */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>告警趋势</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-status-red)' }} />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>触发</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>已解决</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-status-yellow)' }} />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>待处理</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={alertTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
            <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '8px',
                color: 'var(--color-text-primary)',
              }}
            />
            <Legend />
            <Bar dataKey="triggered" name="触发" fill="var(--color-status-red)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="已解决" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" name="待处理" fill="var(--color-status-yellow)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Alert Rules */}
      {activeTab === 'rules' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>告警规则</h3>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>共 {alertRules.length} 条</span>
            </div>
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              新建规则
            </button>
          </div>
          <div className="space-y-3">
            {alertRules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${
                        rule.severity === 'high' ? 'badge-red' :
                        rule.severity === 'medium' ? 'badge-yellow' : 'badge-blue'
                      } text-xs`}>
                        {rule.severity === 'high' ? '高危' : rule.severity === 'medium' ? '中危' : '低危'}
                      </span>
                      <span className={`badge ${rule.status === 'active' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                        {rule.status === 'active' ? '启用中' : '已暂停'}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>上次触发: {rule.lastTrigger}</span>
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{rule.name}</div>
                    <div className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>条件: {rule.condition}</div>
                    <div className="flex items-center gap-2">
                      {rule.channels.map(ch => (
                        <span key={ch} className="tag tag-secondary text-xs">{ch}</span>
                      ))}
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>累计触发: {rule.triggerCount} 次</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <button className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-primary)' }}>
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-status-red)' }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert History */}
      {activeTab === 'history' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>告警历史</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-red text-xs">高危 {alertHistory.filter(h => h.severity === 'high').length}</span>
              <span className="badge badge-yellow text-xs">中危 {alertHistory.filter(h => h.severity === 'medium').length}</span>
              <span className="badge badge-blue text-xs">低危 {alertHistory.filter(h => h.severity === 'low').length}</span>
            </div>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type="text"
                placeholder="搜索告警规则..."
                value={filters['rule'] || ''}
                onChange={e => setFilter('rule', e.target.value)}
                className="input-field px-3 py-1.5 text-sm w-full max-w-xs"
              />
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs font-medium"
                style={{ color: 'var(--color-primary)' }}
              >
                清除筛选 ({activeFilterCount})
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th
                    className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('rule')}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <span className="flex items-center gap-1">
                      告警规则
                      <span className="text-xs opacity-50">{getSortIndicator('rule')}</span>
                    </span>
                  </th>
                  <th
                    className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('severity')}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <span className="flex items-center gap-1">
                      级别
                      <span className="text-xs opacity-50">{getSortIndicator('severity')}</span>
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>详情</th>
                  <th
                    className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('date')}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <span className="flex items-center gap-1">
                      时间
                      <span className="text-xs opacity-50">{getSortIndicator('date')}</span>
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>耗时</th>
                  <th
                    className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('status')}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <span className="flex items-center gap-1">
                      状态
                      <span className="text-xs opacity-50">{getSortIndicator('status')}</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      暂无匹配的告警记录
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            item.severity === 'high' ? 'bg-red-500' :
                            item.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.rule}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${
                          item.severity === 'high' ? 'badge-red' :
                          item.severity === 'medium' ? 'badge-yellow' : 'badge-blue'
                        } text-xs`}>
                          {item.severity === 'high' ? '高危' : item.severity === 'medium' ? '中危' : '低危'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.detail}</td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.date} {item.time}</td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${item.status === 'resolved' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                          {item.status === 'resolved' ? '已解决' : '处理中'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notification Channels */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>通知渠道配置</h3>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                新增渠道
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notificationChannels.map((channel) => {
                const Icon = channel.icon
                return (
                  <div key={channel.id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                          <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div>
                          <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{channel.name}</div>
                          <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{channel.recipients}</div>
                        </div>
                      </div>
                      <span className={`badge ${channel.status === 'connected' ? 'badge-green' : 'badge-yellow'} text-xs`}>
                        {channel.status === 'connected' ? '已连接' : '未连接'}
                      </span>
                    </div>
                    <div className="text-xs mb-3 p-2 rounded-lg font-mono" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-secondary)' }}>
                      {channel.webhook}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn-secondary flex items-center gap-1 text-xs">
                        <Edit3 className="w-3 h-3" />
                        编辑
                      </button>
                      <button className="btn-secondary flex items-center gap-1 text-xs">
                        <Send className="w-3 h-3" />
                        测试
                      </button>
                      {channel.status === 'connected' ? (
                        <button className="btn-secondary flex items-center gap-1 text-xs" style={{ color: 'var(--color-status-red)' }}>
                          <X className="w-3 h-3" />
                          断开
                        </button>
                      ) : (
                        <button className="btn-primary flex items-center gap-1 text-xs">
                          <Zap className="w-3 h-3" />
                          连接
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Severity Distribution */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-status-yellow)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>告警级别分布</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {severityDistribution.map((item, i) => (
                <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.name}</div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(item.value / 25) * 100}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlertsPage
