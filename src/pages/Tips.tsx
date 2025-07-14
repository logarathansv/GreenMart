import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { sustainabilityTips } from '../data/tips';
import { BackButton } from '../components/BackButton';

export function Tips() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <BackButton to="/" />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Sustainability Tips 💡
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn how to make more environmentally conscious purchasing decisions and reduce your carbon footprint.
          </p>
        </div>
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sustainabilityTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="text-4xl flex-shrink-0">
                {tip.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {tip.description}
                </p>
                
                {/* Impact */}
                <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="text-green-600 dark:text-green-400" size={16} />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Impact: {tip.impact}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center"
      >
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold mb-2">
          Ready to Make a Difference?
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Start implementing these tips today and see the positive impact on your carbon footprint!
        </p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <Lightbulb size={20} />
          <span>Start Shopping Sustainably</span>
        </motion.a>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Want to Learn More?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">📚 Educational Resources</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Discover in-depth guides about sustainable living and eco-friendly products.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">🌱 Community Forums</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with like-minded individuals sharing sustainability tips and experiences.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">📊 Impact Tracking</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your progress and see how your choices make a real difference over time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}