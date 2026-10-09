import React from "react";
import { X, Star, Bookmark, ExternalLink, Clock, Layers, Sparkles } from "lucide-react";

export default function MovieDetailsModal({
  movie,
  onClose,
  onAddToWatchlist,
  isWatchlisted,
}) {
  if (!movie) return null;

  const isSaved = isWatchlisted(movie.movie_id);
  const themesList = Array.isArray(movie.themes)
    ? movie.themes.join(", ")
    : movie.themes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Poster */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={movie.poster}
                alt={movie.movie_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="flex gap-2 w-full mt-4">
              <button
                onClick={() => onAddToWatchlist(movie)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  isSaved
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : "bg-cinema-800 hover:bg-cinema-700 border-white/10 text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? "Saved in Watchlist" : "Save Movie"}</span>
              </button>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(movie.movie_name + " movie " + movie.year + " watch online trailer")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center p-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 transition-all shadow-glow-gold"
                title="Search trailer and streaming options"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {movie.year}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-slate-300">
                  {movie.era}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>IMDb {movie.imdb_rating || "7.5"}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {movie.movie_name}
              </h2>
            </div>

            {/* Exactly formatted specification attributes */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Genre</span>
                <span className="font-semibold text-white mt-0.5 block truncate">{movie.genre}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Runtime</span>
                <span className="font-semibold text-white mt-0.5 block">{movie.runtime}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Mood</span>
                <span className="font-semibold text-amber-400 mt-0.5 block">{movie.mood}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Emotional Intensity</span>
                <span className="font-semibold text-rose-400 mt-0.5 block">{movie.emotional_intensity}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Complexity</span>
                <span className="font-semibold text-cyan-400 mt-0.5 block">{movie.complexity}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cinema-900 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Themes</span>
                <span className="font-semibold text-emerald-400 mt-0.5 block truncate">{themesList}</span>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {movie.overview || "No overview available for this title."}
              </p>
            </div>

            {/* Cast & Director */}
            <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
              <div>
                <span className="text-slate-400 font-semibold">Director: </span>
                <span className="text-slate-200">{movie.director || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Cast: </span>
                <span className="text-slate-200">{movie.cast || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
