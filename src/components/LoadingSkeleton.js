import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ height = 24, width = '100%', className = '' }) => (
  <motion.div
    className={`bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 animate-pulse rounded ${className}`}
    style={{ height, width }}
    initial={{ opacity: 0.7 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.7 }}
  />
);

export default LoadingSkeleton;
