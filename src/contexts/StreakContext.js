import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const StreakContext = createContext();

// Provider component
export const StreakProvider = ({ children }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastLogin, setLastLogin] = useState(null);
  const [highestStreak, setHighestStreak] = useState(0);

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const storedStreak = localStorage.getItem('currentStreak');
    const storedLastLogin = localStorage.getItem('lastLogin');
    const storedHighestStreak = localStorage.getItem('highestStreak');
    
    if (storedStreak) setCurrentStreak(parseInt(storedStreak, 10));
    if (storedLastLogin) setLastLogin(new Date(storedLastLogin));
    if (storedHighestStreak) setHighestStreak(parseInt(storedHighestStreak, 10));
  }, []);

  // Update streak counter
  const updateStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If last login was yesterday, increment streak
    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin);
      lastLoginDate.setHours(0, 0, 0, 0);
      
      const differenceInDays = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
      
      if (differenceInDays === 1) {
        // User logged in on consecutive days
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        
        // Update highest streak if needed
        if (newStreak > highestStreak) {
          setHighestStreak(newStreak);
          localStorage.setItem('highestStreak', newStreak.toString());
        }
        
        localStorage.setItem('currentStreak', newStreak.toString());
      } else if (differenceInDays > 1) {
        // Streak broken, reset to 1
        setCurrentStreak(1);
        localStorage.setItem('currentStreak', '1');
      }
      // If differenceInDays is 0, user already logged in today, no change to streak
    } else {
      // First login ever
      setCurrentStreak(1);
      setHighestStreak(1);
      localStorage.setItem('currentStreak', '1');
      localStorage.setItem('highestStreak', '1');
    }
    
    // Update last login date
    setLastLogin(today);
    localStorage.setItem('lastLogin', today.toISOString());
  };

  return (
    <StreakContext.Provider value={{
      currentStreak,
      highestStreak,
      updateStreak
    }}>
      {children}
    </StreakContext.Provider>
  );
};

// Custom hook to use the streak context
export const useStreak = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
};
