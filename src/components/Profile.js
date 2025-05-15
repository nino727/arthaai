import React from 'react';
import { motion } from 'framer-motion';

const Profile = ({ user, onLogout, onBack }) => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 p-6"
    initial={{ x: 200, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -200, opacity: 0 }}
  >
    <div className="bg-white rounded shadow-lg p-8 w-full max-w-md flex flex-col items-center">
      <h2 className="text-2xl font-bold text-orange-700 mb-2">Profile & Settings</h2>
      <div className="text-lg text-gray-700 mb-4">{user?.email || 'user@email.com'}</div>
      <button
        onClick={onLogout}
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-8 rounded mb-4 shadow"
      >
        Logout
      </button>
      <button
        onClick={onBack}
        className="text-orange-600 hover:underline text-sm"
      >
        Back to App
      </button>
    </div>
  </motion.div>
);

export default Profile;
