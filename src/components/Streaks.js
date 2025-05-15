import React from 'react';
import { motion } from 'framer-motion';

const Streaks = ({ count }) => (
  <motion.div
    className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full shadow text-orange-700 font-bold"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <span role="img" aria-label="fire">🔥</span>
    {count} day streak
  </motion.div>
);

export default Streaks;
