# 璇玑智科 FastAPI 后端服务

## 技术栈

- **FastAPI** - 高性能异步Web框架
- **Pydantic** - 数据校验和序列化
- **HTTPX** - 异步HTTP客户端
- **Celery + Redis** - 任务队列
- **SQLAlchemy + PostgreSQL** - 数据持久化
- **Alembic** - 数据库迁移

## 快速开始

### 1. 环境准备

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API 密钥
```

### 3. 启动服务

```bash
# 开发模式
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 生产模式
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4. 访问 API 文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API 端点

### 诊断 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/v1/diagnosis/ | 创建品牌诊断 |

### 监测 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/v1/monitoring/brand | 监测品牌表现 |
| GET | /api/v1/monitoring/platforms | 获取支持的平台列表 |

### 报告 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/v1/report/generate | 生成诊断报告 |
| GET | /api/v1/report/templates | 获取报告模板 |

## 部署

### Docker 部署

```bash
# 构建镜像
docker build -t xuanji-backend .

# 运行容器
docker run -d -p 8000:8000 --env-file .env xuanji-backend
```

### Docker Compose 部署

```bash
docker-compose up -d
```

## 数据采集

### 定时任务（Celery）

```bash
# 启动 Celery Worker
celery -A tasks worker --loglevel=info

# 启动 Celery Beat（定时任务调度）
celery -A tasks beat --loglevel=info
```

## 开发计划

- [x] FastAPI 基础框架
- [x] 诊断 API
- [x] 监测 API
- [x] 报告 API
- [ ] DeepSeek API 真实接入
- [ ] 数据库模型设计
- [ ] 用户认证（JWT）
- [ ] 数据采集定时任务
- [ ] 企业微信/飞书通知推送
