# HoneyDew2026 Environment Variables Guide

## Required Variables

```bash
# Backend
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./honeydew.db
CORS_ORIGINS=http://localhost:3021,http://localhost:3017

# Frontend  
VITE_API_URL=http://localhost:8018/api
VITE_API_PROXY_URL=http://localhost:3016
```

## Optional Variables

```bash
# Backend (optional)
LOG_LEVEL=INFO
API_RATE_LIMIT=100

# Frontend (optional)
VITE_APP_NAME=HoneyDew2026
VITE_APP_VERSION=1.0.0
```

## Generate Secret Key

```bash
# Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# OpenSSL
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Variable Descriptions

| Variable | Default | Description |
|----------|---------|-------------|
| SECRET_KEY | — | Required. Secret key for JWT/sessions |
| DATABASE_URL | sqlite:// | Database connection URL |
| CORS_ORIGINS | localhost:* | Allowed CORS origins |
| LOG_LEVEL | INFO | Logging level (DEBUG, INFO, WARNING, ERROR) |
| API_RATE_LIMIT | 100 | Max requests per minute |
| VITE_API_URL | /api | Backend API URL |
| VITE_API_PROXY_URL | — | Frontend proxy URL |

## Security Notes

1. **Never commit secrets** - Add `.env` to `.gitignore`
2. **Use strong keys** - At least 32 characters
3. **Rotate keys** - Change periodically in production
4. **Use different keys** - Different for dev/staging/prod