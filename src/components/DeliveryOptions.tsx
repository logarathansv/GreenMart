import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Leaf, Zap } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  price: number;
  carbonReduction: number;
  icon: React.ElementType;
  description: string;
  color: string;
}

interface DeliveryOptionsProps {
  onSelect: (option: DeliveryOption) => void;
  selectedOption?: string;
}

export function DeliveryOptions({ onSelect, selectedOption }: DeliveryOptionsProps) {
  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'express',
      name: 'Express Delivery',
      time: 'Same Day',
      price: 199,
      carbonReduction: 0,
      icon: Zap,
      description: 'Get your items today with priority shipping',
      color: '#ef4444'
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '1-2 Days',
      price: 99,
      carbonReduction: 15,
      icon: Truck,
      description: 'Regular delivery with optimized routes',
      color: '#3b82f6'
    },
    {
      id: 'eco',
      name: 'Eco-Friendly Delivery',
      time: '2-3 Days',
      price: 49,
      carbonReduction: 35,
      icon: Leaf,
      description: 'Consolidated shipping with electric vehicles',
      color: '#10b981'
    },
    {
      id: 'green',
      name: 'Green Delivery',
      time: '3-5 Days',
      price: 0,
      carbonReduction: 60,
      icon: Clock,
      description: 'Carbon-neutral delivery with maximum efficiency',
      color: '#059669'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Choose Your Delivery Option
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedOption === option.id
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Icon and Progress */}
              <div className="flex-shrink-0">
                <div className="relative w-12 h-12">
                  <CircularProgressbar
                    value={option.carbonReduction}
                    text=""
                    styles={buildStyles({
                      pathColor: option.color,
                      trailColor: '#e5e7eb',
                      strokeLinecap: 'round',
                    })}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <option.icon size={20} style={{ color: option.color }} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {option.name}
                  </h4>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {option.time}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {option.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {option.price === 0 ? 'FREE' : `₹${option.price}`}
                    </span>
                    {option.carbonReduction > 0 && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: option.color }}
                      >
                        -{option.carbonReduction}% CO₂
                      </span>
                    )}
                  </div>
                  
                  {selectedOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carbon Impact Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="text-green-600 dark:text-green-400" size={20} />
          <h4 className="font-semibold text-green-800 dark:text-green-200">
            Environmental Impact
          </h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Choosing slower delivery options allows us to consolidate shipments, use electric vehicles, 
          and optimize routes - significantly reducing carbon emissions. Every day you wait helps the planet! 🌍
        </p>
      </motion.div>
    </div>
  );
}