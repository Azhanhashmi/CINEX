import React from 'react';
import { IMG } from '../hooks/useTMDB';

export default function MediaCard({ item, onClick }) {
  const title  = item.title || item.name || 'Untitled';
  const poster = item.poster_path ? `${IMG}/w300${item.poster_path}` : null;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : '—';
  const year   = (item.release_date || item.first_air_date || '').slice(0, 4);

  return (
    <div
      onClick={() => onClick(item)}
      className="group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Fixed aspect ratio poster - this ensures all cards are same size */}
      <div className="relative w-full aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden mb-2">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-3xl">
            {title[0]}
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black/75 text-yellow-400 text-[10px] font-medium px-2 py-0.5 rounded">
          ⭐ {rating}
        </div>

        {/* Hover play overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-10 h-10 rounded-full bg-[#e50914] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div>

      <p className="text-xs font-medium text-gray-200 truncate">{title}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">{year}</p>
    </div>
  );
}
