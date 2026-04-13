import React from 'react';

const TABS = [
  { key: 'home',   label: 'Home' },
  { key: 'movies', label: 'Movies' },
  { key: 'series', label: 'Series' },
  { key: 'scifi',  label: 'Sci-Fi' },
  { key: 'horror', label: 'Horror' },
];

export default function Navbar({ tab, onTab, search, onSearch }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center gap-6 px-10 h-16 bg-gradient-to-b from-[#080808] to-[#08080899] backdrop-blur-md border-b border-white/5">
      {/* Logo */}
      <span className="font-title text-2xl tracking-widest text-white shrink-0">
        CINE<em className="not-italic text-[#e50914]">X</em>
      </span>

      {/* Tabs */}
      <div className="flex items-center gap-1 flex-1">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { onTab(t.key); onSearch(''); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-[#e50914] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative shrink-0">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="bg-[#1a1a1a] border border-[#222] rounded-full py-2 pl-8 pr-8 text-sm text-white placeholder-gray-600 outline-none focus:border-[#e50914] w-48 focus:w-64 transition-all"
        />
        {search && (
          <button onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">✕</button>
        )}
      </div>
    </nav>
  );
}
