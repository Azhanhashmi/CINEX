import React, { useState } from 'react';

const TABS = [
  { key: 'home',   label: 'Home' },
  { key: 'movies', label: 'Movies' },
  { key: 'series', label: 'Series' },
  { key: 'scifi',  label: 'Sci-Fi' },
  { key: 'horror', label: 'Horror' },
];

export default function Navbar({ tab, onTab, search, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTab = (key) => {
    onTab(key);
    onSearch('');
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between gap-4 px-5 h-14">
        <span className="font-title text-2xl tracking-widest text-white shrink-0">
          CINE<em className="not-italic text-[#e50914]">X</em>
        </span>

        {/* Tabs — desktop only */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => handleTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                tab === t.key ? 'bg-[#e50914] text-white' : 'text-gray-400 hover:text-white'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search..." value={search} onChange={e => onSearch(e.target.value)}
            className="bg-[#1a1a1a] border border-[#222] rounded-full py-2 pl-8 pr-7 text-sm text-white placeholder-gray-600 outline-none focus:border-[#e50914] w-36 sm:w-44 transition-all" />
          {search && <button onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">✕</button>}
        </div>

        {/* Hamburger — mobile only */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col border-t border-white/5 px-5 py-3 gap-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => handleTab(t.key)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === t.key ? 'bg-[#e50914] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}