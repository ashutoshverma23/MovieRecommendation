/**
 * Smart recommendation engine that scores movies against user questionnaire answers.
 */

export function recommendMovies(answers, movieList) {
  const {
    mood,
    emotionalIntensity,
    complexity,
    themes = [],
    era = "Any",
    runtime = "Any",
  } = answers;

  // Score each movie
  const scored = movieList.map((movie) => {
    let score = 0;
    const matchReasons = [];

    // 1. Mood Match (Max 35 points)
    if (mood) {
      const movieMood = (movie.mood || "").toLowerCase();
      const targetMood = mood.toLowerCase();

      if (movieMood.includes(targetMood) || targetMood.includes(movieMood)) {
        score += 35;
        matchReasons.push(`Matches your desired "${movie.mood}" mood`);
      } else if (
        (targetMood.includes("feel-good") && movieMood.includes("heartwarming")) ||
        (targetMood.includes("heartwarming") && movieMood.includes("feel-good")) ||
        (targetMood.includes("adrenaline") && movieMood.includes("thrill")) ||
        (targetMood.includes("dark") && movieMood.includes("thrill"))
      ) {
        score += 24;
        matchReasons.push(`Shares a very similar emotional vibe (${movie.mood})`);
      } else {
        score += 8;
      }
    } else {
      score += 25;
    }

    // 2. Emotional Intensity (Max 20 points)
    if (emotionalIntensity) {
      if (movie.emotional_intensity === emotionalIntensity) {
        score += 20;
        matchReasons.push(`Aligns with your preferred ${emotionalIntensity} emotional intensity`);
      } else if (
        (emotionalIntensity === "Low" && movie.emotional_intensity === "Medium") ||
        (emotionalIntensity === "High" && movie.emotional_intensity === "Medium") ||
        (emotionalIntensity === "Intense" && movie.emotional_intensity === "High")
      ) {
        score += 12;
      } else {
        score += 4;
      }
    } else {
      score += 15;
    }

    // 3. Complexity (Max 15 points)
    if (complexity) {
      if (movie.complexity === complexity) {
        score += 15;
        matchReasons.push(`Offers the exact ${complexity} complexity you asked for`);
      } else if (movie.complexity === "Medium") {
        score += 10;
      } else {
        score += 4;
      }
    } else {
      score += 10;
    }

    // 4. Themes (Max 20 points)
    if (themes && themes.length > 0) {
      const movieThemes = Array.isArray(movie.themes)
        ? movie.themes.map((t) => t.toLowerCase())
        : (movie.themes || "").toLowerCase().split(",").map((t) => t.trim());

      let themeMatches = 0;
      const matchedThemeNames = [];

      for (const t of themes) {
        const lowerT = t.toLowerCase();
        const found = movieThemes.some((mt) => mt.includes(lowerT) || lowerT.includes(mt));
        if (found) {
          themeMatches++;
          matchedThemeNames.push(t);
        }
      }

      if (themeMatches > 0) {
        const themePoints = Math.min(20, Math.round((themeMatches / themes.length) * 20) + 6);
        score += themePoints;
        matchReasons.push(`Features your selected themes: ${matchedThemeNames.slice(0, 2).join(", ")}`);
      } else {
        score += 5;
      }
    } else {
      score += 15;
    }

    // 5. Era preference (Max 5 points)
    if (era && era !== "Any") {
      if (era === "2024-Latest" && movie.year >= 2024) {
        score += 5;
        matchReasons.push("Recent 2024–2026 release");
      } else if (era === "2010s-2023" && movie.year >= 2010 && movie.year <= 2023) {
        score += 5;
      } else if (era === "2000s" && movie.year >= 2000 && movie.year <= 2009) {
        score += 5;
      } else if (era === "90s (1990-1999)" && movie.year >= 1990 && movie.year <= 1999) {
        score += 5;
      } else {
        score -= 5;
      }
    } else {
      score += 5;
    }

    // 6. Runtime preference (Max 5 points)
    if (runtime && runtime !== "Any") {
      const mins = movie.runtime_mins || 150;
      if (runtime === "Brisk (< 130 min)" && mins < 130) {
        score += 5;
        matchReasons.push("Fits your preference for a shorter runtime");
      } else if (runtime === "Standard (130-160 min)" && mins >= 130 && mins <= 160) {
        score += 5;
      } else if (runtime === "Epic (160+ min)" && mins > 160) {
        score += 5;
        matchReasons.push("Grand cinematic runtime");
      }
    } else {
      score += 5;
    }

    // 7. Quality multiplier (IMDB rating bonus 0 - 5 points)
    const ratingBonus = movie.imdb_rating ? (movie.imdb_rating - 5) * 1.0 : 2.5;
    score += Math.max(0, Math.min(5, ratingBonus));

    // Cap match percentage at 99%
    const finalScore = Math.min(99, Math.max(68, Math.round(score)));

    return {
      ...movie,
      matchScore: finalScore,
      matchReasons: matchReasons.slice(0, 3),
    };
  });

  // Sort by score descending, then by IMDb rating
  scored.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return (b.imdb_rating || 0) - (a.imdb_rating || 0);
  });

  return {
    topMatch: scored[0] || null,
    alternatives: scored.slice(1, 10),
    totalEvaluated: scored.length,
  };
}
