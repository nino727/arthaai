import React, { useState } from 'react';
import { motion } from 'framer-motion';

const festivals = [
  { date: '2025-03-14', name: 'Maha Shivaratri' },
  { date: '2025-04-08', name: 'Ram Navami' },
  { date: '2025-04-14', name: 'Vaisakhi' },
  { date: '2025-08-19', name: 'Raksha Bandhan' },
  { date: '2025-10-20', name: 'Dussehra' },
  { date: '2025-10-30', name: 'Diwali' },
];

const Calendar = () => {
  const [month, setMonth] = useState('2025-03');
  const filtered = festivals.filter(f => f.date.startsWith(month));

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Hindu Calendar</h2>
      <div className="mb-4">
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-gray-400">No festivals this month.</div>
        ) : (
          filtered.map((f, i) => (
            <motion.div key={i} className="p-4 bg-orange-50 rounded shadow flex items-center gap-4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <div className="font-bold text-orange-700">{f.name}</div>
              <div className="text-gray-600">{f.date}</div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Calendar;
