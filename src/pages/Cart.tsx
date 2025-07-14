import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as CartIcon, Trash2, Leaf, Calculator, CreditCard, Shield, Truck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { CartItem } from '../components/CartItem';
import { BackButton } from '../components/BackButton';
import { DeliveryOptions } from '../components/DeliveryOptions';

export function Cart() {
  const { state, dispatch } = useApp();
  const { isGreenMode } = useTheme();
  const [selectedDelivery, setSelectedDelivery] = React.useState<any>(null);
  const [showCheckout, setShowCheckout] = React.useState(false);

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCarbonImpact = state.cart.reduce((sum, item) => sum + (item.carbonImpact * item.quantity), 0);
  
  // Calculate potential savings if alternatives were used
  const potentialSavings = state.cart.reduce((sum, item) => {
    if (item.alternative) {
      const savings = (item.carbonImpact - item.alternative.carbonImpact) * item.quantity;
      return sum + Math.max(0, savings);
    }
    return sum;
  }, 0);

  const deliveryPrice = selectedDelivery?.price || 0;
  const finalTotal = totalPrice + deliveryPrice;
  const carbonReduction = selectedDelivery?.carbonReduction || 0;
  const adjustedCarbonImpact = totalCarbonImpact * (1 - carbonReduction / 100);

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleProceedToCheckout = () => {
    if (!selectedDelivery) {
      alert('Please select a delivery option');
      return;
    }
    setShowCheckout(true);
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <BackButton to="/" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">{isGreenMode ? '🌱' : '🛒'}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {isGreenMode 
                ? 'Add some eco-friendly products to get started!' 
                : 'Add some amazing products to get started!'
              }
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-lg transition-colors ${
                isGreenMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <CartIcon size={24} />
              <span>Start Shopping</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <BackButton to="/" label="Continue shopping" className="text-blue-600 hover:text-blue-800" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </h1>
            <p className="text-gray-600 mt-1">
              {isGreenMode 
                ? `Total environmental impact: ${totalCarbonImpact.toFixed(1)} kg CO₂`
                : 'Items in your cart are not reserved — check out now to make them yours.'
              }
            </p>
          </div>
          
          {state.cart.length > 0 && (
            <motion.button
              onClick={handleClearCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
              <span>Clear all</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Delivery Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <DeliveryOptions 
                onSelect={setSelectedDelivery}
                selectedOption={selectedDelivery?.id}
              />
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6 sticky top-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Order summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                {selectedDelivery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedDelivery.name}</span>
                    <span className={`font-semibold ${
                      selectedDelivery.price === 0 
                        ? 'text-green-600' 
                        : 'text-gray-900'
                    }`}>
                      {selectedDelivery.price === 0 ? 'FREE' : `$${selectedDelivery.price}`}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax</span>
                  <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Estimated total</span>
                    <span className="text-lg font-bold">${(finalTotal + totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleProceedToCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-4 rounded-full font-semibold text-lg transition-colors ${
                  isGreenMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Continue to checkout
              </motion.button>

              {/* Walmart+ Benefits */}
              {!isGreenMode && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W+</span>
                    </div>
                    <span className="font-semibold text-blue-900">Walmart+ members get free delivery</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Save on this order and get free delivery on orders $35+ all year long.
                  </p>
                </div>
              )}

              {/* Security Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield size={16} className="text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck size={16} className="text-blue-600" />
                  <span>Free returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={16} className="text-orange-600" />
                  <span>Items reserved for 60 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Environmental Impact (GreenMart only) */}
            {isGreenMode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-green-50 rounded-lg border border-green-200 p-6"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
                  <Leaf size={20} />
                  <span>Environmental Impact</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-700">
                      {selectedDelivery ? 'Adjusted Carbon Impact' : 'Total Carbon Impact'}
                    </span>
                    <span className="font-bold text-green-800">
                      {selectedDelivery ? adjustedCarbonImpact.toFixed(1) : totalCarbonImpact.toFixed(1)} kg CO₂
                    </span>
                  </div>
                  
                  {selectedDelivery && carbonReduction > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-700">Delivery Reduction</span>
                      <span className="font-bold text-green-600">
                        -{carbonReduction}% CO₂
                      </span>
                    </div>
                  )}
                  
                  {potentialSavings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-700">Potential Savings</span>
                      <span className="font-bold text-green-600">
                        -{potentialSavings.toFixed(1)} kg CO₂
                      </span>
                    </div>
                  )}
                  
                  <div className="text-sm text-green-600 mt-3 p-3 bg-green-100 rounded-lg">
                    🌍 Great choice! You're making a positive environmental impact with every purchase.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Checkout Success Modal */}
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Order Placed Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Thank you for choosing {selectedDelivery?.name}. 
                  {carbonReduction > 0 && ` You've reduced your carbon footprint by ${carbonReduction}%!`}
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <p>Order Total: ${(finalTotal + totalPrice * 0.08).toFixed(2)}</p>
                  <p>Estimated Delivery: {selectedDelivery?.time}</p>
                  {carbonReduction > 0 && (
                    <p className="text-green-600 font-medium">
                      Carbon Saved: {(totalCarbonImpact - adjustedCarbonImpact).toFixed(1)} kg CO₂
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    dispatch({ type: 'CLEAR_CART' });
                  }}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isGreenMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}