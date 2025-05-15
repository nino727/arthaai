import React from 'react';
import { motion } from 'framer-motion';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
  // To simulate content loading
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate content loading 
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Welcome to Bodhi AI</h2>
      
      {loading ? (
        <div className="space-y-6">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="text" lines={3} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Your Spiritual Journey</h3>
            <p className="text-gray-700">
              Explore the depths of Hindu wisdom through our AI-powered app.
              Ask questions, discover ancient texts, and learn about the rich tradition.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                Start Chat
              </button>
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition">
                Explore Library
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="font-semibold mb-1">Advanced Search</h4>
              <p className="text-sm text-gray-600">Search through scriptures and ancient texts</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">🗓️</div>
              <h4 className="font-semibold mb-1">Hindu Calendar</h4>
              <p className="text-sm text-gray-600">Track festivals and auspicious days</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">🕉️</div>
              <h4 className="font-semibold mb-1">Deity Explorer</h4>
              <p className="text-sm text-gray-600">Learn about various deities and their significance</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
