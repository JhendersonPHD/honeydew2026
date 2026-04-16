import * as cartService from '../services/cartService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;
  const cart = await cartService.addToCart(req.user.id, product_id, quantity);
  res.json(cart);
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartService.updateCartItem(req.user.id, parseInt(req.params.id), quantity);
  res.json(cart);
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await cartService.removeFromCart(req.user.id, parseInt(req.params.id));
  res.json(cart);
});