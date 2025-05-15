import React from 'react';
import { motion } from 'framer-motion';
import { useStreak } from '../contexts/StreakContext';

// Individual flame for animation
const Flame = ({ delay = 0 }) => (
  <motion.span 
    role="img" 
    aria-label="fire"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ 
      scale: [1, 1.2, 1], 
      opacity: 1,
      y: [0, -2, 0]
    }}
    transition={{ 
      duration: 1.5, 
      delay, 
      repeat: Infinity,
      repeatType: 'reverse'
    }}
    className="inline-block"
  >
    🔥
  </motion.span>
);

const StreakCounter = ({ count }) => (
  <motion.span
    key={count} // Key forces re-render when count changes
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 500 }}
    className="ml-1"
  >
    {count}
  </motion.span>
);

const Streaks = ({ count: externalCount }) => {
  // Use the streak context if no count is provided externally
  const { currentStreak } = useStreak();
  const count = externalCount || currentStreak;
  
  // Determine how many flames to show (max 3)
  const flameCount = Math.min(Math.ceil(count / 3), 3);
  
  return (
    <motion.div
      className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 rounded-full shadow-lg text-white font-bold"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center">
        {Array.from({ length: flameCount }).map((_, i) => (
          <Flame key={i} delay={i * 0.3} />
        ))}
      </div>
      <div className="font-bold ml-1">
        <StreakCounter count={count} /> day streak!
      </div>
    </motion.div>
  );
};

export default Streaks;
