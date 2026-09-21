# app/routers/report.py
from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()


class ReportRequest(BaseModel):
    brand_name: str
    industry: str = ""
    report_type: str = "full"  # full, summary, health


class ReportResult(BaseModel):
    brand_name: str
    report_type: str
    generated_at: str
    score: int
    summary: str
    sections: list


@router.post("/generate")
async def generate_report(request: ReportRequest):
    """
    生成品牌诊断报告
    """
    score = random.randint(40, 80)

    summary = (
        f"{request.brand_name} 的AI搜索可见度综合评分为 {score} 分。"
        f"整体表现{'良好' if score >= 60 else '一般' if score >= 50 else '需要优化'}，"
        f"建议重点优化{'内容质量' if score < 60 else '平台覆盖' if score < 70 else '品牌权威性'}。"
    )

    sections = [
        {
            "title": "AI 推荐率分析",
            "content": f"品牌在主要AI平台的平均推荐率为 {random.randint(30, 75)}%，{'高于' if score >= 60 else '低于'}行业平均水平。",
            "score": random.randint(30, 80),
        },
        {
            "title": "平台覆盖情况",
            "content": f"已覆盖 {random.randint(3, 8)}/8 个主流AI平台，{'覆盖面较广' if score >= 60 else '覆盖面有待扩大'}。",
            "score": random.randint(20, 90),
        },
        {
            "title": "内容质量评估",
            "content": f"AI引用品牌信息的准确率约为 {random.randint(60, 90)}%，{'信息质量较高' if score >= 60 else '存在较多错误信息'}。",
            "score": random.randint(40, 85),
        },
        {
            "title": "竞品对比",
            "content": "与行业竞品相比，品牌在AI搜索中的可见度处于中等水平，建议加强内容投放。",
            "score": random.randint(35, 70),
        },
        {
            "title": "优化建议",
            "content": "建议优先完善官网Schema标记，建立百度百科/知乎品牌词条，定期发布高质量行业内容。",
            "score": None,
        },
    ]

    from datetime import datetime
    return ReportResult(
        brand_name=request.brand_name,
        report_type=request.report_type,
        generated_at=datetime.now().isoformat(),
        score=score,
        summary=summary,
        sections=sections,
    )


@router.get("/templates")
async def get_report_templates():
    """
    获取报告模板列表
    """
    return {
        "templates": [
            {"id": "full", "name": "完整诊断报告", "description": "包含所有分析维度的详细报告"},
            {"id": "summary", "name": "摘要报告", "description": "核心指标和关键建议的精简版"},
            {"id": "health", "name": "健康度报告", "description": "品牌AI健康度评分和改善建议"},
            {"id": "competitor", "name": "竞品对比报告", "description": "与竞品的AI可见度对比分析"},
        ]
    }
