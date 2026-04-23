import express from 'express';
import { authenticate } from '../../src/middleware/auth.js';

const router = express.Router();

// Mock products data - in production this would come from database
const products = [];

/**
 * POST /api/shopify/sync
 * Sync products with Shopify
 * Requires authentication
 */
router.post('/sync', authenticate, (req, res) => {
  try {
    // In production, this would:
    // 1. Fetch products from Shopify Admin API
    // 2. Update local database with Shopify product data
    // 3. Sync inventory levels
    // 4. Return sync results
    
    res.json({ 
      status: 'synced', 
      products_synced: products.length, 
      timestamp: new Date().toISOString(),
      message: 'Products synced successfully with Shopify'
    });
  } catch (error) {
    console.error('Shopify sync error:', error);
    res.status(500).json({ 
      error: 'Sync failed',
      message: error.message 
    });
  }
});

/**
 * GET /api/shopify/status
 * Get Shopify connection status
 * Requires authentication
 */
router.get('/status', authenticate, (req, res) => {
  try {
    // In production, this would:
    // 1. Check Shopify API connectivity
    // 2. Verify OAuth tokens are valid
    // 3. Return last sync timestamp and product count
    
    res.json({ 
      connected: true, 
      last_sync: new Date().toISOString(), 
      product_count: products.length,
      store_url: process.env.SHOPIFY_STORE_URL || 'not_configured'
    });
  } catch (error) {
    console.error('Shopify status error:', error);
    res.status(500).json({ 
      error: 'Status check failed',
      connected: false
    });
  }
});

/**
 * POST /api/shopify/webhook
 * Generic webhook handler for Shopify events
 * Note: Specific webhook routes are defined in server.js for raw body handling
 */
router.post('/webhook', authenticate, (req, res) => {
  const { topic, payload } = req.body;
  
  console.log(`Shopify webhook received: ${topic}`);
  
  // Handle different webhook topics
  switch (topic) {
    case 'products/create':
    case 'products/update':
    case 'products/delete':
      // Handle product webhooks
      console.log(`Product event: ${topic}`);
      break;
    case 'inventory_levels/update':
      // Handle inventory updates
      console.log(`Inventory update: ${topic}`);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }
  
  res.status(200).json({ received: true });
});

export default router;
