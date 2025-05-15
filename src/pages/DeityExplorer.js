import React from 'react';
import { motion } from 'framer-motion';

const deities = [
  { name: 'Ganesha', image: '/api/placeholder/60/60', desc: 'Remover of obstacles, patron of arts and sciences.' },
  { name: 'Lakshmi', image: '/api/placeholder/60/60', desc: 'Goddess of wealth and prosperity.' },
  { name: 'Hanuman', image: '/api/placeholder/60/60', desc: 'Devotee of Rama, symbol of strength and devotion.' },
  { name: 'Saraswati', image: '/api/placeholder/60/60', desc: 'Goddess of wisdom, music, and learning.' },
  { name: 'Shiva', image: '/api/placeholder/60/60', desc: 'The destroyer, part of the Trimurti.' },
  { name: 'Vishnu', image: '/api/placeholder/60/60', desc: 'The preserver, part of the Trimurti.' },
];

const DeityExplorer = () => (
  <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-3xl font-bold mb-6 text-orange-700">Deity Explorer</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {deities.map((d, i) => (
        <motion.div
          key={d.name}
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:bg-orange-50 transition cursor-pointer"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          <img src={d.image} alt={d.name} className="w-16 h-16 rounded-full mb-2" />
          <div className="font-bold text-orange-700">{d.name}</div>
          <div className="text-gray-600 text-sm text-center mt-1">{d.desc}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default DeityExplorer;
