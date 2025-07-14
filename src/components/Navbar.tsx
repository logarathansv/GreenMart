import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  BarChart3, 
  Lightbulb, 
  Menu, 
  X,
  Package,
  User,
  LogOut,
  LayoutDashboard,
  Search,
  MapPin,
  ChevronDown,
  Trophy,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { state } = useApp();
  const { state: authState, logout } = useAuth();
  const { isGreenMode } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  const navigation = [
    { name: 'Products', href: '/', icon: Package },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cart', href: '/cart', icon: ShoppingCart, badge: cartItemCount },
    { name: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlistCount },
    { name: 'Tips', href: '/tips', icon: Lightbulb },
    { name: 'Carbon Report', href: '/report', icon: BarChart3 },
  ];

  const departments = [
    'Grocery & Essentials',
    'Fashion',
    'Electronics',
    'Home',
    'Toys',
    'Sports & Outdoors',
    'Auto & Tires',
    'Health & Wellness'
  ];

  const services = [
    'Pharmacy',
    'Vision Center',
    'Auto Care Center',
    'Money Services',
    'Photo Services',
    'Gift Cards'
  ];

  return (
    <>
      {/* Top Header Bar */}
      <div className={`py-2 px-4 ${
        isGreenMode 
          ? 'bg-green-600 dark:bg-green-700 text-white' 
          : 'bg-blue-600 dark:bg-blue-700 text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Pickup or delivery?</span>
              <span className="text-xs opacity-80 hidden sm:inline">Sacramento, 95829 • Sacramento Supercenter</span>
              <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="hidden md:inline">Reorder My Items</span>
            {authState.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 hover:underline"
                >
                  <User size={16} />
                  <span>Sign In Account</span>
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium">{authState.user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{authState.user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/leaderboard"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Trophy size={16} />
                        <span>Leaderboard</span>
                      </Link>
                      <Link
                        to="/badges"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Award size={16} />
                        <span>Badges</span>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hover:underline">
                Sign In Account
              </Link>
            )}
            <span className="text-yellow-300 dark:text-yellow-400 font-bold">$0.00</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className={`text-3xl font-bold ${
                isGreenMode ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {isGreenMode ? '🌿' : '⭐'}
              </div>
              <span className={`text-2xl font-bold ${
                isGreenMode ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {isGreenMode ? 'GreenMart' : 'Walmart'}
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={isGreenMode ? "Search sustainable products" : "Search everything at Walmart online and in store"}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  isGreenMode ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                } text-white`}>
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <ThemeToggle />
              
              <Link to="/wishlist" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <div className="relative">
                  <Heart size={24} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 dark:bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 hidden sm:inline">Reorder</span>
              </Link>

              <Link to="/cart" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 dark:bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 hidden sm:inline">Cart</span>
              </Link>
              
              {/* Carbon Report Link */}
              {authState.isAuthenticated && (
                <Link to="/report" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <BarChart3 size={24} />
                  <span className="text-xs mt-1 hidden sm:inline">Report</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Department Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 text-sm">
            <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
              <Menu size={16} />
              <span className="font-medium">Departments</span>
              <ChevronDown size={16} />
            </div>
            
            <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
              <span className="font-medium">Services</span>
              <ChevronDown size={16} />
            </div>

            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Get it Fast</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">New Arrivals</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Rollbacks & more</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Dinner Made Easy</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Pharmacy Delivery</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Trending</span>
              {authState.isAuthenticated && (
                <Link to="/dashboard" className="hover:text-gray-900 dark:hover:text-white cursor-pointer">My Items</Link>
              )}
              <Link to="/tips" className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Tips</Link>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Auto Service</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Walmart+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-2 space-y-1">
              {/* Main Navigation Items */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Package size={20} />
                <span className="font-medium">Products</span>
              </Link>
              
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === '/cart'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <ShoppingCart size={20} />
                <span className="font-medium">Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-auto bg-yellow-400 dark:bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === '/wishlist'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Heart size={20} />
                <span className="font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="ml-auto bg-yellow-400 dark:bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link
                to="/tips"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === '/tips'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Lightbulb size={20} />
                <span className="font-medium">Tips</span>
              </Link>
              
              {/* Authenticated User Items */}
              {authState.isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      location.pathname === '/dashboard'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  
                  <Link
                    to="/leaderboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      location.pathname === '/leaderboard'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Trophy size={20} />
                    <span className="font-medium">Leaderboard</span>
                  </Link>
                  
                  <Link
                    to="/badges"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      location.pathname === '/badges'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Award size={20} />
                    <span className="font-medium">Badges</span>
                  </Link>
                  
                  <Link
                    to="/report"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      location.pathname === '/report'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <BarChart3 size={20} />
                    <span className="font-medium">Carbon Report</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}