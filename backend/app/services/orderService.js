import { orders } from '../data/mockData.js';
import { clearCart } from './cartService.js';
import ApiError from '../utils/ApiError.js';

export const createOrder = async (userId, items, shipping_address, payment_method) => {
  if (!items || items.length === 0) {
    throw new ApiError(400, 'No items in order');
  }
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const order = {
    id: orders.length + 1,
    order_number: `HD-${Date.now().toString(36).toUpperCase()}`,
    user_id: userId,
    status: 'confirmed',
    subtotal,
    shipping_cost: 0,
    tax: 0,
    total: subtotal,
    shipping_address,
    payment_method: payment_method || 'mock',
    payment_status: 'paid',
    notes: '',
    items,
    created_at: new Date().toISOString(),
  };
  orders.push(order);
  await clearCart(userId);
  return order;
};

export const getUserOrders = async (userId) => {
  return orders.filter((o) => o.user_id === userId);
};

export const getOrderById = async (userId, orderId) => {
  const order = orders.find((o) => o.id === orderId && o.user_id === userId);
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};