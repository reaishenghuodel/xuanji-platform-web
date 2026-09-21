# app/routers/diagnosis.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random

from app.services.doubao import doubao_service

router = APIRouter()


class DiagnosisRequest(BaseModel):
    brand_name: str
    website: str = ""
    industry: str = ""


class DiagnosisResult(BaseModel):
    brand_name: str
    overall_score: int
    visibility: int
    accuracy: int
    coverage: int
    platform_results: list
    suggestions: list
    industry: str
    raw_analysis: str = ""  # 豆包五阶段分析原文
    # 五阶段分析数据
    aipl: dict = {}  # { a, i, p, l }
    infra: dict = {}  # { t1, t2, t3, t4 }
    reputation: dict = {}  # { nss, r1, r2, r3 }
    momentum: dict = {}  # { vScore, gScore, vStatus, gStatus, diagnosis }
    roadmap: list = []  # [{ priority, problem, peso, tactic, ice }]
    summary: str = ""  # 首席战略官综述


@router.post("/", response_model=DiagnosisResult)
async def create_diagnosis(request: DiagnosisRequest):
    """
    创建品牌AI搜索可见度诊断 - 使用豆包五阶段分析
    """
    if not request.brand_name.strip():
        raise HTTPException(status_code=400, detail="品牌名称不能为空")

    # 调用豆包进行五阶段分析
    try:
        doubao_result = await doubao_service.generate_brand_diagnosis(
            brand_name=request.brand_name,
            industry=request.industry,
            website=request.website
        )
        
        if doubao_result and isinstance(doubao_result, dict):
            # 解析豆包返回的JSON
            overall_score = doubao_result.get("overall_score", random.randint(40, 70))
            visibility = doubao_result.get("visibility", random.randint(30, 55))
            accuracy = doubao_result.get("accuracy", random.randint(60, 85))
            coverage = doubao_result.get("coverage", random.randint(20, 50))
            platform_results = doubao_result.get("platform_analysis", [])
            suggestions = doubao_result.get("suggestions", [])
            raw_content = doubao_result.get("raw_content", "")
            
            return DiagnosisResult(
                brand_name=request.brand_name,
                overall_score=overall_score,
                visibility=visibility,
                accuracy=accuracy,
                coverage=coverage,
                platform_results=platform_results,
                suggestions=suggestions,
                industry=request.industry,
                raw_analysis=raw_content,
            )
    except Exception as e:
        print(f"豆包分析失败，回退到Mock数据: {e}")
    
    # 回退到Mock数据（豆包调用失败时）
    rand = lambda min, max: random.randint(min, max)
    overall_score = rand(40, 70)
    visibility = rand(30, 55)
    accuracy = rand(60, 85)
    coverage = rand(20, 50)

    platforms = [
        {"name": "DeepSeek", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "文心一言", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "通义千问", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "ChatGPT", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "豆包", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "Kimi", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "Perplexity", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
        {"name": "Gemini", "score": rand(20, 80), "status": "found" if random.random() > 0.3 else "missing"},
    ]

    suggestions_pool = [
        "品牌官网信息结构不完整，建议补充结构化数据（Schema.org）",
        "DeepSeek 平台品牌提及率较低，建议增加行业权威内容输出",
        "知乎/百度百科等知识平台缺乏品牌词条，需要建立知识图谱",
        "品牌内容在 AI 引用中的准确率偏低，建议优化内容质量",
        "小红书、抖音等社交平台的品牌声量不足，建议加强 UGC 内容布局",
        "品牌官网的 SEO 结构不利于 AI 爬虫抓取，建议优化语义化标签",
        "建议定期发布行业白皮书，提升在 AI 模型中的权威性引用",
        "缺少第三方权威媒体的正面报道，影响 AI 推荐的可信度评分",
    ]

    suggestions = random.sample(suggestions_pool, 3)

    # 五阶段Mock数据
    aipl = {"a": rand(4, 8), "i": rand(4, 8), "p": rand(4, 8), "l": rand(4, 8)}
    infra = {"t1": rand(5, 9), "t2": rand(4, 8), "t3": rand(5, 9), "t4": rand(4, 8)}
    reputation = {
        "nss": rand(6, 9),
        "r1": "🔴" if random.random() > 0.3 else "🟢",
        "r2": "🟡" if random.random() > 0.5 else "🟢",
        "r3": "🟢",
    }
    momentum = {
        "vScore": rand(50, 85),
        "gScore": rand(50, 85),
        "vStatus": "🚀" if random.random() > 0.5 else "💤",
        "gStatus": "🏛️" if random.random() > 0.5 else "📢",
        "diagnosis": "自嗨型" if random.random() > 0.5 else "吃老本型",
    }
    roadmap = [
        {"priority": "P0", "problem": "内容覆盖率不足", "peso": "Owned", "tactic": "补充百科/知乎品牌词条", "ice": rand(500, 900)},
        {"priority": "P1", "problem": "结构化数据缺失", "peso": "Earned", "tactic": "部署Schema.org标记", "ice": rand(400, 800)},
        {"priority": "P1", "problem": "社交媒体声量低", "peso": "Shared", "tactic": "加强小红书/抖音UGC", "ice": rand(300, 700)},
        {"priority": "P2", "problem": "权威信源缺失", "peso": "Paid", "tactic": "投放头部媒体背书", "ice": rand(200, 600)},
    ]
    summary = f"当前品牌在AI搜索中的可见度处于{'良好' if overall_score >= 60 else '中等'}水平，建议优先完善内容基建，再逐步扩大平台覆盖。预计3个月内可提升{rand(15, 35)}%。"

    return DiagnosisResult(
        brand_name=request.brand_name,
        overall_score=overall_score,
        visibility=visibility,
        accuracy=accuracy,
        coverage=coverage,
        platform_results=platforms,
        suggestions=suggestions,
        industry=request.industry,
        aipl=aipl,
        infra=infra,
        reputation=reputation,
        momentum=momentum,
        roadmap=roadmap,
        summary=summary,
    )
