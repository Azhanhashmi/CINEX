import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Grid from './components/Grid';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { useFeed, useSearch } from './hooks/useTMDB';

export default function App() {
  const [tab, setTab]         = useState('home');
  const [search, setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  const { items, loading, error }                          = useFeed(tab);
  const { results, loading: sLoading, error: sError }     = useSearch(search);

  const isSearching    = search.trim().length > 0;
  const displayItems   = isSearching ? results : items;
  const displayLoading = isSearching ? sLoading : loading;
  const displayError   = isSearching ? sError   : error;

  const hero      = !isSearching && items.length > 0 ? items[0] : null;
  const gridItems = !isSearching && items.length > 1 ? items.slice(1) : displayItems;

  const gridTitle = isSearching ? `Results for "${search}"`
    : tab === 'home'   ? 'Trending Now'
    : tab === 'movies' ? 'Popular Movies'
    : tab === 'series' ? 'Popular Series'
    : tab === 'scifi'  ? 'Sci-Fi'
    : 'Horror';

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar tab={tab} onTab={setTab} search={search} onSearch={setSearch} />

      {!isSearching && <Hero item={hero} onPlay={setSelected} />}

      {isSearching && <div className="h-16" />}

      <Grid
        items={gridItems}
        loading={displayLoading}
        error={displayError}
        onSelect={setSelected}
        title={gridTitle}
      />

      <Footer />

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
