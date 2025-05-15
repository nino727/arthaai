import React, { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Welcome to Bodhi AI',
    description: 'Your personal guide to Hindu mythology, stories, and wisdom.',
    img: '🧘‍♂️',
  },
  {
    title: 'Explore Mythology',
    description: 'Learn about deities, epics, festivals, and ancient concepts.',
    img: '📚',
  },
  {
    title: 'Guided Journeys',
    description: 'Follow structured learning paths and track your progress.',
    img: '🛤️',
  },
  {
    title: 'AI Chat',
    description: 'Ask any question and get instant answers from Bodhi AI.',
    img: '🤖',
  }
];

const Onboarding = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-6xl mb-6">{steps[step].img}</div>
      <h2 className="text-3xl font-bold text-orange-700 mb-2">{steps[step].title}</h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">{steps[step].description}</p>
      <div className="flex gap-4">
        {step < steps.length - 1 ? (
          <>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded shadow"
            >
              Next
            </button>
            <button
              onClick={onFinish}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            onClick={onFinish}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-8 rounded shadow"
          >
            Get Started
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-8">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === step ? 'bg-orange-500' : 'bg-orange-200'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Onboarding;
