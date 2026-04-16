import { carts, products } from '../data/mockData.js';
import ApiError from '../utils/ApiError.js';

export const getCart = async (userId) => {
  return carts.get(userId) || [];
};

export const addToCart = async (userId, product_id, quantity = 1) => {
  const product = products.find((p) => p.id === product_id);
  if (!product) throw new ApiError(404, 'Product not found');
  const cart = carts.get(userId) || [];
  const existing = cart.find((item) => item.product_id === product_id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product_id, product, quantity });
  }
  carts.set(userId, cart);
  return cart;
};

export const updateCartItem = async (userId, itemId, quantity) => {
  const cart = carts.get(userId) || [];
  const item = cart.find((i) => i.product_id === itemId);
  if (!item) throw new ApiError(404, 'Item not found in cart');
  item.quantity = quantity;
  carts.set(userId, cart);
  return cart;
};

export const removeFromCart = async (userId, itemId) => {
  const cart = carts.get(userId) || [];
  const filtered = cart.filter((i) => i.product_id !== itemId);
  carts.set(userId, filtered);
  return filtered;
};

export const clearCart = async (userId) => {
  carts.delete(userId);
};