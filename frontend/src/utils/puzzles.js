const PUZZLES = [
  { id: 1,  type: "math", question: "49 ÷ 7 = ?",   answer: "7"   },
  { id: 2,  type: "math", question: "15 × 3 = ?",   answer: "45"  },
  { id: 3,  type: "math", question: "√144 = ?",      answer: "12"  },
  { id: 4,  type: "math", question: "8² - 14 = ?",   answer: "50"  },
  { id: 5,  type: "math", question: "100 - 37 = ?",  answer: "63"  },
  { id: 6,  type: "math", question: "9 × 9 = ?",     answer: "81"  },
  { id: 7,  type: "math", question: "256 ÷ 4 = ?",   answer: "64"  },
  { id: 8,  type: "math", question: "17 × 4 = ?",    answer: "68"  },
  { id: 9,  type: "math", question: "33 + 67 = ?",   answer: "100" },
  { id: 10, type: "math", question: "121 ÷ 11 = ?",  answer: "11"  },
  { id: 11, type: "math", question: "7³ = ?",         answer: "343" },

  { id: 12, type: "odd_one_out", question: "Which is the odd one out?", options: ["Apple","Mango","Carrot","Banana"],      answer: "Carrot"     },
  { id: 13, type: "odd_one_out", question: "Which is the odd one out?", options: ["Rose","Tulip","Lotus","Tomato"],        answer: "Tomato"     },
  { id: 14, type: "odd_one_out", question: "Which is the odd one out?", options: ["Dog","Cat","Eagle","Rabbit"],           answer: "Eagle"      },
  { id: 15, type: "odd_one_out", question: "Which is the odd one out?", options: ["Piano","Guitar","Violin","Television"], answer: "Television" },
  { id: 16, type: "odd_one_out", question: "Which is the odd one out?", options: ["Mercury","Venus","Sun","Mars"],         answer: "Sun"        },
  { id: 17, type: "odd_one_out", question: "Which is the odd one out?", options: ["Cobra","Python","Eagle","Viper"],       answer: "Eagle"      },

  {
    id: 18, type: "image_click",
    question: "Tap all the ☀️ SUNS",
    images: [
      { label: "☀️", isCorrect: true  }, { label: "🌙", isCorrect: false },
      { label: "☀️", isCorrect: true  }, { label: "⭐", isCorrect: false },
      { label: "☀️", isCorrect: true  }, { label: "🌧️", isCorrect: false },
    ],
  },
  {
    id: 19, type: "image_click",
    question: "Tap all the 🍎 FRUITS",
    images: [
      { label: "🍎", isCorrect: true  }, { label: "🚗", isCorrect: false },
      { label: "🍌", isCorrect: true  }, { label: "✏️", isCorrect: false },
      { label: "🍇", isCorrect: true  }, { label: "📱", isCorrect: false },
    ],
  },
  {
    id: 20, type: "image_click",
    question: "Tap all the 🚗 VEHICLES",
    images: [
      { label: "🚗", isCorrect: true  }, { label: "🍕", isCorrect: false },
      { label: "✈️", isCorrect: true  }, { label: "🌵", isCorrect: false },
      { label: "🚢", isCorrect: true  }, { label: "📚", isCorrect: false },
    ],
  },
  // New advanced puzzles
  {
    id: 21, type: "grid_tap",
    question: "Select all the citrus fruits!",
    items: [
      { label: "🍎", isCorrect: false }, { label: "🍋", isCorrect: true }, { label: "🍊", isCorrect: true }, { label: "🍌", isCorrect: false },
      { label: "🍐", isCorrect: false }, { label: "🍊", isCorrect: true }, { label: "🍓", isCorrect: false }, { label: "🍋", isCorrect: true },
      { label: "🍇", isCorrect: false }, { label: "🍈", isCorrect: false }, { label: "🍊", isCorrect: true }, { label: "🍒", isCorrect: false },
      { label: "🍋", isCorrect: true }, { label: "🍍", isCorrect: false }, { label: "🥭", isCorrect: false }, { label: "🍊", isCorrect: true },
    ],
  },
  {
    id: 22, type: "shadow_match",
    question: "Match the shadow to the object",
    shadow: "🔔 (silhouette)",
    options: [ { label: "🔔" }, { label: "📦" }, { label: "🍎" }, { label: "🚗" } ],
    answer: "🔔",
  },
  {
    id: 23, type: "fill_missing",
    question: "Complete the pattern",
    sequence: ["🔴", "🟢", null],
    options: ["🔴","🟢","🔵"],
    answer: "🔴",
  },
  {
    id: 24, type: "color_mixer",
    question: "Match the target color",
    target: "#f9ca24",
    tolerance: 70,
  },
  {
    id: 25, type: "emoji_mashup",
    question: "What word do these emojis represent?",
    emojis: ["🐒","🍌","🌴"],
    answer: "monkey",
  },
  {
    id: 26, type: "memory_flip",
    question: "Watch the sequence and repeat it",
    sequence: [0,1,4,7],
  },
  {
    id: 27, type: "sliding_tile",
    question: "Reorder the tiles to solve",
    board: [1,2,3,4,5,6,0,7,8],
  },
  {
    id: 28, type: "line_draw",
    question: "Connect the dots in order",
    dots: [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}],
    answerSequence: [0,1,2,5,4,3],
  },
];

export function getRandomPuzzle() {
  return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}