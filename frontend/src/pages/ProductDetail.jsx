import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', body: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [authToken] = useState(localStorage.getItem('token') || null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8018/api';

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productRes, allProductsRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/products/${slug}`),
        fetch(`${API_URL}/products`),
        product ? fetch(`${API_URL}/reviews?product_id=${product.id}`) : Promise.resolve({ ok: false })
      ]);

      if (!productRes.ok) {
        throw new Error('Product not found');
      }

      const productData = await productRes.json();
      const allProductsData = await allProductsRes.json();

      setProduct(productData);
      setAvgRating(productData.avg_rating);
      setReviewCount(productData.review_count || 0);

      // Fetch reviews separately (needs product id)
      if (reviewsRes && reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.reviews || []);
      } else {
        // Fetch reviews after we have product
        const r = await fetch(`${API_URL}/reviews?product_id=${productData.id}`);
        if (r.ok) {
          const reviewsData = await r.json();
          setReviews(reviewsData.reviews || []);
        }
      }

      // Get related products (same category, excluding current)
      const related = allProductsData
        .filter(p => p.category_id === productData.category_id && p.id !== productData.id)
        .slice(0, 4);
      setRelatedProducts(related);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/reviews?product_id=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setAvgRating(data.avg_rating);
        setReviewCount(data.review_count || 0);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleAddToCart = async () => {
    if (!authToken) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/products/${slug}` } });
      return;
    }
    setAddingToCart(true);
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ product_id: product.id, quantity })
      });
      if (res.ok) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      } else {
        const err = await res.json();
        console.error('Add to cart failed:', err.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!authToken) {
      setReviewError('Please log in to submit a review');
      return;
    }
    setSubmittingReview(true);
    setReviewError(null);
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ product_id: product.id, ...reviewForm })
      });
      if (res.ok) {
        setReviewSubmitted(true);
        setShowReviewForm(false);
        setReviewForm({ rating: 5, title: '', body: '' });
        // Refresh reviews
        const r = await fetch(`${API_URL}/reviews?product_id=${product.id}`);
        if (r.ok) {
          const data = await r.json();
          setReviews(data.reviews || []);
          setAvgRating(data.avg_rating);
          setReviewCount(data.review_count || 0);
        }
      } else {
        const err = await res.json();
        setReviewError(err.error || 'Failed to submit review');
      }
    } catch (err) {
      setReviewError('Network error. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatPrice = (price, unit) => {
    return `$${price.toFixed(2)}`;
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type={interactive ? 'button' : undefined}
        onClick={interactive && onRate ? () => onRate(i + 1) : undefined}
        className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
        disabled={!interactive}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto p-4 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg font-medium">
            Back to Shop
          </Link>
        </div>
      </PageTransition>
    );
  }

  if (!product) return null;

  const images = product.images?.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800'];

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-500">
            <li>
              <Link to="/" className="hover:text-emerald-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
            </li>
            <li>/</li>
            <li>
              <Link to={`/shop?category=${product.category?.slug}`} className="hover:text-emerald-600">
                {product.category?.name || 'Products'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_featured && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                  ⭐ Featured
                </span>
              )}
              {product.is_seasonal && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                  🌱 Seasonal
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-amber-500 ring-2 ring-amber-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Farm Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                🏡 {product.farm?.name || 'Local Farm'}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                {product.category?.name || 'Product'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-amber-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-gray-500">/ {product.unit}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {avgRating ? renderStars(Math.round(avgRating)) : <span className="text-gray-400 text-sm">No ratings yet</span>}
              </div>
              {avgRating && (
                <span className="text-gray-600">
                  {avgRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray">
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-medium text-gray-800 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  addedToCart
                    ? 'bg-emerald-500 text-white'
                    : addingToCart
                    ? 'bg-gray-400 text-white cursor-wait'
                    : 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow-lg'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : addingToCart ? 'Adding...' : '🛒 Add to Cart'}
              </button>
              <button className="py-4 px-6 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:border-amber-500 hover:text-amber-600 transition-colors">
                ♥ Add to Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <h3 className="font-semibold text-gray-800">Product Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Unit</span>
                  <span className="font-medium text-gray-800">{product.unit}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-800">{product.category?.name}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Farm</span>
                  <span className="font-medium text-gray-800">{product.farm?.name}</span>
                </div>
                <div className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Availability</span>
                  <span className="font-medium text-emerald-600">{product.is_active !== false ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <h4 className="font-semibold text-emerald-800">Free Local Delivery</h4>
                  <p className="text-sm text-emerald-700">Free delivery on orders from partner farms in your area.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 pt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews {avgRating ? `(${reviewCount})` : ''}
            </h2>
            {authToken && !reviewSubmitted && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            )}
            {!authToken && (
              <span className="text-sm text-gray-500">Log in to write a review</span>
            )}
          </div>

          {/* Write Review Form */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Share your experience</h3>
              {reviewError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {reviewError}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {renderStars(reviewForm.rating, true, (r) => setReviewForm(f => ({ ...f, rating: r })))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Summarize your experience"
                  maxLength={100}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                  value={reviewForm.body}
                  onChange={(e) => setReviewForm(f => ({ ...f, body: e.target.value }))}
                  placeholder="Tell others about this product..."
                  rows={4}
                  maxLength={500}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submittingReview}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
                        {review.user_name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.user_name}</p>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500 ml-1">{review.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{review.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={p.images?.[0] || 'https://via.placeholder.com/400'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-600 font-medium mb-1">{p.farm?.name}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-lg font-bold text-amber-600">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
