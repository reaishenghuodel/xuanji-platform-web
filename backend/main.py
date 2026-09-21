from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import diagnosis, monitoring, report


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 璇玑智科后端服务启动")
    yield
    # Shutdown
    print("🛑 璇玑智科后端服务关闭")


app = FastAPI(
    title="璇玑智科 AI 搜索可见度平台 API",
    description="中国企业的AI搜索可见度管家 - 后端服务",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制为具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(diagnosis.router, prefix="/api/v1/diagnosis", tags=["诊断"])
app.include_router(monitoring.router, prefix="/api/v1/monitoring", tags=["监测"])
app.include_router(report.router, prefix="/api/v1/report", tags=["报告"])


@app.get("/")
async def root():
    return {
        "name": "璇玑智科 AI 搜索可见度平台",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
