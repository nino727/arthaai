import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Demo: return mock results
    setResults([
      { title: 'Bhagavad Gita: Dharma', snippet: 'Dharma is a central concept in the Gita...' },
      { title: 'Rigveda: Creation Hymn', snippet: 'Who really knows? Who will here proclaim it?' },
    ]);
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Advanced Search</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-4 py-2"
          type="text"
          placeholder="Search scriptures, deities, concepts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="bg-orange-500 text-white px-6 py-2 rounded" type="submit">Search</button>
      </form>
      <div className="space-y-4">
        {results.map((r, i) => (
          <div key={i} className="p-4 bg-orange-50 rounded shadow">
            <div className="font-bold text-orange-700">{r.title}</div>
            <div className="text-gray-700">{r.snippet}</div>
          </div>
        ))}
        {results.length === 0 && <div className="text-gray-400">No results yet. Try searching for something!</div>}
      </div>
    </motion.div>
  );
};

export default Search;
