import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import GuidedJourneyScreen from './components/GuidedJourneyScreen';
import MythologyScreen from './components/MythologyScreen';
import AIChatScreen from './components/AIChatScreen';
import MenuItem from './components/MenuItem';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Paywall from './components/Paywall';
import Profile from './components/Profile';

const menuItems = [
  { label: 'Home', key: 'home' },
  { label: 'Guided Journeys', key: 'guided' },
  { label: 'Mythology', key: 'mythology' },
  { label: 'AI Chat', key: 'chat' },
  { label: 'Profile', key: 'profile' },
];

function App() {
  // Mock user and paywall state
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [user, setUser] = useState(null); // null = not logged in
  const [screen, setScreen] = useState('home');
  const [premium, setPremium] = useState(false);

  // Paywall-protected screens
  const protectedScreens = ['guided', 'chat'];
  const [showPaywall, setShowPaywall] = useState(false);

  const handleNavigate = (nextScreen) => {
    if (protectedScreens.includes(nextScreen) && !premium) {
      setShowPaywall(true);
    } else {
      setScreen(nextScreen);
    }
  };

  // Onboarding
  if (!hasOnboarded) {
    return <Onboarding onFinish={() => setHasOnboarded(true)} />;
  }

  // Auth
  if (!user) {
    return <Auth onAuth={() => setUser({ email: 'user@email.com' })} />;
  }

  // Paywall
  if (showPaywall) {
    return <Paywall onUnlock={() => { setPremium(true); setShowPaywall(false); }} onBack={() => setShowPaywall(false)} />;
  }

  // Profile
  if (screen === 'profile') {
    return <Profile user={user} onLogout={() => { setUser(null); setHasOnboarded(false); }} onBack={() => setScreen('home')} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-gradient-to-b from-orange-100 to-yellow-50 p-4 border-r">
        <h1 className="text-2xl font-bold text-orange-600 mb-8">Bodhi AI</h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map(item => (
            <MenuItem
              key={item.key}
              label={item.label}
              active={screen === item.key}
              onClick={() => handleNavigate(item.key)}
            />
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {screen === 'home' && <HomeScreen key="home" onNavigate={handleNavigate} />}
          {screen === 'guided' && <GuidedJourneyScreen key="guided" onBack={() => setScreen('home')} />}
          {screen === 'mythology' && <MythologyScreen key="mythology" onBack={() => setScreen('home')} />}
          {screen === 'chat' && <AIChatScreen key="chat" onBack={() => setScreen('home')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
