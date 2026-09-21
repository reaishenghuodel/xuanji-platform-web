# app/core/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_env: str = "development"
    debug: bool = True
    secret_key: str = "change-me"
    
    # DeepSeek (用于分析)
    deepseek_api_key: str = "YOUR_DEEPSEEK_API_KEY"
    deepseek_base_url: str = "https://api.deepseek.com"
    deepseek_model: str = "deepseek-v4-flash"
    
    # 豆包 (用于品牌分析报告)
    doubao_api_key: str = "YOUR_VOLCENGINE_API_KEY"
    doubao_base_url: str = "https://ark.cn-beijing.volces.com/api/v3"
    doubao_model: str = "doubao-seed-2-0-mini-260428"
    
    # Redis
    redis_url: str = "redis://localhost:6379/0"
    
    # Database
    database_url: str = "postgresql://xuanji:xuanji@localhost:5432/xuanji"
    
    # Celery
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
