import * as productService from '../services/productService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts(req.query);
  res.json(products);
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await productService.getFeaturedProducts();
  res.json(products);
});

export const searchProducts = asyncHandler(async (req, res) => {
  const products = await productService.searchProducts(req.query.q);
  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);
  res.json(product);
});