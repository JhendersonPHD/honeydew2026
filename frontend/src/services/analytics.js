import { apiClient } from './apiClient';

/**
 * Analytics Service for fetching and calculating sales and product analytics
 */
export const analyticsService = {
  /**
   * Get overall sales summary
   */
  async getSalesSummary(dateRange = '30d') {
    // In a real app, we'd pass the dateRange as a query param
    // Since our backend mock doesn't have an explicit analytics endpoint,
    // we'll calculate it from orders for demonstration
    const orders = await apiClient.get('/orders');

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrders = orders.length;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    };
  },

  /**
   * Get top selling products
   */
  async getTopProducts() {
     // Mocking top products by fetching all products and taking featured ones
     // Or we could aggregate from orders if we wanted to be more precise
     const products = await apiClient.get('/products/featured');
     return products.slice(0, 5); // Return top 5
  }
};

export default analyticsService;