import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  // Sync category filter with URL query params on mount and when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const updateCategoryParam = (categorySlug) => {
    if (categorySlug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categorySlug });
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8018/api';
      
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`)
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Use useMemo for derived state instead of useCallback + useEffect
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?.slug === selectedCategory || p.category_id === parseInt(selectedCategory));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.farm?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.name);
  };

  const handleCategoryChange = (categorySlug) => {
    updateCategoryParam(categorySlug);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  const featuredProducts = filteredProducts.filter(p => p.is_featured);
  const printed3DProducts = filteredProducts.filter(p => p.category?.slug === '3d-printed');
  const newArrivals = filteredProducts.filter(p => p.id >= 25).slice(0, 8);

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <Breadcrumbs />
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">Shop Farm Fresh</h1>
          <p className="text-lg text-gray-600">Browse our selection of fresh produce, eggs, honey & more</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative z-50">
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchQuery ? filteredProducts : []}
            onSuggestionSelect={handleSuggestionSelect}
            placeholder="Search products, farms..."
          />
        </div>

        {/* 3D Printed Products Featured Section */}
        {selectedCategory === 'all' && printed3DProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                <span>🖨️</span> 3D Printed Products
              </h2>
              <Link
                to="/shop?category=3d-printed"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <p className="text-gray-600 mb-4">Handcrafted 3D printed items for the farmstead kitchen, farmers market & home pantry. From beeswax wrap organizers to herb drying racks — all printed with food-safe, eco-friendly PLA in Portland.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {printed3DProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* New Arrivals Section */}
        {selectedCategory === 'all' && newArrivals.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-emerald-600 flex items-center gap-2">
                <span>✨</span> New Arrivals
              </h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                {newArrivals.length} new items just added
              </span>
            </div>
            <p className="text-gray-600 mb-4">Just in from MakerSpace 3D — farm stand displays, kitchen helpers, beekeeping gear, and pantry essentials. All handcrafted in Portland with food-safe, eco-friendly PLA!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <span className="px-2 py-1 text-xs font-bold bg-emerald-500 text-white rounded-full shadow">
                      NEW
                    </span>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.slug
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.slug === '3d-printed' && '🖨️'}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {selectedCategory === 'all' && featuredProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.slug === selectedCategory)?.name || 'Products'}
              <span className="text-gray-500 text-base ml-2">({filteredProducts.length})</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <button
                onClick={() => { handleCategoryChange('all'); setSearchQuery(''); }}
                className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;
