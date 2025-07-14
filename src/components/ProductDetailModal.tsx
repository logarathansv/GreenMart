import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  Leaf, 
  ShoppingCart, 
  Heart,
  ArrowUpDown,
  CheckCircle
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  
  const isInCart = state.cart.some(item => item.id === product.id);
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!authState.isAuthenticated) {
      toast.error('Please login to add items to cart 🔐');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleToggleWishlist = () => {
    if (!authState.isAuthenticated) {
      toast.error('Please login to add items to wishlist 💚');
      return;
    }
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast.success('Removed from wishlist');
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist! 💚');
    }
  };

  const handleSwapToAlternative = () => {
    if (product.alternative) {
      if (isInCart) {
        const alternativeProduct: Product = {
          ...product,
          id: product.alternative.id,
          name: product.alternative.name,
          carbonImpact: product.alternative.carbonImpact,
          ecoScore: product.alternative.ecoScore,
        };
        dispatch({ 
          type: 'SWAP_TO_ALTERNATIVE', 
          payload: { 
            originalId: product.id, 
            alternative: alternativeProduct 
          } 
        });
        toast.success(`Switched to ${product.alternative.name}! 🔄`);
      } else {
        toast.error('Add the product to cart first to switch alternatives 🛒');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Product Details
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Product Image */}
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                    ₹{product.price}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="text-yellow-400" size={20} fill="currentColor" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Eco Score
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.ecoScore}/5
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Leaf className="text-green-500" size={20} />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Carbon Impact
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.carbonImpact} kg CO₂
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Sustainability Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Sustainability Highlights
                    </h4>
                    <div className="space-y-2">
                      {product.sustainabilityHighlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alternative Product */}
                  {product.alternative && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Greener Alternative Available
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.alternative.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {product.alternative.carbonImpact} kg CO₂ • Eco Score: {product.alternative.ecoScore}/5
                          </p>
                        </div>
                        <button 
                          onClick={handleSwapToAlternative}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                        >
                          <ArrowUpDown size={14} />
                          <span>Switch</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                        isInCart
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
                    </motion.button>

                    <motion.button
                      onClick={handleToggleWishlist}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                        isInWishlist
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                      <span>{isInWishlist ? 'Wishlisted' : 'Wishlist'}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}