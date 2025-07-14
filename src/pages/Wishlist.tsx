import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart as CartIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { BackButton } from '../components/BackButton';

export function Wishlist() {
  const { state, dispatch } = useApp();

  const moveAllToCart = () => {
    state.wishlist.forEach(product => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    });
  };

  if (state.wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">💚</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Save products you love for later by clicking the heart icon!
        </p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Heart size={20} />
          <span>Browse Products</span>
        </motion.a>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <BackButton to="/" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Wishlist 💚
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
          
          {state.wishlist.length > 0 && (
            <motion.button
              onClick={moveAllToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <CartIcon size={18} />
              <span>Add All to Cart</span>
            </motion.button>
          )}
        </div>
      </motion.div>
      {/* Wishlist Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>

      {/* Wishlist Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
          💡 Wishlist Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">•</span>
            <span className="text-green-700 dark:text-green-300">
              Items in your wishlist are saved across sessions
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">•</span>
            <span className="text-green-700 dark:text-green-300">
              We'll notify you of price drops and eco-score improvements
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">•</span>
            <span className="text-green-700 dark:text-green-300">
              Share your wishlist with friends for gift ideas
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">•</span>
            <span className="text-green-700 dark:text-green-300">
              Use the bulk "Add All to Cart" feature for quick checkout
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}