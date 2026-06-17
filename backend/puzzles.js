const puzzles = [
  // ── MATH ──────────────────────────────────────────────
  { id: 1,  type: "math", question: "49 ÷ 7 = ?",        answer: "7"   },
  { id: 2,  type: "math", question: "15 × 3 = ?",        answer: "45"  },
  { id: 3,  type: "math", question: "√144 = ?",           answer: "12"  },
  { id: 4,  type: "math", question: "8² - 14 = ?",        answer: "50"  },
  { id: 5,  type: "math", question: "100 - 37 = ?",       answer: "63"  },
  { id: 6,  type: "math", question: "9 × 9 = ?",          answer: "81"  },
  { id: 7,  type: "math", question: "256 ÷ 4 = ?",        answer: "64"  },
  { id: 8,  type: "math", question: "17 × 4 = ?",         answer: "68"  },
  { id: 9,  type: "math", question: "33 + 67 = ?",        answer: "100" },

  // ── ODD ONE OUT ───────────────────────────────────────
  { id: 10, type: "odd_one_out", question: "Which is the odd one out?", options: ["Apple","Mango","Carrot","Banana"],          answer: "Carrot"     },
  { id: 11, type: "odd_one_out", question: "Which is the odd one out?", options: ["Rose","Tulip","Lotus","Tomato"],            answer: "Tomato"     },
  { id: 12, type: "odd_one_out", question: "Which is the odd one out?", options: ["Dog","Cat","Eagle","Rabbit"],               answer: "Eagle"      },
  { id: 13, type: "odd_one_out", question: "Which is the odd one out?", options: ["Circle","Square","Triangle","Red"],         answer: "Red"        },
  { id: 14, type: "odd_one_out", question: "Which is the odd one out?", options: ["Piano","Guitar","Violin","Television"],     answer: "Television" },
  { id: 15, type: "odd_one_out", question: "Which is the odd one out?", options: ["Mercury","Venus","Sun","Mars"],             answer: "Sun"        },
  { id: 16, type: "odd_one_out", question: "Which is the odd one out?", options: ["Cobra","Python","Eagle","Viper"],           answer: "Eagle"      },

  // ── IMAGE CLICK ───────────────────────────────────────
  {
    id: 17, type: "image_click",
    question: "Click all the SUNS ☀️",
    images: [
      { label: "☀️", isCorrect: true  },
      { label: "🌙", isCorrect: false },
      { label: "☀️", isCorrect: true  },
      { label: "⭐", isCorrect: false },
      { label: "☀️", isCorrect: true  },
      { label: "🌧️", isCorrect: false }
    ]
  },
  {
    id: 18, type: "image_click",
    question: "Click all the FRUITS 🍎",
    images: [
      { label: "🍎", isCorrect: true  },
      { label: "🚗", isCorrect: false },
      { label: "🍌", isCorrect: true  },
      { label: "✏️", isCorrect: false },
      { label: "🍇", isCorrect: true  },
      { label: "📱", isCorrect: false }
    ]
  },
  {
    id: 19, type: "image_click",
    question: "Click all the ANIMALS 🐶",
    images: [
      { label: "🐶", isCorrect: true  },
      { label: "🌹", isCorrect: false },
      { label: "🐱", isCorrect: true  },
      { label: "🏠", isCorrect: false },
      { label: "🐸", isCorrect: true  },
      { label: "🎸", isCorrect: false }
    ]
  },
  {
    id: 20, type: "image_click",
    question: "Click all the VEHICLES 🚗",
    images: [
      { label: "🚗", isCorrect: true  },
      { label: "🍕", isCorrect: false },
      { label: "✈️", isCorrect: true  },
      { label: "🌵", isCorrect: false },
      { label: "🚢", isCorrect: true  },
      { label: "📚", isCorrect: false }
    ]
  }
];

// Returns a RANDOM puzzle every time (not day-based)
function getRandomPuzzle() {
  const idx = Math.floor(Math.random() * puzzles.length);
  return puzzles[idx];
}

module.exports = { getRandomPuzzle, puzzles };