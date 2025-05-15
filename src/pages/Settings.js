import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings = ({ theme, setTheme, fontSize, setFontSize }) => {
  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Settings</h2>
      <div className="mb-6">
        <div className="font-semibold mb-2">Theme</div>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTheme('light')}
          >Light</button>
          <button
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-orange-700 text-white' : 'bg-gray-200'}`}
            onClick={() => setTheme('dark')}
          >Dark</button>
        </div>
      </div>
      <div>
        <div className="font-semibold mb-2">Font Size</div>
        <input
          type="range"
          min="14"
          max="22"
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-2">Preview: <span style={{ fontSize }}>{'Aa Bb Cc'}</span></div>
      </div>
    </motion.div>
  );
};

export default Settings;
