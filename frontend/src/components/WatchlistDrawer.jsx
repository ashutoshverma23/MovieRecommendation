import React from "react";
import { X, Trash2, ExternalLink, Bookmark, Film } from "lucide-react";

export default function WatchlistDrawer({
  isOpen,
  onClose,
  watchlist,
  onRemoveFromWatchlist,
  onSelectMovie,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-cinema-900 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Your Watchlist</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300">
                {watchlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="mt-4 overflow-y-auto max-h-[calc(100vh-160px)] space-y-3 pr-1">
            {watchlist.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Film className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-medium">No movies saved yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Take the quiz or browse the catalog to bookmark movies!
                </p>
              </div>
            ) : (
              watchlist.map((movie) => (
                <div
                  key={movie.movie_id}
                  onClick={() => {
                    onSelectMovie(movie);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-cinema-850 hover:bg-cinema-800 border border-white/5 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                >
                  <img
                    src={movie.poster}
                    alt={movie.movie_name}
                    className="w-12 h-16 object-cover rounded-lg shrink-0 border border-white/10"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate group-hover:text-amber-300">
                      {movie.movie_name}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {movie.year} • {movie.genre}
                    </p>
                    <span className="text-[10px] font-semibold text-amber-400 mt-1 block">
                      {movie.mood} • {movie.runtime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(movie.movie_id);
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        {watchlist.length > 0 && (
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500">
              Saved locally in your browser session
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
