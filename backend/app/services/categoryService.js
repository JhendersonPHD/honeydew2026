import { categories, products } from '../data/mockData.js';
import ApiError from '../utils/ApiError.js';

export const getAllCategories = async () => {
  return categories;
};

export const getCategoryBySlug = async (slug) => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) throw new ApiError(404, 'Category not found');
  const categoryProducts = products.filter((p) => p.category_id === category.id);
  return { ...category, products: categoryProducts };
};