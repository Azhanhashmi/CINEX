import React from 'react';
import MediaCard from './MediaCard';

function Skeleton() {
  return (
    <div>
      <div className="w-full aspect-[2/3] bg-[#1a1a1a] rounded-lg mb-2 animate-pulse" />
      <div className="h-2.5 bg-[#1a1a1a] rounded animate-pulse mb-1.5" />
      <div className="h-2 w-1/2 bg-[#1a1a1a] rounded animate-pulse" />
    </div>
  );
}

export default function Grid({ items, loading, error, onSelect, title }) {
  return (
    <section className="px-10 pb-16 -mt-20 relative z-10">
      {title && (
        <h2 className="font-title text-2xl tracking-wide text-white mb-5">{title}</h2>
      )}

      {error && (
        <div className="text-center py-20 text-gray-500">⚠ {error}</div>
      )}

      {!error && !loading && items.length === 0 && (
        <div className="text-center py-20 text-gray-500">No results found</div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {loading
          ? Array.from({ length: 14 }).map((_, i) => <Skeleton key={i} />)
          : items.map(item => (
              <MediaCard key={item.id} item={item} onClick={onSelect} />
            ))
        }
      </div>
    </section>
  );
}
