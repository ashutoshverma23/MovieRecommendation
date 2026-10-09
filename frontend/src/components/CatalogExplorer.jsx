import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Star, 
  Bookmark, 
  Clock, 
  Film, 
  Sparkles, 
  Check, 
  X,
  SlidersHorizontal
} from "lucide-react";

export default function CatalogExplorer({
  movies,
  onSelectMovie,
  onAddToWatchlist,
  isWatchlisted,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedIntensity, setSelectedIntensity] = useState("All");
  const [selectedComplexity, setSelectedComplexity] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  const moods = [
    "All",
    "Feel-good",
    "Adrenaline Rush",
    "Tense & Thrilling",
    "Deep & Emotional",
    "Inspiring",
    "Dark & Gritty",
    "Mind-bending & Epic",
  ];

  const eras = [
    "All",
    "2024-Latest",
    "2010s-2023",
    "2000s",
    "90s (1990-1999)",
  ];

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (m.movie_name || "").toLowerCase().includes(q);
        const matchesCast = (m.cast || "").toLowerCase().includes(q);
        const matchesDirector = (m.director || "").toLowerCase().includes(q);
        const matchesGenre = (m.genre || "").toLowerCase().includes(q);
        if (!matchesName && !matchesCast && !matchesDirector && !matchesGenre) {
          return false;
        }
      }

      // Mood filter
      if (selectedMood !== "All") {
        const mMod = (m.mood || "").toLowerCase();
        const sMod = selectedMood.toLowerCase();
        if (!mMod.includes(sMod)) return false;
      }

      // Era filter
      if (selectedEra !== "All") {
        if (selectedEra === "2024-Latest" && m.year < 2024) return false;
        if (selectedEra === "2010s-2023" && (m.year < 2010 || m.year > 2023)) return false;
        if (selectedEra === "2000s" && (m.year < 2000 || m.year > 2009)) return false;
        if (selectedEra === "90s (1990-1999)" && (m.year < 1990 || m.year > 1999)) return false;
      }

      // Intensity filter
      if (selectedIntensity !== "All" && m.emotional_intensity !== selectedIntensity) {
        return false;
      }

      // Complexity filter
      if (selectedComplexity !== "All" && m.complexity !== selectedComplexity) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating-desc") return (b.imdb_rating || 0) - (a.imdb_rating || 0);
      if (sortBy === "year-desc") return (b.year || 0) - (a.year || 0);
      if (sortBy === "year-asc") return (a.year || 0) - (b.year || 0);
      if (sortBy === "title-asc") return (a.movie_name || "").localeCompare(b.movie_name || "");
      return 0;
    });
  }, [
    movies,
    searchQuery,
    selectedMood,
    selectedEra,
    selectedIntensity,
    selectedComplexity,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedMood("All");
    setSelectedEra("All");
    setSelectedIntensity("All");
    setSelectedComplexity("All");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Movie Catalog (1990–2026)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse and filter through all {movies.length.toLocaleString()} enriched Bollywood & Indian cinema titles
          </p>
        </div>

        {/* Live Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-cinema-850 border border-white/10 text-xs font-bold text-amber-400">
            Showing {filteredMovies.length.toLocaleString()} titles
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by movie title, actor (e.g. Shah Rukh Khan), director or genre..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-cinema-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills: Moods */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <span>Filter by Mood</span>
            {(selectedMood !== "All" || selectedEra !== "All" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-amber-400 hover:underline normal-case text-xs"
              >
                Reset All Filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedMood(m);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedMood === m
                    ? "bg-amber-500 text-black shadow-glow-gold"
                    : "bg-cinema-900/80 text-slate-300 border border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row: Era, Intensity, Complexity, Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/5">
          {/* Era */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Release Era
            </label>
            <select
              value={selectedEra}
              onChange={(e) => {
                setSelectedEra(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 rounded-lg bg-cinema-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {eras.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>

          {/* Emotional Intensity */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Emotional Intensity
            </label>
            <select
              value={selectedIntensity}
              onChange={(e) => {
                setSelectedIntensity(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 rounded-lg bg-cinema-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Intensities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Complexity */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Complexity
            </label>
            <select
              value={selectedComplexity}
              onChange={(e) => {
                setSelectedComplexity(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 rounded-lg bg-cinema-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Complexities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-cinema-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="rating-desc">Highest IMDb Rating</option>
              <option value="year-desc">Release Year (Newest First)</option>
              <option value="year-asc">Release Year (Oldest First)</option>
              <option value="title-asc">Movie Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      {paginatedMovies.length === 0 ? (
        <div className="glass-panel rounded-2xl py-16 text-center">
          <p className="text-slate-400 text-sm">No movies match your selected criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {paginatedMovies.map((movie) => {
            const isSaved = isWatchlisted(movie.movie_id);
            const themesList = Array.isArray(movie.themes)
              ? movie.themes.join(", ")
              : movie.themes;

            return (
              <div
                key={movie.movie_id}
                onClick={() => onSelectMovie(movie)}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer border border-white/5 relative group"
              >
                {/* Poster Container */}
                <div className="relative aspect-[2/3] w-full bg-cinema-900 overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.movie_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-transparent opacity-80" />

                  {/* Year badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-bold text-slate-200 border border-white/10">
                    {movie.year}
                  </span>

                  {/* Watchlist Quick Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToWatchlist(movie);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                      isSaved
                        ? "bg-amber-500 text-black shadow-glow-gold"
                        : "bg-black/60 text-slate-300 hover:text-white border border-white/10"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Rating badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-black/80 px-2 py-0.5 rounded-md border border-white/5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.imdb_rating || "7.5"}</span>
                  </div>
                </div>

                {/* Movie Details Footer */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {movie.movie_name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {movie.genre}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="space-y-1 pt-1 border-t border-white/5 text-[10px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{movie.runtime}</span>
                      <span className="text-amber-400 font-semibold">{movie.mood}</span>
                    </div>
                    <div className="truncate text-slate-500">
                      {themesList}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-cinema-850 border border-white/10 text-xs font-bold text-slate-300 disabled:opacity-30 hover:bg-cinema-800"
          >
            Previous
          </button>
          <span className="text-xs text-slate-400 font-medium px-3">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl bg-cinema-850 border border-white/10 text-xs font-bold text-slate-300 disabled:opacity-30 hover:bg-cinema-800"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
