# app/services/deepseek.py
import httpx
from typing import Optional, Dict, Any

from app.core.config import settings


class DeepSeekService:
    """DeepSeek API 服务封装"""

    def __init__(self):
        self.api_key = settings.deepseek_api_key
        self.base_url = settings.deepseek_base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    async def chat_completion(
        self,
        messages: list,
        model: str = "deepseek-chat",
        temperature: float = 0.7,
        max_tokens: int = 2000,
    ) -> Optional[Dict[str, Any]]:
        """
        调用 DeepSeek Chat API
        """
        if not self.api_key:
            return None

        url = f"{self.base_url}/chat/completions"
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(url, json=payload, headers=self.headers)
                response.raise_for_status()
                return response.json()
        except Exception as e:
            print(f"DeepSeek API 调用失败: {e}")
            return None

    async def query_brand_mention(self, brand_name: str, industry: str = "") -> Optional[Dict[str, Any]]:
        """
        查询品牌在 DeepSeek 中的被提及情况
        """
        prompt = f"""
请搜索并分析品牌 "{brand_name}"{f"（行业：{industry}）" if industry else ""} 在公开信息中的口碑和知名度。
请返回以下JSON格式：
{{
  "brand_name": "品牌名",
  "mention_count": "被提及次数估算",
  "sentiment": "positive/neutral/negative",
  "key_attributes": ["消费者最常提及的3个属性"],
  "recommendation_score": "推荐度评分0-100",
  "platforms": ["品牌出现的主要平台"]
}}
"""

        messages = [
            {"role": "system", "content": "你是一个专业的品牌分析助手，擅长分析品牌在AI搜索和社交媒体中的表现。"},
            {"role": "user", "content": prompt},
        ]

        return await self.chat_completion(messages, model="deepseek-chat", temperature=0.3)

    async def get_brand_diagnosis(self, brand_name: str, website: str = "", industry: str = "") -> Optional[Dict[str, Any]]:
        """
        获取品牌AI可见度诊断
        """
        prompt = f"""
请对品牌 "{brand_name}"{f"（行业：{industry}）" if industry else ""} 进行AI搜索可见度诊断。
{f"品牌官网：{website}" if website else ""}

请分析以下内容并返回JSON格式：
1. 品牌在主要AI平台（DeepSeek、ChatGPT等）中的被提及情况
2. 品牌推荐率和准确性
3. 品牌数字资产完整性（官网、百科、社交媒体等）
4. 主要竞争对手的AI可见度对比
5. 具体优化建议

返回格式：
{{
  "overall_score": 0-100,
  "visibility": 0-100,
  "accuracy": 0-100,
  "coverage": 0-100,
  "suggestions": ["建议1", "建议2", "建议3"]
}}
"""

        messages = [
            {"role": "system", "content": "你是一个专业的GEO（生成式引擎优化）顾问，擅长分析品牌在AI搜索中的表现并提供优化建议。"},
            {"role": "user", "content": prompt},
        ]

        return await self.chat_completion(messages, model="deepseek-chat", temperature=0.3, max_tokens=3000)


deepseek_service = DeepSeekService()
