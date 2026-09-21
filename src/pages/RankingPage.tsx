import { useState } from 'react'
import {
  BarChart3, TrendingUp, TrendingDown, Users, Eye, Target, Trophy, ArrowUpRight, ArrowDownRight, Clock, Calendar,
  Award, PieChart as PieIcon, Search
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell
} from 'recharts'
import { useTableSortFilter } from '../hooks/useTableSortFilter'

const teamStats = [
  { title: '团队总品牌', value: '12', change: '+2', positive: true, icon: Target },
  { title: '监测关键词', value: '48,392', change: '+3,247', positive: true, icon: Eye },
  { title: '内容产出', value: '1,856', change: '+342', positive: true, icon: BarChart3 },
  { title: '达人合作', value: '234', change: '+56', positive: true, icon: Users },
]

const memberRanking = [
  { name: '张小明', role: '品牌运营', tasks: 156, completed: 142, efficiency: 96, quality: 94, speed: 92, innovation: 88, trend: 'up' },
  { name: '李小红', role: '内容策划', tasks: 134, completed: 128, efficiency: 94, quality: 96, speed: 90, innovation: 95, trend: 'up' },
  { name: '王小强', role: '数据分析师', tasks: 98, completed: 95, efficiency: 93, quality: 92, speed: 95, innovation: 85, trend: 'stable' },
  { name: '赵小芳', role: '达人运营', tasks: 112, completed: 102, efficiency: 89, quality: 88, speed: 85, innovation: 90, trend: 'up' },
  { name: '刘小龙', role: 'GEO 策略', tasks: 88, completed: 78, efficiency: 85, quality: 90, speed: 82, innovation: 93, trend: 'down' },
  { name: '陈小丽', role: '内容创作', tasks: 76, completed: 68, efficiency: 82, quality: 85, speed: 88, innovation: 92, trend: 'up' },
]

const brandRanking = [
  { name: '品牌A', recommendRate: 72, mentionCount: 12400, trend: '+8.2%', platform: 'DeepSeek', score: 92 },
  { name: '品牌B', recommendRate: 65, mentionCount: 9800, trend: '+5.1%', platform: '文心一言', score: 88 },
  { name: '品牌C', recommendRate: 58, mentionCount: 7600, trend: '+2.3%', platform: '通义千问', score: 82 },
  { name: '品牌D', recommendRate: 52, mentionCount: 6200, trend: '-1.2%', platform: '豆包', score: 76 },
  { name: '品牌E', recommendRate: 45, mentionCount: 4800, trend: '+0.8%', platform: 'Kimi', score: 70 },
]

const trendData = [
  { date: 'Week 1', teamOutput: 320, teamEfficiency: 82, target: 300 },
  { date: 'Week 2', teamOutput: 345, teamEfficiency: 85, target: 310 },
  { date: 'Week 3', teamOutput: 380, teamEfficiency: 88, target: 320 },
  { date: 'Week 4', teamOutput: 420, teamEfficiency: 91, target: 330 },
  { date: 'Week 5', teamOutput: 450, teamEfficiency: 93, target: 340 },
  { date: 'Week 6', teamOutput: 480, teamEfficiency: 95, target: 350 },
  { date: 'Week 7', teamOutput: 510, teamEfficiency: 96, target: 360 },
]

const radarData = [
  { subject: '效率', A: 96, B: 94, fullMark: 100 },
  { subject: '质量', A: 94, B: 96, fullMark: 100 },
  { subject: '速度', A: 92, B: 90, fullMark: 100 },
  { subject: '创新', A: 88, B: 95, fullMark: 100 },
  { subject: '协作', A: 95, B: 92, fullMark: 100 },
  { subject: '学习', A: 90, B: 88, fullMark: 100 },
]

const workloadData = [
  { name: '内容创作', value: 35, color: '#0EA5E9' },
  { name: '品牌运营', value: 25, color: '#2DD4BF' },
  { name: '数据分析', value: 15, color: '#6366F1' },
  { name: '达人运营', value: 15, color: '#F59E0B' },
  { name: 'GEO策略', value: 10, color: '#EC4899' },
]

