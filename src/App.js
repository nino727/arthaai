import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Paywall from './components/Paywall';
import Profile from './components/Profile';
import NotificationContainer from './components/Notification';
import Streaks from './components/Streaks';
import LoadingSkeleton from './components/LoadingSkeleton';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Calendar from './pages/Calendar';
import DeityExplorer from './pages/DeityExplorer';
import Settings from './pages/Settings';
import MeditationGuides from './pages/MeditationGuides';
import { useNotifications } from './contexts/NotificationContext';
import { useStreak } from './contexts/StreakContext';

function App() {
  // App-wide state with contexts
  const { notifySuccess, notifyInfo } = useNotifications();
  const { updateStreak } = useStreak();
  
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [user, setUser] = useState(null); // null = not logged in
  const [screen, setScreen] = useState('home');
  const [premium, setPremium] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [showPaywall, setShowPaywall] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check local storage on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedFontSize = localStorage.getItem('fontSize');
    const storedHasOnboarded = localStorage.getItem('hasOnboarded');
    const storedPremium = localStorage.getItem('premium');
    
    if (storedTheme) setTheme(storedTheme);
    if (storedFontSize) setFontSize(parseInt(storedFontSize, 10));
    if (storedHasOnboarded === 'true') setHasOnboarded(true);
    if (storedPremium === 'true') setPremium(true);
  }, []);

  // Save preferences to local storage when they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize.toString());
    localStorage.setItem('hasOnboarded', hasOnboarded.toString());
    localStorage.setItem('premium', premium.toString());
  }, [theme, fontSize, hasOnboarded, premium]);

  // Paywall-protected screens
  const protectedScreens = ['library-vedas', 'library-upanishads', 'library-ramayana', 'library-gita'];

  const handleNavigate = (nextScreen) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (protectedScreens.includes(nextScreen) && !premium) {
        setShowPaywall(true);
      } else {
        setScreen(nextScreen);
      }
    }, 500); // Simulate loading
  };

  // Onboarding
  if (!hasOnboarded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Onboarding onFinish={() => {
          setHasOnboarded(true);
          notifySuccess('Welcome to Bodhi AI!'); 
        }} />
      </motion.div>
    );
  }

  // Auth
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Auth onAuth={() => {
          setUser({ email: 'user@email.com' });
          notifySuccess('Welcome back!');
          updateStreak(); // Update login streak
        }} />
      </motion.div>
    );
  }

  // Paywall
  if (showPaywall) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Paywall 
          onUnlock={() => { 
            setPremium(true); 
            setShowPaywall(false); 
            notifySuccess('Premium unlocked! Enjoy all content.'); 
          }} 
          onBack={() => setShowPaywall(false)} 
        />
      </motion.div>
    );
  }

  // Profile
  if (screen === 'profile') {
    return (
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Profile 
          user={user} 
          onLogout={() => { 
            setUser(null); 
            localStorage.removeItem('hasOnboarded'); 
            setHasOnboarded(false);
            notifyInfo('You have been logged out');
          }} 
          onBack={() => setScreen('home')} 
        />
        <div className="absolute top-4 right-4">
          <Streaks />
        </div>
      </motion.div>
    );
  }

  // Settings
  if (screen === 'settings') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Settings 
          theme={theme} 
          setTheme={(newTheme) => {
            setTheme(newTheme);
            notifyInfo(`Theme changed to ${newTheme}`);
          }} 
          fontSize={fontSize} 
          setFontSize={(newSize) => {
            setFontSize(newSize);
            notifyInfo(`Font size updated`);
          }} 
        />
      </motion.div>
    );
  }

  // Main Layout
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-orange-50 text-gray-900'}`} style={{ fontSize }}>
      {/* Sidebar */}
      <Sidebar active={screen} onNavigate={handleNavigate} collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-6">
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="scripture" count={3} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {screen === 'home' && (
              <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Home />
              </motion.div>
            )}
            {screen.startsWith('library') && (
              <motion.div key="library" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Library />
              </motion.div>
            )}
            {screen === 'search' && (
              <motion.div key="search" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Search />
              </motion.div>
            )}
            {screen === 'calendar' && (
              <motion.div key="calendar" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Calendar />
              </motion.div>
            )}
            {screen === 'explorer' && (
              <motion.div key="explorer" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <DeityExplorer />
              </motion.div>
            )}
            {screen === 'meditation' && (
              <motion.div key="meditation" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <MeditationGuides />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}

export default App;
