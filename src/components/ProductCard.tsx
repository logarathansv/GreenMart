import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Leaf, 
  ArrowUpDown,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ProductDetailModal } from './ProductDetailModal';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  const { isGreenMode } = useTheme();
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const isInCart = state.cart.some(item => item.id === product.id);
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!authState.isAuthenticated) {
      toast.error('Please login to add items to cart 🔐');
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
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

  const handleSwapToAlternative = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden ${
          isGreenMode
            ? 'bg-white dark:bg-gray-800'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        }`}
        onClick={() => setShowDetailModal(true)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          
          {/* Walmart-style badge */}
          {!isGreenMode && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
              Great Value
            </div>
          )}
          
          {/* Green badge */}
          {isGreenMode && product.ecoScore >= 4.5 && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              Eco Choice
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className={`text-2xl font-bold ${
              isGreenMode 
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              ₹{product.price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetailModal(true);
              }}
              className={`text-gray-500 dark:text-gray-400 transition-colors ${
                isGreenMode
                  ? 'hover:text-green-600 dark:hover:text-green-400'
                  : 'hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Info size={18} />
            </button>
          </div>

          {/* Eco Score (only in green mode) */}
          {isGreenMode && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} fill="currentColor" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {product.ecoScore}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Eco Score</span>
            </div>
          )}

          {/* Carbon Impact (only in green mode) */}
          {isGreenMode && (
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-green-500" size={16} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.carbonImpact} kg CO₂
              </span>
            </div>
          )}

          {/* Walmart-style rating */}
          {!isGreenMode && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.floor(product.ecoScore) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({Math.floor(Math.random() * 1000) + 100} reviews)
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                isGreenMode
                  ? isInCart
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                  : isInCart
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <ShoppingCart size={16} />
              <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
            </motion.button>

            {/* Alternative Product Suggestion */}
            {product.alternative && (
              <motion.button
                onClick={handleSwapToAlternative}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  isGreenMode
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                    : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50'
                }`}
              >
                <ArrowUpDown size={16} />
                <span>
                  {isGreenMode 
                    ? `Switch to ${product.alternative.name}` 
                    : `Try Eco: ${product.alternative.name}`
                  }
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <ProductDetailModal
        product={product}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}