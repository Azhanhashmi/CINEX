import React, { useEffect } from 'react';
import { IMG } from '../hooks/useTMDB';

export default function Modal({ item, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  const title  = item.title || item.name;
  const year   = (item.release_date || item.first_air_date || '').slice(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const poster = item.poster_path ? `${IMG}/w300${item.poster_path}` : null;
  const type   = item.media_type === 'tv' ? 'tv' : 'movie';
  const embed  = `https://www.vidking.net/embed/${type}/${item.id}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-[#111] border border-[#222] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 border border-[#333] text-gray-400 hover:text-white flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>

        {/* Player */}
        <div className="w-full aspect-video bg-black rounded-t-xl overflow-hidden">
          <iframe src={embed} allowFullScreen title={title} frameBorder="0" allow="autoplay; encrypted-media" className="w-full h-full" />
        </div>

        {/* Info */}
        <div className="flex gap-5 p-5">
          {poster && (
            <img src={poster} alt={title} className="w-24 shrink-0 rounded-md border border-[#222] object-cover self-start" />
          )}
          <div>
            <h2 className="font-title text-2xl tracking-wide text-white mb-2">{title}</h2>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs px-2.5 py-0.5 rounded">⭐ {rating}</span>
              <span className="text-gray-400 text-sm">{year}</span>
              <span className="bg-[#1a1a1a] border border-[#222] text-gray-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                {type === 'tv' ? 'Series' : 'Movie'}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{item.overview || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
