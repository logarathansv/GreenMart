import React from 'react';
import { Sun, Moon, Leaf, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, isGreenMode, toggleTheme, toggleGreenMode } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {/* Green Mode Toggle */}
      <motion.button
        onClick={toggleGreenMode}
        className={`relative p-2 rounded-lg transition-colors ${
          isGreenMode
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isGreenMode ? 'Switch to Walmart mode' : 'Switch to GreenMart mode'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isGreenMode ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isGreenMode ? <Leaf size={20} /> : <ShoppingCart size={20} />}
        </motion.div>
      </motion.button>

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </motion.button>
    </div>
  );
}