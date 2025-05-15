import React, { useState } from 'react';
import { motion } from 'framer-motion';

const journeys = [
  {
    id: 1,
    title: 'Introduction to Hindu Mythology',
    lessons: [
      { id: 1, name: 'What is Hindu Mythology?', completed: false },
      { id: 2, name: 'Major Epics: Ramayana & Mahabharata', completed: false },
      { id: 3, name: 'Deities Overview', completed: false },
    ],
  },
  {
    id: 2,
    title: 'The Deities',
    lessons: [
      { id: 1, name: 'Trimurti: Brahma, Vishnu, Shiva', completed: false },
      { id: 2, name: 'Devi: The Goddess', completed: false },
      { id: 3, name: 'Ganesha, Hanuman, and Others', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Festivals and Rituals',
    lessons: [
      { id: 1, name: 'Diwali', completed: false },
      { id: 2, name: 'Holi', completed: false },
      { id: 3, name: 'Navaratri', completed: false },
    ],
  },
];

const GuidedJourneyScreen = ({ onBack }) => {
  const [progress, setProgress] = useState({});

  const toggleLesson = (journeyId, lessonId) => {
    setProgress((prev) => ({
      ...prev,
      [`${journeyId}_${lessonId}`]: !prev[`${journeyId}_${lessonId}`],
    }));
  };

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto min-h-screen bg-white"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <button onClick={onBack} className="mb-6 text-orange-600 hover:underline">&larr; Back</button>
      <h2 className="text-3xl font-bold mb-4 text-orange-700">Guided Journeys</h2>
      <div className="space-y-6">
        {journeys.map((journey) => (
          <div key={journey.id} className="border rounded-lg shadow p-4 bg-orange-50">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">{journey.title}</h3>
            <ul className="space-y-2">
              {journey.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!progress[`${journey.id}_${lesson.id}`]}
                    onChange={() => toggleLesson(journey.id, lesson.id)}
                    className="mr-2 accent-orange-500"
                  />
                  <span className={progress[`${journey.id}_${lesson.id}`] ? 'line-through text-gray-400' : ''}>
                    {lesson.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GuidedJourneyScreen;
