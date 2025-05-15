import React from 'react';
import { motion } from 'framer-motion';

const HomeScreen = ({ onNavigate }) => (
  <motion.div
    className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-yellow-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h1 className="text-4xl font-bold text-orange-600 mb-4">Welcome to Bodhi AI</h1>
    <p className="mb-6 text-lg text-gray-700">Your personal guide to Hindu mythology. Start a chat or explore guided journeys.</p>
    <div className="flex flex-col gap-4 w-full max-w-md">
      <button
        onClick={() => onNavigate('guided')}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow-lg transition-all"
      >
        Guided Journeys
      </button>
      <button
        onClick={() => onNavigate('mythology')}
        className="bg-yellow-400 hover:bg-yellow-500 text-orange-900 font-semibold py-2 px-6 rounded shadow-lg transition-all"
      >
        Explore Mythology
      </button>
      <button
        onClick={() => onNavigate('chat')}
        className="bg-white border border-orange-300 text-orange-600 font-semibold py-2 px-6 rounded shadow-lg transition-all"
      >
        AI Chat
      </button>
    </div>
  </motion.div>
);

export default HomeScreen;
