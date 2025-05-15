import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import GuidedJourneyScreen from './components/GuidedJourneyScreen';
import MythologyScreen from './components/MythologyScreen';
import AIChatScreen from './components/AIChatScreen';
import MenuItem from './components/MenuItem';

const menuItems = [
  { label: 'Home', key: 'home' },
  { label: 'Guided Journeys', key: 'guided' },
  { label: 'Mythology', key: 'mythology' },
  { label: 'AI Chat', key: 'chat' },
];

function App() {
  const [screen, setScreen] = useState('home');
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
              onClick={() => setScreen(item.key)}
            />
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {screen === 'home' && <HomeScreen key="home" onNavigate={setScreen} />}
          {screen === 'guided' && <GuidedJourneyScreen key="guided" onBack={() => setScreen('home')} />}
          {screen === 'mythology' && <MythologyScreen key="mythology" onBack={() => setScreen('home')} />}
          {screen === 'chat' && <AIChatScreen key="chat" onBack={() => setScreen('home')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
