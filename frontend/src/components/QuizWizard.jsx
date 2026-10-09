import React, { useState } from "react";
import { 
  Sparkles, 
  Smile, 
  Zap, 
  ShieldAlert, 
  Heart, 
  Trophy, 
  Skull, 
  Atom, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Clock, 
  Calendar,
  Layers,
  Activity
} from "lucide-react";

const MOOD_OPTIONS = [
  {
    id: "Feel-good",
    label: "Feel-Good & Uplifting",
    desc: "Warm smiles, heartwarming moments, wholesome comfort",
    icon: Smile,
    gradient: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
  },
  {
    id: "Adrenaline Rush",
    label: "Adrenaline Rush & Action",
    desc: "High-octane spectacles, mass swagger, electrifying showdowns",
    icon: Zap,
    gradient: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400",
  },
  {
    id: "Tense & Thrilling",
    label: "Edge-of-Your-Seat Thriller",
    desc: "Suspense, nail-biting twists, forensic mind games",
    icon: ShieldAlert,
    gradient: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    id: "Deep & Emotional",
    label: "Deep & Emotionally Moving",
    desc: "Soul-stirring journeys, poignant drama, human depth",
    icon: Heart,
    gradient: "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30 text-fuchsia-400",
  },
  {
    id: "Inspiring",
    label: "Inspiring Underdog Triumph",
    desc: "True perseverance, breaking barriers, motivating pride",
    icon: Trophy,
    gradient: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    id: "Dark & Gritty",
    label: "Dark, Gritty & Intense",
    desc: "Underworld power struggles, moral ambiguity, raw stakes",
    icon: Skull,
    gradient: "from-zinc-500/20 to-neutral-500/10 border-zinc-500/30 text-zinc-300",
  },
  {
    id: "Mind-bending & Epic",
    label: "Mind-Bending & Epic",
    desc: "Mythic lore, futuristic concepts, grand imaginative scope",
    icon: Atom,
    gradient: "from-violet-500/20 to-indigo-500/10 border-violet-500/30 text-violet-400",
  },
];

const INTENSITY_OPTIONS = [
  {
    id: "Low",
    label: "Low Intensity",
    desc: "Gentle and easy breezy. Zero anxiety, pure comfort watching.",
    bars: 1,
    color: "bg-emerald-400",
  },
  {
    id: "Medium",
    label: "Medium Intensity",
    desc: "Balanced emotional weight with satisfying dramatic highs & lows.",
    bars: 2,
    color: "bg-amber-400",
  },
  {
    id: "High",
    label: "High Intensity",
    desc: "Emotional rollercoaster. Powerful stakes, tears, and visceral reactions.",
    bars: 3,
    color: "bg-rose-500",
  },
];

const COMPLEXITY_OPTIONS = [
  {
    id: "Low",
    label: "Low Complexity",
    desc: "Smooth & direct narrative. Sit back, relax, and savor without mental fatigue.",
    badge: "Linear & Accessible",
  },
  {
    id: "Medium",
    label: "Medium Complexity",
    desc: "Engaging plot with clever revelations, character arcs, and brisk pacing.",
    badge: "Clever & Engaging",
  },
  {
    id: "High",
    label: "High Complexity",
    desc: "Deep puzzle, non-linear timelines, layered clues or moral quandaries.",
    badge: "Multi-layered & Twisted",
  },
];

const THEME_OPTIONS = [
  "Friendship",
  "Ambition & Triumph",
  "Family Ties",
  "Crime & Justice",
  "Romantic Love",
  "Revenge",
  "Patriotism & Honor",
  "Self-Discovery",
];

const ERA_OPTIONS = [
  { id: "Any", label: "Any Era (1990–2026)" },
  { id: "2024-Latest", label: "2024–2026 Blockbusters (Latest)" },
  { id: "2010s-2023", label: "Modern Hits (2010–2023)" },
  { id: "2000s", label: "2000s Golden Decade (2000–2009)" },
  { id: "90s (1990-1999)", label: "Classic 90s Nostalgia (1990–1999)" },
];

const RUNTIME_OPTIONS = [
  { id: "Any", label: "Any Duration" },
  { id: "Brisk (< 130 min)", label: "Brisk (< 130 min)" },
  { id: "Standard (130-160 min)", label: "Standard (130–160 min)" },
  { id: "Epic (160+ min)", label: "Epic Saga (160+ min)" },
];

