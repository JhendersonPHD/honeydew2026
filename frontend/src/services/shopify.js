import { apiClient } from './apiClient';

/**
 * Shopify Service for interacting with Shopify API mock endpoints
 * Handles rate limiting and specific shopify business logic
 */

class ShopifyRateLimitError extends Error {
  constructor(message, retryAfter) {
    super(message);
    this.name = 'ShopifyRateLimitError';
    this.retryAfter = retryAfter;
  }
}

export const shopifyService = {
  /**
   * Helper to execute API calls with basic rate limit retry logic
   */
  async withRetry(apiCall, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await apiCall();
      } catch (error) {
        // Mocking rate limit detection (status 429)
        if (error.status === 429) {
          retries++;
          if (retries >= maxRetries) throw new ShopifyRateLimitError('Max retries exceeded for Shopify API', 0);

          // Wait before retrying (exponential backoff mock)
          const waitTime = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw error;
        }
      }
    }
  },

  /**
   * Sync products with Shopify
   */
  async syncProducts() {
    return this.withRetry(() => apiClient.post('/shopify/sync'));
  },

  /**
   * Get Shopify connection status
   */
  async getStatus() {
    return this.withRetry(() => apiClient.get('/shopify/status'));
  }
};

export default shopifyService;