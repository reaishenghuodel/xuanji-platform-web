import httpx
import json
from typing import Optional, Dict, Any

from app.core.config import settings
from app.services.doubao_prompt import BRAND_DIAGNOSIS_SYSTEM_PROMPT


class DoubaoService:
    """豆包 API 服务封装 - 用于品牌分析报告生成"""

    def __init__(self):
        self.api_key = settings.doubao_api_key
        self.base_url = settings.doubao_base_url
        self.model = settings.doubao_model
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    async def generate_brand_diagnosis(
        self,
        brand_name: str,
        industry: str = "",
        website: str = "",
    ) -> Optional[Dict[str, Any]]:
        """
        使用豆包五阶段提示词进行品牌诊断分析
        """
        if not self.api_key:
            return None

        url = f"{self.base_url}/chat/completions"
        
        # 构建用户输入（品牌信息）
        user_input = f"""请对以下品牌进行完整五阶段诊断分析：
品牌名称：{brand_name}
{f"所属行业：{industry}" if industry else ""}
{f"官方网站：{website}" if website else ""}

请严格按照系统提示词中的五阶段分析流程，完整执行 Step 1 → Step 2 → Step 3 → Step 4 → Step 5，输出完整的诊断分析报告。
"""

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": BRAND_DIAGNOSIS_SYSTEM_PROMPT},
                {"role": "user", "content": user_input}
            ],
            "temperature": 0.3,
            "max_tokens": 8000,
        }

        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(url, json=payload, headers=self.headers)
                response.raise_for_status()
                data = response.json()
                
                # 解析返回的内容
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                
                # 尝试提取 JSON
                try:
                    # 查找 JSON 部分
                    start = content.find('{')
                    end = content.rfind('}') + 1
                    if start >= 0 and end > start:
                        json_str = content[start:end]
                        parsed = json.loads(json_str)
                        parsed["raw_content"] = content  # 保留完整原文
                        return parsed
                except:
                    pass
                
                return {"raw_content": content}
        except Exception as e:
            print(f"豆包 API 调用失败: {e}")
            return None

    async def generate_brand_report(
        self,
        brand_name: str,
        industry: str = "",
        website: str = "",
    ) -> Optional[Dict[str, Any]]:
        """
        使用豆包模型生成品牌分析报告（简化版）
        """
        if not self.api_key:
            return None

        url = f"{self.base_url}/chat/completions"
        
        prompt = f"""请为品牌 "{brand_name}" 生成一份专业的 AI 搜索可见度分析报告。
        {f"行业：{industry}" if industry else ""}
        {f"官网：{website}" if website else ""}
        
        报告需要包含以下内容：
        1. 品牌概述（品牌定位、核心价值）
        2. AI 搜索可见度评估（综合评分 0-100）
        3. 各平台表现分析（DeepSeek、文心一言、通义千问、豆包、Kimi 等）
        4. 竞品对比分析
        5. 优化建议（具体可执行）
        6. 内容策略建议
        
        请返回 JSON 格式：
        {{
            "brand_name": "品牌名",
            "overall_score": 0-100,
            "visibility": 0-100,
            "accuracy": 0-100,
            "coverage": 0-100,
            "platform_analysis": [
                {{"name": "平台名", "score": 0-100, "status": "found/missing", "insights": "分析"}}
            ],
            "suggestions": ["建议1", "建议2", "建议3"],
            "content_strategy": "内容策略建议",
            "competitor_analysis": "竞品分析摘要"
        }}
        """

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "你是一位专业的品牌分析师，擅长分析品牌在 AI 搜索中的表现，并生成专业的诊断报告。"},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 4000,
        }

        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(url, json=payload, headers=self.headers)
                response.raise_for_status()
                data = response.json()
                
                # 解析返回的内容
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                
                # 尝试提取 JSON
                try:
                    # 查找 JSON 部分
                    start = content.find('{')
                    end = content.rfind('}') + 1
                    if start >= 0 and end > start:
                        json_str = content[start:end]
                        return json.loads(json_str)
                except:
                    pass
                
                return {"raw_content": content}
        except Exception as e:
            print(f"豆包 API 调用失败: {e}")
            return None


doubao_service = DoubaoService()
