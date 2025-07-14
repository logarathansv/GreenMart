import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingDown, 
  Award, 
  Download, 
  Share2,
  Leaf,
  Target,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BackButton } from '../components/BackButton';

export function CarbonReport() {
  const { state } = useApp();

  // Calculate metrics
  const totalCarbonFootprint = state.cart.reduce((sum, item) => sum + (item.carbonImpact * item.quantity), 0);
  const totalSavings = state.totalCarbonSaved;
  const avgEcoScore = state.cart.length > 0 
    ? state.cart.reduce((sum, item) => sum + item.ecoScore, 0) / state.cart.length 
    : 0;

  // Calculate potential savings with alternatives
  const potentialSavings = state.cart.reduce((sum, item) => {
    if (item.alternative) {
      const savings = (item.carbonImpact - item.alternative.carbonImpact) * item.quantity;
      return sum + Math.max(0, savings);
    }
    return sum;
  }, 0);

  const conventionalFootprint = totalCarbonFootprint + totalSavings + potentialSavings;
  const savingsPercentage = conventionalFootprint > 0 
    ? ((totalSavings + potentialSavings) / conventionalFootprint * 100) 
    : 0;

  // Environmental equivalents
  const treesEquivalent = Math.round(totalSavings / 21); // 1 tree absorbs ~21kg CO2/year
  const carMilesEquivalent = Math.round(totalSavings / 0.4); // ~0.4kg CO2/mile

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF
    alert('Feature coming soon! Your green receipt will be available for download.');
  };

  const handleShareReport = async () => {
    const shareData = {
      title: 'My EcoCart Carbon Report',
      text: `I've saved ${totalSavings.toFixed(1)} kg of CO₂ with my sustainable shopping choices! 🌱`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Handle specific share API errors
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            // Permission denied - fall back to clipboard
            await fallbackToClipboard();
          } else if (error.name === 'AbortError') {
            // User cancelled the share - do nothing
            return;
          } else {
            // Other errors - fall back to clipboard
            await fallbackToClipboard();
          }
        } else {
          await fallbackToClipboard();
        }
      }
    } else {
      // Browser doesn't support Web Share API
      await fallbackToClipboard();
    }

    async function fallbackToClipboard() {
      try {
        const text = `I've saved ${totalSavings.toFixed(1)} kg of CO₂ with my sustainable shopping choices! 🌱 Check out EcoCart: ${window.location.href}`;
        await navigator.clipboard.writeText(text);
        // You can add a toast notification here if you have a toast system
        alert('Report link copied to clipboard!');
      } catch (clipboardError) {
        // Final fallback if clipboard also fails
        console.error('Failed to copy to clipboard:', clipboardError);
        alert('Unable to share or copy link. Please copy the URL manually.');
      }
    }
  };

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
            Carbon Footprint Report 📊
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your environmental impact and celebrate your sustainable choices
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center"
        >
          <div className="text-3xl mb-2">🌱</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {totalSavings.toFixed(1)} kg
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Total CO₂ Saved
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center"
        >
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {avgEcoScore.toFixed(1)}/5
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Average Eco Score
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center"
        >
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {savingsPercentage.toFixed(0)}%
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">
            Reduction vs Conventional
          </div>
        </motion.div>
      </div>

      {/* Carbon Impact Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <BarChart3 size={24} />
          <span>Impact Comparison</span>
        </h3>

        <div className="space-y-4">
          {/* Conventional Choice */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Conventional Products</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {conventionalFootprint.toFixed(1)} kg CO₂
              </span>
            </div>
            <div className="w-full bg-red-200 dark:bg-red-900/30 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Your Choice */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Your Eco-Friendly Choice</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {totalCarbonFootprint.toFixed(1)} kg CO₂
              </span>
            </div>
            <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full"
                style={{ 
                  width: conventionalFootprint > 0 
                    ? `${(totalCarbonFootprint / conventionalFootprint) * 100}%` 
                    : '0%' 
                }}
              />
            </div>
          </div>
        </div>

        {totalSavings > 0 && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
              <TrendingDown size={20} />
              <span className="font-medium">
                You've saved {(totalSavings + potentialSavings).toFixed(1)} kg CO₂ with your choices!
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Environmental Equivalents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Leaf size={24} />
          <span>Environmental Equivalents</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-4xl">🌳</div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {treesEquivalent}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Trees worth of CO₂ absorption
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-4xl">🚗</div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {carMilesEquivalent}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Miles of car driving avoided
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          onClick={handleDownloadReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          <Download size={20} />
          <span>Download Green Receipt</span>
        </motion.button>

        <motion.button
          onClick={handleShareReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          <Share2 size={20} />
          <span>Share Your Impact</span>
        </motion.button>
      </motion.div>

      {/* Achievements */}
      {totalSavings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Award size={24} />
            <span>Your Green Achievements</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl">🌟</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Eco Warrior</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Made sustainable choices</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl">🌍</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Planet Protector</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Reduced carbon footprint</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl">💚</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Green Shopper</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Conscious consumer</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}