export default function QuizWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    mood: "Feel-good",
    emotionalIntensity: "Medium",
    complexity: "Low",
    themes: ["Friendship", "Ambition & Triumph"],
    era: "Any",
    runtime: "Any",
  });

  const toggleTheme = (themeName) => {
    setAnswers((prev) => {
      const exists = prev.themes.includes(themeName);
      if (exists) {
        return { ...prev, themes: prev.themes.filter((t) => t !== themeName) };
      } else {
        return { ...prev, themes: [...prev.themes, themeName] };
      }
    });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const stepTitles = [
    { title: "Current Mood & Vibe", subtitle: "What feeling or atmosphere are you looking for right now?" },
    { title: "Emotional Intensity", subtitle: "How emotionally demanding should your watch experience be?" },
    { title: "Plot Complexity", subtitle: "How much mental puzzle-solving or narrative layering do you crave?" },
    { title: "Favorite Themes", subtitle: "Select key thematic elements you love (pick 1 or more)" },
    { title: "Era & Runtime", subtitle: "Fine-tune your time commitment and release period" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Quiz Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-white/10">
        
        {/* Subtle decorative background glows */}
        <div className="ambient-glow top-0 right-0 w-80 h-80 bg-amber-500/20" />
        <div className="ambient-glow bottom-0 left-0 w-80 h-80 bg-rose-600/15" />

        {/* Progress Bar Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Question {step} of 5</span>
            <span className="text-amber-400 font-bold">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-cinema-800 rounded-full h-2 overflow-hidden border border-white/5">
            <div 
              className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-glow-gold"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Title */}
        <div className="relative z-10 mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stepTitles[step - 1].title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1.5">
            {stepTitles[step - 1].subtitle}
          </p>
        </div>

        {/* Step Content */}
        <div className="relative z-10 min-h-[300px]">
          
          {/* STEP 1: MOOD */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fade-in">
              {MOOD_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = answers.mood === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, mood: opt.id })}
                    className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-cinema-800/90 border-amber-500 shadow-glow-gold scale-[1.01]"
                        : "bg-cinema-900/60 border-white/5 hover:border-white/20 hover:bg-cinema-850/60"
                    }`}
                  >
                    <div className={`p-3 rounded-xl border ${opt.gradient} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-white flex items-center gap-2">
                        {opt.label}
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2: EMOTIONAL INTENSITY */}
          {step === 2 && (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              {INTENSITY_OPTIONS.map((opt) => {
                const isSelected = answers.emotionalIntensity === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, emotionalIntensity: opt.id })}
                    className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? "bg-cinema-800/90 border-amber-500 shadow-glow-gold scale-[1.01]"
                        : "bg-cinema-900/60 border-white/5 hover:border-white/20 hover:bg-cinema-850/60"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-lg text-white flex items-center gap-3">
                        {opt.label}
                        {isSelected && <Check className="w-5 h-5 text-amber-400" />}
                      </div>
                      <p className="text-sm text-slate-400 max-w-xl">
                        {opt.desc}
                      </p>
                    </div>

                    {/* Visual Bars Indicator */}
                    <div className="flex gap-1.5 items-center pl-4 shrink-0">
                      {[1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className={`w-3.5 h-8 rounded-md transition-all ${
                            idx <= opt.bars ? opt.color : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 3: COMPLEXITY */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
              {COMPLEXITY_OPTIONS.map((opt) => {
                const isSelected = answers.complexity === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, complexity: opt.id })}
                    className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                      isSelected
                        ? "bg-cinema-800/90 border-amber-500 shadow-glow-gold scale-[1.02]"
                        : "bg-cinema-900/60 border-white/5 hover:border-white/20 hover:bg-cinema-850/60"
                    }`}
                  >
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-amber-400 mb-3 border border-white/5">
                        {opt.badge}
                      </span>
                      <h3 className="font-bold text-lg text-white mb-2">
                        {opt.label}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected ? "bg-amber-500 border-amber-500 text-black font-bold" : "border-white/20"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 4: THEMES */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-slate-400 font-medium">
                Tap as many as you like (e.g. Friendship, Ambition, Crime):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = answers.themes.includes(theme);
                  return (
                    <button
                      key={theme}
                      onClick={() => toggleTheme(theme)}
                      className={`p-4 rounded-xl border text-center font-medium text-sm transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-400 text-amber-300 shadow-glow-gold scale-[1.02]"
                          : "bg-cinema-900/60 border-white/5 text-slate-300 hover:border-white/20 hover:bg-cinema-850"
                      }`}
                    >
                      <span>{theme}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-amber-400" />
                      ) : (
                        <span className="text-xs text-slate-500">+ Add</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: ERA & RUNTIME */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              {/* Era Selection */}
              <div>
                <label className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Release Era Preference (1990 to 2026)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ERA_OPTIONS.map((opt) => {
                    const isSelected = answers.era === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers({ ...answers, era: opt.id })}
                        className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-glow-gold"
                            : "bg-cinema-900/60 border-white/5 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Runtime Selection */}
              <div>
                <label className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-rose-400" />
                  Preferred Runtime
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {RUNTIME_OPTIONS.map((opt) => {
                    const isSelected = answers.runtime === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers({ ...answers, runtime: opt.id })}
                        className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-rose-500/15 border-rose-500 text-rose-300 shadow-glow-crimson"
                            : "bg-cinema-900/60 border-white/5 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-7 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-black shadow-glow-gold hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{step === 5 ? "Find My Movie Match" : "Continue"}</span>
            {step === 5 ? <Sparkles className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
