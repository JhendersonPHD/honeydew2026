import express from 'express';
import cors from 'cors';
import routes from '../app/routes/index.js';
import { loggerMiddleware } from '../app/middleware/logger.js';
import { errorHandler, notFoundHandler } from '../app/middleware/errorHandler.js';
import { authenticate } from '../app/middleware/auth.js';
import { products } from '../app/data/mockData.js';

const app = express();
const PORT = 8018;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// ─── API Routes ──────────────────────────────────────────────────────────────

// Mount v1 routes
app.use('/api/v1', routes);

// Mount backward-compatible aliases
app.use('/api', routes);

// ─── Shopify Sync (mock) - kept for backward compatibility ───────────────────

app.post('/api/shopify/sync', authenticate, (req, res) => {
  res.json({ status: 'synced', products_synced: products.length, timestamp: new Date().toISOString() });
});

app.get('/api/shopify/status', authenticate, (req, res) => {
  res.json({ connected: true, last_sync: new Date().toISOString(), product_count: products.length });
});

app.post('/api/v1/shopify/sync', authenticate, (req, res) => {
  res.json({ status: 'synced', products_synced: products.length, timestamp: new Date().toISOString() });
});

app.get('/api/v1/shopify/status', authenticate, (req, res) => {
  res.json({ connected: true, last_sync: new Date().toISOString(), product_count: products.length });
});

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error Handling ───────────────────────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`HoneyDew 2026 API running on http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`v1 API: http://localhost:${PORT}/api/v1/health`);
});