import React from 'react';
import { motion } from 'framer-motion';

const Paywall = ({ onUnlock, onBack }) => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 p-6"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
  >
    <div className="bg-white rounded shadow-lg p-8 w-full max-w-md flex flex-col items-center">
      <h2 className="text-3xl font-bold text-orange-700 mb-2">Unlock Full Access</h2>
      <p className="text-lg text-gray-700 mb-6 text-center">Upgrade to Bodhi AI Premium for unlimited journeys, advanced AI chat, and exclusive mythology content.</p>
      <div className="bg-orange-50 rounded p-4 mb-6 w-full text-center">
        <span className="text-2xl font-bold text-orange-600">$4.99/mo</span>
        <div className="text-gray-500 text-sm">Cancel anytime</div>
      </div>
      <button
        onClick={onUnlock}
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-8 rounded mb-4 shadow"
      >
        Upgrade Now
      </button>
      <button
        onClick={onBack}
        className="text-orange-600 hover:underline text-sm"
      >
        Maybe Later
      </button>
    </div>
  </motion.div>
);

export default Paywall;
