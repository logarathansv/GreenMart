import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowUpDown, Star, Heart } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { state, dispatch } = useApp();
  const { isGreenMode } = useTheme();

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: item.id, quantity: newQuantity } 
    });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    toast.success('Item removed from cart');
  };

  const handleSwapToAlternative = () => {
    if (item.alternative) {
      const alternativeProduct: any = {
        ...item,
        id: item.alternative.id,
        name: item.alternative.name,
        carbonImpact: item.alternative.carbonImpact,
        ecoScore: item.alternative.ecoScore,
      };
      dispatch({ 
        type: 'SWAP_TO_ALTERNATIVE', 
        payload: { 
          originalId: item.id, 
          alternative: alternativeProduct 
        } 
      });
      toast.success(`Switched to ${item.alternative.name}! 🔄`);
    }
  };

  const handleAddToWishlist = () => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    toast.success('Added to wishlist! 💚');
  };

  return (
    <div className="flex items-start space-x-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg border"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {item.name}
            </h3>
            
            {/* Walmart-style product details */}
            {!isGreenMode && (
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < Math.floor(item.ecoScore) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span>({Math.floor(Math.random() * 1000) + 100})</span>
                </div>
                <span>•</span>
                <span className="text-blue-600">Free shipping, arrives tomorrow</span>
              </div>
            )}

            {/* GreenMart eco details */}
            {isGreenMode && (
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>Eco Score: {item.ecoScore}/5</span>
                <span>•</span>
                <span>{item.carbonImpact} kg CO₂</span>
              </div>
            )}

            <div className="flex items-center space-x-4 mb-3">
              <span className="text-2xl font-bold text-gray-900">
                ${item.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${(item.price * 1.2).toFixed(2)}
              </span>
              {!isGreenMode && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  Save ${(item.price * 0.2).toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleUpdateQuantity(item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <span className="text-sm text-gray-600">
                ${(item.price * item.quantity).toFixed(2)} total
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRemove}
                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 hover:underline"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700 hover:underline"
              >
                <Heart size={14} />
                <span>Save for later</span>
              </button>

              {item.alternative && (
                <button
                  onClick={handleSwapToAlternative}
                  className={`flex items-center space-x-1 text-sm hover:underline ${
                    isGreenMode 
                      ? 'text-blue-600 hover:text-blue-700' 
                      : 'text-green-600 hover:text-green-700'
                  }`}
                >
                  <ArrowUpDown size={14} />
                  <span>
                    {isGreenMode 
                      ? `Switch to ${item.alternative.name}` 
                      : `Try Eco: ${item.alternative.name}`
                    }
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Alternative Product Suggestion */}
        {item.alternative && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-4 p-3 rounded-lg border ${
              isGreenMode 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  isGreenMode ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {isGreenMode ? 'Premium Alternative Available' : 'Eco-Friendly Alternative Available'}
                </p>
                <p className={`text-xs ${
                  isGreenMode ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {item.alternative.name} - {item.alternative.carbonImpact} kg CO₂
                  {item.alternative.price && ` - $${item.alternative.price}`}
                </p>
              </div>
              <button
                onClick={handleSwapToAlternative}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                  isGreenMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Switch
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}