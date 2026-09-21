# app/routers/monitoring.py
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta
import random

router = APIRouter()


class MonitorQuery(BaseModel):
    brand_name: str
    platforms: list[str] = []
    start_date: str = ""
    end_date: str = ""


class MonitorResult(BaseModel):
    brand_name: str
    total_mentions: int
    recommend_rate: float
    platforms: list
    trend: list
    top_queries: list


@router.post("/brand")
async def monitor_brand(request: MonitorQuery):
    """
    监测品牌在各AI平台的表现
    """
    platforms = request.platforms or ["DeepSeek", "文心一言", "通义千问", "ChatGPT", "豆包", "Kimi"]

    platform_results = []
    for p in platforms:
        platform_results.append({
            "name": p,
            "mentions": random.randint(50, 500),
            "recommend_rate": round(random.uniform(30, 85), 1),
            "trend": random.choice(["up", "down", "stable"]),
            "sentiment": random.choice(["positive", "neutral", "negative"]),
        })

    # 生成7天趋势数据
    trend = []
    for i in range(7):
        date = (datetime.now() - timedelta(days=6-i)).strftime("%m-%d")
        trend.append({
            "date": date,
            "mentions": random.randint(100, 300),
            "recommend_rate": round(random.uniform(40, 75), 1),
        })

    top_queries = [
        {"query": f"{request.brand_name}怎么样", "frequency": "高频"},
        {"query": f"{request.brand_name}评测", "frequency": "中频"},
        {"query": f"{request.brand_name}和竞品对比", "frequency": "中频"},
        {"query": f"{request.brand_name}价格", "frequency": "低频"},
    ]

    return MonitorResult(
        brand_name=request.brand_name,
        total_mentions=sum(p["mentions"] for p in platform_results),
        recommend_rate=round(sum(p["recommend_rate"] for p in platform_results) / len(platform_results), 1),
        platforms=platform_results,
        trend=trend,
        top_queries=top_queries,
    )


@router.get("/platforms")
async def get_supported_platforms():
    """
    获取支持的AI平台列表
    """
    return {
        "platforms": [
            {"id": "deepseek", "name": "DeepSeek", "status": "active", "region": "国内"},
            {"id": "wenxin", "name": "文心一言", "status": "active", "region": "国内"},
            {"id": "tongyi", "name": "通义千问", "status": "active", "region": "国内"},
            {"id": "chatgpt", "name": "ChatGPT", "status": "active", "region": "国际"},
            {"id": "doubao", "name": "豆包", "status": "active", "region": "国内"},
            {"id": "kimi", "name": "Kimi", "status": "active", "region": "国内"},
            {"id": "perplexity", "name": "Perplexity", "status": "active", "region": "国际"},
            {"id": "gemini", "name": "Gemini", "status": "active", "region": "国际"},
        ]
    }
