import React, { useState, useEffect } from "react";
import moviesData from "./data/movies.json";
import { recommendMovies } from "./utils/recommender";
import Navbar from "./components/Navbar";
import QuizWizard from "./components/QuizWizard";
import RecommendationResult from "./components/RecommendationResult";
import CatalogExplorer from "./components/CatalogExplorer";
import MovieDetailsModal from "./components/MovieDetailsModal";
import WatchlistDrawer from "./components/WatchlistDrawer";
import { Sparkles, Film, ArrowRight, Flame, Star, CheckCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("quiz");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist persisted in localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("cinematch_watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cinematch_watchlist", JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  const handleToggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.movie_id === movie.movie_id);
      if (exists) {
        return prev.filter((m) => m.movie_id !== movie.movie_id);
      } else {
        return [movie, ...prev];
      }
    });
  };

  const isWatchlisted = (movieId) => {
    return watchlist.some((m) => m.movie_id === movieId);
  };

  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    const result = recommendMovies(answers, moviesData);
    setRecommendationResult(result);
  };

  const handleResetQuiz = () => {
    setRecommendationResult(null);
    setIsQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-cinema-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === "quiz" && !recommendationResult) {
            setIsQuizStarted(false);
          }
        }}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {activeTab === "quiz" ? (
          <div>
            {!isQuizStarted && !recommendationResult ? (
              /* Hero Landing for Quiz */
              <div className="max-w-5xl mx-auto px-4 pt-12 sm:pt-20 pb-12 text-center relative">
                {/* Glowing ambient lights */}
                <div className="ambient-glow top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20" />
                <div className="ambient-glow top-40 left-1/4 w-80 h-80 bg-rose-600/15" />

                <div className="relative z-10 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-glow-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Intelligent Indian Cinema Recommendation System</span>
                  </div>

                  {/* Hero Headline */}
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
                    Stop scrolling endlessly. Find your{" "}
                    <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200 bg-clip-text text-transparent">
                      perfect movie match.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Answer 5 quick questions about your current <strong>mood</strong>, <strong>emotional intensity</strong>, <strong>plot complexity</strong>, and <strong>themes</strong>. Our engine instantly analyzes 1,855+ films from the 90s to latest 2026 releases.
                  </p>

                  {/* Primary Call to Action */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setIsQuizStarted(true)}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-black font-extrabold text-lg flex items-center justify-center gap-3 shadow-glow-gold hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Start Recommendation Quiz</span>
                      <ArrowRight className="w-5 h-5 font-bold" />
                    </button>

                    <button
                      onClick={() => setActiveTab("explore")}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-cinema-850 hover:bg-cinema-800 text-slate-300 hover:text-white border border-white/10 font-bold text-base transition-all"
                    >
                      Browse All 1,855 Movies
                    </button>
                  </div>

                  {/* Feature Highlights Card Preview */}
                  <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                    <div className="p-4 rounded-2xl bg-cinema-900/60 border border-white/5 backdrop-blur-md">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-2">
                        1
                      </div>
                      <h3 className="font-bold text-sm text-white">Mood-Driven Matching</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        From Feel-good comfort to high-octane Adrenaline Rush and dark thrillers.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cinema-900/60 border border-white/5 backdrop-blur-md">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-2">
                        2
                      </div>
                      <h3 className="font-bold text-sm text-white">Intensity & Complexity</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Tailored to your current energy — relax with low complexity or dive into high puzzles.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cinema-900/60 border border-white/5 backdrop-blur-md">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
                        3
                      </div>
                      <h3 className="font-bold text-sm text-white">90s to 2026 Blockbusters</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Featuring 3 Idiots, DDLJ, Dangal up to latest 2024–2026 hits like Stree 2 & Kalki.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : recommendationResult ? (
              /* Recommendation Results View */
              <RecommendationResult
                result={recommendationResult}
                answers={userAnswers}
                onReset={handleResetQuiz}
                onAddToWatchlist={handleToggleWatchlist}
                isWatchlisted={isWatchlisted}
                onSelectMovie={setSelectedMovie}
              />
            ) : (
              /* Active Quiz Wizard */
              <QuizWizard onComplete={handleQuizComplete} />
            )}
          </div>
        ) : (
          /* Catalog Explorer View */
          <CatalogExplorer
            movies={moviesData}
            onSelectMovie={setSelectedMovie}
            onAddToWatchlist={handleToggleWatchlist}
            isWatchlisted={isWatchlisted}
          />
        )}
      </main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onAddToWatchlist={handleToggleWatchlist}
        isWatchlisted={isWatchlisted}
      />

      {/* Watchlist Side Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemoveFromWatchlist={handleToggleWatchlist}
        onSelectMovie={setSelectedMovie}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        <p>CineMatch AI • Powered by Enriched Bollywood & Indian Cinema Dataset (1990–2026)</p>
      </footer>
    </div>
  );
}
