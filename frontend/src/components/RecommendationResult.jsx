import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  ExternalLink, 
  Star, 
  Clock, 
  Layers, 
  Smile, 
  Activity, 
  Calendar, 
  Check, 
  Film
} from "lucide-react";

export default function RecommendationResult({
  result,
  answers,
  onReset,
  onAddToWatchlist,
  isWatchlisted,
  onSelectMovie,
}) {
  const { topMatch, alternatives } = result;

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#e11d48", "#8b5cf6", "#10b981"],
      });
    } catch (e) {
      // ignore
    }
  }, [topMatch]);

  if (!topMatch) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No matching movies found. Try adjusting your preferences!</p>
        <button
          onClick={onReset}
          className="mt-4 px-6 py-2.5 bg-amber-500 text-black font-bold rounded-xl"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const themesList = Array.isArray(topMatch.themes)
    ? topMatch.themes.join(", ")
    : topMatch.themes;

  const inWatchlist = isWatchlisted(topMatch.movie_id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-12">
      {/* Top Banner / Match Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              CineMatch Result
            </span>
            <span className="text-xs text-slate-400">Evaluated 1,855+ titles (1990–2026)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Here's Your Top Movie Match
          </h1>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-cinema-850 hover:bg-cinema-800 text-slate-300 hover:text-white border border-white/10 transition-all shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Change Answers</span>
        </button>
      </div>

      {/* Hero Showcase Card for the Top Recommendation */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Backdrops */}
        <div className="ambient-glow top-0 right-10 w-96 h-96 bg-amber-500/25" />
        <div className="ambient-glow bottom-0 left-10 w-96 h-96 bg-rose-600/20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Movie Poster & Quick Meta */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <img
                src={topMatch.poster}
                alt={topMatch.movie_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/90 via-transparent to-transparent" />
              
              {/* Match Score Badge */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/50 flex items-center gap-1.5 shadow-glow-gold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-extrabold text-sm text-amber-300">
                  {topMatch.matchScore}% Match
                </span>
              </div>

              {/* Release Year Pill */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-slate-200">
                {topMatch.year}
              </div>
            </div>

            {/* Watchlist & Search actions */}
            <div className="flex gap-2.5 w-full max-w-[280px] mt-4">
              <button
                onClick={() => onAddToWatchlist(topMatch)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  inWatchlist
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : "bg-cinema-800 hover:bg-cinema-700 border-white/10 text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{inWatchlist ? "Watchlisted" : "Save"}</span>
              </button>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(topMatch.movie_name + " movie " + topMatch.year + " watch online trailer")}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-glow-gold transition-all"
              >
                <span>Where to Watch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Detailed Structured Attributes */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {topMatch.era}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>IMDb {topMatch.imdb_rating || "8.0"}</span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {topMatch.movie_name}
              </h2>
            </div>

            {/* Match Rationale / Explanation */}
            {topMatch.matchReasons && topMatch.matchReasons.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why This Matches Your Quiz</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topMatch.matchReasons.map((reason, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs text-slate-200 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5"
                    >
                      <Check className="w-3 h-3 text-amber-400" />
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Exactly formatted attributes section as requested */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Genre
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block truncate">
                  {topMatch.genre}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Runtime
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {topMatch.runtime}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Mood
                </span>
                <span className="text-sm font-bold text-amber-300 mt-0.5 block truncate">
                  {topMatch.mood}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Emotional Intensity
                </span>
                <span className="text-sm font-bold text-rose-300 mt-0.5 block">
                  {topMatch.emotional_intensity}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Complexity
                </span>
                <span className="text-sm font-bold text-cyan-300 mt-0.5 block">
                  {topMatch.complexity}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cinema-900/80 border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Themes
                </span>
                <span className="text-sm font-bold text-emerald-300 mt-0.5 block truncate">
                  {themesList}
                </span>
              </div>
            </div>

            {/* Overview / Story Synopsis */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Synopsis
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {topMatch.overview || "An engaging cinematic journey with outstanding performances."}
              </p>
            </div>

            {/* Cast & Director */}
            <div className="border-t border-white/5 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Director:</span>
                <span className="text-slate-200 mt-0.5 block font-medium">
                  {topMatch.director || "Renowned Filmmaker"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Starring:</span>
                <span className="text-slate-200 mt-0.5 block font-medium">
                  {topMatch.cast || "Ensemble Cast"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Top Matches Section */}
      {alternatives && alternatives.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Other High-Ranking Matches for You
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Close contenders that also fit your mood & intensity profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {alternatives.slice(0, 6).map((movie) => {
              const movieThemes = Array.isArray(movie.themes)
                ? movie.themes.join(", ")
                : movie.themes;
              const isSaved = isWatchlisted(movie.movie_id);

              return (
                <div
                  key={movie.movie_id}
                  onClick={() => onSelectMovie(movie)}
                  className="glass-panel glass-panel-hover rounded-2xl p-4 flex flex-col justify-between cursor-pointer border border-white/5 relative group"
                >
                  <div className="flex gap-4">
                    <img
                      src={movie.poster}
                      alt={movie.movie_name}
                      className="w-20 h-28 object-cover rounded-xl shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                          {movie.matchScore}% Match
                        </span>
                        <span className="text-[11px] text-slate-400">{movie.year}</span>
                      </div>
                      <h4 className="font-bold text-white text-base truncate group-hover:text-amber-300 transition-colors">
                        {movie.movie_name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{movie.genre}</p>
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-300">
                        <span className="px-1.5 py-0.5 rounded bg-white/5">{movie.runtime}</span>
                        <span className="text-amber-400 font-semibold">{movie.mood}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 truncate max-w-[180px]">
                      {movieThemes}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWatchlist(movie);
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isSaved
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
