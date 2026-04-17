# HoneyDew 2026 Deployment Guide

## Current Status
- **Frontend**: Built and ready for deployment (`dist/` exists)
- **Backend**: Running locally on port 8018, needs cloud deployment
- **Issue**: DevOps-Engineer non-responsive, S9 blocked

---

## Deployment Solution

### Option 1: Netlify (Recommended for Frontend)

1. Connect repo to Netlify
2. Settings in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist/`
3. Set environment variable:
   - `VITE_API_URL` = your backend URL (e.g., `https://honeydew-api.onrender.com`)

### Option 2: Vercel (Alternative)

1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json`:
```json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "https://honeydew-api.onrender.com/api/$1" }
  ]
}
```

---

## Backend Deployment (Required)

The backend MUST be deployed before the frontend, as the frontend needs `VITE_API_URL`.

### Render (Recommended)

1. Create account at render.com
2. New Web Service → Connect repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Environment Variables:
   - `JWT_SECRET_KEY` = generate with `openssl rand -hex 32`
   - `NODE_ENV` = `production`
   - `ALLOWED_ORIGIN` = your frontend URL (e.g., `https://honeydew.netlify.app`)

### Railway (Alternative)

1. Create project at railway.app
2. Add Node.js service
3. Set environment variables
4. Deploy

### Fly.io (Alternative)

1. Create `Dockerfile` in backend (already exists)
2. `fly launch`
3. `fly deploy`

---

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```
JWT_SECRET_KEY=your-generated-secret
NODE_ENV=production
ALLOWED_ORIGIN=https://your-frontend-url.netlify.app
PORT=8080
```

---

## Quick Deploy Commands

### Frontend (Netlify)
```bash
cd frontend
npm install
npm run build
netlify deploy --prod
```

### Backend (Render)
```bash
cd backend
npm install
render deploy
```

---

## Verification Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct `VITE_API_URL`
- [ ] CORS configured on backend (ALLOWED_ORIGIN)
- [ ] Health check: `https://api-url/api/health`
- [ ] Frontend loads without API errors

---

## CTO Notes

- The `netlify.toml` created includes API proxy rules, but the cleanest approach is using `VITE_API_URL`
- The apiClient.js has been updated to use `import.meta.env.VITE_API_URL`
- Build the frontend AFTER setting VITE_API_URL for proper API URL embedding