const recentActivity = [
  { action: '完成品牌 A 月度监测报告', user: '张小明', time: '10分钟前', type: 'report' },
  { action: '生成 AI 内容 12 篇', user: '陈小丽', time: '30分钟前', type: 'content' },
  { action: '发现新的低粉爆款素材', user: '赵小芳', time: '1小时前', type: 'material' },
  { action: '拓词完成：新增 234 个关键词', user: '刘小龙', time: '2小时前', type: 'keyword' },
  { action: '品牌 B 推荐率突破 65%', user: '李小红', time: '3小时前', type: 'milestone' },
  { action: '完成达人合作 5 单', user: '赵小芳', time: '4小时前', type: 'material' },
]

function RankingPage() {
  const [activeTab, setActiveTab] = useState('team')
  const [selectedMember, setSelectedMember] = useState(0)

  const memberSort = useTableSortFilter(memberRanking, ['name', 'role'], 'efficiency')
  const brandSort = useTableSortFilter(brandRanking, ['name', 'platform'], 'score')

  const tabs = [
    { id: 'team', label: '团队排名', icon: Users },
    { id: 'brand', label: '品牌排名', icon: Trophy },
    { id: 'activity', label: '动态', icon: Clock },
  ]

  const currentMember = memberRanking[selectedMember]
  const memberRadarData = [
    { subject: '效率', A: currentMember.efficiency, fullMark: 100 },
    { subject: '质量', A: currentMember.quality, fullMark: 100 },
    { subject: '速度', A: currentMember.speed, fullMark: 100 },
    { subject: '创新', A: currentMember.innovation, fullMark: 100 },
    { subject: '完成率', A: Math.round((currentMember.completed / currentMember.tasks) * 100), fullMark: 100 },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon
          const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight
          return (
            <div key={index} className="card card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{stat.title}</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</span>
                <div className="flex items-center gap-1 mb-1">
                  <ChangeIcon className="w-3 h-3" style={{ color: stat.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }} />
                  <span className="text-xs font-medium" style={{ color: stat.positive ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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

      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>团队效能趋势</h3>
                <span className="badge badge-blue">近7周</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="teamOutput" name="产出量" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorOutput)" strokeWidth={2} />
                  <Area type="monotone" dataKey="teamEfficiency" name="效率(%)" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorEff)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>工作量分布</h3>
                <PieIcon className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={workloadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workloadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {workloadData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.name} {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Radar + Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>个人效能雷达</h3>
                <select
                  className="input-field text-sm py-1 px-2"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(Number(e.target.value))}
                >
                  {memberRanking.map((m, i) => (
                    <option key={i} value={i}>{m.name}</option>
                  ))}
                </select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={memberRadarData}>
                  <PolarGrid stroke="var(--color-border-default)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--color-text-secondary)" fontSize={12} />
                  <PolarRadiusAxis stroke="var(--color-border-default)" fontSize={10} />
                  <Radar name={currentMember.name} dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{currentMember.name}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--color-text-secondary)' }}>{currentMember.role}</span>
              </div>
            </div>

            <div className="card lg:col-span-2">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>成员效能排名</h3>
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="搜索成员..."
                  value={memberSort.filters['name'] || ''}
                  onChange={e => memberSort.setFilter('name', e.target.value)}
                  className="input-field px-3 py-1.5 text-sm w-full max-w-xs"
                />
                {memberSort.activeFilterCount > 0 && (
                  <button onClick={memberSort.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                    清除筛选
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="table-header">
                      <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => memberSort.handleSort('name')}>
                        <span className="flex items-center gap-1">成员<span className="text-xs opacity-50">{memberSort.getSortIndicator('name')}</span></span>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => memberSort.handleSort('role')}>
                        <span className="flex items-center gap-1">角色<span className="text-xs opacity-50">{memberSort.getSortIndicator('role')}</span></span>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => memberSort.handleSort('tasks')}>
                        <span className="flex items-center gap-1">任务数<span className="text-xs opacity-50">{memberSort.getSortIndicator('tasks')}</span></span>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">完成率</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => memberSort.handleSort('efficiency')}>
                        <span className="flex items-center gap-1">效率<span className="text-xs opacity-50">{memberSort.getSortIndicator('efficiency')}</span></span>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => memberSort.handleSort('quality')}>
                        <span className="flex items-center gap-1">质量<span className="text-xs opacity-50">{memberSort.getSortIndicator('quality')}</span></span>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberSort.data.map((member, index) => (
                      <tr key={member.name} className="table-row cursor-pointer" onClick={() => setSelectedMember(index)}>
                        <td className="py-3 px-4">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: index < 3 ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                              color: index < 3 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            }}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                              <Users className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{member.role}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.completed}/{member.tasks}</div>
                          <div className="w-20 h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                            <div className="h-full rounded-full" style={{ width: `${(member.completed / member.tasks) * 100}%`, backgroundColor: 'var(--color-primary)' }} />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                          {Math.round((member.completed / member.tasks) * 100)}%
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.efficiency}</span>
                            <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                              <div className="h-full rounded-full" style={{ width: `${member.efficiency}%`, backgroundColor: member.efficiency >= 90 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{member.quality}</span>
                            <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                              <div className="h-full rounded-full" style={{ width: `${member.quality}%`, backgroundColor: member.quality >= 90 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {member.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-status-green)' }} />
                          ) : member.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4" style={{ color: 'var(--color-status-red)' }} />
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>稳定</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'brand' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>品牌推荐率对比</h3>
                <span className="badge badge-blue">实时</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={brandRanking} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                  <XAxis type="number" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Bar dataKey="recommendRate" name="推荐率(%)" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="score" name="综合评分(÷10)" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>品牌综合雷达</h3>
                <Award className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border-default)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--color-text-secondary)" fontSize={12} />
                  <PolarRadiusAxis stroke="var(--color-border-default)" fontSize={10} />
                  <Radar name="品牌A" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="品牌B" dataKey="B" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} strokeWidth={2} />
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: '8px',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>品牌表现排名</h3>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              <input
                type="text"
                placeholder="搜索品牌或平台..."
                value={brandSort.filters['name'] || ''}
                onChange={e => brandSort.setFilter('name', e.target.value)}
                className="input-field px-3 py-1.5 text-sm w-full max-w-xs"
              />
              {brandSort.activeFilterCount > 0 && (
                <button onClick={brandSort.clearFilters} className="text-xs" style={{ color: 'var(--color-primary)' }}>
                  清除筛选
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left py-3 px-4 text-sm font-semibold">排名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => brandSort.handleSort('name')}>
                      <span className="flex items-center gap-1">品牌<span className="text-xs opacity-50">{brandSort.getSortIndicator('name')}</span></span>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => brandSort.handleSort('recommendRate')}>
                      <span className="flex items-center gap-1">推荐率<span className="text-xs opacity-50">{brandSort.getSortIndicator('recommendRate')}</span></span>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => brandSort.handleSort('mentionCount')}>
                      <span className="flex items-center gap-1">提及量<span className="text-xs opacity-50">{brandSort.getSortIndicator('mentionCount')}</span></span>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">趋势</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => brandSort.handleSort('platform')}>
                      <span className="flex items-center gap-1">核心平台<span className="text-xs opacity-50">{brandSort.getSortIndicator('platform')}</span></span>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold cursor-pointer select-none" onClick={() => brandSort.handleSort('score')}>
                      <span className="flex items-center gap-1">综合评分<span className="text-xs opacity-50">{brandSort.getSortIndicator('score')}</span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brandSort.data.map((brand, index) => (
                    <tr key={brand.name} className="table-row">
                      <td className="py-3 px-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: index === 0 ? 'var(--color-accent-50)' : index === 1 ? 'var(--color-primary-50)' : 'var(--color-bg-surface-light)',
                            color: index === 0 ? 'var(--color-accent)' : index === 1 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          }}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{brand.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{brand.recommendRate}%</span>
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                            <div className="h-full rounded-full" style={{ width: `${brand.recommendRate}%`, backgroundColor: brand.recommendRate >= 60 ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{brand.mentionCount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {brand.trend.startsWith('+') ? (
                            <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-status-green)' }} />
                          ) : (
                            <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-status-red)' }} />
                          )}
                          <span className="text-sm" style={{ color: brand.trend.startsWith('+') ? 'var(--color-status-green)' : 'var(--color-status-red)' }}>
                            {brand.trend}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="tag tag-primary text-xs">{brand.platform}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium" style={{ color: brand.score >= 80 ? 'var(--color-accent)' : 'var(--color-primary)' }}>{brand.score}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>团队动态</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface-light)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <Calendar className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{activity.time}</div>
                </div>
                <span className={`badge text-xs ${
                  activity.type === 'milestone' ? 'badge-green' :
                  activity.type === 'content' ? 'badge-blue' :
                  activity.type === 'report' ? 'badge-yellow' :
                  'badge-green'
                }`}>
                  {activity.type === 'milestone' ? '里程碑' :
                   activity.type === 'content' ? '内容' :
                   activity.type === 'report' ? '报告' :
                   activity.type === 'material' ? '素材' : '关键词'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RankingPage
