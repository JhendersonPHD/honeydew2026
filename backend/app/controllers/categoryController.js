import * as categoryService from '../services/categoryService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  res.json(category);
});