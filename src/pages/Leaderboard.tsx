import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Users, TrendingUp } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { leaderboardData } from '../data/leaderboard';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export function Leaderboard() {
  const { state: authState } = useAuth();
  const { state } = useApp();
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

  // Mock user position in leaderboard
  const userRank = Math.max(1, 11 - Math.floor(state.totalCarbonSaved / 10));
  const userEntry = {
    id: authState.user?.id || 'current',
    name: authState.user?.name || 'You',
    avatar: authState.user?.avatar,
    carbonSaved: state.totalCarbonSaved,
    level: Math.floor(state.totalCarbonSaved / 10) + 1,
    badges: Math.floor(state.totalCarbonSaved / 5),
    rank: userRank
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Award className="text-orange-500" size={24} />;
      default: return <span className="text-lg font-bold text-gray-600 dark:text-gray-300">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <BackButton to="/dashboard" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Leaderboard 🏆
        </h1>
        <div /> {/* Spacer */}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center"
      >
        <div className="text-4xl mb-2">🌟</div>
        <h2 className="text-2xl font-bold mb-2">Eco Warriors Leaderboard</h2>
        <p className="text-purple-100">
          Compete with fellow eco-warriors and climb the sustainability rankings!
        </p>
      </motion.div>

      {/* Time Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center space-x-2"
      >
        {[
          { key: 'all', label: 'All Time' },
          { key: 'month', label: 'This Month' },
          { key: 'week', label: 'This Week' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setTimeFilter(filter.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeFilter === filter.key
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Your Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-800"
      >
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center space-x-2">
          <Users size={20} />
          <span>Your Position</span>
        </h3>
        <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full font-bold">
            #{userEntry.rank}
          </div>
          {userEntry.avatar && (
            <img src={userEntry.avatar} alt={userEntry.name} className="w-12 h-12 rounded-full" />
          )}
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white">{userEntry.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {userEntry.carbonSaved.toFixed(1)} kg CO₂ saved
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">Level {userEntry.level}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{userEntry.badges} badges</p>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {/* 2nd Place */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 h-32 flex flex-col justify-end"
          >
            <Medal className="text-gray-400 mx-auto mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">#2</div>
          </motion.div>
          <div className="mt-3">
            {leaderboardData[1]?.avatar && (
              <img src={leaderboardData[1].avatar} alt="" className="w-12 h-12 rounded-full mx-auto mb-2" />
            )}
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{leaderboardData[1]?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{leaderboardData[1]?.carbonSaved} kg</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-4 h-40 flex flex-col justify-end"
          >
            <Crown className="text-yellow-500 mx-auto mb-2" size={40} />
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">#1</div>
          </motion.div>
          <div className="mt-3">
            {leaderboardData[0]?.avatar && (
              <img src={leaderboardData[0].avatar} alt="" className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-yellow-400" />
            )}
            <p className="font-bold text-gray-900 dark:text-white">{leaderboardData[0]?.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{leaderboardData[0]?.carbonSaved} kg</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4 h-28 flex flex-col justify-end"
          >
            <Award className="text-orange-500 mx-auto mb-2" size={28} />
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">#3</div>
          </motion.div>
          <div className="mt-3">
            {leaderboardData[2]?.avatar && (
              <img src={leaderboardData[2].avatar} alt="" className="w-10 h-10 rounded-full mx-auto mb-2" />
            )}
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{leaderboardData[2]?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{leaderboardData[2]?.carbonSaved} kg</p>
          </div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <TrendingUp size={24} />
            <span>Full Rankings</span>
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index < 3 ? getRankBg(index + 1) : ''
              } ${index < 3 ? 'text-white' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(user.rank)}
                </div>
                
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className={`w-12 h-12 rounded-full ${index === 0 ? 'border-2 border-yellow-300' : ''}`} 
                  />
                )}
                
                <div className="flex-1">
                  <p className={`font-bold ${index < 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {user.name}
                  </p>
                  <p className={`text-sm ${index < 3 ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>
                    Level {user.level} • {user.badges} badges
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${index < 3 ? 'text-white' : 'text-green-600 dark:text-green-400'}`}>
                    {user.carbonSaved} kg
                  </p>
                  <p className={`text-xs ${index < 3 ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    CO₂ saved
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center py-8"
      >
        <div className="text-4xl mb-2">🚀</div>
        <p className="text-gray-600 dark:text-gray-300">
          Keep shopping sustainably to climb the leaderboard!
        </p>
      </motion.div>
    </div>
  );
}