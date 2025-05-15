import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  {
    key: 'vedas',
    title: 'Vedas',
    content: 'The Vedas are the oldest Hindu scriptures, consisting of Rigveda, Samaveda, Yajurveda, and Atharvaveda.'
  },
  {
    key: 'upanishads',
    title: 'Upanishads',
    content: 'Philosophical texts exploring the inner meaning of the Vedas and spirituality.'
  },
  {
    key: 'ramayana',
    title: 'Ramayana',
    content: 'The epic story of Lord Rama, Sita, Hanuman, and Ravana.'
  },
  {
    key: 'gita',
    title: 'Bhagavad Gita',
    content: 'A dialogue between Krishna and Arjuna on duty, righteousness, and the path to liberation.'
  }
];

const Library = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Scripture Library</h2>
      <div className="flex flex-col gap-4">
        {sections.map(section => (
          <div key={section.key}>
            <button
              className="flex items-center justify-between w-full px-4 py-3 bg-orange-100 rounded-lg shadow hover:bg-orange-200 transition font-semibold text-lg"
              onClick={() => setOpen(open === section.key ? null : section.key)}
            >
              <span>{section.title}</span>
              <motion.span
                animate={{ rotate: open === section.key ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                ▶
              </motion.span>
            </button>
            <AnimatePresence>
              {open === section.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white p-4 rounded-b-lg shadow-inner text-gray-700"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
