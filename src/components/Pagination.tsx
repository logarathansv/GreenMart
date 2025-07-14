import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNextPage, 
  hasPrevPage 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        whileHover={{ scale: hasPrevPage ? 1.05 : 1 }}
        whileTap={{ scale: hasPrevPage ? 0.95 : 1 }}
        className={`p-2 rounded-lg transition-colors ${
          hasPrevPage
            ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 shadow-md'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
          ) : (
            <motion.button
              onClick={() => onPageChange(page as number)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 shadow-md'
              }`}
            >
              {page}
            </motion.button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        whileHover={{ scale: hasNextPage ? 1.05 : 1 }}
        whileTap={{ scale: hasNextPage ? 0.95 : 1 }}
        className={`p-2 rounded-lg transition-colors ${
          hasNextPage
            ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 shadow-md'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        }`}
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}