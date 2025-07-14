import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';

export function Products() {
  const { state, dispatch } = useApp();
  const { isGreenMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌿' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
    { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'food', name: 'Food & Beverages', icon: '🍃' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🧘' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = state.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(state.filters.search.toLowerCase());
      const matchesEcoScore = product.ecoScore >= state.filters.minEcoScore;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesEcoScore && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'carbon-asc':
          return a.carbonImpact - b.carbonImpact;
        case 'carbon-desc':
          return b.carbonImpact - a.carbonImpact;
        case 'eco-score':
          return b.ecoScore - a.ecoScore;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [state.products, state.filters, selectedCategory]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    hasNextPage,
    hasPrevPage,
    resetPage
  } = usePagination(filteredAndSortedProducts, 12);

  // Reset pagination when filters change
  React.useEffect(() => {
    resetPage();
  }, [state.filters, selectedCategory, resetPage]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-6 p-12 ${
          isGreenMode
            ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
            : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-gray-900'
        }`}
      >
        <h1 className="text-5xl font-bold">
          {isGreenMode ? 'Sustainable Products 🌱' : 'Great Value Products 🛒'}
        </h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          {isGreenMode 
            ? 'Discover eco-friendly alternatives that reduce your carbon footprint while maintaining quality and style.'
            : 'Save money. Live better. Find everything you need at unbeatable prices with fast, free delivery.'
          }
        </p>
        
        {/* Promotional banners */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {isGreenMode ? (
            <>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🌍 Carbon Neutral Shipping
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                ♻️ 100% Sustainable Materials
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🌱 Plant a Tree with Every Order
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🚚 Free 2-Day Shipping
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                💰 Rollback Prices
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🏪 Free Store Pickup
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isGreenMode
                  ? selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                  : selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={state.filters.search}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Eco Score Filter (only in green mode) */}
          {isGreenMode && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={state.filters.minEcoScore}
                onChange={(e) => dispatch({ type: 'SET_MIN_ECO_SCORE', payload: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value={0}>All Eco Scores</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          )}

          {/* Sort */}
          <div className="relative">
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={state.filters.sortBy}
              onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value as any })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
            >
              {isGreenMode ? (
                <>
                  <option value="eco-score">Sort by Eco Score</option>
                  <option value="carbon-asc">Carbon Impact (Low to High)</option>
                  <option value="carbon-desc">Carbon Impact (High to Low)</option>
                </>
              ) : (
                <>
                  <option value="eco-score">Sort by Rating</option>
                  <option value="carbon-asc">Price (Low to High)</option>
                  <option value="carbon-desc">Price (High to Low)</option>
                </>
              )}
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                isGreenMode
                  ? viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  : viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                isGreenMode
                  ? viewMode === 'list'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  : viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredAndSortedProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {paginatedData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />

      {/* Results Summary */}
      {filteredAndSortedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 dark:text-gray-300"
        >
          Showing {paginatedData.length} of {filteredAndSortedProducts.length} products 
          {filteredAndSortedProducts.length !== state.products.length && ` (${state.products.length} total)`}
        </motion.div>
      )}
    </div>
  );
}