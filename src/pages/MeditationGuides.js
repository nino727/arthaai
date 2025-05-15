import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSkeleton from '../components/LoadingSkeleton';

const meditationGuides = [
  {
    id: 1,
    title: 'Mindfulness Meditation',
    duration: '10 min',
    description: 'A simple practice to cultivate awareness of the present moment.',
    audioUrl: '#',
  },
  {
    id: 2,
    title: 'Mantra Meditation',
    duration: '15 min',
    description: 'Focus your mind through the repetition of a sacred word or phrase.',
    audioUrl: '#',
  },
  {
    id: 3,
    title: 'Chakra Meditation',
    duration: '20 min',
    description: 'Balance your energy centers through focused awareness.',
    audioUrl: '#',
  },
  {
    id: 4,
    title: 'Yoga Nidra',
    duration: '30 min',
    description: 'A guided deep relaxation practice for rejuvenation.',
    audioUrl: '#',
  }
];

const MeditationGuides = () => {
  const [loading, setLoading] = useState(true);
  const [activeGuide, setActiveGuide] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (guide) => {
    setActiveGuide(guide);
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Meditation Guides</h2>
      
      {loading ? (
        <div className="space-y-4">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-700 mb-4">
            Discover guided meditations rooted in ancient Hindu traditions to help you find inner peace and spiritual growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meditationGuides.map(guide => (
              <motion.div
                key={guide.id}
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-orange-600">{guide.title}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {guide.duration}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{guide.description}</p>
                <button
                  onClick={() => handlePlay(guide)}
                  className={`flex items-center justify-center w-full py-2 rounded-full transition-colors ${
                    activeGuide?.id === guide.id && isPlaying
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  <span className="mr-2">
                    {activeGuide?.id === guide.id && isPlaying ? '⏸️' : '▶️'}
                  </span>
                  {activeGuide?.id === guide.id && isPlaying ? 'Pause' : 'Play'}
                </button>
              </motion.div>
            ))}
          </div>
          
          {activeGuide && (
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-orange-200"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center">
                  <div className="mr-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>
                  <div>
                    <div className="font-semibold">{activeGuide.title}</div>
                    <div className="text-sm text-gray-500">{activeGuide.duration}</div>
                  </div>
                </div>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-orange-500 h-2 rounded-full"
                    initial={{ width: '0%' }}
                    animate={isPlaying ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: parseInt(activeGuide.duration), ease: 'linear' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MeditationGuides;
