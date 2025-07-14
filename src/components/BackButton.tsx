import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors ${className}`}
    >
      <ArrowLeft size={20} />
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}