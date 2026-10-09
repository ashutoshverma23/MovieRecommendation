import React from "react";
import { Film, Sparkles, Compass, Bookmark, Flame } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, watchlistCount, onOpenWatchlist }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-cinema-950/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab("quiz")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-glow-gold group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
                CineMatch
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">90s to Latest (1990–2026)</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 sm:gap-3 bg-cinema-900/90 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "quiz"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-glow-gold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Smart Match</span>
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "explore"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-glow-gold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Explore Catalog</span>
            <span className="sm:hidden">Explore</span>
          </button>
        </nav>

        {/* Watchlist & Stats */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWatchlist}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cinema-850 hover:bg-cinema-800 text-slate-200 border border-white/10 hover:border-amber-500/40 transition-all group"
          >
            <Bookmark className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium hidden md:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center animate-pulse">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
