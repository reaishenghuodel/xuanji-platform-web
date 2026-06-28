// src/services/api.ts
// 璇玑智科后端 API 服务层

const API_BASE = '/api'

interface DiagnosisRequest {
  brand_name: string
  website?: string
  industry?: string
}

interface DiagnosisResponse {
  brand_name: string
  overall_score: number
  visibility: number
  accuracy: number
  coverage: number
  platform_results: Array<{
    name: string
    score: number
    status: 'found' | 'missing' | 'unknown'
  }>
  suggestions: string[]
  industry: string
  raw_analysis?: string
  // 五阶段分析数据
  aipl?: { a: number; i: number; p: number; l: number }
  infra?: { t1: number; t2: number; t3: number; t4: number }
  reputation?: { nss: number; r1: string; r2: string; r3: string }
  momentum?: {
    vScore: number
    gScore: number
    vStatus: string
    gStatus: string
    diagnosis: string
  }
  roadmap?: Array<{
    priority: string
    problem: string
    peso: string
    tactic: string
    ice: number
  }>
  summary?: string
}

interface MonitorRequest {
  brand_name: string
  platforms?: string[]
  start_date?: string
  end_date?: string
}

interface ReportRequest {
  brand_name: string
  industry?: string
  report_type?: 'full' | 'summary' | 'health' | 'competitor'
}

// 通用请求封装
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `API请求失败: ${response.status}`)
  }

  return response.json()
}

// 诊断服务
export const diagnosisApi = {
  // 创建品牌诊断
  async create(request: DiagnosisRequest): Promise<DiagnosisResponse> {
    return apiRequest<DiagnosisResponse>('/v1/diagnosis/', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },
}

// 监测服务
export const monitoringApi = {
  // 监测品牌在各AI平台的表现
  async monitorBrand(request: MonitorRequest) {
    return apiRequest('/v1/monitoring/brand', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  // 获取支持的AI平台列表
  async getPlatforms() {
    return apiRequest('/v1/monitoring/platforms')
  },
}

// 报告服务
export const reportApi = {
  // 生成品牌诊断报告
  async generate(request: ReportRequest) {
    return apiRequest('/v1/report/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  // 获取报告模板列表
  async getTemplates() {
    return apiRequest('/v1/report/templates')
  },
}

// 健康检查
export const healthApi = {
  async check() {
    return apiRequest<{ status: string }>('/health')
  },
}

export type { DiagnosisRequest, DiagnosisResponse, MonitorRequest, ReportRequest }
