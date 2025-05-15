import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';

const libraryItems = [
  { label: 'Vedas', key: 'vedas' },
  { label: 'Upanishads', key: 'upanishads' },
  { label: 'Ramayana', key: 'ramayana' },
  { label: 'Bhagavad Gita', key: 'gita' },
];

const Sidebar = ({ active, onNavigate, collapsed, setCollapsed }) => {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <aside className={`flex flex-col bg-gradient-to-b from-orange-500 to-yellow-400 text-white transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'} min-h-screen p-2 shadow-lg`}>
      <div className="flex items-center mb-8 mt-2">
        <button
          className="mr-2 md:hidden"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <Menu />
        </button>
        {!collapsed && <>
          <img src="/api/placeholder/40/40" alt="Om Symbol" className="w-10 h-10 mr-2 rounded-full bg-white" />
          <h1 className="font-bold text-xl">Bodhi AI</h1>
        </>}
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <button className={`menu-item ${active === 'home' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('home')}>
          <span role="img" aria-label="Home">🏠</span> {!collapsed && 'Home'}
        </button>
        <div>
          <button className={`menu-item flex items-center gap-2 px-4 py-3 rounded w-full ${active.startsWith('library') ? 'bg-white/20 font-bold' : ''}`} onClick={() => setLibraryOpen(!libraryOpen)}>
            <span role="img" aria-label="Library">📚</span> {!collapsed && 'Library'} {libraryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {libraryOpen && !collapsed && (
            <div className="ml-8 flex flex-col gap-1">
              {libraryItems.map(item => (
                <button
                  key={item.key}
                  className={`menu-item text-sm px-2 py-2 rounded ${active === `library-${item.key}` ? 'bg-white/30 font-bold' : ''}`}
                  onClick={() => onNavigate(`library-${item.key}`)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={`menu-item ${active === 'search' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('search')}>
          <span role="img" aria-label="Search">🔍</span> {!collapsed && 'Advanced Search'}
        </button>
        <button className={`menu-item ${active === 'calendar' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('calendar')}>
          <span role="img" aria-label="Calendar">🗓️</span> {!collapsed && 'Hindu Calendar'}
        </button>
        <button className={`menu-item ${active === 'explorer' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('explorer')}>
          <span role="img" aria-label="Deity Explorer">🕉️</span> {!collapsed && 'Deity Explorer'}
        </button>
        <button className={`menu-item ${active === 'meditation' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('meditation')}>
          <span role="img" aria-label="Meditation Guides">🧘</span> {!collapsed && 'Meditation Guides'}
        </button>
        <button className={`menu-item ${active === 'profile' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('profile')}>
          <span role="img" aria-label="Profile">👤</span> {!collapsed && 'Profile'}
        </button>
        <button className={`menu-item ${active === 'settings' ? 'bg-white/20 font-bold' : ''} flex items-center gap-2 px-4 py-3 rounded transition`} onClick={() => onNavigate('settings')}>
          <span role="img" aria-label="Settings">⚙️</span> {!collapsed && 'Settings'}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
