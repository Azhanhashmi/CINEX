# CineExplore

A movie and series discovery app I built as part of my frontend internship assignment. The idea was simple — I wanted something that actually felt good to use, not just a basic API fetch with a list of cards. So I took inspiration from Netflix and built it around that experience.

---

## What it does

You land on a full-screen hero showing the top trending movie or show of the week. Below that is a grid of everything else trending. You can switch between tabs — Movies, Series, Sci-Fi, Horror — or just search for anything. Click a card and a modal opens with the stream embed and the details.

---

## Tech Stack

- **React 18** — component-based UI, hooks for state and side effects
- **Tailwind CSS** — utility-first styling, made responsive layout way faster
- **TMDB API** — for all the movie/series data, posters, ratings
- **Vidking** — embedded video player inside the modal

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/azhanhashmi/cineexplore.git
cd cineexplore
```

### 2. Get a TMDB API key
- Sign up at [themoviedb.org](https://www.themoviedb.org/)
- Go to Settings → API → Request a key → choose Developer
- Copy your API key (v3)

### 3. Add your key
Create a `.env` file in the root:
```
REACT_APP_TMDB_API_KEY=your_key_here
```

### 4. Install and run
```bash
npm install
npm start
```

Opens at `http://localhost:3000`

---

## Project Structure

```
src/
├── hooks/
│   └── useTMDB.js         all API calls (useFeed, useSearch)
├── components/
│   ├── Navbar.jsx          navigation tabs + search bar
│   ├── Hero.jsx            full-screen featured banner
│   ├── Grid.jsx            responsive card grid + skeleton loaders
│   ├── MediaCard.jsx       individual movie/series card
│   ├── Modal.jsx           detail view + video player
│   └── Footer.jsx          footer
└── App.js                  root component, holds all state
```

---

## Architecture decisions

**State management** — kept everything in `App.js` using `useState`. The app isn't complex enough to need Redux or Context — the selected movie, active tab, and search query are the only shared pieces of state, so passing them as props made more sense and kept things readable.

**Custom hooks** — separated all API logic into `useTMDB.js` with two hooks: `useFeed` for browsing by tab and `useSearch` for live search with a 400ms debounce so it's not firing a request on every keypress. Both handle loading and error states internally.

**Search** — uses TMDB's `/search/multi` endpoint which returns both movies and series in one call. Filters out `person` results since those aren't relevant.

**Uniform card sizes** — all cards use `aspect-[2/3]` so regardless of what TMDB returns, every poster is the same height. Fixes the uneven grid issue you get when mixing movies and shows.

**Environment variables** — API key lives in `.env` and is never hardcoded. `.env` is in `.gitignore` so it never gets pushed to GitHub.

---

## API

**The Movie Database (TMDB)** — [themoviedb.org](https://www.themoviedb.org/)

Endpoints used:
- `/trending/all/week` — home feed
- `/trending/movie/week` — movies tab
- `/trending/tv/week` — series tab
- `/discover/movie?with_genres=878` — sci-fi
- `/discover/movie?with_genres=27` — horror
- `/search/multi` — search

---

## Author

Azhan Hashmi
