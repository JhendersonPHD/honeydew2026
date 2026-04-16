import { apiClient } from './apiClient';

/**
 * Inventory Service for managing products and stock levels
 */
export const inventoryService = {
  /**
   * Get all products with inventory data
   */
  async getInventory(params = {}) {
    // Construct query string if needed
    const queryStr = new URLSearchParams(params).toString();
    const endpoint = queryStr ? `/products?${queryStr}` : '/products';
    return apiClient.get(endpoint);
  },

  /**
   * Update stock for a specific product
   */
  async updateStock(productId, newQuantity) {
    // Note: The current mock API doesn't have a specific PATCH /products/:id endpoint
    // We'll mock the signature for architecture purposes
    return apiClient.patch(`/products/${productId}`, { inventory_quantity: newQuantity });
  },

  /**
    * Get low stock alerts
    */
  async getLowStock(threshold = 10) {
      const products = await this.getInventory();
      // Mocking low stock filter since backend doesn't provide it directly
      return products.filter(p => (p.inventory_quantity || 0) < threshold);
  }
};

export default inventoryService;