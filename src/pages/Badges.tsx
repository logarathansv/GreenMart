import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { BadgeCard } from '../components/BadgeCard';
import { availableBadges } from '../data/badges';
import { useApp } from '../context/AppContext';

export function Badges() {
  const { state } = useApp();

  // Calculate user stats for badge progress
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const avgEcoScore = state.cart.length > 0 
    ? state.cart.reduce((sum, item) => sum + item.ecoScore, 0) / state.cart.length 
    : 0;

  // Check which badges are unlocked
  const getBadgeStatus = (badge: any) => {
    let isUnlocked = false;
    let progress = 0;

    switch (badge.type) {
      case 'carbon_saved':
        isUnlocked = state.totalCarbonSaved >= badge.requirement;
        progress = state.totalCarbonSaved / badge.requirement;
        break;
      case 'products_bought':
        isUnlocked = totalItems >= badge.requirement;
        progress = totalItems / badge.requirement;
        break;
      case 'eco_score':
        isUnlocked = avgEcoScore >= badge.requirement;
        progress = avgEcoScore / badge.requirement;
        break;
      case 'special':
        // Mock unlock for demo
        isUnlocked = badge.id === 'early_adopter';
        progress = isUnlocked ? 1 : 0;
        break;
    }

    return { isUnlocked, progress: Math.min(progress, 1) };
  };

  const unlockedCount = availableBadges.filter(badge => getBadgeStatus(badge).isUnlocked).length;

  const badgeCategories = [
    {
      title: 'Carbon Impact',
      description: 'Badges for reducing your carbon footprint',
      icon: TrendingUp,
      badges: availableBadges.filter(b => b.type === 'carbon_saved')
    },
    {
      title: 'Shopping Milestones',
      description: 'Badges for sustainable shopping achievements',
      icon: Target,
      badges: availableBadges.filter(b => b.type === 'products_bought')
    },
    {
      title: 'Quality Standards',
      description: 'Badges for maintaining high eco-scores',
      icon: Award,
      badges: availableBadges.filter(b => b.type === 'eco_score')
    },
    {
      title: 'Special Achievements',
      description: 'Unique badges for special accomplishments',
      icon: Award,
      badges: availableBadges.filter(b => b.type === 'special')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <BackButton to="/dashboard" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Badge Collection 🏆
        </h1>
        <div /> {/* Spacer */}
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Badge Progress</h2>
            <p className="text-purple-100 mb-4">
              Collect badges by shopping sustainably and reducing your carbon footprint
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{unlockedCount}</div>
                <div className="text-sm text-purple-100">Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{availableBadges.length - unlockedCount}</div>
                <div className="text-sm text-purple-100">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{Math.round((unlockedCount / availableBadges.length) * 100)}%</div>
                <div className="text-sm text-purple-100">Complete</div>
              </div>
            </div>
          </div>
          <div className="text-6xl opacity-20">🎖️</div>
        </div>
      </motion.div>

      {/* Badge Categories */}
      {badgeCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <category.icon className="text-green-600 dark:text-green-400" size={24} />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {category.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.badges.map((badge, badgeIndex) => {
              const { isUnlocked, progress } = getBadgeStatus(badge);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + badgeIndex * 0.05 }}
                >
                  <BadgeCard
                    badge={badge}
                    isUnlocked={isUnlocked}
                    progress={progress}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Tips for Earning Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
          💡 Tips for Earning Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">🛒</span>
            <span className="text-green-700 dark:text-green-300">
              Add eco-friendly products to your cart to unlock shopping badges
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">🔄</span>
            <span className="text-green-700 dark:text-green-300">
              Switch to alternative products to maximize carbon savings
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">⭐</span>
            <span className="text-green-700 dark:text-green-300">
              Choose products with high eco-scores to maintain quality standards
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-medium">📈</span>
            <span className="text-green-700 dark:text-green-300">
              Check your carbon report regularly to track progress
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}