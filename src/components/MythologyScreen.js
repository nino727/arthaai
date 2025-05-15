import React, { useState } from 'react';
import { motion } from 'framer-motion';

const data = [
  { type: 'Deity', name: 'Vishnu', description: 'The preserver, part of the Trimurti.' },
  { type: 'Deity', name: 'Shiva', description: 'The destroyer, part of the Trimurti.' },
  { type: 'Deity', name: 'Brahma', description: 'The creator, part of the Trimurti.' },
  { type: 'Epic', name: 'Ramayana', description: 'Epic story of Rama, Sita, and Ravana.' },
  { type: 'Epic', name: 'Mahabharata', description: 'Epic story of the Pandavas and Kauravas.' },
  { type: 'Festival', name: 'Diwali', description: 'Festival of lights.' },
  { type: 'Festival', name: 'Holi', description: 'Festival of colors.' },
];

const MythologyScreen = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = data.filter(
    (item) =>
      (filter === 'All' || item.type === filter) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto min-h-screen bg-white"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
    >
      <button onClick={onBack} className="mb-6 text-orange-600 hover:underline">&larr; Back</button>
      <h2 className="text-3xl font-bold mb-4 text-orange-700">Explore Hindu Mythology</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Deity">Deities</option>
          <option value="Epic">Epics</option>
          <option value="Festival">Festivals</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filtered.length === 0 ? (
          <li className="text-gray-500">No results found.</li>
        ) : (
          filtered.map((item, idx) => (
            <li key={idx} className="p-4 border rounded shadow bg-orange-50">
              <span className="font-semibold text-orange-600">{item.type}:</span> <span className="font-bold">{item.name}</span>
              <div className="text-gray-700 mt-1">{item.description}</div>
            </li>
          ))
        )}
      </ul>
    </motion.div>
  );
};

export default MythologyScreen;
