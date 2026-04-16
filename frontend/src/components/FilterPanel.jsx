import React, { useState } from 'react';

const FilterPanel = ({ categories = [], farms = [], onFilterChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    farm: initialFilters.farm || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    rating: initialFilters.rating || 0,
    inStockOnly: initialFilters.inStockOnly || false,
    ...initialFilters
  });

  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'relevance');

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters, sortBy);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    if (onFilterChange) {
      onFilterChange(filters, value);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      farm: '',
      minPrice: '',
      maxPrice: '',
      rating: 0,
      inStockOnly: false
    };
    setFilters(clearedFilters);
    setSortBy('relevance');
    if (onFilterChange) {
      onFilterChange(clearedFilters, 'relevance');
    }
  };

  const hasActiveFilters = 
    filters.category || 
    filters.farm || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.rating > 0 || 
    filters.inStockOnly;

  const SortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const RatingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between py-2 text-gray-700"
      >
        <span className="font-medium">Filters</span>
        <svg className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        {/* Sort Dropdown - Always visible */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
          >
            {SortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <h3 className="font-medium text-gray-900 mb-3">Filters</h3>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id || cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Farm Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Farm</label>
            <select
              value={filters.farm}
              onChange={(e) => handleChange('farm', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
            >
              <option value="">All Farms</option>
              {farms.map((farm) => (
                <option key={farm.id || farm.slug} value={farm.slug}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
                min="0"
                step="0.01"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
            >
              {RatingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Only */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => handleChange('inStockOnly', e.target.checked)}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-200"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;