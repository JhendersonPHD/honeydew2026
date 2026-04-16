import * as farmService from '../services/farmService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getFarms = asyncHandler(async (req, res) => {
  const farms = await farmService.getAllFarms();
  res.json(farms);
});

export const getFarm = asyncHandler(async (req, res) => {
  const farm = await farmService.getFarmBySlug(req.params.slug);
  res.json(farm);
});

export const getProductsForFarm = asyncHandler(async (req, res) => {
  const products = await farmService.getFarmProducts(req.params.slug);
  res.json(products);
});