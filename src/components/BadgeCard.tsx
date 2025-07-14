import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  progress?: number;
}

export function BadgeCard({ badge, isUnlocked, progress = 0 }: BadgeCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600';
      case 'rare': return 'border-blue-300 dark:border-blue-600';
      case 'epic': return 'border-purple-300 dark:border-purple-600';
      case 'legendary': return 'border-yellow-300 dark:border-yellow-600';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-xl border-2 transition-all ${
        isUnlocked 
          ? `bg-white dark:bg-gray-800 ${getRarityBorder(badge.rarity)} shadow-lg`
          : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60'
      }`}
    >
      {/* Rarity Indicator */}
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)}`} />
      
      {/* Badge Icon */}
      <div className="text-center mb-3">
        <div className={`text-4xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
          {badge.icon}
        </div>
        <h3 className={`font-bold text-sm ${
          isUnlocked 
            ? 'text-gray-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {badge.name}
        </h3>
      </div>

      {/* Description */}
      <p className={`text-xs text-center mb-3 ${
        isUnlocked 
          ? 'text-gray-600 dark:text-gray-300' 
          : 'text-gray-400 dark:text-gray-500'
      }`}>
        {badge.description}
      </p>

      {/* Progress Bar (for locked badges) */}
      {!isUnlocked && progress > 0 && (
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      )}

      {/* Rarity Label */}
      <div className="text-center">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isUnlocked
            ? `text-white bg-gradient-to-r ${getRarityColor(badge.rarity)}`
            : 'text-gray-400 bg-gray-200 dark:bg-gray-600'
        }`}>
          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
        </span>
      </div>

      {/* Unlocked Date */}
      {isUnlocked && badge.unlockedAt && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </motion.div>
  );
}