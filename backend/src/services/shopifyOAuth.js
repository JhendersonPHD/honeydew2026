import crypto from 'crypto';

// In a real app, these would come from env vars
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || 'mock_client_id';
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || 'mock_client_secret';

export const generateAuthUrl = (shop, redirectUri) => {
  const nonce = crypto.randomBytes(16).toString('hex');
  const scopes = 'read_products,write_inventory';
  // Mock OAuth URL
  return `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;
};

export const exchangeToken = async (shop, code) => {
  // Mock token exchange
  if (code) {
    return {
      access_token: `shpat_${crypto.randomBytes(16).toString('hex')}`,
      scope: 'read_products,write_inventory'
    };
  }
  throw new Error('Invalid code');
};

export const verifyWebhook = (rawBody, hmacHeader) => {
  const hash = crypto
    .createHmac('sha256', SHOPIFY_CLIENT_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');
  return hash === hmacHeader;
};
