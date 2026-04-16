import { farms, products } from '../data/mockData.js';
import ApiError from '../utils/ApiError.js';

export const getAllFarms = async () => {
  return farms;
};

export const getFarmBySlug = async (slug) => {
  const farm = farms.find((f) => f.slug === slug);
  if (!farm) throw new ApiError(404, 'Farm not found');
  return farm;
};

export const getFarmProducts = async (slug) => {
  const farm = farms.find((f) => f.slug === slug);
  if (!farm) throw new ApiError(404, 'Farm not found');
  return products.filter((p) => p.farm.name === farm.name);
};