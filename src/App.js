import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Paywall from './components/Paywall';
import Profile from './components/Profile';
import Notification from './components/Notification';
import Streaks from './components/Streaks';
import LoadingSkeleton from './components/LoadingSkeleton';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Calendar from './pages/Calendar';
import DeityExplorer from './pages/DeityExplorer';
import Settings from './pages/Settings';

function App() {
  // App-wide state
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [user, setUser] = useState(null); // null = not logged in
  const [screen, setScreen] = useState('home');
  const [premium, setPremium] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [showPaywall, setShowPaywall] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(8); // Example streak count

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
    return <Onboarding onFinish={() => setHasOnboarded(true)} />;
  }

  // Auth
  if (!user) {
    return <Auth onAuth={() => {
      setUser({ email: 'user@email.com' });
      setNotification('Welcome back!');
    }} />;
  }

  // Paywall
  if (showPaywall) {
    return <Paywall onUnlock={() => { setPremium(true); setShowPaywall(false); setNotification('Premium unlocked!'); }} onBack={() => setShowPaywall(false)} />;
  }

  // Profile
  if (screen === 'profile') {
    return <div className="relative">
      <Profile user={user} onLogout={() => { setUser(null); setHasOnboarded(false); }} onBack={() => setScreen('home')} />
      <div className="absolute top-4 right-4"><Streaks count={streak} /></div>
    </div>;
  }

  // Settings
  if (screen === 'settings') {
    return <Settings theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} />;
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-orange-50 text-gray-900'}`} style={{ fontSize }}>
      {/* Sidebar */}
      <Sidebar active={screen} onNavigate={handleNavigate} collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {loading && <div className="p-8"><LoadingSkeleton height={64} /></div>}
        {!loading && (
          <AnimatePresence mode="wait">
            {screen === 'home' && <Home key="home" />}
            {screen.startsWith('library') && <Library key="library" />}
            {screen === 'search' && <Search key="search" />}
            {screen === 'calendar' && <Calendar key="calendar" />}
            {screen === 'explorer' && <DeityExplorer key="explorer" />}
          </AnimatePresence>
        )}
      </main>
      <Notification message={notification} onClose={() => setNotification('')} />
    </div>
  );
}

export default App;
