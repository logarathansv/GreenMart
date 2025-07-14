import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  ShoppingBag,
  Leaf,
  Star,
  Trophy,
  Users,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { BackButton } from '../components/BackButton';
import { BadgeCard } from '../components/BadgeCard';
import { availableBadges } from '../data/badges';
import { leaderboardData } from '../data/leaderboard';

export function Dashboard() {
  const { state } = useApp();
  const { state: authState } = useAuth();

  // Calculate user stats
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSpent = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const avgEcoScore = state.cart.length > 0 
    ? state.cart.reduce((sum, item) => sum + item.ecoScore, 0) / state.cart.length 
    : 0;

  // Calculate level and XP
  const level = Math.floor(state.totalCarbonSaved / 10) + 1;
  const xp = (state.totalCarbonSaved % 10) * 100;
  const nextLevelXP = 1000;

  // Check unlocked badges
  const unlockedBadges = availableBadges.filter(badge => {
    switch (badge.type) {
      case 'carbon_saved':
        return state.totalCarbonSaved >= badge.requirement;
      case 'products_bought':
        return totalItems >= badge.requirement;
      case 'eco_score':
        return avgEcoScore >= badge.requirement;
      default:
        return false;
    }
  });

  // User rank (mock calculation)
  const userRank = Math.max(1, 11 - Math.floor(state.totalCarbonSaved / 10));

  const stats = [
    {
      label: 'Carbon Saved',
      value: `${state.totalCarbonSaved.toFixed(1)} kg`,
      icon: Leaf,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Products Bought',
      value: totalItems.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Avg Eco Score',
      value: avgEcoScore.toFixed(1),
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      label: 'Global Rank',
      value: `#${userRank}`,
      icon: Trophy,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <BackButton to="/" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard 📊
        </h1>
        <div /> {/* Spacer */}
      </div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {authState.user?.name}! 👋
            </h2>
            <p className="text-green-100 mb-4">
              You're making a real difference for our planet
            </p>
            
            {/* Level Progress */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-300" size={20} />
                <span className="font-semibold">Level {level}</span>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(xp / nextLevelXP) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-green-100 mt-1">
                  {xp}/{nextLevelXP} XP to next level
                </p>
              </div>
            </div>
          </div>
          <div className="text-6xl opacity-20">🌱</div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bg} rounded-xl p-4`}
          >
            <div className="flex items-center space-x-3">
              <stat.icon className={stat.color} size={24} />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Browse Products', icon: ShoppingBag, to: '/', color: 'green' },
            { label: 'View Cart', icon: ShoppingBag, to: '/cart', color: 'blue' },
            { label: 'Leaderboard', icon: Trophy, to: '/leaderboard', color: 'purple' },
            { label: 'Carbon Report', icon: TrendingUp, to: '/report', color: 'orange' }
          ].map((action, index) => (
            <Link
              key={action.label}
              to={action.to}
              className={`flex flex-col items-center p-4 rounded-lg bg-${action.color}-50 dark:bg-${action.color}-900/20 hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-colors group`}
            >
              <action.icon className={`text-${action.color}-600 dark:text-${action.color}-400 mb-2 group-hover:scale-110 transition-transform`} size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Badges ({unlockedBadges.length}/{availableBadges.length})
          </h3>
          <Link
            to="/badges"
            className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {unlockedBadges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {unlockedBadges.slice(0, 4).map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-gray-600 dark:text-gray-300">
              Start shopping to unlock your first badge!
            </p>
          </div>
        )}
      </motion.div>

      {/* Mini Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Top Eco Warriors
          </h3>
          <Link
            to="/leaderboard"
            className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <span className="text-sm font-medium">View Full Leaderboard</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="space-y-3">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
              }`}>
                {index + 1}
              </div>
              {user.avatar && (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user.carbonSaved} kg CO₂ saved
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Level {user.level}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {user.badges} badges
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}