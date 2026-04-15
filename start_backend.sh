#!/bin/bash
# Start HoneyDew 2026 Backend
# Usage: ./start_backend.sh

cd /home/jonathon/VexPivot/projects/honeydew2026/backend

# Set JWT secret if not set
export JWT_SECRET_KEY="${JWT_SECRET_KEY:-honeydew2026_dev_secret_change_in_production}"

# Kill any existing process on port 8017
lsof -ti:8017 | xargs kill -9 2>/dev/null || true

# Start backend on port 8017 (as per README, not run.py's 8018)
nohup python -c "
import uvicorn
import sys
sys.path.insert(0, '.')
from app.main import app
uvicorn.run(app, host='0.0.0.0', port=8017, reload=False)
" > backend.log 2>&1 &

echo "Backend starting on port 8017..."
sleep 3

# Verify
if curl -s http://localhost:8017/api/health > /dev/null 2>&1; then
    echo "Backend is running on http://localhost:8017"
    echo "Health: $(curl -s http://localhost:8017/api/health)"
else
    echo "Backend failed to start. Check backend.log"
fi
