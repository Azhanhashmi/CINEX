import { useState, useEffect, useCallback } from 'react';

const KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';
export const IMG = 'https://image.tmdb.org/t/p';

const ENDPOINTS = {
  home:   `${BASE}/trending/all/week?api_key=${KEY}`,
  movies: `${BASE}/trending/movie/week?api_key=${KEY}`,
  series: `${BASE}/trending/tv/week?api_key=${KEY}`,
  scifi:  `${BASE}/discover/movie?api_key=${KEY}&with_genres=878&sort_by=popularity.desc`,
  horror: `${BASE}/discover/movie?api_key=${KEY}&with_genres=27&sort_by=popularity.desc`,
};

export function useFeed(tab) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ENDPOINTS[tab] || ENDPOINTS.home);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setItems(data.results || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { load(); }, [load]);
  return { items, loading, error };
}

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${BASE}/search/multi?api_key=${KEY}&query=${encodeURIComponent(query)}`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults((data.results || []).filter(r => r.media_type !== 'person'));
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [query]);

  return { results, loading, error };
}
