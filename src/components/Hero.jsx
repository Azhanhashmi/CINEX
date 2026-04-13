import React from 'react';
import { IMG } from '../hooks/useTMDB';

export default function Hero({ item, onPlay }) {
  if (!item) return null;

  const title    = item.title || item.name || 'Untitled';
  const overview = item.overview || '';
  const backdrop = item.backdrop_path ? `${IMG}/original${item.backdrop_path}` : null;
  const rating   = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const year     = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type     = item.media_type === 'tv' ? 'Series' : 'Movie';

  return (
    <div
      className="relative w-full h-screen min-h-[500px] bg-[#111] bg-cover bg-center flex items-end"
      style={{ backgroundImage: backdrop ? `url(${backdrop})` : 'none' }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#08080899] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-10 pb-20 max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#e50914] text-white text-[10px] font-semibold px-2.5 py-1 rounded uppercase tracking-wider">{type}</span>
          <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-medium px-2.5 py-1 rounded">⭐ {rating}</span>
          {year && <span className="text-gray-400 text-sm">{year}</span>}
        </div>

        <h1 className="font-title text-6xl md:text-7xl text-white leading-none tracking-wide mb-4 drop-shadow-2xl">
          {title}
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed mb-7 font-light line-clamp-3">
          {overview}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onPlay(item)}
            className="flex items-center gap-2 bg-[#e50914] hover:bg-[#c4070f] text-white px-7 py-3 rounded-md text-sm font-semibold transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><polygon points="5,3 19,12 5,21"/></svg>
            Play Now
          </button>
          <button
            onClick={() => onPlay(item)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3 rounded-md text-sm font-medium backdrop-blur-sm transition-colors"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
