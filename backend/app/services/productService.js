import { products, categories } from '../data/mockData.js';
import ApiError from '../utils/ApiError.js';

export const getProducts = async (query) => {
  const { category, farm, search } = query;
  let result = [...products];

  if (category) {
    const cat = categories.find((c) => c.slug === category || c.id === parseInt(category));
    if (cat) result = result.filter((p) => p.category_id === cat.id);
  }
  if (farm) {
    result = result.filter((p) => p.farm.name.toLowerCase().includes(farm.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  return result;
};

export const getFeaturedProducts = async () => {
  return products.filter((p) => p.is_featured);
};

export const searchProducts = async (q) => {
  if (!q) return [];
  const query = q.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.name.toLowerCase().includes(query)
  );
};

export const getProductBySlug = async (slug) => {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};