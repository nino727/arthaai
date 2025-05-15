import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Auth = ({ onAuth }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setTimeout(() => onAuth(), 500); // Mock login/signup
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">
          {mode === 'login' ? 'Login to Bodhi AI' : 'Create your Bodhi AI Account'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <>
              <span>Don't have an account? </span>
              <button className="text-orange-600 hover:underline" onClick={() => setMode('signup')}>Sign Up</button>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <button className="text-orange-600 hover:underline" onClick={() => setMode('login')}>Login</button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;
