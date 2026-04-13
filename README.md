# CineExplore

Netflix-style movie & series explorer — React + Tailwind CSS + TMDB API.

## Setup

### 1. Get TMDB API Key (free)
- Sign up at [themoviedb.org](https://www.themoviedb.org/)
- Settings → API → Request key → Developer

### 2. Add API Key
Open `.env` and replace:
```
REACT_APP_TMDB_API_KEY=paste_your_key_here
```

### 3. Run
```bash
npm install
npm start
```

## Features
- Full-screen hero (top trending item)
- Tabs: Home, Movies, Series, Sci-Fi, Horror
- Live search with debounce (400ms)
- Uniform responsive card grid (3–7 cols)
- Skeleton loading states
- Error handling
- Movie/series modal with Vidking player
- Esc key closes modal
- Footer with name, email, GitHub

## Component Structure
```
src/
├── hooks/useTMDB.js     API logic
├── components/
│   ├── Navbar.jsx       Nav + search
│   ├── Hero.jsx         Full-screen banner
│   ├── Grid.jsx         Card grid + skeletons
│   ├── MediaCard.jsx    Uniform movie card
│   ├── Modal.jsx        Detail + video player
│   └── Footer.jsx       Footer
└── App.js               State management
```

## Tech
- React 18
- Tailwind CSS
- TMDB API
- Vidking embed
