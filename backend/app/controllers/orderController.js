import * as orderService from '../services/orderService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shipping_address, payment_method } = req.body;
  const order = await orderService.createOrder(req.user.id, items, shipping_address, payment_method);
  res.json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const userOrders = await orderService.getUserOrders(req.user.id);
  res.json(userOrders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.user.id, parseInt(req.params.id));
  res.json(order);
});